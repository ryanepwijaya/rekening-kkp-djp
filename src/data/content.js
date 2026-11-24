// Data konten yang dipakai di lebih dari satu halaman.

export const jenisRPL = [
  { kode: "RPL PS", nama: "Rekening Penampungan Sementara", ket: "Paling umum digunakan di DJP — menampung penerimaan dan/atau pengeluaran sementara untuk tujuan tertentu.", tampil: true },
  { kode: "PDT", nama: "Rekening Penampungan Dana Titipan", ket: "Menampung dana titipan terkait kasus hukum/sitaan.", tampil: true },
  { kode: "BLU", nama: "Rekening Milik BLU", ket: "Untuk satker berstatus Badan Layanan Umum." },
  { kode: "PWK", nama: "Rekening Milik Perwakilan RI", ket: "Khusus perwakilan RI di luar negeri." },
  { kode: "DB", nama: "Rekening Penyaluran Dana Bantuan", ket: "Menyalurkan dana bantuan ke penerima melalui bank penyalur." },
  { kode: "PDHL", nama: "Rekening Penampungan Dana Hibah Langsung", ket: "Pengelolaan hibah langsung dalam bentuk uang." },
  { kode: "PDH", nama: "Rekening Penyaluran Dana Hibah", ket: "Menyalurkan dana dari Rekening Penampungan Dana Hibah Langsung." },
  { kode: "KS", nama: "Rekening Penampungan Dana Kerjasama/Kemitraan", ket: "Menampung dana kerja sama dua pihak." },
  { kode: "PDJ", nama: "Rekening Penampungan Dana Jaminan", ket: "Menampung dana jaminan pihak ketiga yang akan dikembalikan." },
];

export const jenisKKP = [
  {
    kode: "KKP-BO",
    nama: "KKP Belanja Operasional",
    ket: "Dipegang Pejabat Pengadaan/pelaksana. Untuk belanja barang operasional (keperluan kantor, bahan makanan, dsb.) dan belanja modal. Maksimal Rp50 juta per rekanan, bisa naik sampai Rp200 juta khusus transaksi produk dalam negeri UMK melalui e-Katalog atau DIGIPay.",
  },
  {
    kode: "KKP-PD",
    nama: "KKP Perjalanan Dinas",
    ket: "Dipegang pejabat/pegawai yang menjalankan perjalanan dinas. Untuk komponen biaya perjalanan dinas seperti tiket dan hotel. Maksimal Rp20 juta per kartu.",
  },
];

// Detail alur per bank — mutasi Bendahara/KPA
export const alurBankMutasi = [
  {
    nama: "Bank BRI",
    inisial: "BRI",
    steps: [
      "KPA Satker memberitahukan ke Bank Cabang Padanan.",
      "Kirim Surat Pemberitahuan Perubahan Data Rekening — memuat data pengurus lama & baru (Nama, NIK, email, no. telepon, jabatan).",
      "Lampiri: form CMS BRI 06a & 06b, salinan identitas pengurus baru, SK/bukti penunjukan pengurus baru.",
      "Bank Cabang Padanan meneruskan ke Bank BRI Pusat.",
      "Bank BRI Pusat memproses perubahan data.",
    ],
  },
  {
    nama: "Bank Mandiri",
    inisial: "MDR",
    steps: [
      "KPA Satker memberitahukan ke Bank Cabang Padanan.",
      "Kirim Surat Pemberitahuan Perubahan Data Rekening — memuat data pengurus lama & baru.",
      "Lampiri: form perubahan MCM, salinan identitas pengurus baru, SK/bukti penunjukan.",
      "Kirim softcopy dokumen melalui email resmi ke Bank Mandiri, di-cc sesuai grup rekening satker.",
      "Bank Cabang Padanan meneruskan ke Bank Mandiri Pusat (Transaction Banking) untuk diproses.",
      "Perubahan spesimen tanda tangan default tidak diperlukan, kecuali diminta Cabang Padanan.",
    ],
  },
  {
    nama: "Bank BNI",
    inisial: "BNI",
    steps: [
      "KPA Satker memberitahukan ke Bank Cabang Padanan.",
      "Kirim Surat Pemberitahuan Perubahan Data Rekening — memuat data pengurus lama & baru.",
      "Lampiri: form BNI Direct–CEMTC–1.14, salinan identitas pengurus baru, SK/bukti penunjukan.",
      "Satker menyusun file data rekening pooling & VA sesuai format BNI (kode satker, kode KPPN, user role Bendahara/KPA, dst).",
      "Bank Cabang Padanan meneruskan ke Bank BNI Pusat u.p. Divisi Solusi Wholesale, Graha BNI Lt. 23, Jalan Jenderal Sudirman Kav. 1, Jakarta Pusat 10220.",
      "Satker mengirim softcopy dokumen ke email PIC Bank BNI Pusat yang telah ditentukan.",
      "Bank BNI memproses perubahan data.",
    ],
  },
  {
    nama: "Bank BSI",
    inisial: "BSI",
    steps: [
      "KPA Satker memberitahukan ke Bank Cabang Padanan.",
      "Kirim Surat Pemberitahuan Perubahan Data Rekening — memuat data pengurus lama & baru.",
      "Lampiri: salinan identitas pengurus baru, SK/bukti penunjukan.",
      "Bank BSI memproses perubahan user.",
    ],
  },
];
