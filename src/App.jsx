import React, { useState } from "react";
import { Landmark, Menu, X } from "lucide-react";

// ===== Design tokens =====
const c = {
  navy: "#0B2545",
  navyDeep: "#081b34",
  paper: "#F6F3EC",
  paperDim: "#EFEADD",
  gold: "#B8935A",
  goldBright: "#D4AF7A",
  maroon: "#7A2E2E",
  line: "#C9C2B4",
  ink: "#2B2B28",
  inkSoft: "#5c584f",
};

const fontDisplay = { fontFamily: "'Fraunces', serif" };
const fontMono = { fontFamily: "'IBM Plex Mono', monospace" };

// ===== Top-level pages =====
const pages = [
  { id: "home", label: "Home", eyebrow: "Beranda" },
  { id: "giro", label: "Rekening Giro", eyebrow: "Jenis Rekening · 01" },
  { id: "virtual", label: "Rekening Virtual", eyebrow: "Jenis Rekening · 02" },
  { id: "kkp", label: "Kartu Kredit", eyebrow: "Jenis Rekening · 03" },
  { id: "faq", label: "FAQ", eyebrow: "Pertanyaan Umum" },
  { id: "bantuan", label: "Bantuan", eyebrow: "Kontak & Dukungan" },
];

// ===== Sub-menus per page. Halaman yang belum punya key di sini langsung tampil Coming Soon. =====
const subMenus = {
  giro: [
    {
      id: "regulasi",
      tab: "01 · REGULASI",
      title: "Regulasi Rekening",
      desc: "Dasar hukum rekening, termasuk PMK-182/PMK.05/2017 dan penjelasannya.",
    },
    {
      id: "operasional",
      tab: "02 · OPERASIONAL",
      title: "Operasional Rekening",
      desc: "Cara pembukaan, pengoperasian, pelaporan, hingga penutupan rekening.",
    },
    {
      id: "perubahan",
      tab: "03 · PERUBAHAN",
      title: "Perubahan Rekening",
      desc: "Cara mengubah data rekening, mengubah bank pembuka, hingga akibat mutasi pejabat.",
    },
    {
      id: "format",
      tab: "04 · DOKUMEN",
      title: "Format Dokumen",
      desc: "Format dokumen yang tersedia, termasuk format PMK dan Non-PMK.",
    },
  ],
  virtual: [
    {
      id: "regulasi",
      tab: "01 · REGULASI",
      title: "Regulasi Rekening",
      desc: "Dasar hukum rekening virtual, termasuk PMK-183/PMK.05/2019 dan penjelasannya.",
    },
    {
      id: "operasional",
      tab: "02 · OPERASIONAL",
      title: "Operasional Rekening",
      desc: "Cara pembukaan, pengoperasian, penihilan saldo, hingga pelaporan.",
    },
    {
      id: "perubahan",
      tab: "03 · PERUBAHAN",
      title: "Perubahan Rekening",
      desc: "Cara mengubah bank mitra, hingga akibat mutasi pejabat.",
    },
    {
      id: "format",
      tab: "04 · DOKUMEN",
      title: "Format Dokumen",
      desc: "Format dokumen yang tersedia, termasuk format PMK dan Non-PMK.",
    },
  ],
  kkp: [
    {
      id: "regulasi",
      tab: "01 · REGULASI",
      title: "Regulasi KKP",
      desc: "Dasar hukum KKP, termasuk PMK-196/PMK.05/2018 jo. PMK-97/PMK.05/2021 dan penjelasannya.",
    },
    {
      id: "operasional",
      tab: "02 · OPERASIONAL",
      title: "Operasional KKP",
      desc: "Cara pengajuan kartu, transaksi & pembayaran, penggantian UP, hingga pelaporan.",
    },
    {
      id: "perubahan",
      tab: "03 · PERUBAHAN",
      title: "Perubahan KKP",
      desc: "Cara mengganti pemegang kartu atau Admin KKP, menaikkan limit, hingga menangani kartu hilang/rusak.",
    },
    {
      id: "format",
      tab: "04 · DOKUMEN",
      title: "Format Dokumen",
      desc: "Format dokumen yang tersedia untuk pengelolaan KKP.",
    },
  ],
};

