
import { useState, useEffect } from 'react';
import { COUNTRY_CODES } from '../../constants';

export const useCountryCode = () => {
  const [detectedCode, setDetectedCode] = useState('+90'); // Default to Turkey

  useEffect(() => {
    const detectCountry = async () => {
      // 1. Check if we already detected it in this session to avoid API spam
      const cachedCode = sessionStorage.getItem('atasa_user_calling_code');
      if (cachedCode) {
        setDetectedCode(cachedCode);
        return;
      }

      try {
        // 2. Fetch from ipapi.co (Free tier, good for client-side demos)
        // Returns JSON like: { "country_calling_code": "+90", ... }
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const apiCode = data.country_calling_code;

          if (apiCode) {
            // Check if this code exists in our supported list
            // If not, we might want to default to TR or just use the detected one if we supported dynamic inputs.
            // For now, we only auto-select if it matches our list or we add it to the list dynamically.
            const isSupported = COUNTRY_CODES.some(c => c.code === apiCode);
            
            if (isSupported) {
               setDetectedCode(apiCode);
               sessionStorage.setItem('atasa_user_calling_code', apiCode);
            }
          }
        }
      } catch (error) {
        console.warn('Country detection failed, defaulting to +90', error);
      }
    };

    detectCountry();
  }, []);

  return detectedCode;
};
