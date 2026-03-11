import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// ── Config ──────────────────────────────────────────────────────────────────
const MESSAGES_DIR = path.join(__dirname, "../src/messages");
const SOURCE_LOCALE = "tr";
const TARGET_LOCALES = ["en", "ar", "fa", "fr"];
const META_FILE = path.join(MESSAGES_DIR, "_meta.json");
const MODEL = "gpt-5-mini";

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  ar: "Arabic",
  fa: "Persian (Farsi)",
  fr: "French",
};

const SYSTEM_PROMPT = `You are a professional translator for an education consultancy company called "Atasa Education" based in Turkey.
The company provides services for international students who want to study at Turkish universities, as well as work permits, residence permits, and company formation services for foreigners in Turkey.

RULES:
- Translate the given JSON object values from Turkish to the target language
- Keep ALL JSON keys exactly the same (do not translate keys)
- Maintain the exact same JSON structure
- Keep brand names like "Atasa", "Atasa Education", "Atasa VIP" untranslated
- Keep phone numbers, email addresses, and URLs as-is
- For Arabic and Persian: use proper RTL-compatible text
- Use formal/professional tone appropriate for an education consultancy
- Translate naturally, not literally — adapt idioms and expressions

SEO KEYWORD OPTIMIZATION (CRITICAL):
- Use the most commonly searched terms in the target language, NOT literal translations
- For service-related terms, use the exact keywords people search for in that language:
  * "çalışma izni" → EN: "work permit" (not "working permission"), AR: "تصريح العمل", FA: "مجوز کار"
  * "oturma izni" / "ikamet izni" → EN: "residence permit", AR: "تصريح الإقامة", FA: "اجازه اقامت"  
  * "şirket kuruluşu" → EN: "company formation" or "business setup", AR: "تأسيس شركة", FA: "ثبت شرکت"
  * "Türkiye'de eğitim" → EN: "study in Turkey", AR: "الدراسة في تركيا", FA: "تحصیل در ترکیه"
  * "üniversite başvurusu" → EN: "university application", AR: "التقديم للجامعة", FA: "ثبت‌نام دانشگاه"
  * "Türkiye'de yaşam" → EN: "living in Turkey", AR: "العيش في تركيا", FA: "زندگی در ترکیه"
- For metadata (titles, descriptions): prioritize high-volume search keywords naturally
- For CTA buttons and headings: use action-oriented, locally common phrasing
- Think like an SEO specialist in the target language — what would a user actually search for?

- Return ONLY valid JSON, no markdown, no explanation`;

// ── Helpers ─────────────────────────────────────────────────────────────────

function hashValue(value: string): string {
  return crypto.createHash("md5").update(value).digest("hex").slice(0, 8);
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenObject(value as Record<string, unknown>, fullKey)
      );
    } else {
      result[fullKey] = JSON.stringify(value);
    }
  }
  return result;
}

function unflattenObject(flat: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

function loadJSON(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveJSON(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ── Delta Detection ─────────────────────────────────────────────────────────

interface MetaData {
  hashes: Record<string, string>;
  lastRun: string;
}

function loadMeta(): MetaData {
  if (!fs.existsSync(META_FILE)) {
    return { hashes: {}, lastRun: "" };
  }
  return JSON.parse(fs.readFileSync(META_FILE, "utf-8"));
}

function saveMeta(meta: MetaData): void {
  saveJSON(META_FILE, meta);
}

function getChangedKeys(
  sourceFlat: Record<string, string>,
  meta: MetaData
): string[] {
  const changed: string[] = [];
  for (const [key, value] of Object.entries(sourceFlat)) {
    const currentHash = hashValue(value);
    if (meta.hashes[key] !== currentHash) {
      changed.push(key);
    }
  }
  return changed;
}

// ── Translation ─────────────────────────────────────────────────────────────

async function translateBatch(
  openai: OpenAI,
  sourceObj: Record<string, unknown>,
  targetLocale: string
): Promise<Record<string, unknown>> {
  const localeName = LOCALE_NAMES[targetLocale] || targetLocale;

  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Translate the following JSON values from Turkish to ${localeName}. Return the same JSON structure with translated values.\n\n${JSON.stringify(sourceObj, null, 2)}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error(`Empty response for ${targetLocale}`);
  }

  return JSON.parse(content);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("🌍 Atasa Education — AI Çeviri Sistemi");
  console.log("━".repeat(50));

  // Validate API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY ortam değişkeni bulunamadı!");
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  // Load source
  const sourceFile = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Kaynak dosya bulunamadı: ${sourceFile}`);
    process.exit(1);
  }

  const sourceData = loadJSON(sourceFile) as Record<string, unknown>;
  const sourceFlat = flattenObject(sourceData);
  const meta = loadMeta();

  // Check for force flag
  const forceAll = process.argv.includes("--force");

  // Detect changes
  const changedKeys = forceAll
    ? Object.keys(sourceFlat)
    : getChangedKeys(sourceFlat, meta);

  if (changedKeys.length === 0) {
    console.log("✅ Değişiklik yok — tüm çeviriler güncel.");
    return;
  }

  console.log(
    `📝 ${changedKeys.length} anahtar değişti${forceAll ? " (--force modu)" : ""}`
  );
  console.log(`🎯 Hedef diller: ${TARGET_LOCALES.join(", ")}`);
  console.log("");

  // Build partial source object with only changed keys
  const changedSourceFlat: Record<string, string> = {};
  for (const key of changedKeys) {
    changedSourceFlat[key] = sourceFlat[key];
  }
  const changedSourceObj = unflattenObject(
    Object.fromEntries(
      Object.entries(changedSourceFlat).map(([k, v]) => [k, JSON.parse(v)])
    )
  );

  // Translate for each locale
  for (const locale of TARGET_LOCALES) {
    const targetFile = path.join(MESSAGES_DIR, `${locale}.json`);
    const existingData = loadJSON(targetFile) as Record<string, unknown>;
    const existingFlat = flattenObject(existingData);

    console.log(`🔄 ${LOCALE_NAMES[locale]} (${locale}) çevriliyor...`);

    try {
      const translated = await translateBatch(openai, changedSourceObj, locale);
      const translatedFlat = flattenObject(translated);

      // Merge: keep existing translations, update changed ones
      const mergedFlat = { ...existingFlat };
      for (const [key, value] of Object.entries(translatedFlat)) {
        mergedFlat[key] = value;
      }

      // Remove keys that no longer exist in source
      for (const key of Object.keys(mergedFlat)) {
        if (!(key in sourceFlat)) {
          delete mergedFlat[key];
        }
      }

      // Unflatten and save
      const mergedObj = unflattenObject(
        Object.fromEntries(
          Object.entries(mergedFlat).map(([k, v]) => [k, JSON.parse(v)])
        )
      );
      saveJSON(targetFile, mergedObj);

      console.log(`   ✅ ${locale}.json güncellendi (${Object.keys(translatedFlat).length} anahtar)`);
    } catch (error) {
      console.error(`   ❌ ${locale} çevirisi başarısız:`, error);
    }
  }

  // Update meta hashes
  const newMeta: MetaData = {
    hashes: {},
    lastRun: new Date().toISOString(),
  };
  for (const [key, value] of Object.entries(sourceFlat)) {
    newMeta.hashes[key] = hashValue(value);
  }
  saveMeta(newMeta);

  console.log("");
  console.log("━".repeat(50));
  console.log(`✅ Tamamlandı! Son çalıştırma: ${newMeta.lastRun}`);
}

main().catch((error) => {
  console.error("❌ Kritik hata:", error);
  process.exit(1);
});
