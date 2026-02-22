
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../../constants';

export const sendMessageToGemini = async (message: string, history: string[] = []) => {
  try {
    // Fix: Create GoogleGenAI instance inside the function as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using recommended model for text tasks
    const model = 'gemini-3-flash-preview';
    
    // We construct a chat session-like experience using generateContent for stateless simplicity in this demo,
    // or use ai.chats.create for stateful. Here we use generateContent with system instruction.
    
    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Bir hata oluştu, lütfen tekrar deneyin.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Şu anda yanıt veremiyorum. Lütfen iletişim sayfasından bize ulaşın.";
  }
};
