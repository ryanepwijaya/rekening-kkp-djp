# Rekening & KKP — Direktorat Jenderal Pajak

Referensi internal pengelolaan Rekening (Giro/Virtual) dan Kartu Kredit Pemerintah (KKP) untuk satker DJP.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Build produksi

```bash
npm run build
```

Hasilnya ada di folder `dist/`.

## Deploy ke Vercel

1. Push folder ini (bukan cuma file `App.jsx`) ke repository GitHub.
2. Di Vercel, klik **Add New → Project**, pilih repo ini.
3. Framework preset: **Vite** (biasanya kedeteksi otomatis).
4. Build command: `npm run build` — Output directory: `dist` (default, biasanya sudah otomatis).
5. Deploy.

Tidak ada environment variable yang perlu diisi — situs ini murni statis, tanpa backend/API key.

## Catatan privasi

`public/robots.txt` dan meta tag `noindex` di `index.html` sudah disetel supaya situs ini tidak
diindeks mesin pencari (Google dkk). Ini bukan proteksi akses (siapa pun yang punya link tetap
bisa buka), cuma mencegah situs ini muncul di hasil pencarian publik.
