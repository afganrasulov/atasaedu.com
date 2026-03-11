import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

// ── Config ──────────────────────────────────────────────────────────────────
const SRC_DIR = path.join(__dirname, "../src");
const MESSAGES_DIR = path.join(__dirname, "../src/messages");
const TR_FILE = path.join(MESSAGES_DIR, "tr.json");
const MODEL = "gpt-4.1-mini";

// Türkçe karakterler — hardcoded metin tespiti için
const TURKISH_CHARS = /[ÇçŞşĞğÜüÖöİı]/;

// Bu dosyaları atla
const SKIP_PATTERNS = [
  "TubesBackground.tsx",
  "PageTransition.tsx",
  "WhatsAppContext.tsx",
  "layout.tsx",
];

// ── AI Prompts ──────────────────────────────────────────────────────────────
const CLIENT_COMPONENT_PROMPT = `You are an expert Next.js developer specializing in internationalization (i18n) with next-intl.

Your task is to convert a React/Next.js TSX component that has hardcoded Turkish text into one that uses the \`useTranslations\` hook from \`next-intl\`.

RULES:
1. Identify ALL hardcoded Turkish strings in the JSX (text content, placeholders, aria labels, button text, titles, descriptions, etc.)
2. Generate a namespace based on the component name (e.g., "AboutAdvantages" → "aboutAdvantages")
3. Create meaningful, short camelCase translation keys
4. Replace hardcoded strings with t("keyName") calls
5. Add "use client" if not present (useTranslations requires it)
6. Add the import: import { useTranslations } from "next-intl";
7. Add const t = useTranslations("namespace"); at the start of the component function
8. If the component already has useLocale from next-intl, keep it
9. Do NOT translate:
   - CSS class names
   - URLs/hrefs (but DO translate link text)
   - Variable names or code logic
   - HTML tag names
   - Brand names like "Atasa" (but DO extract them as translatable if they're part of a sentence)
   - Number values
   - Image paths
10. For arrays of objects with Turkish text, define the array inside the component and use t() for each string value
11. Keep the exact same visual design and functionality — ONLY change text sourcing
12. If using useLocale and useTranslations together, import both from next-intl

RESPONSE FORMAT:
Return a JSON object with exactly two keys:
{
  "translationKeys": { ... },  // flat object of key-value pairs for tr.json
  "updatedCode": "..."         // the full updated TSX file content
}

IMPORTANT: 
- translationKeys should be a flat object (e.g., {"badge": "Ortaklarımız", "title": "Danışmanlarımız"})
- The namespace will be added as a wrapper by the calling code
- Return ONLY valid JSON, no markdown, no explanation
- updatedCode must be the COMPLETE file, not a diff`;

const SERVER_COMPONENT_PROMPT = `You are an expert Next.js developer specializing in internationalization (i18n) with next-intl.

Your task is to convert a Next.js page component (server component) that has hardcoded Turkish text into one that uses next-intl's server-side translation API.

CRITICAL RULES FOR SERVER COMPONENTS:
1. This is a SERVER COMPONENT (page.tsx file). Do NOT add "use client" directive.
2. Do NOT use \`useTranslations\` hook — that is for client components only.
3. Instead, use \`getTranslations\` from "next-intl/server":
   - Import: import { getTranslations } from "next-intl/server";
   - Usage: const t = await getTranslations("namespace");
   - The component function MUST be async: export default async function PageName()
4. If the file has \`export const metadata\` or \`export async function generateMetadata\`, keep them as-is but also translate their Turkish content using getTranslations inside generateMetadata.
   - Convert static \`export const metadata\` to \`export async function generateMetadata()\` so you can use getTranslations inside it.
5. Identify ALL hardcoded Turkish strings (text content, metadata titles/descriptions, placeholders, etc.)
6. Create meaningful, short camelCase translation keys
7. Replace hardcoded strings with t("keyName") calls
8. Keep all existing imports and functionality
9. Do NOT translate CSS class names, URLs, variable names, image paths, or numbers
10. For metadata, move SEO-related Turkish titles and descriptions into translation keys
11. Keep the exact same visual design and functionality — ONLY change text sourcing

RESPONSE FORMAT:
Return a JSON object with exactly two keys:
{
  "translationKeys": { ... },  // flat object of key-value pairs for tr.json  
  "updatedCode": "..."         // the full updated TSX file content
}

IMPORTANT:
- translationKeys should be a flat object (e.g., {"pageTitle": "KVKK Aydınlatma Metni", "description": "..."})
- The namespace will be added as a wrapper by the calling code
- Return ONLY valid JSON, no markdown, no explanation
- updatedCode must be the COMPLETE file, not a diff
- The file must remain a valid server component (no "use client", no client hooks)`;

