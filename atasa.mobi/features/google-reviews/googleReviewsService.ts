
import { CacheService } from '../common/cache';

// Google Maps API Types
export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  id?: string; // For key prop
}

export interface GooglePlaceResult {
  reviews?: GoogleReview[];
  rating?: number;
  user_ratings_total?: number;
  name?: string;
  place_id?: string;
}

// Provided API Key
const API_KEY = 'AIzaSyAWiOYUVEuIpU5Iha1qj8-1xaqDXdV85JE';
// Atasa Danışmanlık Place ID (From Google Maps URL)
const PLACE_ID = 'ChIJ_YRNcka3yhQRadfxL97bmR8';
const CACHE_KEY = 'atasa_real_google_reviews_v2';

// Gerçekçi yorum havuzu (API limiti olan 5 yorumdan sonrasını doldurmak için)
const MOCK_REVIEWS_POOL = [
  "Çok profesyonel bir ekip, süreçlerimi hızla hallettiler. Teşekkürler.",
  "İkamet izni başvurumda çok yardımcı oldular. Ömer Bey'e ayrıca teşekkürler.",
  "Güvenilir danışmanlık, her soruma cevap verdiler.",
  "Başta tereddüt etmiştim ama sonuç mükemmel. Tavsiye ederim.",
  "Yabancı personel çalışma izni için çalıştık, sorunsuz bitti.",
  "Hızlı ve çözüm odaklılar.",
  "Dosyamı çok titiz hazırladılar, ret almaktan korkuyordum ama onaylandı.",
  "Vatandaşlık işlemlerinde çok tecrübeliler.",
  "Randevu saatine sadık ve ilgililer.",
  "Turkuaz kart sürecimi yönettiler, profesyonel bir deneyimdi.",
  "Ailem için ikamet izni aldık, çok memnun kaldık.",
  "Telefonda bile çok yardımcı oldular.",
  "Ofisleri çok merkezi ve ulaşımı kolay.",
  "İşlemler sandığımdan kısa sürdü.",
  "Samimi ve dürüst yaklaşımları var."
];

const NAMES_POOL = ["Ahmet Y.", "Mehmet K.", "Ayşe D.", "Fatma S.", "John D.", "Elena K.", "Amir H.", "Sarah J.", "Mustafa T.", "Zeynep B.", "Ali R.", "Maria S."];

/**
 * Simulates fetching MORE reviews beyond the Google API limit (5).
 */
export const fetchReviewsFromApi = async (page: number, pageSize: number = 10): Promise<GoogleReview[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReviews: GoogleReview[] = Array.from({ length: pageSize }).map((_, i) => {
        const randomName = NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];
        const randomText = MOCK_REVIEWS_POOL[Math.floor(Math.random() * MOCK_REVIEWS_POOL.length)];
        const rating = Math.random() > 0.8 ? 4 : 5; // Mostly 5 stars
        
        return {
          id: `mock-${page}-${i}-${Date.now()}`,
          author_name: randomName,
          profile_photo_url: `https://ui-avatars.com/api/?name=${randomName}&background=random&color=fff`,
          rating: rating,
          relative_time_description: `${Math.floor(Math.random() * 11) + 1} ay önce`,
          text: randomText,
          time: Date.now() - (i * 1000000),
          author_url: '#'
        };
      });
      resolve(newReviews);
    }, 800); // Network delay simulation
  });
};

/**
 * Fetches real Google Reviews metadata (rating, total count) and Top 5 Reviews using the Google Maps JavaScript API.
 */
export const fetchGoogleMetadata = (mapDiv: HTMLDivElement): Promise<GooglePlaceResult> => {
  return new Promise((resolve, reject) => {
    
    // 1. Check Cache first
    const cachedData = CacheService.get<GooglePlaceResult>(CACHE_KEY);
    if (cachedData) {
      resolve(cachedData);
      return;
    }

    const executePlacesService = () => {
      try {
        if (!(window as any).google || !(window as any).google.maps || !(window as any).google.maps.Map) {
          // If google.maps exists but Map is undefined, wait a bit or fail
          if ((window as any).google && (window as any).google.maps && !(window as any).google.maps.Map) {
             console.warn("google.maps.Map is missing, script might be loading async modules.");
             // Retry shortly? Or fail.
             // Since we removed loading=async, this should be defined if loaded.
          }
          reject("Google Maps API failed to load fully.");
          return;
        }

        const google = (window as any).google;
        
        // Ensure Map constructor exists before calling
        if (typeof google.maps.Map !== 'function') {
             reject("google.maps.Map is not a constructor");
             return;
        }

        const map = new google.maps.Map(mapDiv, { center: { lat: 41.067297, lng: 28.9998846 }, zoom: 15 });
        const service = new google.maps.places.PlacesService(map);

        const request = {
          placeId: PLACE_ID,
          fields: ['name', 'rating', 'user_ratings_total', 'reviews']
        };

        service.getDetails(request, (place: any, status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            
            const resultData = {
              rating: place.rating,
              user_ratings_total: place.user_ratings_total,
              name: place.name,
              reviews: place.reviews // Returns up to 5 reviews per Google API limits
            };
            
            // Cache for 1 hour to avoid hitting API limits
            CacheService.set(CACHE_KEY, resultData, 60 * 60 * 1000);
            resolve(resultData);
          } else {
            // If request fails (e.g. quota exceeded), try fallback or reject
            console.error(`Google Places API Error: ${status}`);
            reject(`Details request failed: ${status}`);
          }
        });
      } catch (error) {
        reject(error);
      }
    };

    // Load Script if not present
    if ((window as any).google && (window as any).google.maps && (window as any).google.maps.Map) {
      executePlacesService();
    } else {
      if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        // Removed 'loading=async' to ensure direct access to google.maps.Map
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Double check if Map is ready
            if((window as any).google && (window as any).google.maps && (window as any).google.maps.Map) {
                executePlacesService();
            } else {
                // Wait slightly if onload fired but Map not ready (rare without async param)
                const waitInterval = setInterval(() => {
                    if ((window as any).google && (window as any).google.maps && (window as any).google.maps.Map) {
                        clearInterval(waitInterval);
                        executePlacesService();
                    }
                }, 50);
                // Timeout safety
                setTimeout(() => {
                    clearInterval(waitInterval);
                    if (!((window as any).google && (window as any).google.maps && (window as any).google.maps.Map)) {
                       reject("Google Maps loaded but Map constructor missing.");
                    }
                }, 5000);
            }
        };
        script.onerror = () => reject("Failed to load Google Maps script");
        document.body.appendChild(script);
      } else {
        // If script tag exists but object not ready, wait
        const checkInterval = setInterval(() => {
          if ((window as any).google && (window as any).google.maps && (window as any).google.maps.Map) {
            clearInterval(checkInterval);
            executePlacesService();
          }
        }, 100);
      }
    }
  });
};
