import { BookOpenCheck, Building2, UserRound } from "lucide-react";
import {
  Badge,
  Bullets,
  Callout,
  Card,
  Cards,
  Codes,
  Disclosure,
  DocLink,
  DocSections,
  MiniDisclosure,
  RegBanner,
  Section,
  Steps,
  TopicPage,
} from "../components/ui.jsx";
import { Link } from "../lib/router.jsx";
import { jdih } from "../data/site.js";
import { SP } from "../data/sharepoint.js";
import { jenisRPL } from "../data/content.js";
import { formatsGiro } from "../data/formats.js";

/* ===== Regulasi Rekening (RPL) — POV Satker, PMK-182/PMK.05/2017 ===== */
export function GiroRegulasi() {
  return (
    <TopicPage sectionId="giro" topic="regulasi">
      <RegBanner links={[{ href: jdih.pmk182, label: "Buka PMK-182/PMK.05/2017 di JDIH" }]}>
        Naskah lengkap <strong>PMK-182/PMK.05/2017</strong> tentang Pengelolaan Rekening Milik Satuan Kerja Lingkup
        Kementerian Negara/Lembaga — dasar hukum pengelolaan RPL yang dibahas di halaman ini.
      </RegBanner>

      <Section title="Dasar Hukum">
        <div className="prose">
          <p>
            PMK-182/PMK.05/2017 mengatur pengelolaan rekening milik satuan kerja K/L, menggantikan PMK-252/PMK.05/2014.
            Berlaku sejak 1 Januari 2018.
          </p>
          <p>
            Sebagai satker, yang perlu diketahui: rekening dikelompokkan menjadi Rekening Penerimaan, Rekening Pengeluaran
            (termasuk Pengeluaran Pembantu), dan <strong>Rekening Lainnya (RPL)</strong>. Dua kelompok pertama kini mengikuti
            skema Rekening Virtual di aturan terbaru — jadi PMK-182 ini praktiknya jadi acuan utama untuk RPL.
          </p>
        </div>
      </Section>

      <Section
        title="Jenis-Jenis Rekening Lainnya (RPL)"
        lead='RPL PS dan PDT paling sering digunakan di DJP — 7 jenis RPL lainnya dapat dilihat pada bagian "Lainnya" di bawah.'
      >
        <Codes
          items={jenisRPL.filter((j) => j.tampil)}
          more={
            <div className="codes__more">
              <LainnyaRPL />
            </div>
          }
        />
      </Section>

      <Section title="Contoh RPL yang Ada di DJP">
        <div className="stack">
          <Card badge={<Badge kind="wajib">Wajib</Badge>} title="RPL untuk Tukin">
            Beda dari RPL lainnya yang sifatnya opsional, RPL Tukin ini wajib ada di satker.
          </Card>
          <Card badge={<Badge kind="opsional">Opsional</Badge>} title="RPL untuk hasil lelang">
            Dibuka sesuai kebutuhan, apabila satker memiliki kegiatan lelang.
          </Card>
          <Card badge={<Badge kind="opsional">Opsional</Badge>} title="RPL Penagihan">
            Dibuka sesuai kebutuhan, apabila satker memiliki kegiatan penagihan.
          </Card>
        </div>
        <p className="note">Dalam satu satker, boleh memiliki banyak rekening RPL sesuai peruntukannya masing-masing.</p>
      </Section>

      <Section title="Siapa di Satker yang Berwenang">
        <Cards cols={2}>
          <Card icon={UserRound} title="KPA (Kuasa Pengguna Anggaran)">
            Pemegang kewenangan utama pengelolaan rekening — pembukaan, pengoperasian, penutupan, dan pelaporan ke Kuasa BUN
            Daerah (KPPN mitra kerja).
          </Card>
          <Card icon={Building2} title="Kepala Satker / Pimpinan BLU">
            Mengambil alih kewenangan khusus untuk RPL tertentu (Rekening Milik BLU, Dana Jaminan, Dana Titipan,
            Penampungan Sementara/RPL PS) apabila kewenangan tidak dapat dilakukan oleh KPA.
          </Card>
        </Cards>
      </Section>
    </TopicPage>
  );
}

