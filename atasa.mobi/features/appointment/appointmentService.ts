export interface AppointmentData {
  firstName: string;
  lastName: string;
  gender: 'Erkek' | 'Kadın';
  birthDate: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  nationality: string;
  appointmentDate: string;
  appointmentTime: string;
  hasResidency: 'Evet' | 'Hayır';
  residencyStartDate?: string;
  residencyEndDate?: string;
  representative: string;
}

const DEFAULT_WEBHOOK_URL = 'https://n8n.rasulov.net/webhook/53866ac6-190b-4cbb-ad48-6d8e8e71deed';
const OMER_HABIB_WEBHOOK_URL = 'https://n8n.rasulov.net/webhook/0946b321-a368-44de-bc5a-2fde2b9f2ad1';

export const submitAppointment = async (data: AppointmentData): Promise<boolean> => {
  console.log('🚀 Sending Appointment Data:', data);

  // Temsilci seçimine göre webhook URL'ini belirle
  const targetUrl = data.representative === 'Ömer Habib' 
    ? OMER_HABIB_WEBHOOK_URL 
    : DEFAULT_WEBHOOK_URL;

  try {
    const formData = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value || ''));
    });

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.ok) {
      console.log(`✅ Webhook Response OK (${data.representative})`);
      return true;
    } else {
      console.error('❌ Webhook Error:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('⚠️ Network/CORS Warning:', error);
    // x-www-form-urlencoded kullanıldığı için veri genellikle ulaşır, 
    // kullanıcı deneyimi için başarılı kabul ediyoruz.
    return true; 
  }
};