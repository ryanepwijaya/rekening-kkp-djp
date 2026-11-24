# Rekening & KKP — Direktorat Jenderal Pajak

Referensi internal pengelolaan Rekening Giro (RPL), Rekening Virtual (BPG/BPP), dan Kartu Kredit Pemerintah (KKP) untuk satker DJP.
Bisa dipasang sebagai aplikasi (PWA) dan tetap bisa dibaca saat offline.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Build produksi

```bash
npm run build
npm run preview   # cek hasil build, termasuk service worker/PWA
```

Hasilnya ada di folder `dist/`. Vercel otomatis memakai preset **Vite** (build `npm run build`, output `dist`).
Tidak ada environment variable — situs ini murni statis.

## Struktur

```
src/
  App.jsx                 rute (hash router: #/giro/regulasi, #/faq/kkp?q=..., dst.)
  lib/router.jsx          router berbasis hash
  lib/hooks.js            tema terang/gelap, prompt install PWA, pintasan Ctrl/⌘+K
  data/sharepoint.js      SEMUA tautan format dokumen (SharePoint Kemenkeu) — satu tempat
  data/formats.js         daftar format dokumen per jenis rekening + grup WA
  data/site.js            peta situs, tautan JDIH, teks disclaimer
  data/content.js         data bersama (jenis RPL, jenis KKP, alur per bank)
  data/faq.jsx            seluruh pertanyaan FAQ (juga dipakai pencarian)
  data/searchIndex.js     indeks pencarian
  components/             UI dasar, kartu bank, shell (sidebar/topbar/tab bawah), pencarian
  pages/                  Beranda, Giro, Virtual, KKP, FAQ, Bantuan, Mutasi, Isu Penagihan
  styles/                 CSS murni: tokens, base, shell, components, pages
public/                   ikon PWA, favicon, robots.txt
```

### Mengubah konten

- **Ganti/tambah tautan format dokumen:** ubah `src/data/sharepoint.js`, lalu rujuk lewat `SP.namaKunci`.
- **Tambah format di halaman Format Dokumen:** tambahkan entri di `src/data/formats.js` (otomatis ikut pencarian).
- **Tambah FAQ:** tambahkan objek `{ id, q, a }` di `src/data/faq.jsx` (otomatis ikut pencarian).
- **Warna:** semua warna ada di `src/styles/tokens.css` (navy, gold, maroon, paper + mode gelap).

## Catatan privasi

`public/robots.txt` dan meta tag `noindex` di `index.html` mencegah situs diindeks mesin pencari. Ini bukan proteksi akses
(siapa pun yang punya link tetap bisa buka). Format dokumen tetap disimpan di SharePoint Kemenkeu, sehingga hanya bisa
dibuka dengan akun Kemenkeu.