// ── Helpers ─────────────────────────────────────────────────────────────────

function hasHardcodedTurkish(content: string): boolean {
  // Remove comments and imports to avoid false positives
  const lines = content.split("\n").filter(line => {
    const trimmed = line.trim();
    return !trimmed.startsWith("//") && 
           !trimmed.startsWith("*") && 
           !trimmed.startsWith("import ") &&
           !trimmed.startsWith("export type") &&
           !trimmed.startsWith("interface ");
  });
  return TURKISH_CHARS.test(lines.join("\n"));
}

function getNamespace(filePath: string): string {
  const basename = path.basename(filePath, ".tsx");
  
  // page.tsx dosyaları için dizin adını namespace olarak kullan
  if (basename === "page") {
    const dirName = path.basename(path.dirname(filePath));
    // [locale] dizinini atla, bir üst dizine bak
    if (dirName === "[locale]") {
      return "homePage";
    }
    // [slug] gibi dinamik route'lar için üst dizini de ekle
    if (dirName.startsWith("[")) {
      const parentDir = path.basename(path.dirname(path.dirname(filePath)));
      return parentDir.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "DetailPage";
    }
    return dirName.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "Page";
  }
  
  // PascalCase → camelCase
  return basename.charAt(0).toLowerCase() + basename.slice(1);
}

function shouldSkip(filePath: string): boolean {
  const basename = path.basename(filePath);
  if (SKIP_PATTERNS.includes(basename)) return true;
  return false;
}

