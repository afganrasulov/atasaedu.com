import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const PushNotificationService = {
  async init() {
    // Sadece native platformlarda (iOS/Android) çalıştır
    if (Capacitor.getPlatform() === 'web') {
      console.debug('Push Notifications: Web platformunda desteklenmiyor.');
      return;
    }

    await this.addListeners();
    await this.registerPush();
  },

  async addListeners() {
    // Başarılı kayıt durumunda token'ı al
    await PushNotifications.addListener('registration', token => {
      console.info('Push Registration Success. Token:', token.value);
      // TODO: Bu token'ı n8n veya veritabanına gönderin
    });

    // Kayıt hatası durumunda
    await PushNotifications.addListener('registrationError', err => {
      console.error('Push Registration Error:', err.error);
    });

    // Uygulama açıkken (foreground) gelen bildirimler
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push Received (Foreground):', notification);
      // İsteğe bağlı olarak uygulama içinde bir alert gösterilebilir
    });

    // Kullanıcı bildirime tıkladığında (background/closed)
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push Action Performed:', notification.actionId, notification.notification);
      // İsteğe bağlı: Bildirim tipine göre belirli bir sayfaya (örn: /appointment) yönlendirme yapılabilir
    });
  },

  async registerPush() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      console.warn('Push Notifications: Kullanıcı izin vermedi.');
      return;
    }

    await PushNotifications.register();
  }
};