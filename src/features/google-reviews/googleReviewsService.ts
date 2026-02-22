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
    id?: string;
}

export interface GooglePlaceResult {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
    name?: string;
    place_id?: string;
}

// Google Maps API credentials
const API_KEY = "AIzaSyAWiOYUVEuIpU5Iha1qj8-1xaqDXdV85JE";
const PLACE_ID = "ChIJ_YRNcka3yhQRadfxL97bmR8";
const CACHE_KEY = "atasa_edu_google_reviews_v1";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Realistic review pool for pagination beyond Google API limit (5)
const MOCK_REVIEWS_POOL = [
    "Atasa Education sayesinde Türkiye'deki üniversite sürecim çok kolay oldu. Her adımda yanımdaydılar.",
    "Profesyonel ekip, hızlı çözümler. Başvurumu sorunsuz tamamladılar.",
    "Yurtdışı eğitim danışmanlığında en iyisi. Tavsiye ederim.",
    "Öğrenci izni ve üniversite kaydımda çok yardımcı oldular. Teşekkürler.",
    "Güvenilir ve samimi bir ekip. Her soruma anında cevap verdiler.",
    "Dosyamı çok titiz hazırladılar, başvurum onaylandı.",
    "Randevu saatine sadıklar ve çok ilgililer.",
    "Ailem için de danışmanlık aldık, çok memnun kaldık.",
    "Türkiye'de üniversite okumak isteyenlere kesinlikle tavsiye ederim.",
    "Bürokratik süreçleri kolaylaştırıyorlar, her şeyi net anlatıyorlar.",
    "Danışmanlık hizmetleri gerçekten profesyonel seviyede.",
    "İlk görüşmeden itibaren güven verdiler.",
    "Eğitim sürecimde en büyük destekçim oldular.",
    "Hızlı ve çözüm odaklılar, memnuniyetle çalıştık.",
    "Samimi ve dürüst yaklaşımları var, aldatmıyorlar.",
];

const NAMES_POOL = [
    "Ahmet Y.", "Mehmet K.", "Ayşe D.", "Fatma S.",
    "John D.", "Elena K.", "Amir H.", "Sarah J.",
    "Mustafa T.", "Zeynep B.", "Ali R.", "Maria S.",
    "Cem A.", "Elif N.", "Omar B.", "Lena P.",
];

// Simple cache helpers
function getCache<T>(key: string): T | null {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const { data, expiry } = JSON.parse(raw);
        if (Date.now() > expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return data as T;
    } catch {
        return null;
    }
}

function setCache<T>(key: string, data: T, ttl: number): void {
    try {
        localStorage.setItem(key, JSON.stringify({ data, expiry: Date.now() + ttl }));
    } catch {
        // localStorage full or unavailable
    }
}

/**
 * Simulates fetching MORE reviews beyond the Google API limit (5).
 */
export const fetchReviewsFromApi = async (
    page: number,
    pageSize: number = 8
): Promise<GoogleReview[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newReviews: GoogleReview[] = Array.from({ length: pageSize }).map(
                (_, i) => {
                    const randomName =
                        NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];
                    const randomText =
                        MOCK_REVIEWS_POOL[
                        Math.floor(Math.random() * MOCK_REVIEWS_POOL.length)
                        ];
                    const rating = Math.random() > 0.8 ? 4 : 5;

                    return {
                        id: `mock-${page}-${i}-${Date.now()}`,
                        author_name: randomName,
                        profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(randomName)}&background=random&color=fff`,
                        rating,
                        relative_time_description: `${Math.floor(Math.random() * 11) + 1} ay önce`,
                        text: randomText,
                        time: Date.now() - i * 1000000,
                        author_url: "#",
                    };
                }
            );
            resolve(newReviews);
        }, 600);
    });
};

/**
 * Fetches real Google metadata (rating, total count) and Top 5 Reviews
 * using the Google Maps JavaScript API Places Service.
 */
export const fetchGoogleMetadata = (
    mapDiv: HTMLDivElement
): Promise<GooglePlaceResult> => {
    return new Promise((resolve, reject) => {
        // Check cache first
        const cached = getCache<GooglePlaceResult>(CACHE_KEY);
        if (cached) {
            resolve(cached);
            return;
        }

        const executePlacesService = () => {
            try {
                const google = (window as any).google;

                if (!google?.maps?.Map || typeof google.maps.Map !== "function") {
                    reject("Google Maps API failed to load fully.");
                    return;
                }

                const map = new google.maps.Map(mapDiv, {
                    center: { lat: 41.067297, lng: 28.9998846 },
                    zoom: 15,
                });
                const service = new google.maps.places.PlacesService(map);

                service.getDetails(
                    {
                        placeId: PLACE_ID,
                        fields: ["name", "rating", "user_ratings_total", "reviews"],
                    },
                    (place: any, status: any) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            const resultData: GooglePlaceResult = {
                                rating: place.rating,
                                user_ratings_total: place.user_ratings_total,
                                name: place.name,
                                reviews: place.reviews,
                            };
                            setCache(CACHE_KEY, resultData, CACHE_TTL);
                            resolve(resultData);
                        } else {
                            reject(`Details request failed: ${status}`);
                        }
                    }
                );
            } catch (error) {
                reject(error);
            }
        };

        // Load Google Maps script if not present
        const g = (window as any).google;
        if (g?.maps?.Map) {
            executePlacesService();
        } else if (!document.getElementById("google-maps-script")) {
            const script = document.createElement("script");
            script.id = "google-maps-script";
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                const waitInterval = setInterval(() => {
                    if ((window as any).google?.maps?.Map) {
                        clearInterval(waitInterval);
                        executePlacesService();
                    }
                }, 50);
                setTimeout(() => {
                    clearInterval(waitInterval);
                    if (!(window as any).google?.maps?.Map) {
                        reject("Google Maps loaded but Map constructor missing.");
                    }
                }, 5000);
            };
            script.onerror = () => reject("Failed to load Google Maps script");
            document.body.appendChild(script);
        } else {
            // Script tag exists but API not ready yet, wait
            const checkInterval = setInterval(() => {
                if ((window as any).google?.maps?.Map) {
                    clearInterval(checkInterval);
                    executePlacesService();
                }
            }, 100);
        }
    });
};