function loadJSON(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveJSON(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ── Scanner ─────────────────────────────────────────────────────────────────

interface ScanResult {
  filePath: string;
  relativePath: string;
  namespace: string;
  turkishLineCount: number;
}

async function scanFiles(): Promise<ScanResult[]> {
  const files = await glob("**/*.tsx", {
    cwd: SRC_DIR,
    absolute: false,
    ignore: ["**/node_modules/**"],
  });

  const results: ScanResult[] = [];

  for (const relativePath of files) {
    const absolutePath = path.join(SRC_DIR, relativePath);
    const content = fs.readFileSync(absolutePath, "utf-8");

    // Skip if already using useTranslations or getTranslations
    if (content.includes("useTranslations") || content.includes("getTranslations")) continue;
    
    // Skip based on patterns
    if (shouldSkip(relativePath)) continue;

    // Check for Turkish characters
    if (!hasHardcodedTurkish(content)) continue;

    // Count Turkish lines (approximate)
    const turkishLines = content.split("\n").filter(line => TURKISH_CHARS.test(line)).length;

    results.push({
      filePath: absolutePath,
      relativePath,
      namespace: getNamespace(relativePath),
      turkishLineCount: turkishLines,
    });
  }

  return results.sort((a, b) => b.turkishLineCount - a.turkishLineCount);
}

// ── AI Conversion ───────────────────────────────────────────────────────────

interface ConversionResult {
  translationKeys: Record<string, string>;
  updatedCode: string;
}

async function convertFile(
  openai: OpenAI,
  filePath: string,
  namespace: string
): Promise<ConversionResult> {
  const content = fs.readFileSync(filePath, "utf-8");
  
  // page.tsx dosyaları server component — getTranslations kullan
  const isPage = path.basename(filePath) === "page.tsx";
  const systemPrompt = isPage ? SERVER_COMPONENT_PROMPT : CLIENT_COMPONENT_PROMPT;
  const hookInfo = isPage ? "getTranslations (server)" : "useTranslations (client)";

  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Convert this TSX ${isPage ? "page (server component)" : "component"}. The namespace for ${hookInfo} should be "${namespace}".\n\nFile: ${path.basename(filePath)}\nPath: ${filePath}\n\n${content}`,
      },
    ],
  });

  const responseContent = response.choices[0]?.message?.content;
  if (!responseContent) {
    throw new Error(`Empty AI response for ${filePath}`);
  }

  const parsed = JSON.parse(responseContent);
  
  if (!parsed.translationKeys || !parsed.updatedCode) {
    throw new Error(`Invalid AI response structure for ${filePath}`);
  }

  return {
    translationKeys: parsed.translationKeys,
    updatedCode: parsed.updatedCode,
  };
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("🔍 Atasa Education — i18n Tarama Sistemi");
  console.log("━".repeat(50));

  const applyMode = process.argv.includes("--apply");

  // Scan
  const scanResults = await scanFiles();

  if (scanResults.length === 0) {
    console.log("✅ Tüm bileşenler çevrilmiş — hardcoded Türkçe metin bulunamadı!");
    return;
  }

  console.log(`\n📋 ${scanResults.length} dosyada hardcoded Türkçe metin tespit edildi:\n`);
  
  for (const result of scanResults) {
    console.log(`   ${result.turkishLineCount.toString().padStart(3)} satır  ${result.relativePath}`);
  }

  const totalLines = scanResults.reduce((sum, r) => sum + r.turkishLineCount, 0);
  console.log(`\n   Toplam: ${totalLines} Türkçe satır\n`);

  if (!applyMode) {
    console.log("💡 Dönüşüm yapmak için: npm run scan-i18n:apply");
    return;
  }

  // Validate API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY ortam değişkeni bulunamadı!");
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  // Load existing tr.json
  const trData = loadJSON(TR_FILE) as Record<string, unknown>;
  let convertedCount = 0;
  let newKeyCount = 0;

  console.log("🔄 AI dönüşüm başlıyor...\n");

  for (const result of scanResults) {
    const { filePath, relativePath, namespace } = result;

    // Skip if namespace already exists in tr.json (already converted in a previous run)
    if (trData[namespace]) {
      console.log(`   ⏭️  ${relativePath} — "${namespace}" namespace zaten mevcut, atlanıyor`);
      continue;
    }

    console.log(`   🔄 ${relativePath} dönüştürülüyor...`);

    try {
      const conversion = await convertFile(openai, filePath, namespace);

      // Add translation keys to tr.json under the namespace
      trData[namespace] = conversion.translationKeys;
      newKeyCount += Object.keys(conversion.translationKeys).length;

      // Write updated TSX file
      fs.writeFileSync(filePath, conversion.updatedCode, "utf-8");

      convertedCount++;
      console.log(`   ✅ ${relativePath} — ${Object.keys(conversion.translationKeys).length} key eklendi`);
    } catch (error) {
      console.error(`   ❌ ${relativePath} başarısız:`, error instanceof Error ? error.message : error);
    }
  }

  // Save updated tr.json
  if (convertedCount > 0) {
    saveJSON(TR_FILE, trData);
    console.log(`\n📝 tr.json güncellendi — ${newKeyCount} yeni key eklendi`);
  }

  console.log("");
  console.log("━".repeat(50));
  console.log(`✅ Tamamlandı! ${convertedCount}/${scanResults.length} dosya dönüştürüldü.`);
  
  if (convertedCount > 0) {
    console.log("\n💡 Şimdi çeviri script'ini çalıştırın:");
    console.log("   npm run translate");
  }
}

main().catch((error) => {
  console.error("❌ Kritik hata:", error);
  process.exit(1);
});
