
import { Capacitor } from '@capacitor/core';

declare global {
  interface Window {
    fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-ZTJ5D4LWFZ';

// Benzersiz Event ID üretici (Deduplication için)
const generateEventId = (): string => {
  return 'event-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Helper: Wait for global tracking objects to be defined
const waitForTrackers = (callback: () => void, retries = 5, interval = 500) => {
  // GÜVENLİK: Native platformda (iOS/Android) izlemeyi durdur
  if (Capacitor.isNativePlatform()) {
    return;
  }

  if (typeof window !== 'undefined' && (window.fbq || window.gtag)) {
    callback();
  } else if (retries > 0) {
    setTimeout(() => waitForTrackers(callback, retries - 1, interval), interval);
  }
};

export const TrackingService = {
  // Standart PageView (Route değişimlerinde çağrılır)
  trackPageView: () => {
    // Mobil uygulamada sayfa takibini durdur (Apple Politikası)
    if (Capacitor.isNativePlatform()) return;

    waitForTrackers(() => {
      // 1. Meta Pixel PageView
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }

      // 2. Google Analytics PageView
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.hash || window.location.pathname,
          page_title: document.title
        });
      }
      
      console.log(`📡 PageView Tracked: ${window.location.hash || window.location.pathname}`);
    });
  },

  // Özel Event Tetikleyici
  trackEvent: async (eventName: 'Lead' | 'Purchase' | 'CompleteRegistration' | 'Contact', data: any = {}, userData: any = {}) => {
    // Mobil uygulamada event takibini durdur (Apple Politikası)
    if (Capacitor.isNativePlatform()) return;

    const eventID = generateEventId();
    
    waitForTrackers(() => {
      // 1. Browser Side Tracking (Meta Pixel)
      if (window.fbq) {
        window.fbq('track', eventName, data, { eventID: eventID });
      }

      // 2. Google Analytics Event
      if (window.gtag) {
        const gaEventName = eventName === 'Lead' ? 'generate_lead' : 
                          eventName === 'Contact' ? 'contact' : 
                          eventName === 'Purchase' ? 'purchase' : eventName;

        window.gtag('event', gaEventName, {
          ...data,
          event_id: eventID
        });
      }

      console.log(`📡 Event Fired: ${eventName} (ID: ${eventID})`);
    });
  }
};
