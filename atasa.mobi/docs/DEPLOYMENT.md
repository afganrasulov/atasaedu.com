# Deployment Guide

Bu belge, uygulamanın yayına alınma süreçlerini içerir.

## 📋 Ön Gereksinimler

- **Google Gemini API Key:** AI sohbet botunun çalışması için gereklidir. [AI Studio](https://aistudio.google.com/) üzerinden alınabilir.
- **Webhook URL:** Randevu formunun çalışması için n8n veya benzeri bir servisin webhook URL'i gereklidir.

## 🚀 Statik Hosting (Vercel / Netlify / GitHub Pages)

Uygulama tamamen istemci taraflı (Client-Side) çalıştığı için herhangi bir statik dosya sunucusunda barındırılabilir.

### Vercel ile Dağıtım

1. Projeyi GitHub/GitLab'e yükleyin.
2. Vercel'de yeni proje oluşturun ve repoyu seçin.
3. **Environment Variables** bölümüne aşağıdaki değişkeni ekleyin:
   - `API_KEY`: Sizin Gemini API anahtarınız.
4. **Build Command:** `npm run build` (veya `vite build`)
5. **Output Directory:** `dist` (veya `build`)

### Manuel Dağıtım (FTP vb.)

1. Projeyi build alın.
2. Çıktı klasöründeki (`dist/`) tüm dosyaları sunucunuza yükleyin.
3. Not: `HashRouter` kullanıldığı için sunucu tarafında özel bir rewrite kuralına (SPA fallback) gerek yoktur, ancak `BrowserRouter`'a geçilirse tüm isteklerin `index.html`'e yönlendirilmesi gerekir.

## ⚠️ Önemli Güvenlik Uyarısı

Şu anki mimaride `API_KEY` frontend kodunda (istemci tarafında) kullanılmaktadır. 
- **Risk:** Kullanıcılar tarayıcı geliştirici araçları ile API anahtarını görebilir.
- **Çözüm (Production için):** API anahtarını gizlemek için bir "Backend Proxy" veya "Serverless Function" (örn. Vercel Functions) kullanılmalıdır. Frontend isteği kendi backend'inize atar, backend ise API anahtarını ekleyip Google'a istek atar.

## 🔄 Webhook Yapılandırması

`features/appointment/appointmentService.ts` dosyasındaki `WEBHOOK_URL` sabitinin, canlı ortamdaki n8n webhook URL'iniz olduğundan emin olun.

```typescript
const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/...';
```