function LainnyaRPL() {
  const rest = jenisRPL.filter((j) => !j.tampil);
  return (
    <MiniDisclosure title={`Lainnya (${rest.length} jenis rekening)`}>
      {rest.map((j) => (
        <div key={j.kode} className="code-row code-row--flush">
          <span className="code-chip code-chip--quiet">{j.kode}</span>
          <div>
            <p className="code-row__name">{j.nama}</p>
            <p className="code-row__desc">{j.ket}</p>
          </div>
        </div>
      ))}
    </MiniDisclosure>
  );
}

/* ===== Operasional Rekening (RPL) ===== */
const faseOperasional = [
  {
    no: "01",
    title: "Pembukaan Rekening",
    summary: "Ajukan permohonan ke KPPN mitra kerja sebelum rekening bisa digunakan.",
    points: [
      <>
        <strong>Ajukan surat permohonan persetujuan pembukaan Rekening ke KPPN mitra kerja</strong> — cantumkan tujuan
        penggunaan, sumber dana, mekanisme penyaluran dana, dan perlakuan bunga/jasa giro.{" "}
        <DocLink href={SP.permohonanPembukaanRPL}>Buka format surat permohonan</DocLink>
      </>,
      "Lampirkan surat kuasa dari KPA.",
      "KPPN menerbitkan persetujuan atau penolakan paling lambat 5 hari kerja. Surat persetujuan berlaku 15 hari kerja.",
      'Buka rekening di bank dengan format nama sesuai ketentuan (contoh untuk RPL PS: "RPL (kode KPPN) PS (nama satker) untuk ...").',
      <>
        <strong>Sampaikan laporan pembukaan rekening ke KPPN</strong> paling lambat 20 hari kerja sejak surat persetujuan
        terbit. <DocLink href={SP.laporanPembukaanRPL}>Buka format laporan</DocLink>
      </>,
    ],
    superHighlight:
      "Bendahara WAJIB mendaftarkan dan/atau melakukan pemutakhiran data Rekening Penampungan Sementara pada Sistem Informasi Keuangan, Kepegawaian, dan Aktiva (SIKKA).",
  },
  {
    no: "02",
    title: "Operasional Harian",
    summary: "Cara mendebit, mencatat, dan mengelola bunga/jasa giro rekening.",
    points: [
      "Pendebitan dilakukan melalui internet banking, atau melalui cek/bilyet giro. RPL tidak menerbitkan kartu debit — berbeda dengan Rekening Virtual.",
      "Bendahara satker wajib membukukan dan mempertanggungjawabkan seluruh dana yang ada di rekening.",
      <>
        Bunga/jasa giro: apabila rekening telah terdaftar pada program TNP, penyetoran dikonsolidasikan otomatis. Apabila
        belum terdaftar, satker menyetorkan sendiri ke Kas Negara setiap akhir bulan.{" "}
        <strong className="em">Sangat dianjurkan mendaftarkan rekening ke program TNP</strong> untuk memudahkan
        pengelolaan.
      </>,
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
      "Satker wajib menutup rekening yang telah tidak sesuai dengan tujuan penggunaannya dan memindahkan saldonya ke Kas Negara.",
      <>
        Sampaikan laporan penutupan rekening ke KPPN paling lambat 5 hari kerja setelah tanggal penutupan, dilampiri bukti
        penutupan dan bukti pemindahbukuan/setor ke Kas Negara.{" "}
        <DocLink href={SP.laporanPenutupanRPL}>Buka format laporan</DocLink>
      </>,
    ],
  },
];

export function PhaseList({ fases }) {
  return (
    <div className="disclosures">
      {fases.map((f) => (
        <Disclosure key={f.no} lead={f.no} title={f.title} summary={f.summary}>
          {f.points?.length > 0 && <Bullets items={f.points} />}
          {f.superHighlight && <Callout tone="wajib">{f.superHighlight}</Callout>}
          {f.extra}
        </Disclosure>
      ))}
    </div>
  );
}

export function GiroOperasional() {
  return (
    <TopicPage
      sectionId="giro"
      topic="operasional"
      lead="Empat fase siklus hidup Rekening Lainnya (RPL), dari sudut pandang satker sebagai pengguna rekening. Pilih setiap fase untuk menampilkan uraian lengkap."
    >
      <PhaseList fases={faseOperasional} />
    </TopicPage>
  );
}

