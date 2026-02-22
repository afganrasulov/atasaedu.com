
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION as GLOBAL_INSTRUCTION } from '../../constants';

// Formun mevcut durumunu temsil eden tip
export interface VoiceFormState {
  name: string | null;
  phone: string | null;
  topic: string | null;
  description: string | null;
  isComplete: boolean;
}

const VOICE_SYSTEM_INSTRUCTION = `
Sen "Atasa Danışmanlık"ın sesli asistanısın. Görevin, müşterilerle sesli sohbet ederek onların iletişim bilgilerini ve taleplerini almak veya site içeriği hakkında bilgi vermektir.

Şirket Bilgileri:
${GLOBAL_INSTRUCTION}

GÖREVLERİN:
1. Kullanıcıyla nazik, samimi ve "tane tane" konuş. Yaşlı birine anlatır gibi sabırlı ol.
2. Aşağıdaki bilgileri toplaman gerekiyor (Sırasıyla veya akışa göre):
   - İsim Soyisim
   - Telefon Numarası
   - Konu (İkamet, Çalışma İzni, Vatandaşlık vb.)
   - Detaylı Açıklama (Ne yapmak istiyor?)
3. Kullanıcı bir soru sorarsa (örn: "Vatandaşlık şartları nedir?"), önce kısa ve net bir cevap ver, sonra form bilgilerini istemeye devam et.
4. Telefon numarası eksik veya hatalıysa nazikçe tekrar iste.
5. Tüm bilgiler tamamlandığında "isComplete": true olarak işaretle.

ÇIKTI FORMATI (JSON):
Her cevabın SADECE geçerli bir JSON objesi olmalıdır. Markdown veya başka metin ekleme.

{
  "voiceResponse": "Kullanıcıya sesli olarak okunacak metin. (Kısa, net ve yönlendirici ol)",
  "extractedData": {
    "name": "Tespit edilen isim veya null",
    "phone": "Tespit edilen telefon veya null",
    "topic": "Tespit edilen konu veya null",
    "description": "Tespit edilen açıklama veya null"
  },
  "isComplete": true/false (Tüm alanlar doluysa true)
}
`;

export const processVoiceInput = async (
  userText: string, 
  currentFormState: VoiceFormState
): Promise<{ text: string, newState: VoiceFormState }> => {
  try {
    // Fix: Create GoogleGenAI instance inside the function as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using recommended model for text tasks
    const model = 'gemini-3-flash-preview';
    
    // AI'ya mevcut durumu bildiriyoruz ki neyin eksik olduğunu bilsin
    const prompt = `
      MEVCUT FORM DURUMU: ${JSON.stringify(currentFormState)}
      KULLANICI SÖYLEDİĞİ: "${userText}"
      
      Lütfen yukarıdaki sistem talimatlarına göre JSON formatında yanıt ver.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: VOICE_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.5, // Daha tutarlı olması için düşük sıcaklık
      }
    });

    const jsonResponse = JSON.parse(response.text || '{}');

    // Yeni durumu birleştir (Eğer AI null döndürürse eski veriyi koru)
    const newState: VoiceFormState = {
      name: jsonResponse.extractedData?.name || currentFormState.name,
      phone: jsonResponse.extractedData?.phone || currentFormState.phone,
      topic: jsonResponse.extractedData?.topic || currentFormState.topic,
      description: jsonResponse.extractedData?.description || currentFormState.description,
      isComplete: jsonResponse.isComplete || false
    };

    return {
      text: jsonResponse.voiceResponse,
      newState
    };

  } catch (error) {
    console.error("Voice AI Error:", error);
    return {
      text: "Sizi tam duyamadım, lütfen tekrar eder misiniz?",
      newState: currentFormState
    };
  }
};
