import { FileSignature, Handshake, ShoppingBag, Store, UserCog, UserRound, UserRoundCheck, Wallet } from "lucide-react";
import {
  Badge,
  Callout,
  Card,
  Cards,
  Codes,
  DocLink,
  DocSections,
  RegBanner,
  Section,
  TopicPage,
} from "../components/ui.jsx";
import { jdih } from "../data/site.js";
import { SP } from "../data/sharepoint.js";
import { jenisKKP } from "../data/content.js";
import { formatsKKP } from "../data/formats.js";
import { ChangeList, PhaseList } from "./Giro.jsx";

/* ===== Regulasi KKP — PMK-196/PMK.05/2018 jo. PMK-97/PMK.05/2021 ===== */
export function KKPRegulasi() {
  return (
    <TopicPage sectionId="kkp" topic="regulasi">
      <RegBanner
        links={[
          { href: jdih.pmk196, label: "Buka PMK-196/2018 di JDIH" },
          { href: jdih.pmk97, label: "Buka PMK-97/2021 (Perubahan)" },
        ]}
      >
        Naskah lengkap <strong>PMK-196/PMK.05/2018</strong> tentang Tata Cara Pembayaran dan Penggunaan Kartu Kredit
        Pemerintah, sebagaimana diubah dengan <strong>PMK-97/PMK.05/2021</strong> — dasar hukum pengelolaan KKP yang
        dibahas di halaman ini.
      </RegBanner>

      <Section title="Dasar Hukum">
        <div className="prose">
          <p>
            PMK-196/PMK.05/2018 ditetapkan 31 Desember 2018 dan berlaku efektif sejak 1 Juli 2019. KKP adalah salah satu
            inisiatif simplifikasi dan modernisasi pelaksanaan anggaran oleh Direktorat Jenderal Perbendaharaan, menggantikan
            sebagian mekanisme UP tunai dengan pembayaran nontunai.
          </p>
          <p>
            Sebagai satker, yang perlu diketahui: sebagian Uang Persediaan (UP) satker dialokasikan dalam bentuk{" "}
            <strong>UP KKP</strong> — digunakan melalui kartu, bukan tunai. UP KKP hanya bisa digunakan untuk pembayaran
            kepada 1 (satu) penerima/rekanan, dengan batas nilai sesuai jenis kartunya.
          </p>
        </div>
      </Section>

      <Section title="Jenis-Jenis KKP" lead="Dua jenis KKP yang berlaku di satker, dibedakan dari peruntukan dan siapa yang memegangnya.">
        <Codes items={jenisKKP} />
        <p className="note">Maksimal 2 kartu aktif per pemegang — 1 KKP-BO dan 1 KKP-PD sekaligus, tidak lebih dari itu masing-masing.</p>
      </Section>

      <Section title="Kanal Transaksi">
        <Cards cols={3}>
          <Card icon={Store} title="EDC">
            <strong>Mesin EDC (Electronic Data Capture)</strong> milik rekanan — kanal transaksi paling umum untuk KKP-BO dan
            KKP-PD.
          </Card>
          <Card icon={ShoppingBag} title="E-Katalog">
            <strong>Katalog elektronik LKPP</strong> — kanal yang membuka batas nilai belanja lebih tinggi (sampai Rp200 juta)
            khusus produk dalam negeri UMK.
          </Card>
          <Card icon={Wallet} title="DIGIPay">
            <strong>Marketplace pembayaran pemerintah</strong> milik Kementerian Keuangan — kanal alternatif dengan batas
            nilai sama seperti e-Katalog.
          </Card>
        </Cards>
        <p className="note">Di luar ketiga kanal ini, transaksi KKP-BO tetap tunduk pada batas umum Rp50 juta per rekanan.</p>
      </Section>

      <Section title="Dua Dokumen Dasar Sebelum Punya Kartu" lead="Sebelum satker bisa mengajukan kartu apa pun ke bank, dua dokumen ini wajib ada lebih dulu.">
        <Cards cols={2}>
          <Card icon={Handshake} title="Perjanjian Kerja Sama" badge={<Badge kind="pmk">PKS</Badge>}>
            Perjanjian antara satker dengan bank penerbit kartu. Ditandatangani bersama bank, lalu dicatat nomor, tanggal, dan
            bank mitranya.
          </Card>
          <Card icon={FileSignature} title="Surat Keputusan KPA" badge={<Badge kind="nonpmk">SK / KEP</Badge>}>
            Dasar hukum satu-satunya yang menetapkan siapa saja pemegang kartu dan Admin KKP satker. Pemegang kartu yang sah
            adalah yang tercantum pada <strong>SK terakhir yang berlaku</strong> — bukan sekadar penunjukan lisan atau memo
            internal.
          </Card>
        </Cards>
      </Section>

      <Section title="Perjanjian Juga Ditandatangani dengan Pemegang Kartu">
        <p className="sec__lead">
          Selain PKS (satker–bank) dan SK (KPA–internal) di atas, ada satu perjanjian lagi yang kerap terlewat:{" "}
          <strong>Surat Perjanjian Penggunaan KKP</strong> antara KPA dengan tiap pemegang kartu. Ini bukan dokumen opsional
          — menandatanganinya adalah kewajiban resmi Pemegang KKP per PMK-196/PMK.05/2018.
        </p>
        <Callout tone="info">
          <p>
            Ditandatangani <strong>bersamaan dengan BAST</strong>, tepat pada saat kartu diserahkan ke pemegang — bukan
            dokumen terpisah yang bisa menyusul belakangan.
          </p>
        </Callout>
        <p className="label mt-6">Per PMK-196/PMK.05/2018, isinya minimal harus memuat:</p>
        <ol className="checklist checklist--numbered">
          {[
            "Definisi",
            "Maksud dan tujuan",
            "Ruang lingkup perjanjian",
            "Penerbitan dan penerimaan kartu",
            "Penggunaan Kartu Kredit Pemerintah",
            "Hak dan kewajiban para pihak",
            "PIN",
            "Limit penggunaan kartu",
            "Penghentian perjanjian",
            "Sanksi",
            "Penyelesaian perselisihan",
          ].map((t, i) => (
            <li key={t}>
              <span className="checklist__num">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Siapa di Satker yang Berwenang">
        <Cards cols={3}>
          <Card icon={UserRound} title="KPA">
            Kuasa Pengguna Anggaran — di satker adalah <strong>Kepala Kantor</strong>, di Kantor Pusat adalah{" "}
            <strong>Sesditjen</strong>. Menunjuk Admin KKP, dan satu-satunya pihak yang berwenang menyetujui/menetapkan SK
            pemegang kartu.
          </Card>
          <Card icon={UserCog} title="Admin KKP">
            Pegawai yang ditunjuk KPA untuk mengelola operasional KKP sehari-hari — menyusun SK, mengurus PKS, dan mengajukan
            kartu ke bank. Satu satker boleh punya lebih dari satu Admin KKP.
          </Card>
          <Card icon={UserRoundCheck} title="PPK">
            Pejabat Pembuat Komitmen — menguji bukti pengeluaran, mengesahkan Daftar Pembayaran Tagihan (DPT) KKP, dan
            menerbitkan atau menolak Surat Perintah Bayar (SPBy).
          </Card>
        </Cards>
        <p className="note">
          Admin KKP sebaiknya tidak merangkap sebagai pemegang kartu — PMK KKP tidak melarangnya, namun rangkap jabatan ini
          mengurangi pemisahan tugas.
        </p>
      </Section>
    </TopicPage>
  );
}

/* ===== Operasional KKP ===== */
const faseOperasionalKKP = [
  {
    no: "01",
    title: "Dasar Legal: PKS & SK KPA",
    summary: "Dua dokumen dasar yang wajib ada sebelum satker bisa mengajukan kartu.",
    points: [
      "Satker mengisi Perjanjian Kerja Sama (PKS) dengan bank penerbit — minta formatnya ke Bank Padanan (sesuai format yang ditetapkan DJPb), tanda tangani bersama bank, lalu catat nomor dan tanggalnya.",
      <>
        <strong>Admin KKP menyusun Surat Keputusan (SK/KEP)</strong> berisi daftar pemegang kartu dan Admin KKP satker, lalu
        mengajukannya untuk ditandatangani KPA. <DocLink href={SP.skKKP}>Buka format SK</DocLink>
      </>,
      "KPA meninjau SK tersebut — bila disetujui, SK ditandatangani dan berlaku aktif; bila belum sesuai, KPA mengembalikannya untuk diperbaiki disertai catatan alasan.",
      "Selama PKS atau SK belum ada, satker belum bisa mengajukan penerbitan kartu apa pun ke bank.",
    ],
    superHighlight:
      "Pemegang kartu dan Admin KKP yang sah adalah yang tercantum pada SK terakhir yang berlaku — bukan sekadar penunjukan lisan atau memo internal.",
  },
  {
    no: "02",
    title: "Pengajuan & Penerbitan Kartu",
    summary: "Mengajukan kartu ke bank penerbit berdasarkan SK yang telah ditetapkan.",
    points: [
      <>
        <strong>KPA mengajukan permohonan penerbitan KKP ke bank penerbit</strong> untuk tiap pemegang yang tercantum pada SK,
        disertai dokumen pendukung. <DocLink href={SP.penerbitanKKP}>Buka format surat permohonan</DocLink>
      </>,
      "Bank penerbit memverifikasi permohonan paling lambat 6 hari kerja setelah surat permohonan diterima.",
      "Pemegang KKP-BO ditetapkan dari pejabat pengadaan, pejabat struktural, pelaksana, atau pegawai lain yang bertugas dalam pengadaan barang/jasa; pemegang KKP-PD dari pejabat/pegawai yang menjalankan perjalanan dinas.",
      <>
        Setelah kartu terbit, Admin KKP mencatat nomor kartunya lalu menyerahkannya kepada pemegang —{" "}
        <strong>bersamaan dengan penandatanganan BAST dan Surat Perjanjian Penggunaan KKP</strong> oleh KPA dan pemegang
        kartu.
        <span className="doc-links">
          <DocLink href={SP.bastKKP}>Buka format BAST</DocLink>
          <DocLink href={SP.perjanjianKKPBO}>Surat Perjanjian (BO)</DocLink>
          <DocLink href={SP.perjanjianKKPPD}>Surat Perjanjian (PD)</DocLink>
        </span>
      </>,
      "Maksimal 2 kartu aktif per pemegang — 1 KKP-BO dan 1 KKP-PD.",
    ],
  },
  {
    no: "03",
    title: "Transaksi & Pembayaran",
    summary: "Cara bertransaksi melalui EDC/e-Katalog/DIGIPay, lalu pengujian dan pengesahan tagihan.",
    points: [
      "Pemegang KKP melakukan transaksi pada penyedia yang menerima pembayaran KKP melalui mesin EDC, e-Katalog, atau DIGIPay.",
      "PPK menguji kesesuaian spesifikasi teknis dan volume barang/jasa terhadap kontrak/perjanjian dan bukti serah terima.",
      "Berdasarkan hasil pengujian, PPK mengesahkan Daftar Pembayaran Tagihan (DPT) KKP atas bukti-bukti pengeluaran yang memenuhi ketentuan.",
      "PPK atas nama KPA menerbitkan Surat Perintah Bayar (SPBy) paling lambat 2 hari kerja setelah DPT KKP ditetapkan.",
      "Bukti pengeluaran yang tidak memenuhi ketentuan ditolak PPK melalui Surat Pemberitahuan Penolakan, disampaikan paling lambat 3 hari kerja setelah DPT dan dokumen lampirannya diterima.",
    ],
  },
  {
    no: "04",
    title: "Penggantian UP KKP (GUP)",
    summary: "Mengajukan penggantian UP yang telah digunakan melalui SPP-GUP KKP/SPM-GUP KKP.",
    points: [
      "Bendahara mengajukan SPP-GUP KKP/SPM-GUP KKP berdasarkan DPT yang telah disahkan PPK.",
      <>
        Pengajuan SPP-GUP KKP/SPM-GUP KKP <strong>dilakukan terpisah</strong> dari pengajuan SPP/SPM pelaksanaan APBN
        lainnya.
      </>,
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
      "Kartu yang tidak segera ditarik saat pemegangnya mutasi, pensiun, meninggal dunia, atau cuti di luar tanggungan negara berisiko menjadi kartu dormant — tetap aktif namun tidak lagi digunakan dan sulit ditelusuri. Segera proses perubahan SK dan penarikan kartu begitu kondisi ini terjadi (lihat menu Perubahan KKP).",
  },
];

export function KKPOperasional() {
  return (
    <TopicPage
      sectionId="kkp"
      topic="operasional"
      lead="Lima fase siklus penggunaan KKP, dari sudut pandang satker sebagai pengguna kartu."
    >
      <PhaseList fases={faseOperasionalKKP} />
    </TopicPage>
  );
}

/* ===== Perubahan KKP ===== */
const jenisPerubahanKKP = [
  {
    id: "mutasi",
    badges: ["PMK-196"],
    title: "Perubahan Pemegang Kartu",
    summary: "Kartu ditarik dan ditutup terlebih dahulu; penerbitan kartu baru dilakukan apabila diperlukan.",
    steps: [
      "Pastikan tidak terdapat tunggakan pembayaran KKP. Apabila masih terdapat tagihan, agar segera dilakukan pelunasan.",
      <>
        KPA melakukan penarikan KKP dari pemegang yang mutasi dan menyampaikan Surat Penarikan KKP kepada Bank Penerbit KKP,
        dengan tembusan kepada pemegang yang bersangkutan. Berdasarkan surat tersebut, Bank Penerbit KKP melakukan
        penutupan kartu. <DocLink href={SP.penarikanKKP}>Buka format Surat Penarikan</DocLink>
      </>,
      "Dokumen pendukung penutupan disesuaikan dengan ketentuan atau permintaan masing-masing Bank Penerbit KKP.",
      <>
        Satker memperbarui KEP tentang Daftar Pemegang KKP dan Daftar Administrator KKP.{" "}
        <DocLink href={SP.skPerubahanKKP}>Buka format KEP Perubahan</DocLink>
      </>,
      <>
        Apabila satker akan menerbitkan KKP baru, satker mengajukan Surat Permohonan Penerbitan KKP, dilampiri Surat
        Referensi, sesuai KEP yang baru. <DocLink href={SP.penerbitanKKP}>Buka format Surat Penerbitan</DocLink>
      </>,
      <>
        Setelah kartu baru terbit, KPA dan pemegang baru menandatangani BAST KKP bersamaan dengan Surat Perjanjian
        Penggunaan KKP. <DocLink href={SP.bastKKP}>Buka format BAST</DocLink>
      </>,
    ],
    mutasiTab: "kkp",
    superHighlight:
      "Penarikan KKP agar segera dilakukan begitu pemegang mutasi, pensiun, meninggal dunia, atau cuti di luar tanggungan negara — penundaan berisiko membuat kartu tetap aktif tanpa pemegang yang sah (dormant).",
  },
  {
    id: "admin",
    badges: ["NON-PMK", "Internal"],
    title: "Perubahan Admin KKP",
    summary: "Melalui pembaruan KEP, kemudian diberitahukan kepada Bank Penerbit KKP — tanpa proses penarikan atau penerbitan kartu.",
    steps: [
      <>
        Admin KKP menyusun SK/KEP pembaruan — menghapus Admin KKP lama dan/atau menambahkan Admin KKP baru — lalu
        mengajukannya untuk ditandatangani KPA. <DocLink href={SP.skPerubahanKKP}>Buka format SK Perubahan</DocLink>
      </>,
      "KPA meninjau dan menandatangani SK baru tersebut sehingga berlaku aktif.",
      "Satker memberitahukan pergantian Admin KKP ke bank penerbit sebagai kontak pengurus KKP satker — dapat dilakukan melalui surat maupun sarana komunikasi lain, mengikuti prosedur masing-masing bank.",
      "Admin KKP yang sah adalah yang tercantum pada SK terakhir yang berlaku — pastikan daftar ini selalu diperbarui setiap kali ada mutasi.",
    ],
    mutasiTab: "kkp",
    superHighlight:
      "Berbeda dari perubahan pemegang kartu, perubahan Admin KKP tidak sampai proses tarik/terbit kartu ke bank — pemberitahuannya cukup sebagai update kontak pengurus, bukan permohonan kartu baru.",
  },
  {
    id: "limit",
    badges: ["PMK-196"],
    title: "Perubahan Limit Kartu",
    summary: "Menaikkan batas transaksi KKP-BO, khusus untuk kebutuhan pengadaan produk dalam negeri UMK.",
    steps: [
      "KPA mengajukan permohonan perubahan limit KKP-BO ke bank penerbit, disertai justifikasi kebutuhan — umumnya untuk transaksi melalui e-Katalog atau DIGIPay.",
      "Limit KKP-BO dapat dinaikkan dari batas umum Rp50 juta sampai maksimal Rp200 juta per rekanan, khusus untuk transaksi produk dalam negeri UMK.",
      "Bank penerbit mengonfirmasi limit baru setelah permohonan disetujui.",
    ],
  },
  {
    id: "hilang",
    badges: ["NON-PMK", "Internal"],
    title: "Kartu Hilang atau Rusak",
    summary: "Ditutup melalui Surat Permohonan Penutupan, lalu diajukan ulang melalui Surat Permohonan Penerbitan.",
    steps: [
      <>
        Satker segera mengajukan surat permohonan penutupan KKP (menggunakan format Surat Penarikan KKP) ke bank penerbit
        begitu kartu diketahui hilang atau rusak, dilampiri surat kehilangan untuk kartu yang hilang.{" "}
        <DocLink href={SP.penarikanKKP}>Buka format Surat Penutupan</DocLink>
      </>,
      <>
        Setelah kartu ditutup, Admin KKP mengajukan kartu pengganti ke bank penerbit melalui Surat Permohonan Penerbitan KKP
        yang sama seperti pengajuan kartu baru — karena pemegangnya tetap sama, proses ini tidak perlu melalui siklus
        perubahan SK. <DocLink href={SP.penerbitanKKP}>Buka format Surat Penerbitan</DocLink>
      </>,
      "Catat kejadian ini pada dokumentasi internal satker sebagai kelengkapan arsip.",
    ],
  },
];

export function KKPPerubahan() {
  return (
    <TopicPage
      sectionId="kkp"
      topic="perubahan"
      lead="Empat jenis perubahan yang paling sering dihadapi satker, beserta langkah-langkahnya."
    >
      <Callout tone="info">
        <p>
          Prinsip dasar yang perlu diingat: <strong>kartu milik pemegang yang mutasi wajib ditarik dan ditutup.</strong>{" "}
          Penerbitan kartu baru merupakan langkah terpisah yang dilakukan apabila diperlukan, didahului dengan penetapan KEP
          baru.
        </p>
      </Callout>
      <div className="mt-6">
        <ChangeList items={jenisPerubahanKKP} />
      </div>
    </TopicPage>
  );
}

/* ===== Format Dokumen KKP ===== */
export function KKPFormat() {
  return (
    <TopicPage sectionId="kkp" topic="format" lead="Format surat untuk pengelolaan Kartu Kredit Pemerintah (KKP).">
      <DocSections groups={formatsKKP} />
    </TopicPage>
  );
}