/* ===== Perubahan Rekening (RPL) ===== */
const jenisPerubahan = [
  {
    id: "nama",
    badges: ["PMK-182"],
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
    badges: ["PMK-182"],
    title: "Perubahan Bank Tempat Pembukaan",
    summary: "Memindahkan rekening ke bank lain — tidak bisa diajukan secara kolektif.",
    steps: [
      <>
        Satker (KPA) mengajukan Surat Permohonan Persetujuan Perubahan Bank Tempat Pembukaan Rekening, dilampiri surat
        kuasa, ke KPPN mitra kerja. <DocLink href={SP.perubahanBankRPL}>Buka format surat permohonan</DocLink>
      </>,
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
    badges: ["NON-PMK", "Internal"],
    title: "Perubahan karena Mutasi Pejabat",
    summary: "Serah terima akun perbankan saat pejabat pemegang rekening berganti.",
    steps: [
      <>
        Satker membuat Berita Acara Serah Terima (BAST) Akun Perbankan antara pejabat lama (PIHAK PERTAMA) dan pejabat
        baru (PIHAK KEDUA), memuat rincian akun yang diserahterimakan — nomor & nama rekening dan akses Cash Management
        System (CMS). BAST ditandatangani PIHAK KEDUA setelah SK penunjukan resmi terbit, dan diketahui oleh atasan
        (Kasubbag Keuangan/pejabat setara eselon IV). <DocLink href={SP.bastAkunPerbankan}>Buka format BAST</DocLink>
      </>,
      <>
        Satker mengajukan surat permohonan perubahan data pemegang user CMS ke bank yang bersangkutan (merujuk
        PMK-182/PMK.05/2017) — mencantumkan data satker (nama & kode satker, nomor & nama rekening) serta detail data KPA
        dan Bendahara Pengeluaran yang baru (nama, NIP, No. KTP, No. HP, email).{" "}
        <DocLink href={SP.perubahanDataCMS}>Buka format surat perubahan data</DocLink>
      </>,
      "Prosedur selanjutnya mengikuti ketentuan masing-masing bank — formulir, salinan dokumen identitas, dan persyaratan lain sesuai kebijakan bank yang bersangkutan.",
    ],
    mutasiTab: "rekening",
    superHighlight: "Satker WAJIB membuat Berita Acara Serah Terima (BAST) Akun Perbankan setiap kali terjadi mutasi pejabat pemegang akun.",
  },
];

export function ChangeList({ items }) {
  return (
    <div className="disclosures">
      {items.map((item) => (
        <Disclosure
          key={item.id}
          indent={false}
          badges={item.badges.map((b) => (
            <Badge key={b} kind={b === "Internal" ? "neutral" : undefined}>
              {b}
            </Badge>
          ))}
          title={item.title}
          summary={item.summary}
        >
          {item.steps?.length > 0 && <Steps items={item.steps} />}
          {item.extra}
          {item.mutasiTab && (
            <div className="btn-row">
              <Link to={`mutasi/${item.mutasiTab}`} className="btn btn--primary">
                <BookOpenCheck size={17} />
                Lihat panduan lengkap mutasi pejabat
              </Link>
            </div>
          )}
          {item.superHighlight && <Callout tone="wajib">{item.superHighlight}</Callout>}
        </Disclosure>
      ))}
    </div>
  );
}

export function GiroPerubahan() {
  return (
    <TopicPage
      sectionId="giro"
      topic="perubahan"
      lead="Tiga jenis perubahan yang paling sering dihadapi satker. Pilih setiap jenis untuk menampilkan langkah-langkahnya."
    >
      <Callout tone="info">
        <p>
          Untuk perubahan bank tempat pembukaan rekening, satker dapat memindahkan Rekening Lainnya (RPL) ke salah satu dari{" "}
          <strong>4 bank mitra kerja sama pengelolaan rekening</strong>: Bank Mandiri, Bank BRI, Bank BNI, dan Bank BSI.
        </p>
      </Callout>
      <div className="mt-6">
        <ChangeList items={jenisPerubahan} />
      </div>
    </TopicPage>
  );
}

/* ===== Format Dokumen (RPL) ===== */
export function GiroFormat() {
  return (
    <TopicPage
      sectionId="giro"
      topic="format"
      lead="Format surat untuk pengelolaan Rekening Lainnya (RPL), tersedia di SharePoint Kemenkeu — dapat dibuka melalui tautan yang disediakan, kemudian dilengkapi data satker dan disampaikan sesuai ketentuan."
    >
      <DocSections groups={formatsGiro} />
    </TopicPage>
  );
}
