# Atasa Mobil Varlık Yönetimi (Icons & Splash)

Uygulamanın iOS ve Android mağaza ikonlarını ve açılış ekranlarını oluşturmak için aşağıdaki adımları izleyin:

## 1. Hazırlık
Proje kök dizininde `assets` adında bir klasör oluşturun ve içine şu dosyaları yerleştirin:

- `assets/icon.png`: En az 1024x1024px boyutunda, şeffaflık içermeyen kare logo.
- `assets/splash.png`: En az 2732x2732px boyutunda açılış ekranı görseli (Logo ortalanmış olmalı).
- `assets/splash-dark.png`: (Opsiyonel) Gece modu için açılış ekranı.

## 2. Otomatik Oluşturma
Aşağıdaki komutu terminalde çalıştırarak tüm platformlar için gerekli boyutları otomatik olarak oluşturun:

```bash
npm run assets:generate
```

## 3. Güncelleme
Oluşturulan dosyaları projenize yansıtmak için:

```bash
npx cap sync
```

Artık Xcode veya Android Studio'da uygulamayı çalıştırdığınızda Atasa logolu açılış ekranını göreceksiniz.