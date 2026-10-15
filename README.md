# Yiğit Poyraz - 30 Haftalık Web Uygulama Portalı

Yiğit Poyraz adına özel olarak geliştirilmiş, koyu kırmızı ve altın sarısı renk paletine sahip 30 haftalık web uygulamaları ve portfolyo portalı.

## Özellikler

- **Sol Üst "Y.P" Monogram Logosu & Yiğit Poyraz Markası**
- **Koyu Kırmızı & Altın Sarısı Lüks Tasarım Teması**
- **30 Haftalık Özelleştirilebilir Proje Kartları**: Her hafta için kendi geliştirdiğiniz projelerin canlı bağlantılarını (`projectUrl`) ve GitHub repolarını ekleyebilirsiniz.
- **Canlı Saat ve Tarih**: Sağ alt köşede saniyesi saniyesine güncellenen dijital saat ve Türkçe tarih göstergesi.
- **Toplu Link Yöneticisi**: 30 haftanın tüm bağlantılarını tek ekranda düzenleyip JSON olarak yedekleyebilme.
- **Kalıcı Saklama & Eşitleme**: Eklenen tüm linkler hem yerel tarayıcıda hem de sunucuda saklanır.

## Kurulum ve Dağıtım (Vercel & GitHub)

### 1. Yerel Çalıştırma
```bash
npm install
npm run dev
```

### 2. Üretim Derlemesi
```bash
npm run build
```

### 3. GitHub'a Gönderme
```bash
git add .
git commit -m "fix: resolve esbuild peer dependency conflict for vercel deployment"
git push origin main
```
