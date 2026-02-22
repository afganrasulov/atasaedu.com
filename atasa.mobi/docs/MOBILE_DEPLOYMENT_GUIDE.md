# Atasa Danışmanlık - Mobil Uygulama Dağıtım Rehberi

Bu rehber, mevcut React web projesini iOS ve Android uygulamalarına dönüştürmek için gerekli adımları içerir. Proje altyapısı **CapacitorJS** ile hazırdır.

## 1. Ön Gereksinimler

Bilgisayarınızda aşağıdaki araçların kurulu olması gerekir:

*   **Node.js & npm:** (Zaten kurulu olmalı)
*   **iOS için:** macOS işletim sistemi ve **Xcode**.
*   **Android için:** Windows/Mac/Linux ve **Android Studio**.

## 2. Kurulum ve Derleme (Build)

Projeyi mobil cihazlarda çalıştırmadan önce web varlıklarını (HTML/CSS/JS) derlemeniz gerekir.

1.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

2.  Web projesini derleyin:
    ```bash
    npm run build
    ```
    *Bu işlem `dist/` klasörünü oluşturur.*

3.  Mobil projeleri senkronize edin:
    ```bash
    npx cap sync
    ```
    *Bu komut, `dist/` klasöründeki dosyaları `android/` ve `ios/` klasörlerine kopyalar ve native eklentileri günceller.*

## 3. Android Uygulaması Oluşturma (APK)

1.  Android projesini açın:
    ```bash
    npx cap open android
    ```
    *Android Studio açılacaktır.*

2.  Android Studio'da:
    *   Cihazınızı USB ile bağlayın veya bir Emulator başlatın.
    *   Üst menüdeki yeşil **Play (▶)** butonuna basın.
    *   Uygulama cihazınıza yüklenecektir.

3.  **APK Çıktısı Almak İçin:**
    *   Menu > **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)** yolunu izleyin.

## 4. iOS Uygulaması Oluşturma (IPA)

*Not: Sadece macOS üzerinde yapılabilir.*

1.  iOS projesini açın:
    ```bash
    npx cap open ios
    ```
    *Xcode açılacaktır.*

2.  Xcode'da:
    *   Sol menüden **App** projesine tıklayın.
    *   **Signing & Capabilities** sekmesine gelin.
    *   **Team** kısmından kendi Apple Developer hesabınızı seçin.
    *   Cihazınızı seçin ve **Play (▶)** butonuna basın.

## 5. İkon ve Açılış Ekranı (Splash Screen)

Otomatik ikon oluşturmak için `assets` klasörüne `icon.png` (1024x1024) ve `splash.png` (2732x2732) dosyalarınızı koyduktan sonra şu komutu çalıştırın:

```bash
npm run assets:generate
```

## Sık Karşılaşılan Sorunlar

*   **Beyaz Ekran:** `npm run build` komutunu çalıştırdığınızdan ve `dist` klasörünün dolu olduğundan emin olun.
*   **İnternet Hatası:** Uygulamanızın API istekleri atabilmesi için `AndroidManifest.xml` içinde internet izninin açık olduğundan emin olun (Mevcut yapılandırmada açıktır).
*   **Hot Reload (Geliştirme):** Canlı geliştirme yapmak için `capacitor.config.json` dosyasına `server: { url: 'http://192.168.1.x:5173', cleartext: true }` ekleyebilirsiniz.

Başarılar!
