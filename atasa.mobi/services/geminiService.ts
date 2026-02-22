
// Gemini API devredışı bırakıldı. 
// Atasa Danışmanlık kurumsal yapısı için doğrudan iletişim kanalları (WhatsApp/Randevu) önceliklendirilmiştir.
// Fix: Added message parameter to match expected usage in components/ChatWidget.tsx
export const sendMessageToGemini = async (_message: string) => {
  return "Bu servis şu an aktif değildir. Lütfen doğrudan iletişime geçin.";
};
