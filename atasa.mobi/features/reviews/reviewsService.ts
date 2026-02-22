import { Review } from '../../types';

// Mock data that simulates a database or API response
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    rating: 5,
    text: "İkamet izni sürecim çok karmaşıktı ancak Atasa ekibi her adımı benim için kolaylaştırdı. Profesyonel ve güvenilir bir hizmet.",
    date: "2 hafta önce",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "2",
    author: "Mehmet Aliyev",
    rating: 5,
    text: "Ömer Bey ve ekibine teşekkür ederim. Çalışma izni başvurumuzu çok kısa sürede sonuçlandırdılar. Kesinlikle tavsiye ediyorum.",
    date: "1 ay önce",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "3",
    author: "Elena Petrova",
    rating: 5,
    text: "Very professional service. They helped me with my student residence permit application. Fast and reliable.",
    date: "3 hafta önce",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "4",
    author: "Karim Hassan",
    rating: 4,
    text: "Güvenilir danışmanlık. Randevu sistemleri çok iyi çalışıyor, hiç beklemeden işlemlerimi hallettiler.",
    date: "2 ay önce",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: "5",
    author: "Anna Schmidt",
    rating: 5,
    text: "Citizenship application process was smooth thanks to their guidance. Highly recommended!",
    date: "1 hafta önce",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: "6",
    author: "John Doe",
    rating: 5,
    text: "Hızlı, etkili ve güler yüzlü hizmet. Teşekkürler Atasa.",
    date: "3 gün önce",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg"
  }
];

export const fetchGoogleReviews = async (): Promise<Review[]> => {
  // Simulate API Network Delay to make it feel dynamic
  await new Promise(resolve => setTimeout(resolve, 800));

  // In a real application, you would fetch from your backend proxy here:
  // const response = await fetch('https://your-api.com/google-reviews');
  // return await response.json();

  // For now, we return mock data, but we shuffle it to make it look dynamic on reload
  const shuffled = [...MOCK_REVIEWS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4); // Return random 4 reviews
};

export const getTotalRating = () => {
  return {
    average: 4.9,
    count: "150+"
  };
};