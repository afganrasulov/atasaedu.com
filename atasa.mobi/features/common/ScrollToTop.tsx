import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa değiştiğinde en üste kaydır
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Animasyon olmadan direkt yukarı atması daha iyi bir UX sağlar
    });
  }, [pathname]);

  return null;
};