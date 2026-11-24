import { useState } from "react";
import { CreditCard, LayoutDashboard, Network, ShieldCheck } from "lucide-react";
import {
  Badge,
  Bullets,
  Callout,
  Card,
  Cards,
  DocLink,
  DocSections,
  Flow,
  MiniDisclosure,
  RegBanner,
  Section,
  Steps,
  TopicPage,
} from "../components/ui.jsx";
import { Link } from "../lib/router.jsx";
import { jdih } from "../data/site.js";
import { SP } from "../data/sharepoint.js";
import { alurBankMutasi } from "../data/content.js";
import { formatsVirtual } from "../data/formats.js";
import { ChangeList, PhaseList } from "./Giro.jsx";

/* ===== Diagram struktur Rekening Virtual ===== */
export function StrukturDiagram() {
  const Kolom = ({ label }) => (
    <div className="tree__col">
      <span className="tree__node tree__node--cat">{label}</span>
      <span className="tree__stem" />
      <span className="tree__node tree__node--induk">Rek. Induk</span>
      <span className="tree__stem" />
      <div className="tree__leaves">
        <span className="tree__node tree__node--leaf">Satker 1</span>
        <span className="tree__node tree__node--leaf">Satker 2</span>
        <span className="tree__node tree__node--leaf">Dst.</span>
      </div>
    </div>
  );
  return (
    <figure className="tree" aria-label="Struktur Rekening Virtual">
      <div className="tree__root">
        <span className="tree__node tree__node--root">Eselon I (DJP Pusat)</span>
      </div>
      <span className="tree__stem" />
      <div className="tree__cols">
        <Kolom label="Operasional" />
        <Kolom label="Non-Operasional" />
        <Kolom label="VAT (opsional)" />
      </div>
      <figcaption className="tree__caption">
        Setiap kategori (Operasional/Non-Operasional) punya Rekening Induk terpisah di <strong>4 bank mitra</strong> —
        Mandiri, BRI, BNI, dan BSI. Rekening Induk VAT terpisah lagi, khusus untuk satker yang punya BPG VAT. Rekening
        Satker (yang satker pegang sehari-hari) hanyalah nomor identifikasi virtual di bawah salah satu Rekening Induk
        tersebut, otomatis terkonsolidasi. Satker tidak perlu mengurus Rekening Induk — itu dikelola di kantor pusat.
      </figcaption>
    </figure>
  );
}

/* ===== Regulasi Rekening Virtual — PMK-183/PMK.05/2019 ===== */
export function VirtualRegulasi() {
  return (
    <TopicPage sectionId="virtual" topic="regulasi">
      <Callout tone="info">
        <p>
          Halaman ini membahas <strong>Rekening Pengeluaran (BPG) dan Rekening Pengeluaran Pembantu (BPP)</strong> yang
          berbasis skema virtual. Untuk Rekening Lainnya (RPL), lihat menu{" "}
          <Link to="giro" className="doc-link">
            Rekening Giro
          </Link>
          .
        </p>
      </Callout>

      <RegBanner links={[{ href: jdih.pmk183, label: "Buka PMK-183/PMK.05/2019 di JDIH" }]}>
        Naskah lengkap <strong>PMK-183/PMK.05/2019</strong> tentang Pengelolaan Rekening Pengeluaran Milik Kementerian
        Negara/Lembaga.
      </RegBanner>

      <Section title="Dasar Hukum">
        <p className="text">
          PMK-183/PMK.05/2019 mengatur pengelolaan Rekening Pengeluaran berbasis skema virtual — menggantikan model rekening
          giro konvensional untuk BPG dan BPP. Satker tidak lagi membuka rekening bank sendiri; yang dipegang satker adalah
          nomor identifikasi virtual yang terkonsolidasi ke satu Rekening Induk di tingkat Eselon I (kantor pusat).
        </p>
      </Section>

      <Section title="Struktur Rekening">
        <StrukturDiagram />
      </Section>

      <Section title="3 Jenis Rekening Satker">
        <Cards cols={3}>
          <Card title="BPG" badge={<Badge kind="wajib">Sudah pasti ada</Badge>} foot="Hanya boleh 1 dalam 1 satker — TIDAK dapat dibuka rekening baru." footTone="alert">
            Rekening Pengeluaran Satker — menampung dana yang ditransfer dari KPPN (atau Kantor Pusat DJP pada kondisi
            tertentu) untuk operasional satker sehari-hari.
          </Card>
          <Card title="BPP" badge={<Badge kind="opsional">Opsional</Badge>} foot="Dalam 1 satker, boleh memiliki banyak rekening BPP.">
            Rekening Pengeluaran Pembantu Satker — dananya berasal dari BPG, biasanya digunakan bagi satker yang memiliki
            KP2KP.
          </Card>
          <Card title="BPG VAT" badge={<Badge kind="opsional">Opsional, terbatas</Badge>} foot="Saat ini hanya ada di 5 satker.">
            Rekening khusus untuk menampung dan mengelola dana VAT Refund di bandara-bandara besar Indonesia.
          </Card>
        </Cards>
      </Section>
    </TopicPage>
  );
}

