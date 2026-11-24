import { SP } from "./sharepoint.js";

// Daftar format dokumen per jenis rekening. Semua tautan tetap ke SharePoint Kemenkeu.

export const formatsGiro = [
  {
    id: "pembukaan",
    label: "Pembukaan Rekening",
    docs: [
      { nama: "Surat Permohonan Persetujuan Pembukaan Rekening", badge: "PMK-182", href: SP.permohonanPembukaanRPL },
      { nama: "Surat Kuasa Pembukaan Rekening", badge: "PMK-182" },
      { nama: "Surat Laporan Pembukaan Rekening", badge: "PMK-182", href: SP.laporanPembukaanRPL },
    ],
  },
  {
    id: "perubahan",
    label: "Perubahan & Penutupan",
    docs: [
      { nama: "Surat Permohonan Perubahan Bank Tempat Pembukaan Rekening", badge: "PMK-182", href: SP.perubahanBankRPL },
      { nama: "Surat Laporan Penutupan Rekening", badge: "PMK-182", href: SP.laporanPenutupanRPL },
    ],
  },
  {
    id: "internal",
    label: "Non-PMK — Internal",
    docs: [
      { nama: "Berita Acara Serah Terima (BAST) Akun Perbankan", badge: "NON-PMK", href: SP.bastAkunPerbankan },
      { nama: "Surat Perubahan Data Pemegang CMS (KPA/Bendahara)", badge: "NON-PMK", href: SP.perubahanDataCMS },
    ],
  },
];

export const formatsVirtual = [
  {
    id: "pembukaan",
    label: "Pembukaan Rekening",
    docs: [{ nama: "Surat Permohonan Pembukaan Rekening Satker", badge: "PMK-183", href: SP.permohonanPembukaanVA, keys: "Format IV" }],
  },
  {
    id: "perubahan",
    label: "Perubahan & Penutupan",
    docs: [
      { nama: "Surat Permohonan Perubahan Bank Tempat Rekening Dibuka", badge: "PMK-183", href: SP.perubahanBankVA, keys: "Format VIII" },
      { nama: "Laporan Pemindahbukuan Rekening Satker", badge: "PMK-183", href: SP.laporanPemindahbukuanVA, keys: "Format X" },
      { nama: "Surat Permohonan Penutupan Rekening Satker", badge: "PMK-183", href: SP.penutupanVA },
    ],
  },
  {
    id: "internal",
    label: "Non-PMK — Mutasi Pejabat",
    docs: [
      { nama: "Berita Acara Serah Terima (BAST) Akun Perbankan", badge: "NON-PMK", href: SP.bastAkunPerbankan },
      { nama: "Surat Perubahan Data Pemegang CMS & Dashboard (KPA/Bendahara)", badge: "NON-PMK", href: SP.perubahanDataCMS },
      { nama: "Surat Permohonan Penggantian Kartu Debit", badge: "NON-PMK", href: SP.penggantianKartuDebit },
    ],
  },
];

export const formatsKKP = [
  {
    id: "dasar",
    label: "Dasar Legal (5 Dokumen Wajib per ND-1951/PJ.01/2026)",
    docs: [
      {
        nama: "SK KPA tentang Daftar Pemegang KKP & Daftar Administrator KKP",
        badge: "NON-PMK",
        caption:
          "Khusus penunjukan pertama kali. Untuk perubahan berikutnya, menggunakan format SK Perubahan di kategori Perubahan & Penutupan.",
        href: SP.skKKP,
      },
      {
        nama: "Perjanjian Kerja Sama (PKS) Satker dengan Bank Penerbit KKP",
        badge: "PMK-196",
        note: "Format PKS tidak diunggah di sini — DJPb yang menetapkan formatnya dan menyalurkannya ke Bank Pusat. Satker mengajukan permintaan format tersebut kepada Bank Padanan, kemudian KPA menandatanganinya bersama bank.",
      },
      {
        nama: "Surat Permohonan Penerbitan KKP kepada Bank Penerbit (dilampiri Surat Referensi)",
        badge: "PMK-196",
        href: SP.penerbitanKKP,
      },
      {
        nama: "Surat Perjanjian Penggunaan KKP antara KPA dengan Pemegang KKP",
        badge: "PMK-196",
        hrefs: [
          { label: "KKP Belanja Operasional", url: SP.perjanjianKKPBO },
          { label: "KKP Perjalanan Dinas", url: SP.perjanjianKKPPD },
        ],
      },
      {
        nama: "Berita Acara Serah Terima (BAST) KKP antara KPA dengan Pemegang KKP",
        badge: "PMK-196",
        href: SP.bastKKP,
      },
    ],
  },
  {
    id: "perubahan",
    label: "Perubahan & Penutupan",
    docs: [
      { nama: "Format SK Perubahan Pemegang/Admin KKP", badge: "NON-PMK", href: SP.skPerubahanKKP },
      { nama: "Surat Penarikan KKP (Permohonan Penutupan, dilampiri Surat Referensi)", badge: "NON-PMK", href: SP.penarikanKKP },
    ],
  },
];

export const formatsBySection = { giro: formatsGiro, virtual: formatsVirtual, kkp: formatsKKP };

export const waGrupRekening = [
  { bank: "Bank BRI", cakupan: "Nasional", inisial: "BRI", link: SP.daftarGrupWA },
  { bank: "Bank BNI", cakupan: "Nasional", inisial: "BNI", link: SP.daftarGrupWA },
  { bank: "Bank Mandiri", cakupan: "Pulau Jawa", inisial: "MDR", link: SP.daftarGrupWA },
  { bank: "Bank Mandiri", cakupan: "Luar Pulau Jawa", inisial: "MDR", link: SP.daftarGrupWA },
  { bank: "Bank BSI", cakupan: "Nasional", inisial: "BSI", link: SP.daftarGrupWA },
];