function Eyebrow({ children, light, center }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-xs uppercase ${center ? "justify-center" : ""}`}
      style={{ ...fontMono, color: light ? c.goldBright : c.gold, letterSpacing: "0.14em" }}
    >
      <span style={{ width: 22, height: 1, background: light ? c.goldBright : c.gold, display: "inline-block" }} />
      {children}
    </p>
  );
}

function Pill({ children, tone = "maroon" }) {
  const bg = tone === "maroon" ? c.maroon : c.goldBright;
  const fg = tone === "maroon" ? c.paper : c.navyDeep;
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 text-[11px] font-semibold rounded-full"
      style={{ ...fontMono, background: bg, color: fg, letterSpacing: "0.05em" }}
    >
      {children}
    </span>
  );
}

function ComingSoon({ title, eyebrow, onBack, backLabel }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-24 flex items-center justify-center" style={{ minHeight: "50vh" }}>
      <div className="ledger-lines relative w-full max-w-xl text-center px-10 py-16" style={{ border: `1px solid ${c.line}` }}>
        <div className="absolute inset-3.5 pointer-events-none" style={{ border: `1px solid rgba(122,46,46,0.25)` }} />

        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-xs font-medium flex items-center gap-1.5 px-3 py-2"
            style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
          >
            ← {backLabel}
          </button>
        )}

        <Eyebrow center>{eyebrow}</Eyebrow>
        <h1 className="mt-5 mb-4 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
          {title}
        </h1>

        <div
          className="inline-flex items-center justify-center mx-auto my-6 rounded-full"
          style={{ width: 84, height: 84, border: `2px solid ${c.maroon}`, transform: "rotate(-8deg)" }}
        >
          <span className="text-[11px] font-semibold uppercase leading-tight" style={{ ...fontMono, color: c.maroon, letterSpacing: "0.08em" }}>
            Segera
            <br />
            Hadir
          </span>
        </div>

        <p className="text-sm max-w-sm mx-auto" style={{ color: c.inkSoft }}>
          Halaman ini sedang disusun dan akan diisi bertahap.
        </p>
      </div>
    </div>
  );
}

function LainnyaAccordion({ items }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${c.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-sm font-semibold" style={{ color: c.inkSoft }}>
          Lainnya ({items.length} jenis rekening)
        </span>
        <span
          className="text-sm transition-transform"
          style={{ color: c.maroon, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="flex flex-col">
          {items.map((j) => (
            <div key={j.kode} className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 sm:gap-6 px-5 pb-5" style={{ paddingTop: 4 }}>
              <div>
                <span
                  className="inline-block text-xs px-2 py-1"
                  style={{ ...fontMono, color: c.gold, background: c.navy, letterSpacing: "0.08em" }}
                >
                  {j.kode}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{j.nama}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{j.ket}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Konten Regulasi Rekening (RPL) — POV Satker, PMK-182/PMK.05/2017 =====
const jenisRPL = [
  { kode: "RPL PS", nama: "Rekening Penampungan Sementara", ket: "Paling umum dipakai di DJP — menampung penerimaan dan/atau pengeluaran sementara untuk tujuan tertentu.", tampil: true },
  { kode: "PDT", nama: "Rekening Penampungan Dana Titipan", ket: "Menampung dana titipan terkait kasus hukum/sitaan.", tampil: true },
  { kode: "BLU", nama: "Rekening Milik BLU", ket: "Untuk satker berstatus Badan Layanan Umum." },
  { kode: "PWK", nama: "Rekening Milik Perwakilan RI", ket: "Khusus perwakilan RI di luar negeri." },
  { kode: "DB", nama: "Rekening Penyaluran Dana Bantuan", ket: "Menyalurkan dana bantuan ke penerima melalui bank penyalur." },
  { kode: "PDHL", nama: "Rekening Penampungan Dana Hibah Langsung", ket: "Pengelolaan hibah langsung dalam bentuk uang." },
  { kode: "PDH", nama: "Rekening Penyaluran Dana Hibah", ket: "Menyalurkan dana dari Rekening Penampungan Dana Hibah Langsung." },
  { kode: "KS", nama: "Rekening Penampungan Dana Kerjasama/Kemitraan", ket: "Menampung dana kerja sama dua pihak." },
  { kode: "PDJ", nama: "Rekening Penampungan Dana Jaminan", ket: "Menampung dana jaminan pihak ketiga yang akan dikembalikan." },
];

function IsuTerkiniPenagihanPage({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Home
      </button>

      <Eyebrow>Isu Rekening Terkini</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        RPL PS Penagihan — Boleh Dibuka Sesuai Kebutuhan!
      </h1>
      <p className="text-sm mb-8" style={{ ...fontMono, color: c.inkSoft }}>Berlaku khusus Unit Vertikal — Kanwil & KPP</p>

      {/* Latar belakang */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Latar Belakang</h2>
        <p className="text-sm mb-3" style={{ color: c.inkSoft }}>
          Tindakan penagihan pajak seringkali menghasilkan suatu penjualan — tindak lanjut atas penjualan
          barang sitaan, baik secara lelang maupun penjualan selain lelang. Sebelum uang hasil penjualan
          tersebut disetor ke Kas Negara, dana ini perlu tempat penyimpanan sementara.
        </p>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>Bukan</strong> di rekening pribadi Juru Sita, dan <strong style={{ color: c.ink }}>bukan</strong> di
          rekening operasional kantor/Bendahara — melainkan di <strong style={{ color: c.ink }}>Rekening Penampungan
          Sementara (RPL PS)</strong> sesuai PMK-182/PMK.05/2017.
        </p>
      </section>

      {/* Data kinerja */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Data Kinerja Penagihan</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>Diolah dari Dit. P2, per akhir 2023.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.navy }}>
            <p className="text-3xl font-semibold mb-1" style={{ ...fontDisplay, color: c.goldBright }}>~101 M</p>
            <p className="text-sm" style={{ color: "#C7CCD9" }}>Rata-rata nilai rupiah penjualan barang sitaan per tahun.</p>
          </div>
          <div className="p-6" style={{ background: c.maroon }}>
            <p className="text-3xl font-semibold mb-1" style={{ ...fontDisplay, color: c.paper }}>60 / 391</p>
            <p className="text-sm" style={{ color: "#F0D9D9" }}>KPP yang baru memiliki rekening penampungan untuk penagihan (hingga akhir 2023).</p>
          </div>
        </div>
        <p className="text-xs mt-3" style={{ color: c.inkSoft }}>
          Kesenjangan ini yang jadi alasan satker perlu tahu: membuka RPL PS untuk Penagihan itu boleh dan bisa
          dilakukan sesuai kebutuhan kantor masing-masing.
        </p>
      </section>

      {/* Kolaborasi */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Kolaborasi 3 Pihak</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Berkolaborasi dengan baik antara 3 pihak ini penting: soal siapa pemilik rekening, siapa yang kasih
          info transaksi, dan siapa yang eksekusi dana.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">KPA</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Kepala Kantor selaku Kuasa Pengguna Anggaran — <strong style={{ color: c.ink }}>pemilik rekening</strong>.</p>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Penagihan</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Kepala Seksi P3, Juru Sita, dan/atau Pelaksana — <strong style={{ color: c.ink }}>memberikan informasi</strong> adanya penjualan.</p>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Bendahara</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Melakukan <strong style={{ color: c.ink }}>eksekusi dana</strong> sesuai petunjuk dari Penagihan dengan persetujuan KPA.</p>
          </div>
        </div>
      </section>

      {/* Alur pembukaan */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Alur Pembukaan</h2>
        <div className="flex flex-col">
          {[
            { no: "1", t: "Surat Permohonan ke KPPN", d: "Bendahara membuat surat permohonan izin pembukaan rekening ke KPPN mitra, ditandatangani Kepala Kantor selaku KPA." },
            { no: "2", t: "Surat Izin dari KPPN", d: "Setelah izin diberikan, surat izin dari KPPN tersebut berlaku selama 15 hari." },
            { no: "3", t: "Proses Pembukaan ke Bank", d: "Bendahara membuka rekening ke Bank Cabang yang dituju (Bank Mandiri, BRI, BNI, atau BSI). Proses pembukaan mengikuti ketentuan perbankan." },
          ].map((s) => (
            <div key={s.no} className="flex gap-5 p-5" style={{ borderTop: `1px solid ${c.line}` }}>
              <span className="flex-shrink-0 flex items-center justify-center text-sm font-semibold" style={{ width: 32, height: 32, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}>{s.no}</span>
              <div>
                <p className="text-sm font-semibold mb-1">{s.t}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: c.inkSoft }}>Seksi P3 dapat memberikan rekomendasi Bank tempat rekening dibuka. Setelah dibuka, rekening disampaikan ke KPKNL atau institusi terkait.</p>
      </section>

      {/* Ketentuan rekening */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Ketentuan Rekening</h2>
        <div className="flex flex-col gap-4">
          {[
            ["Jenis Rekening", "Dibuka dengan jenis Rekening Lainnya (RPL) untuk Penampungan Sementara (PS)."],
            ["Treasury National Pooling (TNP)", "Rekening RPL PS didaftarkan sebagai TNP dan bebas biaya/pajak sebagaimana ketentuan Rekening Pemerintah."],
            ["Masa Aktif", "Bendahara menyampaikan ke Bank agar rekening tidak ditutup otomatis apabila tidak ada transaksi."],
            ["Tidak Boleh Dobel dengan RPL PS Tukin", "Tidak diperkenankan menggunakan RPL PS Tukin untuk Penagihan. Harus buka/pakai RPL PS khusus Penagihan — prinsipnya, 1 rekening 1 tujuan penggunaan."],
            ["Internet Banking", "Sangat direkomendasikan untuk dimintakan akun internet banking ke Bank Cabang."],
          ].map(([t, d], i) => (
            <div key={i} className="p-5" style={{ border: `1px solid ${c.line}` }}>
              <p className="text-sm font-semibold mb-1.5">{t}</p>
              <p className="text-sm" style={{ color: c.inkSoft }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pengoperasian: Kredit & Debit */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Pengoperasian</h2>

        <div className="mb-8">
          <p className="text-sm font-semibold mb-3" style={{ color: c.maroon }}>Kredit — Apabila Terdapat Uang Masuk</p>
          <div className="flex items-center gap-2 flex-wrap mb-4 p-5" style={{ background: c.paperDim }}>
            {["KPKNL/LJK", "Seksi P3", "ND Pengkreditan", "KPA (cc Bendahara)", "Pencatatan SAKTI"].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span className="text-xs px-3 py-2" style={{ ...fontMono, background: c.navy, color: c.goldBright }}>{s}</span>
                {i < arr.length - 1 && <span style={{ color: c.maroon }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm" style={{ color: c.inkSoft }}>
            Hasil penjualan barang sitaan, oleh Kepala Seksi P3 diberitahukan kepada KPA dengan tembusan
            Bendahara, menggunakan Nota Dinas internal. Bendahara mencatat uang masuk pada Aplikasi SAKTI.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: c.maroon }}>Debit — Penyetoran atas Hasil</p>
          <div className="flex items-center gap-2 flex-wrap mb-4 p-5" style={{ background: c.paperDim }}>
            {["Seksi P3 (hitung)", "ND ke KPA (cc Bendahara)", "Pendebitan Rekening", "Pencatatan SAKTI"].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span className="text-xs px-3 py-2" style={{ ...fontMono, background: c.navy, color: c.goldBright }}>{s}</span>
                {i < arr.length - 1 && <span style={{ color: c.maroon }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
            Seksi P3 melakukan perhitungan serta pengalokasian atas hasil penjualan barang sitaan untuk:
            pembayaran Utang Pajak, pembayaran Biaya Penagihan Pajak, dan/atau pengembalian kelebihan hasil
            penjualan kepada Penanggung Pajak. Kepala Seksi P3 mengirimkan Nota Dinas berisi detail tujuan
            penyaluran dana kepada KPA (tembusan Bendahara), lalu Bendahara melakukan pendebitan.
          </p>
          <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.inkSoft, letterSpacing: "0.08em" }}>Dokumen Pendukung Pendebitan</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
            <div className="p-4" style={{ background: c.paper }}>
              <p className="text-sm font-semibold mb-1">ID Billing</p>
              <p className="text-xs" style={{ color: c.inkSoft }}>Dalam rangka pembayaran utang pajak ke Kas Negara.</p>
            </div>
            <div className="p-4" style={{ background: c.paper }}>
              <p className="text-sm font-semibold mb-1">SSBP</p>
              <p className="text-xs" style={{ color: c.inkSoft }}>Dalam rangka pembayaran Biaya Penagihan.</p>
            </div>
            <div className="p-4" style={{ background: c.paper }}>
              <p className="text-sm font-semibold mb-1">Rekening Lain</p>
              <p className="text-xs" style={{ color: c.inkSoft }}>Apabila ada kelebihan yang perlu dikembalikan ke Penanggung Pajak.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Penyetoran akhir tahun */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-5" style={fontDisplay}>Penyetoran Akhir Tahun</h2>
        <div className="flex gap-4 p-6 mb-4" style={{ background: c.maroon, boxShadow: `0 0 0 3px ${c.gold}` }}>
          <span className="text-lg leading-none flex-shrink-0" style={{ color: c.goldBright }}>★</span>
          <p className="text-sm font-semibold" style={{ color: c.paper }}>
            Seluruh hasil penjualan wajib disetor (rekening dikosongkan) paling lambat 31 Desember setiap tahun.
          </p>
        </div>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Dalam hal tidak dapat dilakukan penyetoran, Kepala Seksi P3 membuat Berita Acara berisi penjelasan
          mengenai tidak dapat dilakukannya penyetoran, dilaporkan kepada Kepala KPP dan Kepala Subbagian Umum
          dan Kepatuhan Internal. Berita Acara ini digunakan sebagai dokumen pendukung Catatan atas Laporan
          Keuangan (CALK).
        </p>
      </section>

      {/* Administrasi */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Administrasi & Pelaporan</h2>
        <div className="flex flex-col gap-4">
          {[
            ["Laporan Rekening ke KPA", "Seksi P3 menyampaikan daftar transaksi ke Kepala Kantor selaku KPA."],
            ["Rekonsiliasi Transaksi", "Bendahara melakukan pencocokan laporan dari Seksi P3 dengan rekening koran."],
            ["Laporan ke KPPN", "Bendahara menyampaikan rekening dalam Laporan Pertanggungjawaban (LPJ) Bendahara."],
          ].map(([t, d], i) => (
            <div key={i} className="p-5" style={{ border: `1px solid ${c.line}` }}>
              <p className="text-sm font-semibold mb-1.5">{t}</p>
              <p className="text-sm" style={{ color: c.inkSoft }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ketentuan penutup */}
      <section>
        <h2 className="text-xl font-semibold mb-5" style={fontDisplay}>Ketentuan Penutup</h2>
        <div className="flex flex-col gap-3">
          <p className="text-sm" style={{ color: c.inkSoft }}>
            RPL PS yang telah dibuka oleh KPA dengan tujuan penampungan dana atas tindakan penagihan pajak
            (bukan penampungan Tukin) <strong style={{ color: c.ink }}>tidak perlu ditutup</strong> dan dapat tetap
            digunakan sebagaimana mestinya.
          </p>
          <p className="text-sm" style={{ color: c.inkSoft }}>
            Pengoperasian dan pelaporan RPL PS yang telah dan akan dibuka, mengikuti ketentuan PMK-182/PMK.05/2017.
          </p>
          <p className="text-sm" style={{ color: c.inkSoft }}>
            Kolaborasi dalam rangka penggunaan rekening mengikuti ketentuan di masing-masing kantor. Pemberitahuan
            adanya pengkreditan (uang masuk) dan pelaksanaan pendebitan (uang keluar) diharapkan dapat disampaikan
            melalui Nota Dinas oleh Seksi P3, sebagai dasar Bendahara melakukan transaksi dan dokumen pendukung
            dalam Laporan Pertanggungjawaban Bendahara.
          </p>
        </div>
      </section>

      <p className="text-xs mt-10" style={{ ...fontMono, color: c.inkSoft }}>
        Sumber: Bimtek Penagihan Pajak (Bandung, 21–22 Agustus 2024) — Bagian Keuangan Sekretariat DJP.
      </p>
    </div>
  );
}

function RegulasiRekeningContent({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Giro
      </button>

      <Eyebrow>Rekening Giro · 01</Eyebrow>
      <h1 className="mt-3 mb-5 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Regulasi Rekening
      </h1>

      {/* Download PMK-182 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-7 mb-12" style={{ background: c.navy }}>
        <div>
          <p className="text-xs uppercase mb-2" style={{ ...fontMono, color: c.gold, letterSpacing: "0.12em" }}>
            Buka Peraturan
          </p>
          <p className="text-sm max-w-xl" style={{ color: "#D9DEE8" }}>
            Naskah lengkap <strong style={{ color: c.paper }}>PMK-182/PMK.05/2017</strong> tentang Pengelolaan
            Rekening Milik Satuan Kerja Lingkup Kementerian Negara/Lembaga — dasar hukum pengelolaan RPL yang
            dibahas di halaman ini.
          </p>
        </div>
        <a
          href="https://jdih.kemenkeu.go.id/dok/182-pmk-05-2017"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold flex-shrink-0"
          style={{ background: c.goldBright, color: c.navyDeep }}
        >
          Buka PMK-182/PMK.05/2017 di JDIH ↗
        </a>
      </div>

      {/* Dasar hukum */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Dasar Hukum</h2>
        <p className="text-sm mb-3" style={{ color: c.inkSoft }}>
          PMK-182/PMK.05/2017 mengatur pengelolaan rekening milik satuan kerja K/L, menggantikan
          PMK-252/PMK.05/2014. Berlaku sejak 1 Januari 2018.
        </p>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Sebagai satker, yang perlu diketahui: rekening dikelompokkan menjadi Rekening Penerimaan, Rekening
          Pengeluaran (termasuk Pengeluaran Pembantu), dan <strong style={{ color: c.ink }}>Rekening Lainnya (RPL)</strong>.
          Dua kelompok pertama kini mengikuti skema Rekening Virtual di aturan terbaru — jadi PMK-182 ini
          praktiknya jadi acuan utama untuk RPL.
        </p>
      </section>

      {/* Jenis RPL */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Jenis-Jenis Rekening Lainnya (RPL)</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          RPL PS dan PDT paling sering dipakai di DJP — 7 jenis RPL lainnya bisa dibuka lewat "Lainnya" di bawah.
        </p>
        <div className="flex flex-col" style={{ border: `1px solid ${c.line}` }}>
          {/* RPL PS & PDT — selalu terbuka, paling sering dipakai di DJP */}
          {jenisRPL.filter((j) => j.tampil).map((j, i) => (
            <div
              key={j.kode}
              className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 sm:gap-6 p-5"
              style={{ background: c.paperDim, borderTop: i === 0 ? "none" : `1px solid ${c.line}` }}
            >
              <div>
                <span
                  className="inline-block text-xs px-2 py-1"
                  style={{ ...fontMono, color: c.paper, background: c.maroon, letterSpacing: "0.08em" }}
                >
                  {j.kode}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{j.nama}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{j.ket}</p>
              </div>
            </div>
          ))}

          {/* Sisanya — satu accordion "Lainnya" biar halaman gak penuh */}
          <LainnyaAccordion items={jenisRPL.filter((j) => !j.tampil)} />
        </div>
      </section>

      {/* Contoh RPL nyata di DJP */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-5" style={fontDisplay}>Contoh RPL yang Ada di DJP</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 p-4" style={{ border: `1px solid ${c.line}` }}>
            <Pill>WAJIB</Pill>
            <p className="text-sm pt-1" style={{ color: c.ink }}>
              <strong>RPL untuk Tukin</strong> — beda dari RPL lainnya yang sifatnya opsional, RPL Tukin ini
              wajib ada di satker.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4" style={{ border: `1px solid ${c.line}` }}>
            <Pill tone="gold">OPSIONAL</Pill>
            <p className="text-sm pt-1" style={{ color: c.ink }}>
              <strong>RPL untuk hasil lelang</strong> — dibuka sesuai kebutuhan, apabila satker memiliki
              kegiatan lelang.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4" style={{ border: `1px solid ${c.line}` }}>
            <Pill tone="gold">OPSIONAL</Pill>
            <p className="text-sm pt-1" style={{ color: c.ink }}>
              <strong>RPL Penagihan</strong> — dibuka sesuai kebutuhan, apabila satker memiliki kegiatan
              penagihan.
            </p>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: c.inkSoft }}>
          Dalam satu satker, boleh memiliki banyak rekening RPL sesuai peruntukannya masing-masing.
        </p>
      </section>

      {/* Kewenangan satker */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Siapa di Satker yang Berwenang</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">KPA (Kuasa Pengguna Anggaran)</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Pemegang kewenangan utama pengelolaan rekening — pembukaan, pengoperasian, penutupan, dan
              pelaporan ke Kuasa BUN Daerah (KPPN mitra kerja).
            </p>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Kepala Satker / Pimpinan BLU</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Mengambil alih kewenangan khusus untuk RPL tertentu (Rekening Milik BLU, Dana Jaminan, Dana
              Titipan, Penampungan Sementara/RPL PS) apabila kewenangan tidak dapat dilakukan oleh KPA.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== Konten Operasional Rekening (RPL) — POV Satker =====
const faseOperasional = [
  {
    no: "01",
    title: "Pembukaan Rekening",
    summary: "Ajukan permohonan ke KPPN mitra kerja sebelum rekening bisa dipakai.",
    points: [
      <><strong style={{ color: c.ink }}>Ajukan surat permohonan persetujuan pembukaan Rekening ke KPPN mitra kerja</strong> — cantumkan tujuan penggunaan, sumber dana, mekanisme penyaluran dana, dan perlakuan bunga/jasa giro. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDDoGC0asNATY8hdwYT8bbWAUuzN3rKYNUFrcg9LLhg2QY?e=19NROY" tone="dark">Buka format surat permohonan</InlineDocLink></>,
      "Lampirkan surat kuasa dari KPA.",
      "KPPN menerbitkan persetujuan atau penolakan paling lambat 5 hari kerja. Surat persetujuan berlaku 15 hari kerja.",
      "Buka rekening di bank dengan format nama sesuai ketentuan (contoh untuk RPL PS: \"RPL (kode KPPN) PS (nama satker) untuk ...\").",
      <><strong style={{ color: c.ink }}>Sampaikan laporan pembukaan rekening ke KPPN</strong> paling lambat 20 hari kerja sejak surat persetujuan terbit. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDwl5i-ObDOTra66gcP5pVIAXH6Cx8-yX2UlE1tRXKO_GI?e=SffUsm" tone="dark">Buka format laporan</InlineDocLink></>,
    ],
    superHighlight:
      "Bendahara WAJIB mendaftarkan dan/atau melakukan pemutakhiran data Rekening Penampungan Sementara pada Sistem Informasi Keuangan, Kepegawaian, dan Aktiva (SIKKA).",
  },
  {
    no: "02",
    title: "Operasional Harian",
    summary: "Cara mendebit, mencatat, dan mengelola bunga/jasa giro rekening.",
    points: [
      "Pendebitan dilakukan lewat internet banking, atau lewat cek/bilyet giro. RPL tidak menerbitkan kartu debit — beda dari Rekening Virtual.",
      "Bendahara satker wajib membukukan dan mempertanggungjawabkan seluruh dana yang ada di rekening.",
      <>Bunga/jasa giro: jika rekening sudah ikut program TNP, penyetoran dikonsolidasikan otomatis. Jika belum ikut TNP, satker menyetorkan sendiri ke Kas Negara setiap akhir bulan. <strong style={{ color: c.maroon }}>Sangat dianjurkan mendaftarkan rekening ke program TNP</strong> untuk memudahkan pengelolaan.</>,
    ],
  },
  {
    no: "03",
    title: "Pelaporan Saldo",
    summary: "Wajib lapor saldo rekening ke KPPN setiap bulan.",
    points: [
      "Laporkan saldo seluruh rekening yang dikelola setiap bulan ke KPPN mitra kerja, paling lambat tanggal 10 bulan berikutnya.",
      "Jika tanggal 10 jatuh pada hari libur, laporan disampaikan pada hari kerja sebelumnya.",
      "Laporan saldo ini bisa dilampirkan pada Laporan Pertanggungjawaban (LPJ) Bendahara bulanan.",
      "Satker perlu siap saat KPPN melakukan rekonsiliasi data rekening secara berkala — pastikan kode satker, nomor rekening, nama rekening, dan nama bank selalu sesuai catatan KPPN.",
    ],
  },
  {
    no: "04",
    title: "Penutupan Rekening",
    summary: "Kapan rekening wajib ditutup dan apa yang perlu dilaporkan.",
    points: [
      "Rekening dikategorikan pasif jika tidak ada transaksi debit maupun kredit selama 1 tahun sejak transaksi terakhir.",
      "KPPN akan mengirim surat pemberitahuan rekening pasif 6 bulan sebelum batas waktu penutupan.",
      "Satker wajib menutup rekening yang sudah tidak sesuai tujuan penggunaannya dan memindahkan saldonya ke Kas Negara.",
      <>Sampaikan laporan penutupan rekening ke KPPN paling lambat 5 hari kerja setelah tanggal penutupan, dilampiri bukti penutupan dan bukti pemindahbukuan/setor ke Kas Negara. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBLxADlMoF8R4Z4aR_gLFV8AaR-prjccxNwXFa7yQymbno?e=kRD5aG" tone="dark">Buka format laporan</InlineDocLink></>,
    ],
  },
];

function PhaseAccordion({ fase }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${c.line}`, borderTop: "none" }} className="first:border-t">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-5 p-6 text-left" style={{ background: open ? c.paperDim : c.paper }}>
        <span
          className="text-xs flex-shrink-0 pb-1"
          style={{ ...fontMono, color: c.inkSoft, borderBottom: `2px solid ${c.gold}`, letterSpacing: "0.1em" }}
        >
          {fase.no}
        </span>
        <div className="flex-1">
          <p className="text-base font-semibold" style={fontDisplay}>{fase.title}</p>
          <p className="text-sm" style={{ color: c.inkSoft }}>{fase.summary}</p>
        </div>
        <span className="text-sm flex-shrink-0 transition-transform" style={{ color: c.maroon, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▾
        </span>
      </button>
      {open && (
        <div className="px-6 pb-7" style={{ paddingLeft: "calc(1.5rem + 42px)" }}>
          <ul className="flex flex-col gap-3">
            {fase.points.map((pt, i) => (
              <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {fase.docButton}

          {fase.superHighlight && (
            <div
              className="flex gap-4 p-5 mt-6"
              style={{ background: c.maroon, boxShadow: `0 0 0 3px ${c.gold}` }}
            >
              <span className="text-lg leading-none flex-shrink-0" style={{ color: c.goldBright }}>★</span>
              <p className="text-sm font-semibold" style={{ color: c.paper }}>{fase.superHighlight}</p>
            </div>
          )}

          {fase.extra}
        </div>
      )}
    </div>
  );
}

function DocJumpButton({ onClick, label }) {
  if (!onClick) return null;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold mt-5"
      style={{ ...fontMono, border: `1px solid ${c.maroon}`, color: c.maroon, letterSpacing: "0.03em" }}
    >
      ⬇ {label || "Lihat di Format Dokumen"}
    </button>
  );
}

function InlineDocLink({ href, onClick, children, tone = "light" }) {
  const style = {
    color: tone === "light" ? c.goldBright : c.maroon,
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    textUnderlineOffset: "3px",
    fontWeight: 600,
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
  };
  if (onClick) {
    return (
      <button onClick={onClick} className="whitespace-nowrap" style={style}>
        {children} ↗
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap" style={style}>
      {children} ↗
    </a>
  );
}

function OperasionalRekeningContent({ onBack, onGoToFormat }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Giro
      </button>

      <Eyebrow>Rekening Giro · 02</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Operasional Rekening
      </h1>
      <p className="text-sm mb-10 max-w-2xl" style={{ color: c.inkSoft }}>
        Empat fase siklus hidup Rekening Lainnya (RPL), dari sudut pandang satker sebagai pengguna rekening.
        Klik tiap fase untuk lihat detailnya.
      </p>

      <div className="flex flex-col">
        {faseOperasional.map((fase) => (
          <PhaseAccordion key={fase.no} fase={fase} />
        ))}
      </div>
    </div>
  );
}

// ===== Konten Perubahan Rekening (RPL) — POV Satker =====
const jenisPerubahan = [
  {
    id: "nama",
    badge: "PMK-182",
    title: "Perubahan Nama Rekening",
    summary: "Karena perubahan nomenklatur satker, tanpa mengubah tujuan penggunaan rekening.",
    steps: [
      "Satker mengajukan permohonan persetujuan perubahan nama Rekening ke KPPN mitra kerja.",
      "KPPN menerbitkan Surat Perubahan Nama Rekening yang ditujukan ke bank tempat rekening dibuka.",
      "Bank mengubah nama rekening dan menyampaikan pemberitahuan perubahan ke KPPN dan satker.",
    ],
  },
  {
    id: "bank",
    badge: "PMK-182",
    title: "Perubahan Bank Tempat Pembukaan",
    summary: "Memindahkan rekening ke bank lain — tidak bisa diajukan secara kolektif.",
    steps: [
      <>Satker (KPA) mengajukan Surat Permohonan Persetujuan Perubahan Bank Tempat Pembukaan Rekening, dilampiri surat kuasa, ke KPPN mitra kerja. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQAEYXeWAHmCRrK0Pw4Yroj1AXOkA893qBL4MchHJEGjbr4?e=z92hGA" tone="dark">Buka format surat permohonan</InlineDocLink></>,
      "KPPN menerbitkan Surat Persetujuan Perubahan Bank Tempat Pembukaan Rekening apabila permohonan disetujui.",
      "Satker membuka rekening baru di bank tujuan berdasarkan surat persetujuan tersebut.",
      "Satker memindahkan seluruh saldo dari rekening lama ke rekening baru.",
      "Satker menutup rekening lama.",
      "Satker melaporkan penutupan rekening lama dan pembukaan rekening baru ke KPPN.",
    ],
    superHighlight:
      "Bendahara WAJIB mendaftarkan dan/atau melakukan pemutakhiran data Rekening Penampungan Sementara pada Sistem Informasi Keuangan, Kepegawaian, dan Aktiva (SIKKA).",
  },
  {
    id: "mutasi",
    badge: "NON-PMK · INTERNAL",
    title: "Perubahan karena Mutasi Pejabat",
    summary: "Serah terima akun perbankan saat pejabat pemegang rekening berganti.",
    steps: [
      <>Satker membuat Berita Acara Serah Terima (BAST) Akun Perbankan antara pejabat lama (PIHAK PERTAMA) dan pejabat baru (PIHAK KEDUA), memuat rincian akun yang diserahterimakan — nomor & nama rekening dan akses Cash Management System (CMS). BAST ditandatangani PIHAK KEDUA setelah SK penunjukan resmi terbit, dan diketahui oleh atasan (Kasubbag Keuangan/pejabat setara eselon IV). <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDUnTA1skPpQYHxNDkvC9xCAeRXR_fwktLP_LPEHlziWIk?e=3PkRTY" tone="dark">Buka format BAST</InlineDocLink></>,
      <>Satker mengajukan surat permohonan perubahan data pemegang user CMS ke bank yang bersangkutan (merujuk PMK-182/PMK.05/2017) — mencantumkan data satker (nama & kode satker, nomor & nama rekening) serta detail data KPA dan Bendahara Pengeluaran yang baru (nama, NIP, No. KTP, No. HP, email). <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBXWDXnDcMZQ4UA2TfJIW1fATPOCPQN1WiP2Zu_YzMLkfg?e=fiVliU" tone="dark">Buka format surat perubahan data</InlineDocLink></>,
      "Prosedur selanjutnya mengikuti ketentuan masing-masing bank — formulir, salinan dokumen identitas, dan persyaratan lain sesuai kebijakan bank yang bersangkutan.",
    ],
    superHighlight: "Satker WAJIB membuat Berita Acara Serah Terima (BAST) Akun Perbankan setiap kali terjadi mutasi pejabat pemegang akun.",
  },
];

function StepAccordion({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${c.line}`, borderTop: "none" }} className="first:border-t">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-5 p-6 text-left" style={{ background: open ? c.paperDim : c.paper }}>
        <span
          className="text-[10px] flex-shrink-0 px-2 py-1"
          style={{ ...fontMono, color: c.paper, background: item.id === "mutasi" ? c.maroon : c.navy, letterSpacing: "0.06em" }}
        >
          {item.badge}
        </span>
        <div className="flex-1">
          <p className="text-base font-semibold" style={fontDisplay}>{item.title}</p>
          <p className="text-sm" style={{ color: c.inkSoft }}>{item.summary}</p>
        </div>
        <span className="text-sm flex-shrink-0 transition-transform" style={{ color: c.maroon, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▾
        </span>
      </button>
      {open && (
        <div className="px-6 pb-7" style={{ paddingLeft: "calc(1.5rem + 42px)" }}>
          <ol className="flex flex-col gap-4">
            {item.steps.map((st, i) => (
              <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                <span
                  className="flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                  style={{ width: 22, height: 22, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}
                >
                  {i + 1}
                </span>
                <span className="pt-0.5">{st}</span>
              </li>
            ))}
          </ol>

          {item.docButton}

          {item.onOpenDetail && (
            <button
              onClick={item.onOpenDetail}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold mt-6"
              style={{ background: c.maroon, color: c.paper }}
            >
              📖 Lihat Panduan Lengkap Mutasi Pejabat →
            </button>
          )}

          {item.superHighlight && (
            <div className="flex gap-4 p-5 mt-6" style={{ background: c.maroon, boxShadow: `0 0 0 3px ${c.gold}` }}>
              <span className="text-lg leading-none flex-shrink-0" style={{ color: c.goldBright }}>★</span>
              <p className="text-sm font-semibold" style={{ color: c.paper }}>{item.superHighlight}</p>
            </div>
          )}

          {item.extra}
        </div>
      )}
    </div>
  );
}

function MiniBankAccordion({ bank }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${c.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3.5 text-left">
        <span className="text-sm font-semibold">{bank.nama}</span>
        <span className="text-xs transition-transform" style={{ color: c.maroon, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </button>
      {open && (
        <ol className="flex flex-col gap-2.5 pb-4">
          {bank.steps.map((st, i) => (
            <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
              <span
                className="flex-shrink-0 flex items-center justify-center text-[11px] font-semibold"
                style={{ width: 18, height: 18, border: `1px solid ${c.gold}`, color: c.inkSoft, ...fontMono, marginTop: 1 }}
              >
                {i + 1}
              </span>
              <span>{st}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function PerubahanRekeningContent({ onBack, onOpenMutasiDetail, onGoToFormat }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Giro
      </button>

      <Eyebrow>Rekening Giro · 03</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Perubahan Rekening
      </h1>
      <p className="text-sm mb-8 max-w-2xl" style={{ color: c.inkSoft }}>
        Tiga jenis perubahan yang paling sering dihadapi satker. Klik tiap jenis untuk lihat langkah-langkahnya.
      </p>

      <div className="flex gap-4 p-5 mb-10" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
        <span className="text-base leading-none flex-shrink-0" style={{ color: c.maroon }}>ℹ</span>
        <p className="text-sm" style={{ color: c.ink }}>
          Untuk perubahan bank tempat pembukaan rekening, satker dapat memindahkan Rekening Lainnya (RPL) ke
          salah satu dari <strong>4 bank mitra kerja sama pengelolaan rekening</strong>: Bank Mandiri, Bank BRI,
          Bank BNI, dan Bank BSI.
        </p>
      </div>

      <div className="flex flex-col">
        {jenisPerubahan.map((item) => (
          <StepAccordion
            key={item.id}
            item={{
              ...item,
              onOpenDetail: item.id === "mutasi" ? onOpenMutasiDetail : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ===== Konten Format Dokumen (RPL) — POV Satker =====
const kategoriDokumen = [
  {
    id: "pembukaan",
    label: "Pembukaan Rekening",
    docs: [
      { nama: "Surat Permohonan Persetujuan Pembukaan Rekening", badge: "PMK-182", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDDoGC0asNATY8hdwYT8bbWAUuzN3rKYNUFrcg9LLhg2QY?e=19NROY" },
      { nama: "Surat Kuasa Pembukaan Rekening", badge: "PMK-182" },
      { nama: "Surat Laporan Pembukaan Rekening", badge: "PMK-182", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDwl5i-ObDOTra66gcP5pVIAXH6Cx8-yX2UlE1tRXKO_GI?e=SffUsm" },
    ],
  },
  {
    id: "perubahan",
    label: "Perubahan & Penutupan",
    docs: [
      { nama: "Surat Permohonan Perubahan Bank Tempat Pembukaan Rekening", badge: "PMK-182", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQAEYXeWAHmCRrK0Pw4Yroj1AXOkA893qBL4MchHJEGjbr4?e=z92hGA" },
      { nama: "Surat Laporan Penutupan Rekening", badge: "PMK-182", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBLxADlMoF8R4Z4aR_gLFV8AaR-prjccxNwXFa7yQymbno?e=kRD5aG" },
    ],
  },
  {
    id: "internal",
    label: "Non-PMK — Internal",
    docs: [
      { nama: "Berita Acara Serah Terima (BAST) Akun Perbankan", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDUnTA1skPpQYHxNDkvC9xCAeRXR_fwktLP_LPEHlziWIk?e=3PkRTY" },
      { nama: "Surat Perubahan Data Pemegang CMS (KPA/Bendahara)", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBXWDXnDcMZQ4UA2TfJIW1fATPOCPQN1WiP2Zu_YzMLkfg?e=fiVliU" },
    ],
  },
];

function DocCard({ doc }) {
  return (
    <div className="flex flex-col gap-4 p-6" style={{ border: `1px solid ${c.line}`, background: c.paper }}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-block text-[10px] px-2 py-1 flex-shrink-0"
          style={{ ...fontMono, color: c.paper, background: doc.badge === "NON-PMK" ? c.maroon : c.navy, letterSpacing: "0.06em" }}
        >
          {doc.badge}
        </span>
      </div>
      <p className="text-sm font-semibold flex-1" style={{ minHeight: 40 }}>{doc.nama}</p>
      {doc.caption && (
        <p className="text-xs -mt-2" style={{ color: c.maroon, fontStyle: "italic" }}>
          {doc.caption}
        </p>
      )}
      {doc.hrefs ? (
        <div className="flex gap-2 flex-wrap">
          {doc.hrefs.map((h, i) => (
            <a
              key={i}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold"
              style={{ background: c.goldBright, color: c.navyDeep }}
            >
              Buka {h.label} ↗
            </a>
          ))}
        </div>
      ) : doc.href ? (
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold self-start"
          style={{ background: c.goldBright, color: c.navyDeep }}
        >
          Buka di SharePoint ↗
        </a>
      ) : doc.note ? (
        <p className="text-xs" style={{ ...fontMono, color: c.inkSoft, lineHeight: 1.5 }}>
          {doc.note}
        </p>
      ) : (
        <span
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold self-start"
          style={{ ...fontMono, color: c.inkSoft, border: `1px dashed ${c.line}` }}
        >
          Segera Tersedia
        </span>
      )}
    </div>
  );
}

function FormatDokumenContent({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Giro
      </button>

      <Eyebrow>Rekening Giro · 04</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Format Dokumen
      </h1>
      <p className="text-sm mb-12 max-w-2xl" style={{ color: c.inkSoft }}>
        Format surat untuk pengelolaan Rekening Lainnya (RPL), tersedia di SharePoint Kemenkeu — klik untuk
        membuka, tinggal isi data satker dan kirim.
      </p>

      <div className="flex flex-col gap-14">
        {kategoriDokumen.map((kat) => (
          <section key={kat.id}>
            <h2 className="text-lg font-semibold mb-5 pb-3" style={{ ...fontDisplay, borderBottom: `1px solid ${c.line}` }}>
              {kat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kat.docs.map((doc, i) => (
                <DocCard key={i} doc={doc} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ===== Konten Rekening Virtual — POV Satker, PMK-183/PMK.05/2019 =====

function StrukturDiagram() {
  const Node = ({ children, style }) => (
    <div className="flex items-center justify-center text-center px-3 py-2.5" style={{ ...fontMono, fontSize: 11, letterSpacing: "0.03em", ...style }}>
      {children}
    </div>
  );
  const Kolom = ({ label }) => (
    <div className="flex-1 flex flex-col items-center">
      <Node style={{ border: `1px solid ${c.gold}`, color: c.ink, minWidth: 150, marginBottom: 14 }}>{label}</Node>
      <span className="text-sm mb-3" style={{ color: c.maroon }}>↓</span>
      <Node style={{ background: c.maroon, color: c.paper, minWidth: 150, marginBottom: 10 }}>REK. INDUK</Node>
      <span className="text-sm mb-3" style={{ color: c.inkSoft }}>↓</span>
      <div className="flex gap-2 flex-wrap justify-center">
        <Node style={{ border: `1px solid ${c.line}`, color: c.ink, minWidth: 66 }}>Satker 1</Node>
        <Node style={{ border: `1px solid ${c.line}`, color: c.ink, minWidth: 66 }}>Satker 2</Node>
        <Node style={{ border: `1px solid ${c.line}`, color: c.ink, minWidth: 66 }}>Dst.</Node>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col items-center py-8 px-4" style={{ border: `1px solid ${c.line}`, background: c.paperDim }}>
      <Node style={{ background: c.navy, color: c.goldBright, minWidth: 200, marginBottom: 8 }}>ESELON I (DJP PUSAT)</Node>
      <span className="text-lg mb-4" style={{ color: c.maroon }}>↓</span>
      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl flex-wrap justify-center">
        <Kolom label="OPERASIONAL" />
        <Kolom label="NON-OPERASIONAL" />
        <Kolom label="VAT (opsional)" />
      </div>
      <p className="text-xs text-center mt-6 max-w-md" style={{ color: c.inkSoft }}>
        Setiap kategori (Operasional/Non-Operasional) punya Rekening Induk terpisah di <strong>4 bank mitra</strong>{" "}
        — Mandiri, BRI, BNI, dan BSI. Rekening Induk VAT terpisah lagi, khusus untuk satker yang punya BPG VAT.
        Rekening Satker (yang satker pegang sehari-hari) hanyalah nomor identifikasi virtual di bawah salah satu
        Rekening Induk tersebut, otomatis terkonsolidasi. Satker tidak perlu mengurus Rekening Induk — itu
        dikelola di kantor pusat.
      </p>
    </div>
  );
}

function RegulasiVirtualContent({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Virtual
      </button>

      <Eyebrow>Rekening Virtual · 01</Eyebrow>
      <h1 className="mt-3 mb-5 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Regulasi Rekening
      </h1>

      <div className="flex gap-4 p-5 mb-8" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
        <span className="text-base leading-none flex-shrink-0" style={{ color: c.maroon }}>ℹ</span>
        <p className="text-sm" style={{ color: c.ink }}>
          Halaman ini membahas <strong>Rekening Pengeluaran (BPG) dan Rekening Pengeluaran Pembantu (BPP)</strong>{" "}
          yang berbasis skema virtual. Untuk Rekening Lainnya (RPL), lihat menu <strong>Rekening Giro</strong>.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-7 mb-12" style={{ background: c.navy }}>
        <div>
          <p className="text-xs uppercase mb-2" style={{ ...fontMono, color: c.gold, letterSpacing: "0.12em" }}>
            Buka Peraturan
          </p>
          <p className="text-sm max-w-xl" style={{ color: "#D9DEE8" }}>
            Naskah lengkap <strong style={{ color: c.paper }}>PMK-183/PMK.05/2019</strong> tentang Pengelolaan
            Rekening Pengeluaran Milik Kementerian Negara/Lembaga.
          </p>
        </div>
        <a
          href="https://jdih.kemenkeu.go.id/dok/183-pmk-05-2019"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold flex-shrink-0"
          style={{ background: c.goldBright, color: c.navyDeep }}
        >
          Buka PMK-183/PMK.05/2019 di JDIH ↗
        </a>
      </div>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Dasar Hukum</h2>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          PMK-183/PMK.05/2019 mengatur pengelolaan Rekening Pengeluaran berbasis skema virtual — menggantikan
          model rekening giro konvensional untuk BPG dan BPP. Satker tidak lagi membuka rekening bank sendiri;
          yang dipegang satker adalah nomor identifikasi virtual yang terkonsolidasi ke satu Rekening Induk
          di tingkat Eselon I (kantor pusat).
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-5" style={fontDisplay}>Struktur Rekening</h2>
        <StrukturDiagram />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>3 Jenis Rekening Satker</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6 flex flex-col gap-3" style={{ background: c.paper }}>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold">BPG</p>
              <Pill>SUDAH PASTI ADA</Pill>
            </div>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Rekening Pengeluaran Satker — menampung dana yang ditransfer dari KPPN (atau Kantor Pusat DJP
              pada kondisi tertentu) untuk operasional satker sehari-hari.
            </p>
            <p className="text-xs" style={{ ...fontMono, color: c.maroon }}>
              Hanya boleh 1 dalam 1 satker — TIDAK dapat dibuka rekening baru.
            </p>
          </div>
          <div className="p-6 flex flex-col gap-3" style={{ background: c.paper }}>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold">BPP</p>
              <Pill tone="gold">OPSIONAL</Pill>
            </div>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Rekening Pengeluaran Pembantu Satker — dananya berasal dari BPG, biasanya digunakan bagi satker
              yang memiliki KP2KP.
            </p>
            <p className="text-xs" style={{ ...fontMono, color: c.inkSoft }}>
              Dalam 1 satker, boleh memiliki banyak rekening BPP.
            </p>
          </div>
          <div className="p-6 flex flex-col gap-3" style={{ background: c.paper }}>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold">BPG VAT</p>
              <Pill tone="gold">OPSIONAL · TERBATAS</Pill>
            </div>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Rekening khusus untuk menampung dan mengelola dana VAT Refund di bandara-bandara besar Indonesia.
            </p>
            <p className="text-xs" style={{ ...fontMono, color: c.inkSoft }}>
              Saat ini hanya ada di 5 satker.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== Operasional Rekening Virtual =====
const langkahKP2KP = [
  "Satker membuat surat permohonan pembukaan VA baru sesuai Format IV, dibuat melalui aplikasi Nadine, ditujukan ke Sekretaris Direktorat Jenderal Pajak.",
  "Surat dilampiri data-data pendukung sesuai ketentuan lampiran.",
  "Bagian Keuangan Kantor Pusat DJP membuat Surat Permohonan ke KPPN Jakarta II terkait permohonan pembukaan tersebut.",
  "KPPN Jakarta II menerbitkan Surat Persetujuan Pembukaan Bank dan mengirimkannya langsung ke Kantor Pusat Bank Tujuan.",
  "Satker menunggu proses pembuatan VA di bank.",
  "Setelah VA selesai dibuat, bank menghubungi satker untuk aktivasi rekening, pengiriman token & kartu debit, penyelesaian CMS, dan penyerahan akun Dashboard.",
  "Satker mulai menggunakan rekening VA tersebut dan mendaftarkannya ke aplikasi SAKTI dan SPAN.",
  "Satker memastikan rekening VA baru dapat menerima SP2D dari KPPN.",
  "Proses selesai — satker mengarsipkan dokumen yang diterima: Surat Permohonan Pembukaan Rekening Satker dari Kantor Pusat DJP ke KPPN Jakarta II, Surat Permohonan Pembukaan dari KPPN Jakarta II ke Bank Pusat, dan Laporan Pembukaan dari bank baru.",
];

function KasusKP2KP({ onGoToFormat }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6" style={{ border: `1px solid ${c.gold}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left" style={{ background: c.paperDim }}>
        <span className="text-sm font-semibold" style={{ color: c.ink }}>
          Kasus Khusus: Permohonan Pembukaan VA Baru untuk KP2KP
        </span>
        <span className="text-sm flex-shrink-0 transition-transform" style={{ color: c.maroon, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </button>
      {open && (
        <div className="p-5">
          <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
            Berlaku untuk KP2KP yang perlu membuka rekening VA baru, memakai bank yang sama dengan Bank BPG
            induknya.
          </p>
          <ol className="flex flex-col gap-3">
            {langkahKP2KP.map((st, i) => (
              <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                <span
                  className="flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                  style={{ width: 20, height: 20, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}
                >
                  {i + 1}
                </span>
                <span className="pt-0.5">{st}</span>
              </li>
            ))}
          </ol>
          <DocJumpButton onClick={onGoToFormat} label="Lihat Format Surat Permohonan Pembukaan (Format IV)" />
        </div>
      )}
    </div>
  );
}

function OperasionalHarianExtra() {
  const [showCMSInfo, setShowCMSInfo] = useState(false);
  return (
    <div className="mt-8 flex flex-col gap-8">
      {/* Kartu debit hilang/rusak */}
      <div className="p-5" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
        <p className="text-sm font-semibold mb-2" style={{ color: c.maroon }}>Opsss!! Kartu Debit Rusak/Hilang</p>
        <ul className="flex flex-col gap-2">
          {[
            "Segera kontak PIC Rekening atau beritahukan di Grup Rekening.",
            "Bank Pusat biasanya akan menghubungi satker dan Bank Cabang untuk konfirmasi dan otorisasi tarik tunai di teller tanpa kartu debit untuk sementara waktu.",
            "Bank Pusat menerbitkan kembali kartu debit dan mengirimkan ke Bank Cabang, untuk diserahkan ke satker.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.ink }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CMS */}
      <div>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <p className="text-sm font-semibold">Cash Management System (CMS)</p>
          <Pill>SANGAT DISARANKAN</Pill>
        </div>
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
          Tools/website (istilah berbeda tiap bank) untuk transaksi online — transfer, bayar pajak, dsb.
          Alur transaksinya berjenjang:
        </p>
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {[
            ["Maker", "Operator Transaksi/Bendahara"],
            ["Checker", "Bendahara/KPA*"],
            ["Releaser", "KPA*"],
          ].map(([role, who], i) => (
            <React.Fragment key={role}>
              <div className="px-4 py-3 text-center" style={{ background: c.navy, minWidth: 130 }}>
                <p className="text-sm font-semibold" style={{ color: c.goldBright }}>{role}</p>
                <p className="text-xs" style={{ color: "#C7CCD9" }}>{who}</p>
              </div>
              {i < 2 && <span style={{ color: c.maroon }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs mb-5" style={{ color: c.inkSoft }}>* sangat disarankan. Setting user MCR hanya bisa dilakukan admin & sysadmin — akses ini seharusnya sudah tercantum di BAST dari pejabat sebelumnya. Kalau belum diketahui, segera hubungi Bank Cabang atau Grup Rekening.</p>

        <button onClick={() => setShowCMSInfo(!showCMSInfo)} className="text-xs font-semibold flex items-center gap-1.5" style={{ ...fontMono, color: c.maroon }}>
          {showCMSInfo ? "▾" : "▸"} Kenapa sangat disarankan?
        </button>
        {showCMSInfo && (
          <ul className="flex flex-col gap-2 mt-3">
            {[
              "Perlu pembayaran cepat / kebijakan percepatan pembayaran dari Kantor Pusat DJP (pegawai pindah, terima insentif, dst).",
              "Wajib dilakukannya pengosongan rekening di akhir tahun — kadang perlu transaksi di luar jam kerja.",
              "Transaksi transfer/bayar online memudahkan dan mempercepat penyelesaian pembayaran.",
              "Rekomendasi dari Biro Rocankeu Kementerian Keuangan agar seluruh satker di Kemenkeu memiliki CMS.",
            ].map((t, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
                <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PelaporanExtra() {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold mb-4">Fungsi Dashboard</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Transaksi tercatat di sini", "Cetak rekening koran di sini", "Data terkonsolidasi (ke KPDJP, Kementerian, DJPb)", "Cek saldo di sini", "Pastikan akses setiap hari"].map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-3" style={{ border: `1px solid ${c.line}` }}>
              <span className="flex-shrink-0 flex items-center justify-center text-xs font-semibold" style={{ width: 22, height: 22, background: c.navy, color: c.goldBright, ...fontMono }}>{i + 1}</span>
              <p className="text-sm" style={{ color: c.inkSoft }}>{t}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5" style={{ background: c.paperDim, border: `1px solid ${c.line}` }}>
        <p className="text-sm" style={{ color: c.ink }}>
          Akun Dashboard dikirim bank ke email KPA dan Bendahara — seharusnya diserah-terimakan dari pejabat
          lama ke pejabat baru lewat BAST. BPG dan BPP memakai akun Dashboard yang sama; BPG VAT punya akun
          terpisah. Jika kehilangan akses, segera hubungi bank di Grup Rekening dan/atau PIC Rekening Kantor
          Pusat DJP.
        </p>
      </div>
    </div>
  );
}

const faseOperasionalVirtual = [
  {
    no: "01",
    title: "Pembukaan Rekening Satker",
    summary: "Diajukan lewat Eselon I (Bagian Keuangan Pusat), bukan langsung ke KPPN.",
    points: [
      <>KPA mengajukan permohonan persetujuan dan pembukaan Rekening Satker (BPG/BPP) kepada Eselon I — di DJP berarti ke Bagian Keuangan Kantor Pusat. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA1qpGdiWiTRJhrkcZ7jmvfAQm7It61EGzpFD_6baFyMe8?e=Y5un6x" tone="dark">Buka format surat permohonan</InlineDocLink></>,
      "Eselon I meneruskan permohonan tersebut ke Kuasa BUN di Daerah paling lambat 5 hari kerja sejak diterima dari satker.",
      "Setelah disetujui, bank membuka Rekening Satker dan mengirimkan user Dashboard, akses CMS, serta kartu debit ke satker paling lambat 10 hari kerja.",
      "Rekening Pengeluaran Pembantu (BPP) dibuka di bank mitra yang sama dengan Rekening Pengeluaran (BPG) satker yang bersangkutan.",
    ],
    extra: <KasusKP2KP />,
  },
  {
    no: "02",
    title: "Operasional Harian",
    summary: "Rekening Satker dioperasikan oleh bendahara — kredit, debit lewat CMS/kartu debit, transaksi tunai terbatas.",
    points: [
      "Rekening Pengeluaran (BPG) dioperasikan oleh bendahara pengeluaran; Rekening Pengeluaran Pembantu (BPP) oleh bendahara pengeluaran pembantu.",
      "Pengkreditan Rekening Satker otomatis menambah saldo Rekening Satker sekaligus Rekening Induk.",
      "Pendebitan non-tunai dilakukan lewat CMS atau kartu debit. Transaksi diusahakan non tunai — tunai hanya untuk kondisi tertentu: gangguan sistem perbankan, pihak ketiga tidak menerima non tunai, atau keadaan kahar (bencana, epidemik, kerusuhan).",
      "Seluruh pengambilan tunai — baik lewat ATM maupun teller — wajib pakai Kartu Debit DAN Surat Perintah Pendebitan Rekening (SPPR). Format SPPR ada di Lampiran PMK-183/PMK.05/2019.",
    ],
    extra: <OperasionalHarianExtra />,
  },
  {
    no: "03",
    title: "Penihilan Saldo Akhir Tahun",
    summary: "Saldo UP/TUP wajib nihil sebelum tahun anggaran berakhir.",
    points: [
      "Pada akhir hari kerja di akhir tahun anggaran, sisa saldo Rekening Pengeluaran yang bersumber dari dana UP/TUP harus nihil.",
      "Mekanisme penihilan mengikuti ketentuan PMK mengenai tata cara pembayaran APBN dan pedoman akhir tahun anggaran.",
    ],
    superHighlight: "Pastikan saldo Rekening Pengeluaran (UP/TUP) NIHIL sebelum tahun anggaran berakhir.",
  },
  {
    no: "04",
    title: "Pelaporan",
    summary: "Otomatis lewat Dashboard — tidak perlu laporan manual seperti RPL.",
    points: [
      "Pelaporan saldo Rekening Pengeluaran dihasilkan secara elektronik lewat Dashboard yang diberikan bank.",
      "Berbeda dengan RPL, satker tidak perlu menyusun dan mengirim laporan saldo bulanan secara manual ke KPPN — cukup pastikan akses Dashboard aktif dan dipantau rutin.",
    ],
    extra: <PelaporanExtra />,
  },
];

function OperasionalVirtualContent({ onBack, onGoToFormat }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Virtual
      </button>

      <Eyebrow>Rekening Virtual · 02</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Operasional Rekening
      </h1>
      <p className="text-sm mb-10 max-w-2xl" style={{ color: c.inkSoft }}>
        Empat fase siklus hidup Rekening Satker (BPG/BPP), dari sudut pandang satker sebagai pengguna rekening.
        Klik tiap fase untuk lihat detailnya.
      </p>

      <div className="flex flex-col">
        {faseOperasionalVirtual.map((fase) => (
          <PhaseAccordion
            key={fase.no}
            fase={{
              ...fase,
              extra: fase.no === "01" ? <KasusKP2KP onGoToFormat={onGoToFormat} /> : fase.extra,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ===== Detail alur per bank — mutasi Bendahara/KPA (Rekening Virtual) =====
const alurBankMutasi = [
  {
    nama: "Bank BRI",
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
    steps: [
      "KPA Satker memberitahukan ke Bank Cabang Padanan.",
      "Kirim Surat Pemberitahuan Perubahan Data Rekening — memuat data pengurus lama & baru.",
      "Lampiri: salinan identitas pengurus baru, SK/bukti penunjukan.",
      "Bank BSI memproses perubahan user.",
    ],
  },
];

// ===== Perubahan Rekening Virtual =====
const jenisPerubahanVirtual = [
  {
    id: "bank",
    badge: "PMK-183",
    title: "Perubahan Bank Mitra Tempat Rekening Dibuka",
    summary: "Memindahkan Rekening Satker ke bank mitra lain — 13 langkah, satker sempat pegang 2 VA aktif.",
    steps: [
      <>Satker membuat surat permohonan perubahan bank sesuai Format VIII, dibuat melalui aplikasi Nadine, ditujukan ke Sekretaris Direktorat Jenderal Pajak. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA3gCkDs9z5Sq1754vxi6HgAbYhqNvmC_joJL0UzBLd0XU?e=cFjc6r" tone="dark">Buka Format VIII</InlineDocLink></>,
      "Surat dilampiri data-data pendukung sesuai ketentuan lampiran.",
      "Bagian Keuangan Kantor Pusat DJP membuat Surat Permohonan ke KPPN Jakarta II terkait perubahan bank tersebut.",
      "KPPN Jakarta II menerbitkan Surat Persetujuan Perubahan Bank dan mengirimkannya langsung ke Kantor Pusat Bank Tujuan.",
      "Satker menunggu proses pembuatan Rekening VA baru di bank tujuan.",
      "Setelah VA baru selesai dibuat, bank menghubungi satker untuk aktivasi rekening, pengiriman token & kartu debit, penyelesaian CMS, dan penyerahan akun Dashboard.",
      "Satker mulai menggunakan rekening VA baru dan mendaftarkannya ke aplikasi SAKTI dan SPAN — pada tahap ini satker memegang 2 rekening VA BPG/BPP yang aktif sekaligus.",
      "Satker memastikan rekening VA baru dapat menerima SP2D dari KPPN.",
      <>Setelah dipastikan lancar menerima SP2D, satker wajib membuat Laporan Pemindahbukuan sesuai Format X. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQAKXQUpfVKHSpAuLnOh8QKVAVkje6cR88LVODUldrLYW-g?e=wEap66" tone="dark">Buka Format X</InlineDocLink></>,
      "KPPN Jakarta II menerbitkan surat perintah penutupan rekening ke bank lama satker.",
      "Bank lama melakukan penutupan rekening VA.",
      "Proses selesai — satker mengarsipkan seluruh dokumen yang diterima selama proses (surat permohonan perubahan dari Kantor Pusat DJP maupun KPPN, surat penutupan ke bank lama, laporan pembukaan dari bank baru, dan laporan penutupan dari bank lama).",
    ],
  },
  {
    id: "mutasi",
    badge: "NON-PMK · INTERNAL",
    title: "Perubahan karena Mutasi Bendahara dan/atau KPA",
    summary: "Tugas terbagi 2: pejabat lama serah-terima, pejabat baru lapor ke bank.",
    steps: [],
    superHighlight: "Satker WAJIB membuat Berita Acara Serah Terima (BAST) dokumen rekening setiap kali terjadi mutasi Bendahara dan/atau KPA.",
    extra: (
      <div className="flex flex-col gap-10">
        {/* Pejabat Lama vs Pejabat Baru */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-4" style={{ color: c.maroon }}>Tugas Pejabat Lama</p>
            <ol className="flex flex-col gap-3">
              {[
                <>Satker wajib membuat Berita Acara Serah Terima (BAST) dokumen-dokumen rekening — kartu debit, akun CMS, akun Dashboard, dan dokumen terkait VA lainnya — dari pegawai lama ke pegawai baru. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDUnTA1skPpQYHxNDkvC9xCAeRXR_fwktLP_LPEHlziWIk?e=3PkRTY" tone="dark">Buka format BAST</InlineDocLink></>,
                "BAST ditandatangani untuk kemudian diserahkan kepada pegawai baru.",
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                  <span className="flex-shrink-0 flex items-center justify-center text-xs font-semibold" style={{ width: 20, height: 20, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}>{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-4" style={{ color: c.maroon }}>Tugas Pejabat Baru</p>
            <ol className="flex flex-col gap-3">
              {[
                <>Satker wajib melakukan pemberitahuan ke Bank Padanan Satker, mengikuti dokumen-dokumen yang telah ditentukan bank (lihat rincian per bank di bawah). <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBXWDXnDcMZQ4UA2TfJIW1fATPOCPQN1WiP2Zu_YzMLkfg?e=fiVliU" tone="dark">Buka format surat perubahan data</InlineDocLink></>,
                "Satker wajib memastikan login akun perbankan dan pelaksanaan transaksi sudah bisa dijalankan.",
                "Satker wajib berkonsultasi dengan cabang Bank Padanan apabila terdapat kendala akses/transaksi.",
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                  <span className="flex-shrink-0 flex items-center justify-center text-xs font-semibold" style={{ width: 20, height: 20, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}>{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Onboarding Bendahara baru */}
        <div>
          <p className="text-sm font-semibold mb-4">Things to Do untuk Bendahara Baru di Satker</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {["Pahami isi BAST", "Masuk ke grup Rekening DJP", "Cek akun perbankan", "Perkenalan ke Bank Cabang", "Ubah data perbankan"].map((t, i) => (
              <div key={i} className="p-4 text-center" style={{ border: `1px dashed ${c.line}` }}>
                <span
                  className="inline-flex items-center justify-center text-xs font-semibold mb-2"
                  style={{ width: 22, height: 22, background: c.navy, color: c.goldBright, ...fontMono }}
                >
                  {i + 1}
                </span>
                <p className="text-xs" style={{ color: c.inkSoft }}>{t}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: c.inkSoft }}>
            Segera hubungi Bendahara lama / LO / PIC Rekening untuk bergabung ke Grup Rekening DJP.
          </p>
        </div>

        {/* Rincian per bank */}
        <div>
          <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.maroon, letterSpacing: "0.1em" }}>
            Rincian Alur per Bank
          </p>
          <div className="flex flex-col" style={{ borderTop: `1px solid ${c.line}` }}>
            {alurBankMutasi.map((bank) => (
              <MiniBankAccordion key={bank.nama} bank={bank} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function PerubahanVirtualContent({ onBack, onOpenMutasiDetail, onGoToFormat }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Virtual
      </button>

      <Eyebrow>Rekening Virtual · 03</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Perubahan Rekening
      </h1>
      <p className="text-sm mb-10 max-w-2xl" style={{ color: c.inkSoft }}>
        Dua jenis perubahan yang paling sering dihadapi satker. Klik tiap jenis untuk lihat langkah-langkahnya.
      </p>

      <div className="flex flex-col">
        {jenisPerubahanVirtual.map((item) => (
          <StepAccordion
            key={item.id}
            item={{
              ...item,
              onOpenDetail: item.id === "mutasi" ? onOpenMutasiDetail : undefined,
            }}
          />
        ))}
      </div>

      <div className="flex gap-4 p-5 mt-8" style={{ background: c.paperDim, border: `1px solid ${c.line}` }}>
        <span className="text-base leading-none flex-shrink-0" style={{ color: c.maroon }}>ℹ</span>
        <div>
          <p className="text-sm" style={{ color: c.ink }}>
            Satker juga dapat mengajukan <strong>Permohonan Penutupan Rekening Satker</strong> secara mandiri
            apabila rekening sudah tidak digunakan sesuai tujuan penggunaannya (di luar konteks pindah bank). <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCudtdNaeKhRqwKMyNzC6J1AUdSpUK7d0ZT4RT-ljOTdzQ?e=RiKCvI" tone="dark">Buka format surat</InlineDocLink>
          </p>
        </div>
      </div>

      <p className="text-xs mt-6" style={{ ...fontMono, color: c.inkSoft }}>
        Format surat lengkap tersedia di SharePoint Rekening DJP.
      </p>
    </div>
  );
}

// ===== Format Dokumen Rekening Virtual =====
const kategoriDokumenVirtual = [
  {
    id: "pembukaan",
    label: "Pembukaan Rekening",
    docs: [
      { nama: "Surat Permohonan Pembukaan Rekening Satker", badge: "PMK-183", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA1qpGdiWiTRJhrkcZ7jmvfAQm7It61EGzpFD_6baFyMe8?e=Y5un6x" },
    ],
  },
  {
    id: "perubahan",
    label: "Perubahan & Penutupan",
    docs: [
      { nama: "Surat Permohonan Perubahan Bank Tempat Rekening Dibuka", badge: "PMK-183", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA3gCkDs9z5Sq1754vxi6HgAbYhqNvmC_joJL0UzBLd0XU?e=cFjc6r" },
      { nama: "Laporan Pemindahbukuan Rekening Satker", badge: "PMK-183", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQAKXQUpfVKHSpAuLnOh8QKVAVkje6cR88LVODUldrLYW-g?e=wEap66" },
      { nama: "Surat Permohonan Penutupan Rekening Satker", badge: "PMK-183", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCudtdNaeKhRqwKMyNzC6J1AUdSpUK7d0ZT4RT-ljOTdzQ?e=RiKCvI" },
    ],
  },
  {
    id: "internal",
    label: "Non-PMK — Mutasi Pejabat",
    docs: [
      { nama: "Berita Acara Serah Terima (BAST) Akun Perbankan", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDUnTA1skPpQYHxNDkvC9xCAeRXR_fwktLP_LPEHlziWIk?e=3PkRTY" },
      { nama: "Surat Perubahan Data Pemegang CMS & Dashboard (KPA/Bendahara)", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBXWDXnDcMZQ4UA2TfJIW1fATPOCPQN1WiP2Zu_YzMLkfg?e=fiVliU" },
      { nama: "Surat Permohonan Penggantian Kartu Debit", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCcwkFfsiukRIxCjsyp3JH-AVjY8s0amobk_-VMz-Vjt0U?e=UoaSTm" },
    ],
  },
];

function FormatDokumenVirtualContent({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Rekening Virtual
      </button>

      <Eyebrow>Rekening Virtual · 04</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Format Dokumen
      </h1>
      <p className="text-sm mb-12 max-w-2xl" style={{ color: c.inkSoft }}>
        Format surat untuk pengelolaan Rekening Satker (BPG/BPP), tersedia di SharePoint Kemenkeu — klik untuk
        membuka, tinggal isi data satker dan kirim.
      </p>

      <div className="flex flex-col gap-14">
        {kategoriDokumenVirtual.map((kat) => (
          <section key={kat.id}>
            <h2 className="text-lg font-semibold mb-5 pb-3" style={{ ...fontDisplay, borderBottom: `1px solid ${c.line}` }}>
              {kat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kat.docs.map((doc, i) => (
                <DocCard key={i} doc={doc} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ===== Konten Kartu Kredit Pemerintah (KKP) — POV Satker, PMK-196/PMK.05/2018 jo. PMK-97/PMK.05/2021 =====
const jenisKKP = [
  {
    kode: "KKP-BO",
    nama: "KKP Belanja Operasional",
    ket: "Dipegang Pejabat Pengadaan/pelaksana. Untuk belanja barang operasional (keperluan kantor, bahan makanan, dsb.) dan belanja modal. Maksimal Rp50 juta per rekanan, bisa naik sampai Rp200 juta khusus transaksi produk dalam negeri UMK lewat e-Katalog atau DIGIPay.",
  },
  {
    kode: "KKP-PD",
    nama: "KKP Perjalanan Dinas",
    ket: "Dipegang pejabat/pegawai yang menjalankan perjalanan dinas. Untuk komponen biaya perjalanan dinas seperti tiket dan hotel. Maksimal Rp20 juta per kartu.",
  },
];

function RegulasiKKPContent({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Kartu Kredit
      </button>

      <Eyebrow>Kartu Kredit · 01</Eyebrow>
      <h1 className="mt-3 mb-5 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Regulasi KKP
      </h1>

      {/* Buka Peraturan PMK-196 & PMK-97 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-7 mb-12" style={{ background: c.navy }}>
        <div>
          <p className="text-xs uppercase mb-2" style={{ ...fontMono, color: c.gold, letterSpacing: "0.12em" }}>
            Buka Peraturan
          </p>
          <p className="text-sm max-w-xl" style={{ color: "#D9DEE8" }}>
            Naskah lengkap <strong style={{ color: c.paper }}>PMK-196/PMK.05/2018</strong> tentang Tata Cara
            Pembayaran dan Penggunaan Kartu Kredit Pemerintah, sebagaimana diubah dengan{" "}
            <strong style={{ color: c.paper }}>PMK-97/PMK.05/2021</strong> — dasar hukum pengelolaan KKP yang
            dibahas di halaman ini.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <a
            href="https://jdih.kemenkeu.go.id/dok/196-pmk-05-2018"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            style={{ background: c.goldBright, color: c.navyDeep }}
          >
            Buka PMK-196/2018 di JDIH ↗
          </a>
          <a
            href="https://jdih.kemenkeu.go.id/dok/97-pmk-05-2021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            style={{ border: `1px solid ${c.gold}`, color: c.goldBright }}
          >
            Buka PMK-97/2021 (Perubahan) ↗
          </a>
        </div>
      </div>

      {/* Dasar hukum */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Dasar Hukum</h2>
        <p className="text-sm mb-3" style={{ color: c.inkSoft }}>
          PMK-196/PMK.05/2018 ditetapkan 31 Desember 2018 dan berlaku efektif sejak 1 Juli 2019. KKP adalah salah
          satu inisiatif simplifikasi dan modernisasi pelaksanaan anggaran oleh Direktorat Jenderal Perbendaharaan,
          menggantikan sebagian mekanisme UP tunai dengan pembayaran nontunai.
        </p>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Sebagai satker, yang perlu diketahui: sebagian Uang Persediaan (UP) satker dialokasikan dalam bentuk{" "}
          <strong style={{ color: c.ink }}>UP KKP</strong> — dipakai lewat kartu, bukan tunai. UP KKP hanya bisa
          dipakai untuk pembayaran kepada 1 (satu) penerima/rekanan, dengan batas nilai sesuai jenis kartunya.
        </p>
      </section>

      {/* Jenis KKP */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Jenis-Jenis KKP</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Dua jenis KKP yang berlaku di satker, dibedakan dari peruntukan dan siapa yang memegangnya.
        </p>
        <div className="flex flex-col" style={{ border: `1px solid ${c.line}` }}>
          {jenisKKP.map((j, i) => (
            <div
              key={j.kode}
              className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 sm:gap-6 p-5"
              style={{ background: c.paperDim, borderTop: i === 0 ? "none" : `1px solid ${c.line}` }}
            >
              <div>
                <span
                  className="inline-block text-xs px-2 py-1"
                  style={{ ...fontMono, color: c.paper, background: c.maroon, letterSpacing: "0.08em" }}
                >
                  {j.kode}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{j.nama}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{j.ket}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: c.inkSoft }}>
          Maksimal 2 kartu aktif per pemegang — 1 KKP-BO dan 1 KKP-PD sekaligus, tidak lebih dari itu masing-masing.
        </p>
      </section>

      {/* Kanal transaksi */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-5" style={fontDisplay}>Kanal Transaksi</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 p-4" style={{ border: `1px solid ${c.line}` }}>
            <Pill tone="gold">EDC</Pill>
            <p className="text-sm pt-1" style={{ color: c.ink }}>
              <strong>Mesin EDC (Electronic Data Capture)</strong> milik rekanan — kanal transaksi paling umum
              untuk KKP-BO dan KKP-PD.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4" style={{ border: `1px solid ${c.line}` }}>
            <Pill tone="gold">E-KATALOG</Pill>
            <p className="text-sm pt-1" style={{ color: c.ink }}>
              <strong>Katalog elektronik LKPP</strong> — kanal yang membuka batas nilai belanja lebih tinggi
              (sampai Rp200 juta) khusus produk dalam negeri UMK.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4" style={{ border: `1px solid ${c.line}` }}>
            <Pill tone="gold">DIGIPAY</Pill>
            <p className="text-sm pt-1" style={{ color: c.ink }}>
              <strong>Marketplace pembayaran pemerintah</strong> milik Kementerian Keuangan — kanal alternatif
              dengan batas nilai sama seperti e-Katalog.
            </p>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: c.inkSoft }}>
          Di luar ketiga kanal ini, transaksi KKP-BO tetap tunduk pada batas umum Rp50 juta per rekanan.
        </p>
      </section>

      {/* Dua dokumen dasar */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Dua Dokumen Dasar Sebelum Punya Kartu</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Sebelum satker bisa mengajukan kartu apa pun ke bank, dua dokumen ini wajib ada lebih dulu.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.paper }}>
            <span
              className="inline-block text-[10px] px-2 py-1 mb-3"
              style={{ ...fontMono, color: c.paper, background: c.navy, letterSpacing: "0.06em" }}
            >
              PKS
            </span>
            <p className="text-sm font-semibold mb-2">Perjanjian Kerja Sama</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Perjanjian antara satker dengan bank penerbit kartu. Ditandatangani bersama bank, lalu dicatat
              nomor, tanggal, dan bank mitranya.
            </p>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <span
              className="inline-block text-[10px] px-2 py-1 mb-3"
              style={{ ...fontMono, color: c.paper, background: c.maroon, letterSpacing: "0.06em" }}
            >
              SK / KEP
            </span>
            <p className="text-sm font-semibold mb-2">Surat Keputusan KPA</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Dasar hukum satu-satunya yang menetapkan siapa saja pemegang kartu dan Admin KKP satker. Pemegang
              kartu yang sah adalah yang tercantum pada <strong style={{ color: c.ink }}>SK terakhir yang berlaku</strong>{" "}
              — bukan sekadar penunjukan lisan atau memo internal.
            </p>
          </div>
        </div>
      </section>

      {/* Kewenangan satker */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Siapa di Satker yang Berwenang</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">KPA</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Kuasa Pengguna Anggaran — di satker adalah <strong style={{ color: c.ink }}>Kepala Kantor</strong>,
              di Kantor Pusat adalah <strong style={{ color: c.ink }}>Sesditjen</strong>. Menunjuk Admin KKP, dan
              satu-satunya pihak yang berwenang menyetujui/menetapkan SK pemegang kartu.
            </p>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Admin KKP</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Pegawai yang ditunjuk KPA untuk mengelola operasional KKP sehari-hari — menyusun SK, mengurus
              PKS, dan mengajukan kartu ke bank. Satu satker boleh punya lebih dari satu Admin KKP.
            </p>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">PPK</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>
              Pejabat Pembuat Komitmen — menguji bukti pengeluaran, mengesahkan Daftar Pembayaran Tagihan (DPT)
              KKP, dan menerbitkan atau menolak Surat Perintah Bayar (SPBy).
            </p>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: c.inkSoft }}>
          Admin KKP sebaiknya tidak merangkap sebagai pemegang kartu — PMK KKP tidak melarangnya, tapi rangkap
          jabatan ini mengurangi pemisahan tugas.
        </p>
      </section>
    </div>
  );
}

// ===== Konten Operasional KKP — POV Satker =====
const faseOperasionalKKP = [
  {
    no: "01",
    title: "Dasar Legal: PKS & SK KPA",
    summary: "Dua dokumen dasar yang wajib ada sebelum satker bisa mengajukan kartu.",
    points: [
      "Satker mengisi Perjanjian Kerja Sama (PKS) dengan bank penerbit — minta formatnya ke Bank Padanan (sesuai format yang ditetapkan DJPb), tanda tangani bersama bank, lalu catat nomor dan tanggalnya.",
      <><strong style={{ color: c.ink }}>Admin KKP menyusun Surat Keputusan (SK/KEP)</strong> berisi daftar pemegang kartu dan Admin KKP satker, lalu mengajukannya untuk ditandatangani KPA. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQAxHSJDPPp6Q4ej-EbygI83AYuQPIYdDrK_Zb6V_MGTw0w?e=nrJXn7" tone="dark">Buka format SK</InlineDocLink></>,
      "KPA meninjau SK tersebut — bila disetujui, SK ditandatangani dan berlaku aktif; bila belum sesuai, KPA mengembalikannya untuk diperbaiki disertai catatan alasan.",
      "Selama PKS atau SK belum ada, satker belum bisa mengajukan penerbitan kartu apa pun ke bank.",
    ],
    superHighlight:
      "Pemegang kartu dan Admin KKP yang sah adalah yang tercantum pada SK terakhir yang berlaku — bukan sekadar penunjukan lisan atau memo internal.",
  },
  {
    no: "02",
    title: "Pengajuan & Penerbitan Kartu",
    summary: "Mengajukan kartu ke bank penerbit berdasarkan SK yang sudah ditetapkan.",
    points: [
      <><strong style={{ color: c.ink }}>KPA mengajukan permohonan penerbitan KKP ke bank penerbit</strong> untuk tiap pemegang yang tercantum pada SK, disertai dokumen pendukung. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQC_BXcsqniRSJrkp4DF8wDAAQC4U5G2sQ9tBtUbA9NwJSI?e=rfYRDH" tone="dark">Buka format surat permohonan</InlineDocLink></>,
      "Bank penerbit memverifikasi permohonan paling lambat 6 hari kerja setelah surat permohonan diterima.",
      "Pemegang KKP-BO ditetapkan dari pejabat pengadaan, pejabat struktural, pelaksana, atau pegawai lain yang bertugas dalam pengadaan barang/jasa; pemegang KKP-PD dari pejabat/pegawai yang menjalankan perjalanan dinas.",
      "Setelah kartu terbit, Admin KKP mencatat nomor kartunya lalu menyerahkannya kepada pemegang.",
      "Maksimal 2 kartu aktif per pemegang — 1 KKP-BO dan 1 KKP-PD.",
    ],
  },
  {
    no: "03",
    title: "Transaksi & Pembayaran",
    summary: "Cara bertransaksi lewat EDC/e-Katalog/DIGIPay, lalu pengujian dan pengesahan tagihan.",
    points: [
      "Pemegang KKP melakukan transaksi pada penyedia yang menerima pembayaran KKP lewat mesin EDC, e-Katalog, atau DIGIPay.",
      "PPK menguji kesesuaian spesifikasi teknis dan volume barang/jasa terhadap kontrak/perjanjian dan bukti serah terima.",
      "Berdasarkan hasil pengujian, PPK mengesahkan Daftar Pembayaran Tagihan (DPT) KKP atas bukti-bukti pengeluaran yang memenuhi ketentuan.",
      "PPK atas nama KPA menerbitkan Surat Perintah Bayar (SPBy) paling lambat 2 hari kerja setelah DPT KKP ditetapkan.",
      "Bukti pengeluaran yang tidak memenuhi ketentuan ditolak PPK lewat Surat Pemberitahuan Penolakan, disampaikan paling lambat 3 hari kerja setelah DPT dan dokumen lampirannya diterima.",
    ],
  },
  {
    no: "04",
    title: "Penggantian UP KKP (GUP)",
    summary: "Mengajukan penggantian UP yang sudah terpakai lewat SPP-GUP KKP/SPM-GUP KKP.",
    points: [
      "Bendahara mengajukan SPP-GUP KKP/SPM-GUP KKP berdasarkan DPT yang sudah disahkan PPK.",
      <>Pengajuan SPP-GUP KKP/SPM-GUP KKP <strong style={{ color: c.ink }}>dilakukan terpisah</strong> dari pengajuan SPP/SPM pelaksanaan APBN lainnya.</>,
      "Pastikan seluruh kolom pada DPT terisi lengkap dan sesuai ketentuan — termasuk nama pemegang KKP dan nomor KKP — untuk menghindari koreksi dari KPPN.",
    ],
    superHighlight:
      "Pengisian DPT yang tidak lengkap (misalnya kolom nama pemegang KKP dan nomor KKP kosong) adalah kesalahan yang paling sering ditemukan — pastikan selalu diisi sebelum diajukan.",
  },
  {
    no: "05",
    title: "Pelaporan & Menjaga Kartu Tidak Dormant",
    summary: "Kewajiban lapor rutin, plus kewaspadaan atas kartu yang berpotensi jadi kartu dormant.",
    points: [
      "Satker melaporkan penggunaan UP KKP sebagai bagian dari Laporan Pertanggungjawaban (LPJ) Bendahara bulanan.",
      "Satker perlu siap saat dilakukan rekonsiliasi data KKP secara berkala — pastikan data pemegang kartu, nomor kartu, dan limit selalu sesuai catatan bank penerbit.",
    ],
    superHighlight:
      "Kartu yang tidak segera ditarik saat pemegangnya mutasi, pensiun, meninggal dunia, atau cuti di luar tanggungan negara berisiko menjadi kartu dormant — tetap aktif tapi tidak lagi terpakai dan sulit dilacak. Segera proses perubahan SK dan penarikan kartu begitu kondisi ini terjadi (lihat menu Perubahan KKP).",
  },
];

function OperasionalKKPContent({ onBack, onGoToFormat }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Kartu Kredit
      </button>

      <Eyebrow>Kartu Kredit · 02</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Operasional KKP
      </h1>
      <p className="text-sm mb-10 max-w-2xl" style={{ color: c.inkSoft }}>
        Empat fase siklus penggunaan KKP, dari sudut pandang satker sebagai pengguna kartu. Klik tiap fase untuk
        lihat detailnya.
      </p>

      <div className="flex flex-col">
        {faseOperasionalKKP.map((fase) => (
          <PhaseAccordion key={fase.no} fase={fase} />
        ))}
      </div>
    </div>
  );
}

// ===== Konten Perubahan KKP — POV Satker =====
const jenisPerubahanKKP = [
  {
    id: "mutasi",
    badge: "NON-PMK · INTERNAL",
    title: "Perubahan Pemegang Kartu",
    summary: "Wajib lewat siklus SK dulu — kartu tidak bisa ditarik sebelum pemegang dihapus dari SK aktif.",
    steps: [
      <>Admin KKP menyusun SK/KEP pembaruan — menghapus pemegang lama dan/atau menambahkan pemegang baru — lalu mengajukannya untuk ditandatangani KPA. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA-Uli8vHvCTqydFy2bO1lvAbry7Uw8t-3N5feQwD7rIus?e=iPCBOA" tone="dark">Buka format SK Perubahan</InlineDocLink></>,
      "KPA meninjau dan menyetujui, lalu menandatangani SK baru tersebut sehingga berlaku aktif.",
      <>Setelah pemegang lama tidak lagi tercantum pada SK yang berlaku, <strong style={{ color: c.ink }}>barulah</strong> Admin KKP dapat mengajukan penutupan kartu lama ke bank penerbit lewat Surat Permohonan Penutupan KKP — kartu tidak dapat ditutup selama pemegangnya masih tercantum pada SK aktif. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCSnEPYDl1VQan7V0m7FDu6AYYRUdGTG3wTZ3XlM4Edr24?e=MwupbZ" tone="dark">Buka format Surat Penutupan</InlineDocLink></>,
      <>Untuk pemegang baru, satker mengajukan kartu baru ke bank penerbit lewat Surat Permohonan Penerbitan KKP yang sama seperti pengajuan kartu pertama kali — tidak ada surat 'penggantian pemegang' yang terpisah. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQC_BXcsqniRSJrkp4DF8wDAAQC4U5G2sQ9tBtUbA9NwJSI?e=rfYRDH" tone="dark">Buka format Surat Penerbitan</InlineDocLink></>,
      <>Sebagai praktik baik, dokumentasikan juga serah terima kartu fisik antar pemegang lewat Berita Acara Serah Terima (BAST) Kartu KKP. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQATXP00XcMiQp4H_trU7dXFAXivMWsCJhfuX-wf841CDAQ?e=nbMGKx" tone="dark">Buka format BAST</InlineDocLink></>,
    ],
    superHighlight:
      "Segera proses perubahan SK dan penarikan kartu begitu pemegang mutasi, pensiun, meninggal dunia, atau cuti di luar tanggungan negara — penundaan berisiko membuat kartu tetap aktif tanpa pemegang yang sah (dormant).",
  },
  {
    id: "admin",
    badge: "NON-PMK · INTERNAL",
    title: "Perubahan Admin KKP",
    summary: "Lewat siklus SK dulu, baru diberitahukan ke bank — tidak sampai proses tarik/terbit kartu.",
    steps: [
      <>Admin KKP menyusun SK/KEP pembaruan — menghapus Admin KKP lama dan/atau menambahkan Admin KKP baru — lalu mengajukannya untuk ditandatangani KPA. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA-Uli8vHvCTqydFy2bO1lvAbry7Uw8t-3N5feQwD7rIus?e=iPCBOA" tone="dark">Buka format SK Perubahan</InlineDocLink></>,
      "KPA meninjau dan menandatangani SK baru tersebut sehingga berlaku aktif.",
      "Satker memberitahukan pergantian Admin KKP ke bank penerbit sebagai kontak pengurus KKP satker — bisa lewat surat maupun cara informal, mengikuti prosedur masing-masing bank.",
      "Admin KKP yang sah adalah yang tercantum pada SK terakhir yang berlaku — pastikan daftar ini selalu diperbarui setiap kali ada mutasi.",
    ],
    superHighlight:
      "Berbeda dari perubahan pemegang kartu, perubahan Admin KKP tidak sampai proses tarik/terbit kartu ke bank — pemberitahuannya cukup sebagai update kontak pengurus, bukan permohonan kartu baru.",
  },
  {
    id: "limit",
    badge: "PMK-196",
    title: "Perubahan Limit Kartu",
    summary: "Menaikkan batas transaksi KKP-BO, khusus untuk kebutuhan pengadaan produk dalam negeri UMK.",
    steps: [
      "KPA mengajukan permohonan perubahan limit KKP-BO ke bank penerbit, disertai justifikasi kebutuhan — umumnya untuk transaksi lewat e-Katalog atau DIGIPay.",
      "Limit KKP-BO dapat dinaikkan dari batas umum Rp50 juta sampai maksimal Rp200 juta per rekanan, khusus untuk transaksi produk dalam negeri UMK.",
      "Bank penerbit mengonfirmasi limit baru setelah permohonan disetujui.",
    ],
  },
  {
    id: "hilang",
    badge: "NON-PMK · INTERNAL",
    title: "Kartu Hilang atau Rusak",
    summary: "Ditutup lewat Surat Permohonan Penutupan, lalu diajukan ulang lewat Surat Permohonan Penerbitan.",
    steps: [
      <>Satker segera mengajukan Surat Permohonan Penutupan KKP ke bank penerbit begitu kartu diketahui hilang atau rusak, dilampiri surat kehilangan untuk kartu yang hilang. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCSnEPYDl1VQan7V0m7FDu6AYYRUdGTG3wTZ3XlM4Edr24?e=MwupbZ" tone="dark">Buka format Surat Penutupan</InlineDocLink></>,
      <>Setelah kartu ditutup, Admin KKP mengajukan kartu pengganti ke bank penerbit lewat Surat Permohonan Penerbitan KKP yang sama seperti pengajuan kartu baru — karena pemegangnya tetap sama, proses ini tidak perlu melalui siklus perubahan SK. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQC_BXcsqniRSJrkp4DF8wDAAQC4U5G2sQ9tBtUbA9NwJSI?e=rfYRDH" tone="dark">Buka format Surat Penerbitan</InlineDocLink></>,
      "Catat kejadian ini pada dokumentasi internal satker sebagai kelengkapan arsip.",
    ],
  },
];

function PerubahanKKPContent({ onBack, onOpenMutasiDetail, onGoToFormat }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Kartu Kredit
      </button>

      <Eyebrow>Kartu Kredit · 03</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Perubahan KKP
      </h1>
      <p className="text-sm mb-8 max-w-2xl" style={{ color: c.inkSoft }}>
        Empat jenis perubahan yang paling sering dihadapi satker. Klik tiap jenis untuk lihat langkah-langkahnya.
      </p>

      <div className="flex gap-4 p-5 mb-10" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
        <span className="text-base leading-none flex-shrink-0" style={{ color: c.maroon }}>ℹ</span>
        <p className="text-sm" style={{ color: c.ink }}>
          Prinsip dasar yang perlu diingat: <strong>SK lebih dulu, baru kartu.</strong> Penarikan atau penggantian
          pemegang kartu selalu diawali dari perubahan SK yang disetujui KPA — bukan langsung ke bank penerbit.
        </p>
      </div>

      <div className="flex flex-col">
        {jenisPerubahanKKP.map((item) => (
          <StepAccordion
            key={item.id}
            item={{
              ...item,
              onOpenDetail: (item.id === "mutasi" || item.id === "admin") ? onOpenMutasiDetail : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ===== Konten Format Dokumen KKP — POV Satker =====
const kategoriDokumenKKP = [
  {
    id: "dasar",
    label: "Dasar Legal (5 Dokumen Wajib per ND-1951/PJ.01/2026)",
    docs: [
      { nama: "SK KPA tentang Daftar Pemegang KKP & Daftar Administrator KKP", badge: "NON-PMK", caption: "Khusus penunjukan pertama kali. Untuk perubahan berikutnya, pakai format SK Perubahan di kategori Perubahan & Penutupan.", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQAxHSJDPPp6Q4ej-EbygI83AYuQPIYdDrK_Zb6V_MGTw0w?e=nrJXn7" },
      { nama: "Perjanjian Kerja Sama (PKS) Satker dengan Bank Penerbit KKP", badge: "PMK-196", note: "Format PKS tidak diunggah di sini — DJPb yang menetapkan formatnya dan menyalurkannya ke Bank Pusat. Satker tinggal minta ke Bank Padanan, lalu KPA tanda tangan bersama bank." },
      { nama: "Surat Permohonan Penerbitan KKP kepada Bank Penerbit (dilampiri Surat Referensi)", badge: "PMK-196", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQC_BXcsqniRSJrkp4DF8wDAAQC4U5G2sQ9tBtUbA9NwJSI?e=rfYRDH" },
      { nama: "Surat Perjanjian Penggunaan KKP antara KPA dengan Pemegang KKP", badge: "PMK-196", hrefs: [
        { label: "KKP Belanja Operasional", url: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQD4gVX71fIhS4klshC6OHvqAQnT61X8sSg9dJRUpIB1a3k?e=FrdoOo" },
        { label: "KKP Perjalanan Dinas", url: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQClgXAhnam7SpDTL-FPqdF3AaiHecwwc4gjaKX7uG4BLVE?e=Ysi2bq" },
      ] },
      { nama: "Berita Acara Serah Terima (BAST) KKP antara KPA dengan Pemegang KKP", badge: "PMK-196", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQATXP00XcMiQp4H_trU7dXFAXivMWsCJhfuX-wf841CDAQ?e=nbMGKx" },
    ],
  },
  {
    id: "perubahan",
    label: "Perubahan & Penutupan",
    docs: [
      { nama: "Format SK Perubahan Pemegang/Admin KKP", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA-Uli8vHvCTqydFy2bO1lvAbry7Uw8t-3N5feQwD7rIus?e=iPCBOA" },
      { nama: "Surat Permohonan Penutupan KKP (dilampiri Surat Referensi)", badge: "NON-PMK", href: "https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCSnEPYDl1VQan7V0m7FDu6AYYRUdGTG3wTZ3XlM4Edr24?e=MwupbZ" },
    ],
  },
];

function FormatDokumenKKPContent({ onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali ke Kartu Kredit
      </button>

      <Eyebrow>Kartu Kredit · 04</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Format Dokumen
      </h1>
      <p className="text-sm mb-12 max-w-2xl" style={{ color: c.inkSoft }}>
        Format surat untuk pengelolaan Kartu Kredit Pemerintah (KKP). File sedang disiapkan di SharePoint
        Kemenkeu — akan tersedia untuk dibuka secara bertahap.
      </p>

      <div className="flex flex-col gap-14">
        {kategoriDokumenKKP.map((kat) => (
          <section key={kat.id}>
            <h2 className="text-lg font-semibold mb-5 pb-3" style={{ ...fontDisplay, borderBottom: `1px solid ${c.line}` }}>
              {kat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kat.docs.map((doc, i) => (
                <DocCard key={i} doc={doc} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ===== Home =====
const waGrupRekening = [
  { bank: "Bank BRI", cakupan: "Nasional", inisial: "BRI", link: "https://kemenkeu-my.sharepoint.com/:b:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDM7ptapdAnT5V8BKbE1pTsAUrDWM8XC2-Fqt9dj0TPM7w?e=JvkWln" },
  { bank: "Bank BNI", cakupan: "Nasional", inisial: "BNI", link: "https://kemenkeu-my.sharepoint.com/:b:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDM7ptapdAnT5V8BKbE1pTsAUrDWM8XC2-Fqt9dj0TPM7w?e=JvkWln" },
  { bank: "Bank Mandiri", cakupan: "Pulau Jawa", inisial: "MDR", link: "https://kemenkeu-my.sharepoint.com/:b:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDM7ptapdAnT5V8BKbE1pTsAUrDWM8XC2-Fqt9dj0TPM7w?e=JvkWln" },
  { bank: "Bank Mandiri", cakupan: "Luar Pulau Jawa", inisial: "MDR", link: "https://kemenkeu-my.sharepoint.com/:b:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDM7ptapdAnT5V8BKbE1pTsAUrDWM8XC2-Fqt9dj0TPM7w?e=JvkWln" },
  { bank: "Bank BSI", cakupan: "Nasional", inisial: "BSI", link: "https://kemenkeu-my.sharepoint.com/:b:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDM7ptapdAnT5V8BKbE1pTsAUrDWM8XC2-Fqt9dj0TPM7w?e=JvkWln" },
];

function HomeContent({ onNavigate, onNavigateIsu }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      {/* ===== HERO: kerahasiaan + WA grup (kiri) | urgent + isu terkini (kanan, bertumpuk) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-6" style={{ background: c.line, border: `1px solid ${c.line}` }}>
        <div className="p-8 sm:p-10" style={{ background: c.navy }}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8" style={{ ...fontDisplay, color: c.paper, letterSpacing: "-0.01em" }}>
            Selalu jaga kerahasiaan data rekeningmu!
          </h2>

          <p className="text-xs uppercase mb-4" style={{ ...fontMono, color: c.gold, letterSpacing: "0.12em" }}>
            WhatsApp Grup Rekening
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {waGrupRekening.map((g, i) => (
              <a
                key={i}
                href={g.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3"
                style={{ border: "1px solid rgba(212,175,122,0.28)" }}
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                  style={{ width: 32, height: 32, border: `1px solid ${c.gold}`, color: c.goldBright, ...fontMono }}
                >
                  {g.inisial}
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: c.paper }}>{g.bank}</p>
                  <p className="text-xs" style={{ color: "#B7BECB" }}>{g.cakupan}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-sm" style={{ color: "#C7CCD9" }}>
            Agar selalu <em>up to date</em> dan bisa <em>sharing knowledge</em>, ayo gabung grup rekening! Klik
            salah satu di atas untuk buka daftar link undangan (perlu login akun Kemenkeu).
          </p>
        </div>

        <div className="flex flex-col gap-px">
          <div className="p-8 flex-1 flex flex-col justify-between" style={{ background: c.maroon }}>
            <div>
              <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.goldBright, letterSpacing: "0.12em" }}>
                Tindakan Urgent Terkini
              </p>
              <h3 className="text-lg sm:text-xl font-semibold mb-3" style={{ ...fontDisplay, color: c.paper, letterSpacing: "-0.01em" }}>
                [URGENT] Prosedur Serah Terima Rekening &amp; KKP sehubungan Mutasi
              </h3>
              <p className="text-sm mb-6" style={{ color: "#F0D9D9" }}>
                Sehubungan dengan mutasi KPA, Bendahara, Admin KKP, dan/atau pemegang kartu KKP di satker.
              </p>
            </div>
            <button
              onClick={onNavigate}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold self-start"
              style={{ background: c.goldBright, color: c.navyDeep }}
            >
              Pelajari →
            </button>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-between" style={{ background: c.navy }}>
            <div>
              <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.gold, letterSpacing: "0.12em" }}>
                Isu Rekening Terkini
              </p>
              <h3 className="text-lg sm:text-xl font-semibold mb-3" style={{ ...fontDisplay, color: c.paper, letterSpacing: "-0.01em" }}>
                RPL PS Penagihan — Boleh Dibuka Sesuai Kebutuhan!
              </h3>
              <p className="text-sm mb-6" style={{ color: "#C7CCD9" }}>
                Ketentuan pembukaan & kolaborasi KPA–Kasi P3–Bendahara untuk RPL Penampungan Sementara Penagihan.
              </p>
            </div>
            <button
              onClick={onNavigateIsu}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold self-start"
              style={{ border: `1px solid ${c.gold}`, color: c.goldBright }}
            >
              Pelajari →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Bantuan =====
function BantuanContent() {
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <Eyebrow>Kontak & Dukungan</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Bantuan
      </h1>
      <p className="text-sm mb-10 max-w-2xl" style={{ color: c.inkSoft }}>
        Untuk pertanyaan yang tidak terjawab di halaman lain, satker dapat menghubungi Bagian Keuangan —
        Subbagian Perbendaharaan, atau memakai jalur koordinasi berikut.
      </p>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold" style={fontDisplay}>Grup Rekening</h2>
          <Pill tone="gold">WAJIB GABUNG</Pill>
        </div>
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
          Setiap bank mitra punya satu grup WhatsApp koordinasi berisi Tim KPDJP, Tim Perbankan, dan seluruh
          Bendahara satker. Klik salah satu di bawah untuk buka daftar link undangan di SharePoint — perlu
          login akun Kemenkeu.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {waGrupRekening.map((g, i) => (
            <a
              key={i}
              href={g.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4"
              style={{ border: `1px solid ${c.line}`, background: c.paper }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                style={{ width: 36, height: 36, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}
              >
                {g.inisial}
              </span>
              <div>
                <p className="text-sm font-semibold">{g.bank}</p>
                <p className="text-xs" style={{ color: c.inkSoft }}>{g.cakupan}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Koordinasi dengan Bank Cabang Padanan</h2>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Senantiasa berkoordinasi dengan cabang padanan agar terbina hubungan baik antara satker dan bank.
          Jangan sungkan untuk bertanya atau sharing kendala — <em>sharing is caring</em>.
        </p>
      </section>

      <section>
        <div className="flex gap-4 p-6" style={{ background: c.maroon, boxShadow: `0 0 0 3px ${c.gold}` }}>
          <span className="text-lg leading-none flex-shrink-0" style={{ color: c.goldBright }}>★</span>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: c.paper }}>Pastikan akses perbankanmu aman. Hindari fraud.</p>
            <p className="text-sm" style={{ color: "#E8DCC8" }}>Jangan bagikan password akun perbankan (CMS, Dashboard) kepada siapa pun.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== FAQ =====
function FAQItem({ question, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ border: `1px solid ${c.line}`, borderTop: "none" }} className="first:border-t">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-5 p-6 text-left" style={{ background: open ? c.paperDim : c.paper }}>
        <p className="text-base font-semibold" style={fontDisplay}>{question}</p>
        <span className="text-sm flex-shrink-0 transition-transform" style={{ color: c.maroon, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </button>
      {open && <div className="p-6 pt-2">{children}</div>}
    </div>
  );
}

function FAQContent({ onOpenMutasiDetail, onOpenIsuPenagihan }) {
  const [tab, setTab] = useState("giro");
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <Eyebrow>Pertanyaan Umum</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        FAQ
      </h1>
      <p className="text-sm mb-8 max-w-2xl" style={{ color: c.inkSoft }}>
        Pertanyaan seputar Rekening Giro, Rekening Virtual, dan Kartu Kredit Pemerintah (KKP). Pilih tab sesuai
        topik, lalu klik pertanyaan untuk lihat jawabannya.
      </p>

      <TabSwitch
        tabs={[
          { id: "giro", label: "Rekening Giro" },
          { id: "virtual", label: "Rekening Virtual" },
          { id: "kkp", label: "Kartu Kredit" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "giro" && <FAQGiroList onOpenMutasiDetail={onOpenMutasiDetail} onOpenIsuPenagihan={onOpenIsuPenagihan} />}
      {tab === "virtual" && <FAQVirtualList onOpenMutasiDetail={onOpenMutasiDetail} />}
      {tab === "kkp" && <FAQKKPList onOpenMutasiDetail={onOpenMutasiDetail} />}

      <p className="text-xs mt-6" style={{ ...fontMono, color: c.inkSoft }}>
        Sumber: Tim Rekening KPDJP, "Pengelolaan Rekening" (Internal DJP, per Januari 2024); Tim Pengawasan KKP
        DJP, "URS Modul KKP" (Internal DJP, per Juli 2026).
      </p>
    </div>
  );
}

function FAQGiroList({ onOpenMutasiDetail, onOpenIsuPenagihan }) {
  return (
    <div className="flex flex-col">
      <FAQItem question="Kenapa Bendahara Pasti Punya Rekening?" defaultOpen>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Salah satu <em>jobdesk</em> yang melekat ke Bendahara adalah pengelolaan rekening — termasuk Rekening
          Lainnya (RPL) yang dibahas di tab ini.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          {[
            { no: "1", title: "Uang Masuk", desc: "Hampir setiap hari ada uang masuk dari KPPN dalam rangka pelaksanaan pembayaran dan operasional satker." },
            { no: "2", title: "Ditampung", desc: "Uang masuk perlu rekening satker yang kemudian dikelola oleh Bendahara." },
            { no: "3", title: "Disalurkan", desc: "Penyaluran uang atau pembayaran bisa lewat tarik tunai atau mekanisme transfer." },
          ].map((s) => (
            <div key={s.no} className="p-6" style={{ background: c.paper }}>
              <span
                className="inline-flex items-center justify-center text-xs font-semibold mb-3"
                style={{ width: 26, height: 26, background: c.navy, color: c.goldBright, ...fontMono }}
              >
                {s.no}
              </span>
              <p className="text-sm font-semibold mb-1.5">{s.title}</p>
              <p className="text-sm" style={{ color: c.inkSoft }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </FAQItem>

      <FAQItem question="Apa itu Rekening Lainnya (RPL)?">
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          RPL adalah kelompok rekening satker di luar Rekening Penerimaan dan Rekening Pengeluaran, diatur
          PMK-182/PMK.05/2017. Ada 9 jenis RPL — <strong style={{ color: c.ink }}>RPL PS dan PDT paling sering
          dipakai di DJP</strong>, sisanya dibuka sesuai kebutuhan.
        </p>
        <div className="flex flex-col" style={{ border: `1px solid ${c.line}` }}>
          {jenisRPL.slice(0, 4).map((j, i) => (
            <div
              key={j.kode}
              className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 sm:gap-6 p-4"
              style={{ background: c.paper, borderTop: i === 0 ? "none" : `1px solid ${c.line}` }}
            >
              <div>
                <span
                  className="inline-block text-xs px-2 py-1"
                  style={{ ...fontMono, color: c.paper, background: c.maroon, letterSpacing: "0.08em" }}
                >
                  {j.kode}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{j.nama}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{j.ket}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: c.inkSoft }}>
          {jenisRPL.length - 4} jenis RPL lainnya bisa dilihat lengkap di menu Rekening Giro → Regulasi Rekening.
        </p>
      </FAQItem>

      <FAQItem question="Siapa yang Berwenang Mengelola Rekening RPL?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">KPA (Kuasa Pengguna Anggaran)</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Pemegang kewenangan utama — pembukaan, pengoperasian, penutupan, dan pelaporan rekening.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Kepala Satker / Pimpinan BLU</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Mengambil alih kewenangan khusus untuk RPL tertentu (BLU, Dana Jaminan, Dana Titipan, RPL PS) bila KPA tidak dapat melakukannya.</p>
          </div>
        </div>
      </FAQItem>

      <FAQItem question="RPL PS untuk Penagihan, Boleh Dibuka?">
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
          Boleh — satker (khusus Unit Vertikal: Kanwil & KPP) sudah bisa membuka dan mengoperasikan RPL PS
          untuk Penagihan sekarang juga, sesuai prosedur umum PMK-182/PMK.05/2017.
        </p>
        {onOpenIsuPenagihan && (
          <button
            onClick={onOpenIsuPenagihan}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
            style={{ background: c.maroon, color: c.paper }}
          >
            📖 Lihat Panduan Lengkap →
          </button>
        )}
      </FAQItem>

      <FAQItem question="Kapan Rekening RPL Wajib Disetor/Dikosongkan?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>RPL PS Penagihan:</strong> seluruh hasil penjualan wajib disetor
          paling lambat 31 Desember. Kalau tidak bisa, Kasi P3 buat Berita Acara, lapor ke Kepala Kantor &
          Kasubbag Umum dan Kepatuhan Internal. Untuk RPL lain, ikuti tujuan penggunaan masing-masing sesuai
          dasar persetujuan pembukaannya.
        </p>
      </FAQItem>

      <FAQItem question="Apa itu CMS?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>CMS (Cash Management System)</strong> — tools/website bank untuk
          transaksi online seperti transfer dan bayar pajak. Sangat disarankan semua satker punya akses CMS
          untuk tiap rekening RPL yang dikelola.
        </p>
      </FAQItem>

      <FAQItem question="Ada Mutasi KPA/Bendahara, Harus Ngapain?">
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
          Singkatnya: pejabat lama wajib bikin BAST, pejabat baru lapor ke bank & pastikan aksesnya jalan.
          Prosedur lengkap per bank (BRI/Mandiri/BNI/BSI) beda-beda.
        </p>
        {onOpenMutasiDetail && (
          <button
            onClick={() => onOpenMutasiDetail("rekening")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
            style={{ background: c.maroon, color: c.paper }}
          >
            📖 Lihat Panduan Lengkap →
          </button>
        )}
      </FAQItem>

      <FAQItem question="Bisa Pindah Bank? Bagaimana Caranya?">
        <p className="text-sm" style={{ color: c.ink }}>
          Bisa. Untuk RPL, satker mengajukan permohonan perubahan bank tempat pembukaan rekening langsung ke{" "}
          <strong>KPPN mitra kerja</strong>, lalu memindahkan ke salah satu dari 4 bank mitra: Bank Mandiri, Bank
          BRI, Bank BNI, atau Bank BSI.
        </p>
      </FAQItem>

      <FAQItem question="Permohonan RPL Ditolak KPPN, Harus Bagaimana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Konsultasikan ke KPPN mitra kerja untuk menanyakan dua hal: dokumen apa yang masih kurang lengkap,
          atau ketentuan mana dari PMK-182/PMK.05/2017 yang belum terpenuhi sehingga permohonan ditolak. Setelah
          itu, satker bisa melengkapi dan mengajukan ulang permohonan pembukaan.
        </p>
      </FAQItem>

      <FAQItem question="Bisa Punya Lebih dari 1 RPL Jenis yang Sama?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Bisa. Satu satker boleh membuka lebih dari satu RPL dengan jenis yang sama, selama tujuan
          penggunaannya berbeda. Contoh yang sudah berjalan di DJP:
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "RPL PS Tunjangan Kinerja dan RPL PS Penagihan — dua-duanya RPL PS, tapi untuk keperluan yang berbeda.",
            "RPL Penyidikan — dibuka khusus di tingkat Kanwil.",
            "Jenis RPL lain juga bisa dibuka sesuai kebutuhan yang muncul ke depan, misalnya RPL Bantuan Global atau RPL PS Penampungan Efek.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </FAQItem>

      <FAQItem question="RPL yang Sudah Tidak Dipakai, Perlu Ditutup?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Bank biasanya akan menonaktifkan otomatis RPL yang tidak ada transaksi selama <strong style={{ color: c.ink }}>6
          bulan sampai 1 tahun</strong>. Kalau rekening itu ternyata masih mau dipakai lagi, satker cukup
          mengajukan permohonan ke bank untuk mengaktifkan kembali statusnya — tidak perlu membuka rekening baru.
        </p>
      </FAQItem>

      <FAQItem question="Rekonsiliasi RPL ke KPPN, Berapa Sering?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Umumnya <strong style={{ color: c.ink }}>setiap bulan</strong>, dituangkan dalam Berita Acara
          rekonsiliasi. Karena ketentuan teknis ini bisa berubah atau berbeda mekanismenya antar KPPN, tetap
          konfirmasi ke KPPN mitra kerja masing-masing untuk memastikan jadwal dan mekanisme yang berlaku saat
          ini.
        </p>
      </FAQItem>

      <FAQItem question="KPA Berhalangan Sementara (Bukan Mutasi), Siapa yang Menggantikan?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Kalau KPA berhalangan sementara — misalnya cuti panjang — bukan mutasi permanen, penggantiannya lewat{" "}
          <strong style={{ color: c.ink }}>Pelaksana Harian (Plh) atau Pelaksana Tugas (Plt) KPA</strong>, bukan
          proses mutasi penuh. Satker tetap wajib memberitahukan ke bank perihal penunjukan ini, disertai surat
          penunjukan Plh/Plt, dan mengubah data pemegang akun ke bank kalau memang diperlukan.
        </p>
      </FAQItem>

      <FAQItem question="Apa Saja 9 Jenis RPL yang Ada?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          RPL PS dan PDT paling sering dipakai di DJP. 7 jenis lainnya dibuka sesuai kebutuhan spesifik:
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "BLU — untuk satker berstatus Badan Layanan Umum.",
            "PWK — khusus perwakilan RI di luar negeri.",
            "DB — menyalurkan dana bantuan ke penerima lewat bank penyalur.",
            "PDHL — pengelolaan hibah langsung dalam bentuk uang.",
            "PDH — menyalurkan dana dari Rekening Penampungan Dana Hibah Langsung.",
            "KS — menampung dana kerja sama dua pihak.",
            "PDJ — menampung dana jaminan pihak ketiga yang akan dikembalikan.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </FAQItem>

      <FAQItem question="Berapa Lama Proses Persetujuan Pembukaan RPL di KPPN?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          KPPN menerbitkan persetujuan atau penolakan <strong style={{ color: c.ink }}>paling lambat 5 hari
          kerja</strong> sejak permohonan diterima. Surat persetujuan yang terbit berlaku selama{" "}
          <strong style={{ color: c.ink }}>15 hari kerja</strong> — satker harus buka rekening di bank dalam
          jangka waktu itu. Setelah rekening dibuka, laporan pembukaan wajib disampaikan ke KPPN paling lambat
          20 hari kerja sejak surat persetujuan terbit.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa Rekening RPL Wajib Didaftarkan ke SIKKA?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Karena itu kewajiban Bendahara — setiap RPL PS wajib didaftarkan dan/atau dimutakhirkan datanya di
          Sistem Informasi Keuangan, Kepegawaian, dan Aktiva (SIKKA). Ini bukan opsional; kalau data di SIKKA
          tidak sesuai dengan rekening yang sebenarnya, satker berisiko dianggap belum tertib administrasi saat
          pemeriksaan.
        </p>
      </FAQItem>

      <FAQItem question="Apa itu Program TNP untuk Bunga/Jasa Giro?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          TNP adalah program konsolidasi otomatis untuk penyetoran bunga/jasa giro rekening ke Kas Negara. Kalau
          rekening sudah ikut TNP, penyetorannya otomatis terkonsolidasi — satker tidak perlu menyetor manual
          tiap bulan. Kalau belum ikut, satker harus menyetorkan sendiri ke Kas Negara setiap akhir bulan.
          Sangat dianjurkan mendaftarkan rekening ke program TNP untuk memudahkan pengelolaan.
        </p>
      </FAQItem>

      <FAQItem question="Kapan Batas Waktu Lapor Saldo Bulanan ke KPPN?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Paling lambat <strong style={{ color: c.ink }}>tanggal 10 bulan berikutnya</strong>, untuk seluruh
          rekening yang dikelola satker. Kalau tanggal 10 jatuh pada hari libur, laporan disampaikan pada hari
          kerja sebelumnya — bukan diundur ke hari kerja setelahnya.
        </p>
      </FAQItem>

      <FAQItem question="Kapan Rekening RPL Dianggap Pasif dan Wajib Ditutup?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Rekening dikategorikan pasif kalau tidak ada transaksi debit maupun kredit selama{" "}
          <strong style={{ color: c.ink }}>1 tahun</strong> sejak transaksi terakhir. KPPN akan mengirim surat
          pemberitahuan rekening pasif <strong style={{ color: c.ink }}>6 bulan sebelum</strong> batas waktu
          penutupan — jadi satker masih ada waktu untuk merespons sebelum ditutup paksa.
        </p>
      </FAQItem>

      <FAQItem question="Bisa Ubah Nama Rekening Kalau Ada Perubahan Nomenklatur Satker?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Bisa. Satker mengajukan permohonan persetujuan perubahan nama Rekening ke KPPN mitra kerja, tanpa
          mengubah tujuan penggunaan rekening. KPPN lalu menerbitkan Surat Perubahan Nama Rekening yang
          ditujukan ke bank, dan bank yang mengeksekusi perubahan nama sekaligus memberi tahu KPPN dan satker.
        </p>
      </FAQItem>

      <FAQItem question="Bisa Ajukan Pindah Bank Secara Kolektif untuk Banyak Rekening?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Tidak bisa. Perubahan bank tempat pembukaan rekening diajukan satu per satu, tidak bisa kolektif untuk
          banyak rekening sekaligus — meskipun rekening-rekening itu dikelola satker yang sama.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa Nama Rekening RPL Punya Format Khusus?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Supaya bisa langsung dikenali jenis dan asal-usulnya. Formatnya kira-kira: <strong style={{ color: c.ink }}>"RPL
          (kode KPPN) (kode jenis, mis. PS) (nama satker) untuk ..."</strong> — jadi siapa pun yang melihat nama
          rekening di rekening koran bisa langsung tahu itu RPL jenis apa, punya satker mana, dan di bawah KPPN
          mana, tanpa perlu buka dokumen pendukung lain.
        </p>
      </FAQItem>

      <FAQItem question="Siapa yang Bertanggung Jawab Membukukan Transaksi RPL?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Bendahara satker. Bendahara wajib membukukan dan mempertanggungjawabkan seluruh dana yang keluar-masuk
          di rekening RPL yang dikelolanya — bukan cuma menyimpan bukti transaksi, tapi juga mencatatnya secara
          tertib sebagai bagian dari laporan pertanggungjawaban.
        </p>
      </FAQItem>

      <FAQItem question="Bagaimana Seksi P3 dan Bendahara Berkoordinasi soal RPL PS Penagihan?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Kolaborasi penggunaan rekening RPL PS Penagihan mengikuti ketentuan di masing-masing kantor. Praktik
          yang dianjurkan: pemberitahuan adanya pengkreditan (uang masuk) dan rencana pendebitan (uang keluar)
          disampaikan lewat Nota Dinas oleh Seksi P3 — ini jadi dasar Bendahara melakukan transaksi, sekaligus
          dokumen pendukung yang dilampirkan dalam Laporan Pertanggungjawaban Bendahara.
        </p>
      </FAQItem>

      <FAQItem question="Format Surat yang Dibutuhkan Ada di Mana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Buka menu <strong style={{ color: c.ink }}>Rekening Giro</strong>, lalu masuk ke submenu{" "}
          <strong style={{ color: c.ink }}>Format Dokumen</strong>. Semua format sudah dikelompokkan per
          kategori (Pembukaan, Perubahan & Penutupan, Non-PMK) — klik untuk membuka langsung di SharePoint
          Kemenkeu.
        </p>
      </FAQItem>
    </div>
  );
}

function FAQVirtualList({ onOpenMutasiDetail }) {
  return (
    <div className="flex flex-col">
      <FAQItem question="Rekening Virtual (VA) itu Apa, Bedanya dari Giro?" defaultOpen>
        <div className="overflow-x-auto" style={{ border: `1px solid ${c.line}` }}>
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className="text-left p-4" style={{ borderBottom: `1px solid ${c.line}` }}></th>
                <th className="text-left p-4" style={{ ...fontDisplay, borderBottom: `1px solid ${c.line}`, background: c.paperDim }}>Rekening Giro</th>
                <th className="text-left p-4" style={{ ...fontDisplay, borderBottom: `1px solid ${c.line}`, background: c.paperDim }}>Rekening Virtual (VA)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cakupan", "Hanya untuk jenis RPL", "Untuk seluruh rekening BPG, BPP, dan BPG VAT"],
                ["Dasar hukum", "PMK-182/PMK.05/2017 — pembukaan s.d. penutupan", "PMK-183/PMK.05/2019 — pembukaan & penutupan (pengoperasian relatif sama dengan PMK-182)"],
                ["Data rekening", "Terpisah-pisah, kantor pusat DJP tidak dapat memonitor", "Terkonsolidasi dan tersambung lewat kanal Dashboard"],
                ["Pengambilan uang", "Cek/bilyet giro. Internet banking bisa dipakai sebagaimana mestinya", "Surat pendebitan (SPPR). Internet banking dipakai berdampingan dengan Dashboard"],
                ["Penyelesaian kendala", "Lewat cabang padanan masing-masing", "Bisa di cabang, grup WhatsApp Satker–KPDJP–Bank, atau channel khusus bank"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-4 text-xs font-semibold align-top" style={{ ...fontMono, color: c.inkSoft, borderBottom: i < 4 ? `1px solid ${c.line}` : "none" }}>{row[0]}</td>
                  <td className="p-4 align-top" style={{ color: c.inkSoft, borderBottom: i < 4 ? `1px solid ${c.line}` : "none" }}>{row[1]}</td>
                  <td className="p-4 align-top" style={{ color: c.inkSoft, borderBottom: i < 4 ? `1px solid ${c.line}` : "none" }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FAQItem>

      <FAQItem question="Kenapa Permohonan Rekening Virtual Harus Lewat Eselon I?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Beda dari RPL yang satker ajukan langsung ke KPPN, Rekening Satker (BPG/BPP) itu sub-akun virtual
          yang terkonsolidasi ke satu Rekening Induk di tingkat Eselon I. Karena itu, permohonan pembukaan,
          perubahan, maupun penutupan Rekening Satker harus lewat Eselon I (di DJP: Sekretariat DJP/Bagian
          Keuangan Kantor Pusat) dulu, baru diteruskan ke KPPN Jakarta II.
        </p>
      </FAQItem>

      <FAQItem question="BPG, BPP, dan BPG VAT — Apa Bedanya?">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-5" style={{ background: c.paper }}>
            <div className="flex items-center gap-2 mb-2 flex-wrap"><p className="text-sm font-semibold">BPG</p><Pill>SUDAH PASTI ADA</Pill></div>
            <p className="text-sm" style={{ color: c.inkSoft }}>Menampung dana operasional harian. Hanya 1 per satker — tidak bisa dibuka baru.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <div className="flex items-center gap-2 mb-2 flex-wrap"><p className="text-sm font-semibold">BPP</p><Pill tone="gold">OPSIONAL</Pill></div>
            <p className="text-sm" style={{ color: c.inkSoft }}>Dananya dari BPG. Biasanya untuk satker yang punya KP2KP. Boleh lebih dari 1.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <div className="flex items-center gap-2 mb-2 flex-wrap"><p className="text-sm font-semibold">BPG VAT</p><Pill tone="gold">TERBATAS</Pill></div>
            <p className="text-sm" style={{ color: c.inkSoft }}>Untuk VAT Refund di bandara besar. Saat ini hanya di 5 satker.</p>
          </div>
        </div>
      </FAQItem>

      <FAQItem question="Apa itu Rekening Induk dan Struktur Konsolidasi VA?">
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Rekening Satker yang satker pegang sehari-hari sebenarnya cuma nomor identifikasi virtual di bawah
          Rekening Induk yang dikelola kantor pusat. Satker tidak perlu mengurus Rekening Induk itu sendiri.
        </p>
        <StrukturDiagram />
      </FAQItem>

      <FAQItem question="Kapan Rekening Virtual Wajib Disetor/Dikosongkan?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>Rekening Virtual (BPG/BPP):</strong> saldo UP/TUP wajib nihil di
          akhir hari kerja tahun anggaran.
        </p>
      </FAQItem>

      <FAQItem question="Apa itu CMS dan Dashboard?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">CMS (Cash Management System)</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Tools/website bank untuk transaksi online — transfer, bayar pajak, dsb. Sangat disarankan semua satker punya.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Dashboard</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Website yang mencatat seluruh transaksi satker, terkonsolidasi & bisa dilihat KPDJP/Kementerian/DJPb. Hanya ada untuk rekening Virtual.</p>
          </div>
        </div>
      </FAQItem>

      <FAQItem question="Kartu Debit Hilang atau Rusak, Harus Bagaimana?">
        <ol className="flex flex-col gap-3">
          {[
            "Segera kontak PIC Rekening atau beritahukan di Grup Rekening.",
            "Bank Pusat biasanya menghubungi satker & Bank Cabang untuk otorisasi tarik tunai teller sementara tanpa kartu debit — akses Dashboard tetap bisa dipakai untuk memantau transaksi.",
            "Bank Pusat menerbitkan kartu debit baru, dikirim lewat Bank Cabang ke satker.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
              <span className="flex-shrink-0 flex items-center justify-center text-xs font-semibold" style={{ width: 20, height: 20, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}>{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </FAQItem>

      <FAQItem question="Ada Mutasi KPA/Bendahara, Harus Ngapain?">
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
          Singkatnya: pejabat lama wajib bikin BAST (termasuk akses Dashboard), pejabat baru lapor ke bank &
          pastikan aksesnya jalan. Prosedur lengkap per bank (BRI/Mandiri/BNI/BSI) beda-beda.
        </p>
        {onOpenMutasiDetail && (
          <button
            onClick={() => onOpenMutasiDetail("rekening")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
            style={{ background: c.maroon, color: c.paper }}
          >
            📖 Lihat Panduan Lengkap →
          </button>
        )}
      </FAQItem>

      <FAQItem question="Bisa Pindah Bank? Bagaimana Caranya?">
        <p className="text-sm" style={{ color: c.ink }}>
          Bisa. Satker mengajukan permohonan lewat <strong>Eselon I</strong> ke <strong>KPPN Jakarta II</strong>,
          lalu membuka rekening VA baru di bank tujuan — satker akan pegang <strong>2 rekening VA aktif
          sementara</strong> selama masa transisi sebelum yang lama ditutup.
        </p>
      </FAQItem>

      <FAQItem question="Saldo Dashboard Beda dengan Catatan Bank, Harus Bagaimana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Hubungi Bank Pusat lewat Grup Rekening WhatsApp, atau lewat kanal resmi perbankan (email/telepon), untuk
          meminta rekonsiliasi ulang antara data Dashboard dan catatan bank. Jangan mendiamkan selisih ini —
          makin cepat dilaporkan, makin gampang ditelusuri sumber selisihnya.
        </p>
      </FAQItem>

      <FAQItem question="BPG VAT — Satker Mana Saja yang Punya, Bisa Nambah?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Saat ini BPG VAT hanya ada di 5 satker:
        </p>
        <ul className="flex flex-col gap-2 mb-4">
          {[
            "KPP Pratama Lubuk Pakam",
            "KPP Pratama Tangerang Barat",
            "KPP Pratama Sidoarjo Utara",
            "KPP Pratama Badung Selatan",
            "KPP Pratama Wates",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Satker di luar daftar ini tidak bisa mengajukan BPG VAT sendiri, kecuali ada ketentuan baru dari
          regulasi VAT Refund yang mengizinkannya.
        </p>
      </FAQItem>

      <FAQItem question="Lupa Akses Dashboard (Bukan karena Mutasi), Harus Bagaimana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Buat surat permohonan perubahan data perbankan, isi dengan data akses yang baru yang dibutuhkan
          satker. Ini prosedur yang sama dengan permohonan perubahan data pemegang CMS & Dashboard saat mutasi
          — cuma alasannya beda, bukan karena pergantian pejabat.
        </p>
      </FAQItem>

      <FAQItem question="Berapa Maksimal Jumlah BPP yang Boleh Dibuka?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Tidak ada batas angka pasti — jumlah BPP yang dibuka bebas mengikuti kebutuhan satker, dengan{" "}
          <strong style={{ color: c.ink }}>maksimal sebanyak jumlah KP2KP</strong> yang dimiliki satker tersebut,
          kecuali ada pengecualian khusus dari regulasi yang berlaku untuk satker tertentu.
        </p>
      </FAQItem>

      <FAQItem question="SPPR — Siapa yang Harus Tanda Tangan?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Surat Perintah Pendebitan Rekening (SPPR) ditandatangani <strong style={{ color: c.ink }}>KPA/PPK
          dan Bendahara</strong>. Wajib dibuat untuk:
        </p>
        <ul className="flex flex-col gap-2 mb-4">
          {[
            "Penarikan tunai lewat teller — SPPR diserahkan ke teller, salinannya disimpan satker sebagai arsip.",
            "Penarikan tunai lewat ATM — SPPR disimpan sebagai arsip pendukung transaksi.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Untuk transaksi lewat CMS, SPPR tidak diperlukan — dasar pendebitannya sudah tercatat otomatis di
          sistem CMS.
        </p>
      </FAQItem>

      <FAQItem question="Berapa Lama Proses Pembukaan Rekening Virtual?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Eselon I meneruskan permohonan ke Kuasa BUN di Daerah <strong style={{ color: c.ink }}>paling lambat 5
          hari kerja</strong> sejak diterima dari satker. Setelah disetujui, bank membuka Rekening Satker dan
          mengirimkan user Dashboard, akses CMS, serta kartu debit ke satker <strong style={{ color: c.ink }}>paling
          lambat 10 hari kerja</strong>.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa BPP Harus di Bank yang Sama dengan BPG Induknya?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Karena Rekening Pengeluaran Pembantu (BPP) memang dibuka di bank mitra yang sama dengan Rekening
          Pengeluaran (BPG) satker yang bersangkutan — bukan pilihan bebas. Ini bagian dari desain struktur
          konsolidasi VA, supaya pengkreditan BPP tetap bisa otomatis terhubung ke Rekening Induk lewat BPG
          induknya.
        </p>
      </FAQItem>

      <FAQItem question="Siapa yang Mengoperasikan BPG vs BPP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>Rekening Pengeluaran (BPG)</strong> dioperasikan oleh Bendahara
          Pengeluaran. <strong style={{ color: c.ink }}>Rekening Pengeluaran Pembantu (BPP)</strong> dioperasikan
          oleh Bendahara Pengeluaran Pembantu — beda orang, beda rekening, meski dananya berasal dari BPG yang
          sama.
        </p>
      </FAQItem>

      <FAQItem question="Kapan Transaksi Tunai Boleh Dipakai di Rekening Virtual?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Transaksi diusahakan selalu non-tunai (lewat CMS atau kartu debit). Tunai hanya untuk kondisi tertentu:
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Gangguan sistem perbankan.",
            "Pihak ketiga (penerima pembayaran) tidak menerima transaksi non-tunai.",
            "Keadaan kahar — bencana, epidemik, kerusuhan.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </FAQItem>

      <FAQItem question="Kapan SPPR Wajib Dibuat?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Setiap kali ada pengambilan tunai — baik lewat ATM maupun teller — wajib disertai Kartu Debit{" "}
          <strong style={{ color: c.ink }}>DAN</strong> Surat Perintah Pendebitan Rekening (SPPR). Formatnya ada
          di Lampiran PMK-183/PMK.05/2019. Transaksi lewat CMS tidak butuh SPPR terpisah, karena dasar
          pendebitannya sudah tercatat otomatis di sistem CMS.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa Saldo UP/TUP Rekening Virtual Harus Nihil di Akhir Tahun?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Ini kewajiban penihilan akhir tahun anggaran — pada akhir hari kerja tahun anggaran, sisa saldo
          Rekening Pengeluaran yang bersumber dari dana UP/TUP wajib nihil, mengikuti ketentuan PMK mengenai
          tata cara pembayaran APBN dan pedoman akhir tahun anggaran.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa Rekening Virtual Tidak Perlu Lapor Manual ke KPPN Seperti RPL?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Karena pelaporan saldo Rekening Pengeluaran sudah dihasilkan secara elektronik lewat Dashboard yang
          diberikan bank — beda dari RPL yang harus disusun dan dikirim manual tiap bulan. Satker cukup pastikan
          akses Dashboard aktif dan dipantau rutin.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa Proses Pindah Bank Rekening Virtual Bisa Sampai 13 Langkah?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Karena rekening VA bukan cuma dipindah begitu saja — prosesnya harus melalui Eselon I, KPPN Jakarta
          II, bank lama, dan bank baru secara berurutan, plus ada masa transisi di mana satker memegang 2
          rekening VA aktif sekaligus sebelum yang lama benar-benar ditutup. Setiap tahap punya dokumen dan
          pihak yang berbeda, makanya jadi panjang.
        </p>
      </FAQItem>

      <FAQItem question="Bisa Buka VA Baru Khusus untuk KP2KP? Bagaimana Caranya?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Bisa. Berlaku untuk KP2KP yang perlu membuka rekening VA baru, memakai bank yang sama dengan Bank BPG
          induknya. Prosesnya mirip pembukaan rekening biasa: surat permohonan sesuai Format IV lewat aplikasi
          Nadine ke Sekretaris Direktorat Jenderal Pajak, diteruskan Kantor Pusat DJP ke KPPN Jakarta II, sampai
          akhirnya VA baru aktif dan terdaftar di SAKTI dan SPAN. Detail lengkapnya ada di menu Regulasi Rekening
          Virtual bagian "Kasus Khusus KP2KP".
        </p>
      </FAQItem>

      <FAQItem question="Berapa Lama Satker Pegang 2 Rekening VA Aktif Saat Pindah Bank?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Sampai rekening VA baru dipastikan lancar menerima SP2D dari KPPN dan Laporan Pemindahbukuan (Format
          X) sudah dibuat — baru setelah itu KPPN Jakarta II menerbitkan surat perintah penutupan ke bank lama.
          Tidak ada angka hari pasti karena tergantung kecepatan verifikasi tiap tahap; yang penting satker
          tidak menutup rekening lama sebelum rekening baru benar-benar berfungsi penuh.
        </p>
      </FAQItem>

      <FAQItem question="Format Surat yang Dibutuhkan Ada di Mana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Buka menu <strong style={{ color: c.ink }}>Rekening Virtual</strong>, lalu masuk ke submenu{" "}
          <strong style={{ color: c.ink }}>Format Dokumen</strong>. Semua format sudah dikelompokkan per
          kategori — klik untuk membuka langsung di SharePoint Kemenkeu.
        </p>
      </FAQItem>
    </div>
  );
}

function FAQKKPList({ onOpenMutasiDetail }) {
  return (
    <div className="flex flex-col">
      <FAQItem question="KKP-BO vs KKP-PD — Apa Bedanya?" defaultOpen>
        <div className="flex flex-col" style={{ border: `1px solid ${c.line}` }}>
          {jenisKKP.map((j, i) => (
            <div
              key={j.kode}
              className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 sm:gap-6 p-4"
              style={{ background: c.paper, borderTop: i === 0 ? "none" : `1px solid ${c.line}` }}
            >
              <div>
                <span
                  className="inline-block text-xs px-2 py-1"
                  style={{ ...fontMono, color: c.paper, background: c.maroon, letterSpacing: "0.08em" }}
                >
                  {j.kode}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{j.nama}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{j.ket}</p>
              </div>
            </div>
          ))}
        </div>
      </FAQItem>

      <FAQItem question="Siapa yang Berwenang Mengelola KKP di Satker?">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">KPA</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Kepala Kantor (Sesditjen di Kantor Pusat). Menunjuk Admin KKP, satu-satunya yang berwenang menyetujui/menandatangani SK.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Admin KKP</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Ditunjuk KPA untuk mengelola operasional KKP sehari-hari — PKS, SK, pengajuan kartu. Boleh lebih dari satu.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">PPK</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Menguji bukti pengeluaran, mengesahkan DPT KKP, menerbitkan/menolak SPBy.</p>
          </div>
        </div>
      </FAQItem>

      <FAQItem question="Apa itu PKS dan SK/KEP untuk KKP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Dua dokumen dasar yang wajib ada sebelum satker bisa punya kartu apa pun.{" "}
          <strong style={{ color: c.ink }}>PKS (Perjanjian Kerja Sama)</strong> adalah perjanjian satker dengan
          bank penerbit kartu. <strong style={{ color: c.ink }}>SK/KEP</strong> adalah Surat Keputusan KPA yang
          menetapkan siapa saja pemegang kartu dan Admin KKP — dasar hukum satu-satunya, bukan sekadar
          penunjukan lisan atau memo internal.
        </p>
      </FAQItem>

      <FAQItem question="Kanal Transaksi KKP — EDC, e-Katalog, DIGIPay, Apa Bedanya?">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">EDC</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Mesin Electronic Data Capture milik rekanan — kanal paling umum untuk KKP-BO dan KKP-PD.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">e-Katalog</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Katalog elektronik LKPP — membuka batas nilai lebih tinggi (sampai Rp200 juta) khusus produk dalam negeri UMK.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">DIGIPay</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Marketplace pembayaran pemerintah milik Kemenkeu — batas nilai sama seperti e-Katalog.</p>
          </div>
        </div>
      </FAQItem>

      <FAQItem question="Berapa Maksimal Kartu yang Boleh Dipegang Satu Orang?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Maksimal <strong style={{ color: c.ink }}>2 kartu aktif per pemegang</strong> — 1 KKP-BO dan 1 KKP-PD
          sekaligus, tidak lebih dari itu masing-masing.
        </p>
      </FAQItem>

      <FAQItem question="Kartu KKP Hilang atau Rusak, Harus Bagaimana?">
        <ol className="flex flex-col gap-3">
          {[
            "Segera ajukan Surat Permohonan Penutupan KKP ke bank penerbit, dilampiri surat kehilangan untuk kartu yang hilang.",
            "Setelah kartu ditutup, Admin KKP mengajukan kartu pengganti lewat Surat Permohonan Penerbitan KKP yang sama seperti pengajuan kartu baru — karena pemegangnya tetap sama, tidak perlu melalui siklus perubahan SK.",
            "Catat kejadian ini pada dokumentasi internal satker.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
              <span className="flex-shrink-0 flex items-center justify-center text-xs font-semibold" style={{ width: 20, height: 20, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}>{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </FAQItem>

      <FAQItem question="Ada Mutasi Pemegang Kartu atau Admin KKP, Harus Ngapain?">
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>
          Singkatnya: SK diperbarui dulu lewat persetujuan KPA — baru kartu bisa ditarik/diterbitkan ke bank
          (kalau pemegang kartu yang berubah), atau bank cukup diberitahu sebagai update kontak (kalau cuma
          Admin KKP yang berubah).
        </p>
        {onOpenMutasiDetail && (
          <button
            onClick={() => onOpenMutasiDetail("kkp")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
            style={{ background: c.maroon, color: c.paper }}
          >
            📖 Lihat Panduan Lengkap →
          </button>
        )}
      </FAQItem>

      <FAQItem question="Kenapa Ada Istilah Kartu Dormant?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Kartu dormant adalah kartu yang tetap aktif secara sistem meski pemegangnya sudah mutasi, pensiun,
          meninggal dunia, atau cuti di luar tanggungan negara — biasanya karena SK-nya tidak segera
          diperbarui. Ini isu kepatuhan, bukan sekadar urusan administratif yang bisa ditunda: segera proses
          perubahan SK dan penarikan kartu begitu kondisi ini terjadi.
        </p>
      </FAQItem>

      <FAQItem question="Bisa Naikkan Limit KKP-BO?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Bisa. KPA mengajukan permohonan ke bank penerbit disertai justifikasi kebutuhan — umumnya untuk
          transaksi lewat e-Katalog atau DIGIPay. Limit KKP-BO dapat dinaikkan dari batas umum Rp50 juta sampai
          maksimal Rp200 juta per rekanan, khusus untuk transaksi produk dalam negeri UMK.
        </p>
      </FAQItem>

      <FAQItem question="Pilih DIGIPay atau e-Katalog, Ada Kriterianya?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Tidak ada kriteria kelayakan khusus yang membedakan keduanya — pemilihan kanal mengikuti ketentuan
          pengadaan yang berlaku dan ketersediaan penyedia/produk di masing-masing kanal saat transaksi
          dilakukan.
        </p>
      </FAQItem>

      <FAQItem question="Ada Sanksi Kalau KKP Dipakai di Luar Peruntukan?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Ada. Kalau kartu dipakai untuk transaksi di luar peruntukannya (misalnya untuk keperluan non-operasional),
          tagihan tersebut <strong style={{ color: c.ink }}>tidak dapat dibebankan ke APBN</strong>. Satker
          dan/atau pemegang KKP yang melakukan transaksi tersebut wajib mengganti sendiri tagihannya.
        </p>
      </FAQItem>

      <FAQItem question="Kanwil atau Kantor Pusat Bisa Pakai KKP Satker Lain?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Tidak bisa. KKP sifatnya <strong style={{ color: c.ink }}>satu kartu untuk satu satker</strong> —
          Kanwil dan Kantor Pusat tidak bisa menggunakan KKP milik satker/KPP di bawahnya, dan begitu juga
          sebaliknya. Setiap satker mengelola KKP-nya masing-masing lewat PKS dan SK-nya sendiri.
        </p>
      </FAQItem>

      <FAQItem question="Apa Dasar Hukum KKP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>PMK-196/PMK.05/2018</strong> tentang Tata Cara Pembayaran dan
          Penggunaan Kartu Kredit Pemerintah, sebagaimana diubah dengan{" "}
          <strong style={{ color: c.ink }}>PMK-97/PMK.05/2021</strong>. Khusus di lingkungan DJP, ada juga{" "}
          <strong style={{ color: c.ink }}>Nota Dinas ND-1951/PJ.01/2026</strong> yang mengimbau seluruh satker
          menggunakan KKP dan menetapkan 5 dokumen administrasi wajib.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa DJP Mengimbau Satker Pakai KKP?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Per ND-1951/PJ.01/2026, ada 4 pertimbangan utama:
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Fleksibel — jangkauan pemakaian luas, transaksi bisa di seluruh merchant yang menerima EDC/media daring.",
            "Aman — menghindari penyimpangan (fraud) dari transaksi tunai.",
            "Efektif — mengurangi Uang Persediaan (UP) yang menganggur (idle cash) dan biaya dana (cost of fund) pemerintah.",
            "Akuntabel — pembayaran tagihan negara dan pembebanan biaya UP KKP lebih mudah dipertanggungjawabkan.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: c.inkSoft }}>
              <span style={{ color: c.maroon, flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </FAQItem>

      <FAQItem question="Apa Saja 5 Dokumen Wajib Administrasi KKP?">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Sesuai ND-1951/PJ.01/2026, satker wajib punya kelengkapan dokumen administrasi berikut:
        </p>
        <ol className="flex flex-col gap-2">
          {[
            "SK KPA tentang Daftar Pemegang KKP dan Daftar Administrator KKP.",
            "Perjanjian Kerja Sama (PKS) antara Satker dengan Bank Penerbit KKP.",
            "Surat Permohonan Penerbitan KKP kepada Bank Penerbit, dilampiri Surat Referensi.",
            "Surat Perjanjian Penggunaan KKP antara KPA dengan Pemegang KKP.",
            "Berita Acara Serah Terima (BAST) KKP antara KPA dengan Pemegang KKP.",
          ].map((t, i) => (
            <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
              <span className="flex-shrink-0 flex items-center justify-center text-xs font-semibold" style={{ width: 20, height: 20, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}>{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </FAQItem>

      <FAQItem question="Berapa Lama Bank Verifikasi Permohonan Penerbitan KKP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Paling lambat <strong style={{ color: c.ink }}>6 hari kerja</strong> setelah surat permohonan
          diterima bank penerbit.
        </p>
      </FAQItem>

      <FAQItem question="Siapa yang Bisa Jadi Pemegang KKP-BO dan KKP-PD?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          <strong style={{ color: c.ink }}>KKP-BO:</strong> pejabat pengadaan, pejabat struktural, pelaksana,
          atau pegawai lain yang bertugas dalam pengadaan barang/jasa. <strong style={{ color: c.ink }}>KKP-PD:</strong>{" "}
          pejabat atau pegawai yang menjalankan perjalanan dinas. Dua-duanya harus tercantum pada SK terakhir
          yang berlaku, bukan sekadar penunjukan lisan.
        </p>
      </FAQItem>

      <FAQItem question="Boleh Admin KKP Merangkap Jadi Pemegang Kartu?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Secara aturan boleh — PMK KKP tidak melarangnya secara eksplisit. Tapi ini bukan praktik yang
          dianjurkan, karena mengurangi pemisahan tugas (segregation of duties) antara yang mengelola
          administrasi kartu dan yang bertransaksi dengan kartu itu sendiri.
        </p>
      </FAQItem>

      <FAQItem question="Bisa Satker Punya Lebih dari 1 Admin KKP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Bisa. Satu satker boleh punya lebih dari satu Admin KKP — tidak dibatasi hanya satu orang. Semua yang
          ditunjuk KPA dan tercantum pada SK terakhir yang berlaku adalah Admin KKP yang sah.
        </p>
      </FAQItem>

      <FAQItem question="Kenapa Pengajuan GUP KKP Harus Terpisah dari SPP/SPM Biasa?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Karena SPP-GUP KKP/SPM-GUP KKP punya alur dan dasar dokumen sendiri — berdasarkan Daftar Pembayaran
          Tagihan (DPT) yang sudah disahkan PPK, bukan tagihan pelaksanaan APBN pada umumnya. Mencampur
          keduanya berisiko bikin proses verifikasi di KPPN jadi tidak jelas mana yang termasuk pertanggungjawaban
          KKP dan mana yang bukan.
        </p>
      </FAQItem>

      <FAQItem question="Apa Kesalahan Paling Sering Ditemukan Saat Pengisian DPT KKP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Kolom yang dibiarkan kosong — terutama <strong style={{ color: c.ink }}>nama pemegang KKP dan nomor
          KKP</strong>. Pastikan seluruh kolom DPT terisi lengkap dan sesuai ketentuan sebelum diajukan, supaya
          tidak kena koreksi dari KPPN dan proses GUP tidak molor.
        </p>
      </FAQItem>

      <FAQItem question="KKP Dilaporkan di Mana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Penggunaan UP KKP dilaporkan sebagai bagian dari Laporan Pertanggungjawaban (LPJ) Bendahara bulanan —
          tidak ada laporan terpisah khusus KKP di luar LPJ tersebut.
        </p>
      </FAQItem>

      <FAQItem question="Apa yang Perlu Disiapkan Satker Saat Rekonsiliasi Data KKP?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Pastikan data pemegang kartu, nomor kartu, dan limit yang tercatat di satker selalu sesuai dengan
          catatan bank penerbit. Ketidaksesuaian data ini yang paling sering jadi temuan saat rekonsiliasi
          berkala dilakukan.
        </p>
      </FAQItem>

      <FAQItem question="Apa itu Inventarisasi KKP yang Diminta DJP Tahun 2026?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Sesuai ND-1951/PJ.01/2026 (8 Juni 2026), seluruh satker diminta melakukan inventarisasi dan
          menyampaikan informasi terkait penggunaan KKP serta kelengkapan dokumen administrasinya lewat tautan
          resmi yang dicantumkan di nota dinas tersebut, dengan tenggat <strong style={{ color: c.ink }}>12 Juni
          2026</strong>. Ini permintaan satu kali terkait pemantauan implementasi KKP di lingkungan DJP saat itu
          — kalau ada inventarisasi serupa berikutnya, biasanya akan diedarkan lewat nota dinas baru.
        </p>
      </FAQItem>

      <FAQItem question="Format Surat yang Dibutuhkan Ada di Mana?">
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Buka menu <strong style={{ color: c.ink }}>Kartu Kredit</strong>, lalu masuk ke submenu{" "}
          <strong style={{ color: c.ink }}>Format Dokumen</strong>. Semua format dikelompokkan per kategori
          (Dasar Legal — 5 dokumen wajib per ND-1951/PJ.01/2026 — dan Perubahan & Penutupan).
        </p>
      </FAQItem>
    </div>
  );
}

// ===== Halaman Detail: Perubahan Pejabat karena Mutasi =====
function BankTabPanel() {
  const [active, setActive] = useState(0);
  const bank = alurBankMutasi[active];
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-6">
        {alurBankMutasi.map((b, i) => (
          <button
            key={b.nama}
            onClick={() => setActive(i)}
            className="px-5 py-2.5 text-sm font-semibold"
            style={
              i === active
                ? { background: c.navy, color: c.goldBright }
                : { border: `1px solid ${c.line}`, color: c.inkSoft }
            }
          >
            {b.nama}
          </button>
        ))}
      </div>
      <div style={{ border: `1px solid ${c.line}`, background: c.paperDim }} className="p-6">
        <p className="text-sm font-semibold mb-4">{bank.nama}</p>
        <ol className="flex flex-col gap-3">
          {bank.steps.map((st, i) => (
            <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
              <span
                className="flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                style={{ width: 22, height: 22, border: `1px solid ${c.maroon}`, color: c.maroon, ...fontMono }}
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{st}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function TabSwitch({ tabs, active, onChange }) {
  return (
    <div className="flex w-full mb-10" style={{ border: `2px solid ${c.navy}` }}>
      {tabs.map((t, i) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="flex-1 py-4 text-sm sm:text-base font-bold text-center transition-colors"
            style={{
              ...fontMono,
              letterSpacing: "0.06em",
              background: isActive ? c.navy : c.paper,
              color: isActive ? c.goldBright : c.ink,
              borderLeft: i === 0 ? "none" : `2px solid ${c.navy}`,
              boxShadow: isActive ? `inset 0 -4px 0 ${c.goldBright}` : "none",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function MutasiPejabatDetailPage({ onBack, onGoToFormatGiro, onGoToFormatVirtual, onGoToFormatKKP, onGoToBantuan, initialTab }) {
  const [tab, setTab] = useState(initialTab || "rekening");
  return (
    <div className="max-w-6xl mx-auto px-7 py-16">
      <button
        onClick={onBack}
        className="text-xs font-medium flex items-center gap-1.5 mb-8 px-3 py-2"
        style={{ ...fontMono, color: c.maroon, border: `1px solid ${c.maroon}` }}
      >
        ← Kembali
      </button>

      <Eyebrow>Panduan Lengkap</Eyebrow>
      <h1 className="mt-3 mb-3 text-3xl md:text-4xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
        Prosedur Serah Terima Rekening &amp; KKP sehubungan Mutasi
      </h1>
      <p className="text-sm mb-8 max-w-2xl" style={{ color: c.inkSoft }}>
        Berlaku setiap kali KPA, Bendahara, Admin KKP, dan/atau pemegang kartu KKP berganti. Pilih tab sesuai
        yang sedang kamu urus.
      </p>

      <TabSwitch
        tabs={[
          { id: "rekening", label: "Rekening" },
          { id: "kkp", label: "KKP" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "rekening" && (
        <RekeningMutasiTab onGoToFormatGiro={onGoToFormatGiro} onGoToFormatVirtual={onGoToFormatVirtual} onGoToBantuan={onGoToBantuan} />
      )}
      {tab === "kkp" && <KKPMutasiTab onGoToFormatKKP={onGoToFormatKKP} />}
    </div>
  );
}

function RekeningMutasiTab({ onGoToFormatGiro, onGoToFormatVirtual, onGoToBantuan }) {
  return (
    <>
      <div className="flex gap-4 p-5 mb-12" style={{ background: c.maroon, boxShadow: `0 0 0 3px ${c.gold}` }}>
        <span className="text-lg leading-none flex-shrink-0" style={{ color: c.goldBright }}>★</span>
        <p className="text-sm font-semibold" style={{ color: c.paper }}>
          Satker WAJIB membuat BAST setiap kali terjadi mutasi — jangan pernah serah terima akses cuma lisan.
        </p>
      </div>

      {/* Kapan berlaku */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Kapan Ini Berlaku?</h2>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Setiap kali terjadi mutasi/pergantian KPA dan/atau Bendahara, akses ke rekening satker — akun CMS,
          kartu debit dan akun Dashboard (khusus rekening Virtual) — perlu dipindahtangankan secara resmi dari pejabat
          lama ke pejabat baru. Tanpa serah terima yang jelas, pejabat baru bisa kesulitan mengakses rekening
          dan riwayat pertanggungjawabannya jadi tidak jelas.
        </p>
      </section>

      {/* Timeline 2 fase */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Alur Besar: Pejabat Lama → Pejabat Baru</h2>
        <div className="flex flex-col gap-4">
          <div className="p-6" style={{ background: c.navy }}>
            <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.gold, letterSpacing: "0.1em" }}>Tahap 1 — Pejabat Lama</p>
            <ol className="flex flex-col gap-3">
              {[
                <>Membuat Berita Acara Serah Terima (BAST) dokumen rekening. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQDUnTA1skPpQYHxNDkvC9xCAeRXR_fwktLP_LPEHlziWIk?e=3PkRTY" tone="light">Buka format BAST</InlineDocLink></>,
                "Menandatangani BAST, lalu menyerahkannya ke pejabat baru.",
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: "#D9DEE8" }}>
                  <span style={{ color: c.goldBright, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl" style={{ color: c.maroon }}>↓</span>
          </div>
          <div className="p-6" style={{ background: c.maroon }}>
            <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.goldBright, letterSpacing: "0.1em" }}>Tahap 2 — Pejabat Baru</p>
            <ol className="flex flex-col gap-3">
              {[
                <>Menerima dan menandatangani BAST dari pejabat lama, lalu join Grup Rekening. {onGoToBantuan && <InlineDocLink onClick={onGoToBantuan} tone="light">Lihat link grup</InlineDocLink>}</>,
                <>Memberitahukan ke Bank Padanan Satker sesuai dokumen yang ditentukan bank. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBXWDXnDcMZQ4UA2TfJIW1fATPOCPQN1WiP2Zu_YzMLkfg?e=fiVliU" tone="light">Buka format surat perubahan data</InlineDocLink></>,
                "Memastikan login akun perbankan & transaksi sudah bisa dijalankan.",
                "Berkonsultasi ke cabang Bank Padanan bila ada kendala akses/transaksi.",
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: "#F0D9D9" }}>
                  <span style={{ color: c.goldBright, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Isi BAST */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Apa yang Perlu Ada di BAST?</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Berita Acara Serah Terima bukan sekadar formalitas — ini dokumen yang jadi dasar hukum pemindahan
          tanggung jawab akun perbankan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Identitas Para Pihak</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Nama, NIP, jabatan PIHAK PERTAMA (pejabat lama) dan dasar SK/penunjukan PIHAK KEDUA (pejabat baru).</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Rincian Rekening</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Nomor rekening dan nama rekening yang diserahterimakan.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Kartu Debit</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Fisik kartu beserta PIN — khusus rekening Virtual. RPL tidak menerbitkan kartu debit.</p>
          </div>
          <div className="p-5" style={{ background: c.paper }}>
            <p className="text-sm font-semibold mb-2">Akses CMS & Dashboard</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Company ID/Corporate ID, Username, Password (khusus rekening Virtual — kalau RPL cukup akses CMS saja).</p>
          </div>
        </div>
        <p className="text-sm mt-4" style={{ color: c.inkSoft }}>
          BAST ditandatangani PIHAK KEDUA setelah SK penunjukan resmi terbit, dan diketahui oleh atasan
          (Kasubbag Keuangan/pejabat setara eselon IV).
        </p>
      </section>

      {/* Onboarding checklist */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Things to Do untuk Bendahara Baru</h2>
        <div className="flex flex-col">
          {[
            ["Pahami isi BAST", "Baca detail rekening, akses, dan tanggung jawab yang diserahterimakan."],
            ["Masuk ke Grup Rekening DJP", "Hubungi Bendahara lama / LO / PIC Rekening untuk link gabung WhatsApp Grup Rekening."],
            ["Cek akun perbankan", "Pastikan bisa login ke CMS dan/atau Dashboard dengan akses yang diserahkan."],
            ["Perkenalan ke Bank Cabang", "Datangi atau hubungi Bank Cabang Padanan untuk memperkenalkan diri sebagai pengurus baru."],
            ["Ubah data perbankan", <>Ajukan permohonan perubahan data pemegang rekening sesuai prosedur bank (lihat tab bank di bawah). <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQBXWDXnDcMZQ4UA2TfJIW1fATPOCPQN1WiP2Zu_YzMLkfg?e=fiVliU" tone="dark">Buka format surat</InlineDocLink></>],
          ].map(([t, d], i) => (
            <div key={i} className="flex gap-5 p-5" style={{ borderTop: i === 0 ? `1px solid ${c.line}` : "none", borderBottom: `1px solid ${c.line}` }}>
              <span className="flex-shrink-0 flex items-center justify-center text-sm font-semibold" style={{ width: 32, height: 32, background: c.navy, color: c.goldBright, ...fontMono }}>{i + 1}</span>
              <div>
                <p className="text-sm font-semibold mb-1">{t}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bank tabs */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Prosedur Pemberitahuan ke Bank</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>Pilih bank padanan satker untuk lihat langkah spesifiknya.</p>
        <BankTabPanel />
      </section>

      {/* Format terkait */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Format BAST & Surat Perubahan Data</h2>
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>Tersedia di SharePoint lewat submenu Format Dokumen — pilih sesuai jenis rekening satker.</p>
        <div className="flex gap-3 flex-wrap">
          <DocJumpButton onClick={onGoToFormatGiro} label="Format Dokumen — Rekening Giro" />
          <DocJumpButton onClick={onGoToFormatVirtual} label="Format Dokumen — Rekening Virtual" />
        </div>
      </section>

      {/* Reminder */}
      <section>
        <div className="flex gap-4 p-6" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
          <span className="text-base leading-none flex-shrink-0" style={{ color: c.maroon }}>ℹ</span>
          <p className="text-sm" style={{ color: c.ink }}>
            Jaga selalu kerahasiaan akses perbankan. Jangan bagikan password CMS/Dashboard ke siapa pun di luar
            proses serah terima resmi.
          </p>
        </div>
      </section>
    </>
  );
}

function KKPMutasiTab({ onGoToFormatKKP }) {
  return (
    <>
      <div className="flex gap-4 p-5 mb-12" style={{ background: c.maroon, boxShadow: `0 0 0 3px ${c.gold}` }}>
        <span className="text-lg leading-none flex-shrink-0" style={{ color: c.goldBright }}>★</span>
        <p className="text-sm font-semibold" style={{ color: c.paper }}>
          Satker WAJIB memperbarui SK setiap kali pemegang kartu atau Admin KKP berganti — kartu yang dibiarkan
          aktif tanpa pemegang yang sah berisiko jadi kartu dormant.
        </p>
      </div>

      {/* Kapan berlaku */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4" style={fontDisplay}>Kapan Ini Berlaku?</h2>
        <p className="text-sm mb-3" style={{ color: c.inkSoft }}>
          Setiap kali seorang pemegang kartu KKP atau Admin KKP mutasi, pensiun, meninggal dunia, atau cuti di
          luar tanggungan negara, statusnya di satker harus segera diperbarui — bukan cuma dibiarkan sampai ada
          yang sadar belakangan.
        </p>
        <p className="text-sm" style={{ color: c.inkSoft }}>
          Ada dua skenario yang perlu dibedakan, karena konsekuensinya beda:
        </p>
      </section>

      {/* Dua skenario */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Titik Awal yang Sama: SK KPA</h2>
        <p className="text-sm mb-6" style={{ color: c.inkSoft }}>
          Baik pemegang kartu maupun Admin KKP yang berganti, prosesnya selalu dimulai dari SK — bukan langsung
          ke bank atau langsung serah terima akses.
        </p>
        <div className="flex flex-col gap-4 mb-10">
          <div className="p-6" style={{ background: c.navy }}>
            <p className="text-xs uppercase mb-3" style={{ ...fontMono, color: c.gold, letterSpacing: "0.1em" }}>Langkah Awal — Berlaku untuk Keduanya</p>
            <ol className="flex flex-col gap-3">
              {[
                <>Admin KKP menyusun SK/KEP pembaruan — menghapus nama yang lama, menambahkan yang baru. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQA-Uli8vHvCTqydFy2bO1lvAbry7Uw8t-3N5feQwD7rIus?e=iPCBOA" tone="light">Buka format SK Perubahan</InlineDocLink></>,
                "SK diajukan untuk ditandatangani KPA.",
                "KPA meninjau dan menandatangani SK tersebut sehingga berlaku aktif.",
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: "#D9DEE8" }}>
                  <span style={{ color: c.goldBright, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
          <div className="p-6" style={{ background: c.paper }}>
            <span
              className="inline-block text-[10px] px-2 py-1 mb-3"
              style={{ ...fontMono, color: c.paper, background: c.maroon, letterSpacing: "0.06em" }}
            >
              SKENARIO A
            </span>
            <p className="text-sm font-semibold mb-3">Pemegang Kartu Berganti</p>
            <ol className="flex flex-col gap-2.5">
              {[
                <>Setelah SK berlaku dan nama lama tidak lagi tercantum, Admin KKP menutup kartu lama ke bank penerbit lewat Surat Permohonan Penutupan KKP. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQCSnEPYDl1VQan7V0m7FDu6AYYRUdGTG3wTZ3XlM4Edr24?e=MwupbZ" tone="dark">Buka format Surat Penutupan</InlineDocLink></>,
                <>Untuk pemegang baru, Admin KKP mengajukan kartu baru ke bank penerbit lewat Surat Permohonan Penerbitan KKP yang sama seperti pengajuan kartu pertama kali. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQC_BXcsqniRSJrkp4DF8wDAAQC4U5G2sQ9tBtUbA9NwJSI?e=rfYRDH" tone="dark">Buka format Surat Penerbitan</InlineDocLink></>,
                <>Dokumentasikan serah terima kartu fisik lewat BAST KKP antara KPA dengan pemegang baru. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQATXP00XcMiQp4H_trU7dXFAXivMWsCJhfuX-wf841CDAQ?e=nbMGKx" tone="dark">Buka format BAST</InlineDocLink></>,
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                  <span style={{ color: c.maroon, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="p-6" style={{ background: c.paper }}>
            <span
              className="inline-block text-[10px] px-2 py-1 mb-3"
              style={{ ...fontMono, color: c.paper, background: c.navy, letterSpacing: "0.06em" }}
            >
              SKENARIO B
            </span>
            <p className="text-sm font-semibold mb-3">Admin KKP Berganti</p>
            <ol className="flex flex-col gap-2.5">
              {[
                "SK ditandatangani KPA — Admin KKP yang sah langsung berpindah mengikuti SK terbaru.",
                "Satker memberitahukan pergantian ini ke bank penerbit sebagai kontak pengurus KKP — bisa lewat surat maupun cara informal, sesuai prosedur masing-masing bank. Tidak ada permohonan tarik/terbit kartu, karena tidak ada kartu yang berpindah tangan.",
              ].map((t, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: c.inkSoft }}>
                  <span style={{ color: c.maroon, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Onboarding checklist */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6" style={fontDisplay}>Things to Do untuk Pemegang/Admin KKP Baru</h2>
        <div className="flex flex-col">
          {[
            ["Pastikan nama sudah masuk SK", "Cek dengan Admin KKP/KPA bahwa SK sudah ditandatangani dan nama sudah tercantum sebelum mulai bertugas."],
            ["Terima serah terima kartu (khusus pemegang kartu)", <>Cek nomor kartu, jenis kartu (KKP-BO/KKP-PD), dan limit yang berlaku lewat BAST Kartu KKP. <InlineDocLink href="https://kemenkeu-my.sharepoint.com/:w:/g/personal/ryan_wijaya_kemenkeu_go_id/IQATXP00XcMiQp4H_trU7dXFAXivMWsCJhfuX-wf841CDAQ?e=nbMGKx" tone="dark">Buka format BAST</InlineDocLink></>],
            ["Kenali batas transaksi", "Pahami limit per rekanan dan kanal transaksi (EDC/e-Katalog/DIGIPay) sebelum mulai bertransaksi."],
            ["Simpan salinan SK", "Simpan salinan SK terbaru sebagai bukti kewenangan yang sah."],
          ].map(([t, d], i) => (
            <div key={i} className="flex gap-5 p-5" style={{ borderTop: i === 0 ? `1px solid ${c.line}` : "none", borderBottom: `1px solid ${c.line}` }}>
              <span className="flex-shrink-0 flex items-center justify-center text-sm font-semibold" style={{ width: 32, height: 32, background: c.navy, color: c.goldBright, ...fontMono }}>{i + 1}</span>
              <div>
                <p className="text-sm font-semibold mb-1">{t}</p>
                <p className="text-sm" style={{ color: c.inkSoft }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Format terkait */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2" style={fontDisplay}>Format SK & BAST Kartu KKP</h2>
        <p className="text-sm mb-5" style={{ color: c.inkSoft }}>Tersedia di SharePoint lewat submenu Format Dokumen KKP.</p>
        <div className="flex gap-3 flex-wrap">
          <DocJumpButton onClick={onGoToFormatKKP} label="Format Dokumen — Kartu Kredit" />
        </div>
      </section>

      {/* Reminder */}
      <section>
        <div className="flex gap-4 p-6" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
          <span className="text-base leading-none flex-shrink-0" style={{ color: c.maroon }}>ℹ</span>
          <p className="text-sm" style={{ color: c.ink }}>
            Jangan tunda perubahan SK menunggu momen yang "pas". Kartu yang tertinggal pada pemegang yang sudah
            tidak aktif adalah risiko kepatuhan, bukan sekadar urusan administratif yang bisa ditunda.
          </p>
        </div>
      </section>
    </>
  );
}

function SubMenuGrid({ page, items, onSelect, notice }) {
  return (
    <div className="max-w-6xl mx-auto px-7 py-20">
      <div className="flex justify-between items-end gap-6 flex-wrap mb-11 pb-5" style={{ borderBottom: `1px solid ${c.line}` }}>
        <div>
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="mt-2.5 text-2xl md:text-3xl font-semibold" style={{ ...fontDisplay, letterSpacing: "-0.01em" }}>
            {page.label}
          </h1>
        </div>
        <p className="max-w-xs text-sm" style={{ color: c.inkSoft }}>
          Pilih salah satu kategori di bawah untuk melihat detailnya.
        </p>
      </div>

      {notice && (
        <div className="flex gap-4 p-5 mb-8" style={{ background: c.paperDim, border: `1px solid ${c.maroon}` }}>
          <span className="text-lg leading-none flex-shrink-0" style={{ color: c.maroon }}>!</span>
          <p className="text-sm" style={{ color: c.ink }}>{notice}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: c.line, border: `1px solid ${c.line}` }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-9 pb-8 text-left flex flex-col"
            style={{ background: c.paper }}
          >
            <span
              className="inline-block text-xs pb-1.5 mb-6 self-start"
              style={{ ...fontMono, color: c.inkSoft, borderBottom: `2px solid ${c.gold}`, letterSpacing: "0.1em" }}
            >
              {item.tab}
            </span>
            <h3 className="text-xl font-semibold mb-2.5" style={fontDisplay}>
              {item.title}
            </h3>
            <p className="text-sm mb-6" style={{ color: c.inkSoft, minHeight: 56 }}>
              {item.desc}
            </p>
            <span
              className="text-sm font-semibold inline-flex items-center gap-1.5 mt-auto self-start px-4 py-2"
              style={{ color: c.maroon, border: `1px solid ${c.maroon}` }}
            >
              Lihat detail →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RekeningKKPSite() {
  const [current, setCurrent] = useState("home");
  const [sub, setSub] = useState(null);
  const [showIsuPenagihan, setShowIsuPenagihan] = useState(false);
  const [showMutasiDetail, setShowMutasiDetail] = useState(false);
  const [mutasiDetailTab, setMutasiDetailTab] = useState("rekening");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePage = pages.find((p) => p.id === current) || pages[0];
  const activeSubList = subMenus[current];

  function goToPage(id) {
    setCurrent(id);
    setSub(null);
    setShowIsuPenagihan(false);
    setShowMutasiDetail(false);
    setMutasiDetailTab("rekening");
    setMobileMenuOpen(false);
  }

  function openMutasiDetail(tab) {
    setMutasiDetailTab(tab || "rekening");
    setShowMutasiDetail(true);
  }

  return (
    <div style={{ background: c.paper, color: c.ink, fontFamily: "'Inter', sans-serif" }} className="min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .ledger-lines {
          background-image: repeating-linear-gradient(to bottom, ${c.paper} 0px, ${c.paper} 37px, ${c.line} 37px, ${c.line} 38px);
        }
      `}</style>

      {/* ===== NAVBAR + DISCLAIMER STRIP (sticky bareng, semua halaman) ===== */}
      <div className="sticky top-0 z-50">
      <header style={{ background: c.navy, borderBottom: "1px solid rgba(212,175,122,0.25)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-7 py-4 gap-4">
          <button onClick={() => goToPage("home")} className="flex items-center gap-3" style={{ color: c.paper }}>
            <span
              className="w-9 h-9 flex items-center justify-center flex-shrink-0"
              style={{ border: `1.5px solid ${c.gold}`, color: c.goldBright }}
            >
              <Landmark size={18} strokeWidth={2} />
            </span>
            <span className="text-base font-semibold leading-tight text-left" style={fontDisplay}>
              Rekening &amp; KKP
              <span className="block text-[10px] uppercase font-medium mt-0.5" style={{ ...fontMono, color: c.gold, letterSpacing: "0.12em" }}>
                Direktorat Jenderal Pajak
              </span>
            </span>
          </button>

          {/* Nav desktop — tampilan persis sama seperti sebelumnya, disembunyikan di layar sempit */}
          <nav className="hidden md:flex items-center gap-1 flex-wrap" aria-label="Navigasi utama">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => goToPage(p.id)}
                className="text-sm font-medium px-4 py-2.5"
                style={{
                  color: current === p.id ? c.goldBright : "#D9DEE8",
                  borderBottom: current === p.id ? `1.5px solid ${c.goldBright}` : "1.5px solid transparent",
                }}
              >
                {p.label}
              </button>
            ))}
          </nav>

          {/* Tombol hamburger — cuma muncul di layar sempit */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center flex-shrink-0"
            style={{ width: 40, height: 40, color: c.goldBright, border: `1px solid rgba(212,175,122,0.4)` }}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Dropdown nav mobile */}
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col" aria-label="Navigasi utama (mobile)" style={{ borderTop: "1px solid rgba(212,175,122,0.2)" }}>
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => goToPage(p.id)}
                className="text-sm font-medium px-7 py-3.5 text-left"
                style={{
                  color: current === p.id ? c.goldBright : "#D9DEE8",
                  background: current === p.id ? "rgba(212,175,122,0.08)" : "transparent",
                  borderLeft: current === p.id ? `3px solid ${c.goldBright}` : "3px solid transparent",
                }}
              >
                {p.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ===== DISCLAIMER STRIP ===== */}
      <div className="w-full py-2 px-7 text-center" style={{ background: c.paperDim, borderBottom: `1px solid ${c.line}` }}>
        <p className="text-xs" style={{ ...fontMono, color: c.inkSoft, letterSpacing: "0.02em" }}>
          Khusus internal DJP · Mengacu PMK yang berlaku umum, dengan penyesuaian praktik teknis internal yang
          tidak berlaku di instansi lain.
        </p>
      </div>
      </div>

      {/* ===== CONTENT ===== */}
      <main className="flex-1">
        {showMutasiDetail && (
          <MutasiPejabatDetailPage
            initialTab={mutasiDetailTab}
            onBack={() => setShowMutasiDetail(false)}
            onGoToFormatGiro={() => {
              setCurrent("giro");
              setSub(subMenus.giro.find((s) => s.id === "format"));
              setShowMutasiDetail(false);
            }}
            onGoToFormatVirtual={() => {
              setCurrent("virtual");
              setSub(subMenus.virtual.find((s) => s.id === "format"));
              setShowMutasiDetail(false);
            }}
            onGoToFormatKKP={() => {
              setCurrent("kkp");
              setSub(subMenus.kkp.find((s) => s.id === "format"));
              setShowMutasiDetail(false);
            }}
            onGoToBantuan={() => goToPage("bantuan")}
          />
        )}

        {!showMutasiDetail && activeSubList && !sub && (
          <SubMenuGrid
            page={activePage}
            items={activeSubList}
            onSelect={(item) => setSub(item)}
            notice={
              current === "giro" ? (
                <>
                  Halaman ini <strong>berlaku khusus untuk Rekening Lainnya (RPL)</strong>. Untuk Rekening
                  Pengeluaran (BPG) dan Rekening Pengeluaran Pembantu (BPP), satker mengikuti ketentuan terbaru
                  yang menggunakan skema Rekening Virtual — lihat menu <strong>Rekening Virtual</strong>.
                </>
              ) : current === "virtual" ? (
                <>
                  Halaman ini <strong>berlaku khusus untuk Rekening Pengeluaran (BPG) dan Rekening Pengeluaran
                  Pembantu (BPP)</strong> yang berbasis skema virtual. Untuk Rekening Lainnya (RPL), lihat menu{" "}
                  <strong>Rekening Giro</strong>.
                </>
              ) : null
            }
          />
        )}

        {!showMutasiDetail && (
        <>
        {activeSubList && sub && sub.id === "regulasi" && current === "giro" && (
          <RegulasiRekeningContent onBack={() => setSub(null)} />
        )}

        {activeSubList && sub && sub.id === "operasional" && current === "giro" && (
          <OperasionalRekeningContent onBack={() => setSub(null)} onGoToFormat={() => setSub(subMenus.giro.find((s) => s.id === "format"))} />
        )}

        {activeSubList && sub && sub.id === "perubahan" && current === "giro" && (
          <PerubahanRekeningContent
            onBack={() => setSub(null)}
            onOpenMutasiDetail={() => openMutasiDetail("rekening")}
            onGoToFormat={() => setSub(subMenus.giro.find((s) => s.id === "format"))}
          />
        )}

        {activeSubList && sub && sub.id === "format" && current === "giro" && (
          <FormatDokumenContent onBack={() => setSub(null)} />
        )}

        {activeSubList && sub && sub.id === "regulasi" && current === "virtual" && (
          <RegulasiVirtualContent onBack={() => setSub(null)} />
        )}

        {activeSubList && sub && sub.id === "operasional" && current === "virtual" && (
          <OperasionalVirtualContent onBack={() => setSub(null)} onGoToFormat={() => setSub(subMenus.virtual.find((s) => s.id === "format"))} />
        )}

        {activeSubList && sub && sub.id === "perubahan" && current === "virtual" && (
          <PerubahanVirtualContent
            onBack={() => setSub(null)}
            onOpenMutasiDetail={() => openMutasiDetail("rekening")}
            onGoToFormat={() => setSub(subMenus.virtual.find((s) => s.id === "format"))}
          />
        )}

        {activeSubList && sub && sub.id === "format" && current === "virtual" && (
          <FormatDokumenVirtualContent onBack={() => setSub(null)} />
        )}

        {activeSubList && sub && sub.id === "regulasi" && current === "kkp" && (
          <RegulasiKKPContent onBack={() => setSub(null)} />
        )}

        {activeSubList && sub && sub.id === "operasional" && current === "kkp" && (
          <OperasionalKKPContent onBack={() => setSub(null)} onGoToFormat={() => setSub(subMenus.kkp.find((s) => s.id === "format"))} />
        )}

        {activeSubList && sub && sub.id === "perubahan" && current === "kkp" && (
          <PerubahanKKPContent
            onBack={() => setSub(null)}
            onOpenMutasiDetail={() => openMutasiDetail("kkp")}
            onGoToFormat={() => setSub(subMenus.kkp.find((s) => s.id === "format"))}
          />
        )}

        {activeSubList && sub && sub.id === "format" && current === "kkp" && (
          <FormatDokumenKKPContent onBack={() => setSub(null)} />
        )}

        {activeSubList && sub && !(
          ["regulasi", "operasional", "perubahan", "format"].includes(sub.id) &&
          (current === "giro" || current === "virtual" || current === "kkp")
        ) && (
          <ComingSoon
            title={sub.title}
            eyebrow={`${activePage.label} · ${sub.tab.split(" · ")[1] || ""}`}
            onBack={() => setSub(null)}
            backLabel={`Kembali ke ${activePage.label}`}
          />
        )}

        {showIsuPenagihan && <IsuTerkiniPenagihanPage onBack={() => setShowIsuPenagihan(false)} />}

        {!showIsuPenagihan && !activeSubList && current === "home" && (
          <HomeContent
            onNavigate={() => openMutasiDetail("rekening")}
            onNavigateIsu={() => setShowIsuPenagihan(true)}
          />
        )}
        {!showIsuPenagihan && !activeSubList && current === "bantuan" && <BantuanContent />}
        {!showIsuPenagihan && !activeSubList && current === "faq" && (
          <FAQContent
            onOpenMutasiDetail={(tab) => openMutasiDetail(tab)}
            onOpenIsuPenagihan={() => setShowIsuPenagihan(true)}
          />
        )}
        {!showIsuPenagihan && !activeSubList && !["home", "bantuan", "faq"].includes(current) && (
          <ComingSoon title={activePage.label} eyebrow={activePage.eyebrow} />
        )}
        </>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="px-7 py-7" style={{ background: c.navyDeep, color: "#6E7688" }}>
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-2.5 text-xs" style={fontMono}>
          <span>REKENING &amp; KKP — DIREKTORAT JENDERAL PAJAK</span>
          <span>BAGIAN KEUANGAN · SUBBAGIAN PERBENDAHARAAN</span>
        </div>
      </footer>
    </div>
  );
}
