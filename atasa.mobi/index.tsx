import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { SplashScreen } from '@capacitor/splash-screen';

// Register Service Worker for Performance & Offline Support
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const initApp = async () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  try {
    await SplashScreen.hide();
  } catch (e) {
    console.debug('Web environment: Native splash screen not available.');
  }
};

initApp();