/* ===== Operasional Rekening Virtual ===== */
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

function KasusKP2KP() {
  return (
    <MiniDisclosure title="Kasus Khusus: Permohonan Pembukaan VA Baru untuk KP2KP">
      <p className="text">
        Berlaku untuk KP2KP yang perlu membuka rekening VA baru, menggunakan bank yang sama dengan Bank BPG induknya.
      </p>
      <Steps items={langkahKP2KP} />
      <div className="btn-row">
        <Link to="virtual/format" className="btn btn--ghost btn--sm">
          Lihat Format Surat Permohonan Pembukaan (Format IV)
        </Link>
      </div>
    </MiniDisclosure>
  );
}

function OperasionalHarianExtra() {
  const [showCMSInfo, setShowCMSInfo] = useState(false);
  return (
    <div className="stack-lg">
      <Callout tone="alert" title="Opsss!! Kartu Debit Rusak/Hilang" icon={CreditCard}>
        <Bullets
          items={[
            "Segera kontak PIC Rekening atau beritahukan di Grup Rekening.",
            "Bank Pusat biasanya akan menghubungi satker dan Bank Cabang untuk konfirmasi dan otorisasi tarik tunai di teller tanpa kartu debit untuk sementara waktu.",
            "Bank Pusat menerbitkan kembali kartu debit dan mengirimkan ke Bank Cabang, untuk diserahkan ke satker.",
          ]}
        />
      </Callout>

      <div>
        <div className="card__top mb-2">
          <p className="h3 mb-0">Cash Management System (CMS)</p>
          <Badge kind="wajib">Sangat disarankan</Badge>
        </div>
        <p className="text">
          Tools/website (istilah berbeda tiap bank) untuk transaksi online — transfer, bayar pajak, dsb. Alur transaksinya
          berjenjang:
        </p>
        <div className="mt-4">
          <Flow
            roles
            nodes={[
              ["Maker", "Operator Transaksi/Bendahara"],
              ["Checker", "Bendahara/KPA*"],
              ["Releaser", "KPA*"],
            ]}
          />
        </div>
        <p className="note">
          * sangat disarankan. Pengaturan user MCR hanya dapat dilakukan oleh admin dan sysadmin — akses ini seharusnya
          telah tercantum dalam BAST dari pejabat sebelumnya. Apabila belum diketahui, agar segera menghubungi Bank Cabang
          atau Grup Rekening.
        </p>
        <div className="mt-4">
          <button type="button" className="btn btn--ghost btn--sm" aria-expanded={showCMSInfo} onClick={() => setShowCMSInfo(!showCMSInfo)}>
            {showCMSInfo ? "Sembunyikan alasan" : "Kenapa sangat disarankan?"}
          </button>
        </div>
        {showCMSInfo && (
          <div className="mt-4">
            <Bullets
              items={[
                "Perlu pembayaran cepat / kebijakan percepatan pembayaran dari Kantor Pusat DJP (pegawai pindah, terima insentif, dst).",
                "Wajib dilakukannya pengosongan rekening di akhir tahun — kadang perlu transaksi di luar jam kerja.",
                "Transaksi transfer/bayar online memudahkan dan mempercepat penyelesaian pembayaran.",
                "Rekomendasi dari Biro Rocankeu Kementerian Keuangan agar seluruh satker di Kemenkeu memiliki CMS.",
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PelaporanExtra() {
  return (
    <div className="stack-lg">
      <div>
        <p className="label">Fungsi Dashboard</p>
        <ul className="checklist">
          {["Transaksi tercatat di sini", "Cetak rekening koran di sini", "Data terkonsolidasi (ke KPDJP, Kementerian, DJPb)", "Cek saldo di sini", "Pastikan akses setiap hari"].map(
            (t) => (
              <li key={t}>
                <LayoutDashboard size={16} />
                {t}
              </li>
            )
          )}
        </ul>
      </div>
      <Callout tone="info" icon={ShieldCheck}>
        <p>
          Akun Dashboard dikirim bank ke email KPA dan Bendahara — seharusnya diserah-terimakan dari pejabat lama ke pejabat
          baru melalui BAST. BPG dan BPP menggunakan akun Dashboard yang sama; BPG VAT punya akun terpisah. Jika kehilangan
          akses, segera hubungi bank di Grup Rekening dan/atau PIC Rekening Kantor Pusat DJP.
        </p>
      </Callout>
    </div>
  );
}

const faseOperasionalVirtual = [
  {
    no: "01",
    title: "Pembukaan Rekening Satker",
    summary: "Diajukan melalui Eselon I (Bagian Keuangan Pusat), bukan langsung ke KPPN.",
    points: [
      <>
        KPA mengajukan permohonan persetujuan dan pembukaan Rekening Satker (BPG/BPP) kepada Eselon I — di DJP berarti ke
        Bagian Keuangan Kantor Pusat. <DocLink href={SP.permohonanPembukaanVA}>Buka format surat permohonan</DocLink>
      </>,
      "Eselon I meneruskan permohonan tersebut ke Kuasa BUN di Daerah paling lambat 5 hari kerja sejak diterima dari satker.",
      "Setelah disetujui, bank membuka Rekening Satker dan mengirimkan user Dashboard, akses CMS, serta kartu debit ke satker paling lambat 10 hari kerja.",
      "Rekening Pengeluaran Pembantu (BPP) dibuka di bank mitra yang sama dengan Rekening Pengeluaran (BPG) satker yang bersangkutan.",
    ],
    extra: <KasusKP2KP />,
  },
  {
    no: "02",
    title: "Operasional Harian",
    summary: "Rekening Satker dioperasikan oleh bendahara — kredit, debit melalui CMS/kartu debit, transaksi tunai terbatas.",
    points: [
      "Rekening Pengeluaran (BPG) dioperasikan oleh bendahara pengeluaran; Rekening Pengeluaran Pembantu (BPP) oleh bendahara pengeluaran pembantu.",
      "Pengkreditan Rekening Satker otomatis menambah saldo Rekening Satker sekaligus Rekening Induk.",
      "Pendebitan non-tunai dilakukan melalui CMS atau kartu debit. Transaksi diusahakan non tunai — tunai hanya untuk kondisi tertentu: gangguan sistem perbankan, pihak ketiga tidak menerima non tunai, atau keadaan kahar (bencana, epidemik, kerusuhan).",
      "Seluruh pengambilan tunai — baik melalui ATM maupun teller — wajib menggunakan Kartu Debit DAN Surat Perintah Pendebitan Rekening (SPPR). Format SPPR ada di Lampiran PMK-183/PMK.05/2019.",
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
    summary: "Otomatis melalui Dashboard — tidak perlu laporan manual seperti RPL.",
    points: [
      "Pelaporan saldo Rekening Pengeluaran dihasilkan secara elektronik melalui Dashboard yang diberikan bank.",
      "Berbeda dengan RPL, satker tidak perlu menyusun dan mengirim laporan saldo bulanan secara manual ke KPPN — cukup pastikan akses Dashboard aktif dan dipantau rutin.",
    ],
    extra: <PelaporanExtra />,
  },
];

export function VirtualOperasional() {
  return (
    <TopicPage
      sectionId="virtual"
      topic="operasional"
      lead="Empat fase siklus hidup Rekening Satker (BPG/BPP), dari sudut pandang satker sebagai pengguna rekening. Pilih setiap fase untuk menampilkan uraian lengkap."
    >
      <PhaseList fases={faseOperasionalVirtual} />
    </TopicPage>
  );
}

/* ===== Perubahan Rekening Virtual ===== */
export function BankSteps({ bank }) {
  return (
    <MiniDisclosure
      title={
        <span className="card__top">
          <span className="bank-mark">{bank.inisial}</span>
          {bank.nama}
        </span>
      }
    >
      <Steps items={bank.steps} />
    </MiniDisclosure>
  );
}

const jenisPerubahanVirtual = [
  {
    id: "bank",
    badges: ["PMK-183"],
    title: "Perubahan Bank Mitra Tempat Rekening Dibuka",
    summary: "Memindahkan Rekening Satker ke bank mitra lain — 13 langkah, satker sempat pegang 2 VA aktif.",
    steps: [
      <>
        Satker membuat surat permohonan perubahan bank sesuai Format VIII, dibuat melalui aplikasi Nadine, ditujukan ke
        Sekretaris Direktorat Jenderal Pajak. <DocLink href={SP.perubahanBankVA}>Buka Format VIII</DocLink>
      </>,
      "Surat dilampiri data-data pendukung sesuai ketentuan lampiran.",
      "Bagian Keuangan Kantor Pusat DJP membuat Surat Permohonan ke KPPN Jakarta II terkait perubahan bank tersebut.",
      "KPPN Jakarta II menerbitkan Surat Persetujuan Perubahan Bank dan mengirimkannya langsung ke Kantor Pusat Bank Tujuan.",
      "Satker menunggu proses pembuatan Rekening VA baru di bank tujuan.",
      "Setelah VA baru selesai dibuat, bank menghubungi satker untuk aktivasi rekening, pengiriman token & kartu debit, penyelesaian CMS, dan penyerahan akun Dashboard.",
      "Satker mulai menggunakan rekening VA baru dan mendaftarkannya ke aplikasi SAKTI dan SPAN — pada tahap ini satker memegang 2 rekening VA BPG/BPP yang aktif sekaligus.",
      "Satker memastikan rekening VA baru dapat menerima SP2D dari KPPN.",
      <>
        Setelah dipastikan lancar menerima SP2D, satker wajib membuat Laporan Pemindahbukuan sesuai Format X.{" "}
        <DocLink href={SP.laporanPemindahbukuanVA}>Buka Format X</DocLink>
      </>,
      "KPPN Jakarta II menerbitkan surat perintah penutupan rekening ke bank lama satker.",
      "Bank lama melakukan penutupan rekening VA.",
      "Proses selesai — satker mengarsipkan seluruh dokumen yang diterima selama proses (surat permohonan perubahan dari Kantor Pusat DJP maupun KPPN, surat penutupan ke bank lama, laporan pembukaan dari bank baru, dan laporan penutupan dari bank lama).",
    ],
  },
  {
    id: "mutasi",
    badges: ["NON-PMK", "Internal"],
    title: "Perubahan karena Mutasi Bendahara dan/atau KPA",
    summary: "Tugas terbagi 2: pejabat lama serah-terima, pejabat baru lapor ke bank.",
    steps: [],
    mutasiTab: "rekening",
    superHighlight:
      "Satker WAJIB membuat Berita Acara Serah Terima (BAST) dokumen rekening setiap kali terjadi mutasi Bendahara dan/atau KPA.",
    extra: (
      <div className="stack-lg">
        <Cards cols={2}>
          <div className="card">
            <p className="card__title">Tugas Pejabat Lama</p>
            <Steps
              items={[
                <>
                  Satker wajib membuat Berita Acara Serah Terima (BAST) dokumen-dokumen rekening — kartu debit, akun CMS, akun
                  Dashboard, dan dokumen terkait VA lainnya — dari pegawai lama ke pegawai baru.{" "}
                  <DocLink href={SP.bastAkunPerbankan}>Buka format BAST</DocLink>
                </>,
                "BAST ditandatangani untuk kemudian diserahkan kepada pegawai baru.",
              ]}
            />
          </div>
          <div className="card">
            <p className="card__title">Tugas Pejabat Baru</p>
            <Steps
              items={[
                <>
                  Satker wajib melakukan pemberitahuan ke Bank Padanan Satker, mengikuti dokumen-dokumen yang telah ditentukan
                  bank (lihat rincian per bank di bawah).{" "}
                  <DocLink href={SP.perubahanDataCMS}>Buka format surat perubahan data</DocLink>
                </>,
                "Satker wajib memastikan login akun perbankan dan pelaksanaan transaksi telah dapat dijalankan.",
                "Satker wajib berkonsultasi dengan cabang Bank Padanan apabila terdapat kendala akses/transaksi.",
              ]}
            />
          </div>
        </Cards>

        <div>
          <p className="label">Langkah yang Perlu Dilakukan Bendahara Baru di Satker</p>
          <Steps items={["Pahami isi BAST", "Masuk ke grup Rekening DJP", "Cek akun perbankan", "Perkenalan ke Bank Cabang", "Ubah data perbankan"]} />
          <p className="note">Segera hubungi Bendahara lama / LO / PIC Rekening untuk bergabung ke Grup Rekening DJP.</p>
        </div>

        <div>
          <p className="label">Rincian Alur per Bank</p>
          <div className="stack">
            {alurBankMutasi.map((bank) => (
              <BankSteps key={bank.nama} bank={bank} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function VirtualPerubahan() {
  return (
    <TopicPage
      sectionId="virtual"
      topic="perubahan"
      lead="Dua jenis perubahan yang paling sering dihadapi satker. Pilih setiap jenis untuk menampilkan langkah-langkahnya."
    >
      <ChangeList items={jenisPerubahanVirtual} />

      <Callout tone="info" icon={Network}>
        <p>
          Satker juga dapat mengajukan <strong>Permohonan Penutupan Rekening Satker</strong> secara mandiri apabila rekening
          telah tidak digunakan sesuai tujuan penggunaannya (di luar konteks pindah bank).{" "}
          <DocLink href={SP.penutupanVA}>Buka format surat</DocLink>
        </p>
      </Callout>
      <p className="note">Format surat lengkap tersedia di SharePoint Rekening DJP.</p>
    </TopicPage>
  );
}

/* ===== Format Dokumen Rekening Virtual ===== */
export function VirtualFormat() {
  return (
    <TopicPage
      sectionId="virtual"
      topic="format"
      lead="Format surat untuk pengelolaan Rekening Satker (BPG/BPP), tersedia di SharePoint Kemenkeu — dapat dibuka melalui tautan yang disediakan, kemudian dilengkapi data satker dan disampaikan sesuai ketentuan."
    >
      <DocSections groups={formatsVirtual} />
    </TopicPage>
  );
}
