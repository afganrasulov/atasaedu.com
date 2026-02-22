
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export const CacheService = {
  set: <T>(key: string, data: T, duration: number = ONE_YEAR_MS) => {
    const item = {
      data,
      expiry: Date.now() + duration,
      version: '1.0' // Veri yapısı değişirse burayı artırarak eski cache'leri geçersiz kılabiliriz
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or disabled', e);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      const now = Date.now();

      // Süresi dolmuşsa sil ve null dön
      if (now > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.data;
    } catch (e) {
      return null;
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};
