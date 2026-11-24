import { BookOpenCheck } from "lucide-react";
import { Badge, Bullets, Card, Cards, Codes, Steps } from "../components/ui.jsx";
import { StrukturDiagram } from "../pages/Virtual.jsx";
import { Link } from "../lib/router.jsx";
import { jenisKKP, jenisRPL } from "./content.js";

function GuideButton({ to, children = "Lihat panduan lengkap" }) {
  return (
    <div className="btn-row">
      <Link to={to} className="btn btn--primary">
        <BookOpenCheck size={17} />
        {children}
      </Link>
    </div>
  );
}

const P = ({ children }) => <p className="text">{children}</p>;

/* ===================================== Rekening Giro ===================================== */
export const faqGiro = [
  {
    id: "dasar-kepemilikan",
    q: "Dasar Kepemilikan Rekening oleh Bendahara",
    a: (
      <>
        <P>
          Salah satu <em>jobdesk</em> yang melekat ke Bendahara adalah pengelolaan rekening — termasuk Rekening Lainnya (RPL)
          yang dibahas di tab ini.
        </P>
        <Steps
          items={[
            { t: "Uang Masuk", d: "Hampir setiap hari ada uang masuk dari KPPN dalam rangka pelaksanaan pembayaran dan operasional satker." },
            { t: "Ditampung", d: "Uang masuk perlu rekening satker yang kemudian dikelola oleh Bendahara." },
            { t: "Disalurkan", d: "Penyaluran uang atau pembayaran bisa melalui tarik tunai atau mekanisme transfer." },
          ]}
        />
      </>
    ),
  },
  {
    id: "pengertian-rpl",
    q: "Pengertian Rekening Lainnya (RPL)",
    a: (
      <>
        <P>
          RPL adalah kelompok rekening satker di luar Rekening Penerimaan dan Rekening Pengeluaran, diatur PMK-182/PMK.05/2017.
          Ada 9 jenis RPL — <strong>RPL PS dan PDT paling sering digunakan di DJP</strong>, sisanya dibuka sesuai kebutuhan.
        </P>
        <Codes items={jenisRPL.slice(0, 4)} />
        <p className="note">
          {jenisRPL.length - 4} jenis RPL lainnya bisa dilihat lengkap di menu{" "}
          <Link to="giro/regulasi" className="doc-link">
            Rekening Giro, Regulasi Rekening
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "pihak-berwenang-rpl",
    q: "Pihak yang Berwenang Mengelola Rekening RPL",
    a: (
      <Cards cols={2}>
        <Card title="KPA (Kuasa Pengguna Anggaran)">
          Pemegang kewenangan utama — pembukaan, pengoperasian, penutupan, dan pelaporan rekening.
        </Card>
        <Card title="Kepala Satker / Pimpinan BLU">
          Mengambil alih kewenangan khusus untuk RPL tertentu (BLU, Dana Jaminan, Dana Titipan, RPL PS) bila KPA tidak dapat
          melakukannya.
        </Card>
      </Cards>
    ),
  },
  {
    id: "rpl-ps-penagihan",
    q: "Ketentuan Pembukaan RPL PS untuk Penagihan",
    a: (
      <>
        <P>
          Diperbolehkan — satker (khusus Unit Vertikal: Kanwil dan KPP) dapat membuka dan mengoperasikan RPL PS untuk Penagihan
          sekarang juga, sesuai prosedur umum PMK-182/PMK.05/2017.
        </P>
        <GuideButton to="isu/penagihan" />
      </>
    ),
  },
  {
    id: "penyetoran-rpl",
    q: "Ketentuan Penyetoran dan Penihilan Rekening RPL",
    a: (
      <P>
        <strong>RPL PS Penagihan:</strong> seluruh hasil penjualan wajib disetor paling lambat 31 Desember. Apabila tidak bisa,
        Kasi P3 buat Berita Acara, lapor ke Kepala Kantor & Kasubbag Umum dan Kepatuhan Internal. Untuk RPL lain, ikuti tujuan
        penggunaan masing-masing sesuai dasar persetujuan pembukaannya.
      </P>
    ),
  },
  {
    id: "cms-giro",
    q: "Pengertian Cash Management System (CMS)",
    a: (
      <P>
        <strong>CMS (Cash Management System)</strong> — tools/website bank untuk transaksi online seperti transfer dan bayar
        pajak. Sangat disarankan semua satker punya akses CMS untuk tiap rekening RPL yang dikelola.
      </P>
    ),
  },
  {
    id: "mutasi-giro",
    q: "Prosedur saat Terjadi Mutasi KPA/Bendahara",
    a: (
      <>
        <P>
          Secara ringkas: pejabat lama wajib menyusun BAST, sedangkan pejabat baru menyampaikan pemberitahuan ke bank dan
          memastikan aksesnya berfungsi. Prosedur lengkap pada masing-masing bank (BRI/Mandiri/BNI/BSI) berbeda-beda.
        </P>
        <GuideButton to="mutasi/rekening" />
      </>
    ),
  },
  {
    id: "perubahan-bank-giro",
    q: "Prosedur Perubahan Bank Tempat Pembukaan Rekening",
    a: (
      <P>
        Dapat dilakukan. Untuk RPL, satker mengajukan permohonan perubahan bank tempat pembukaan rekening langsung ke{" "}
        <strong>KPPN mitra kerja</strong>, lalu memindahkan ke salah satu dari 4 bank mitra: Bank Mandiri, Bank BRI, Bank BNI,
        atau Bank BSI.
      </P>
    ),
  },
  {
    id: "penolakan-kppn",
    q: "Tindak Lanjut atas Penolakan Permohonan RPL oleh KPPN",
    a: (
      <P>
        Satker berkonsultasi kepada KPPN mitra kerja untuk menanyakan dua hal: dokumen yang masih belum lengkap, atau ketentuan
        mana dari PMK-182/PMK.05/2017 yang belum terpenuhi sehingga permohonan ditolak. Setelah itu, satker bisa melengkapi dan
        mengajukan ulang permohonan pembukaan.
      </P>
    ),
  },
  {
    id: "rpl-sejenis",
    q: "Ketentuan Kepemilikan Lebih dari Satu RPL Sejenis",
    a: (
      <>
        <P>
          Diperbolehkan. Satu satker dapat membuka lebih dari satu RPL dengan jenis yang sama, selama tujuan penggunaannya
          berbeda. Contoh yang telah berjalan di DJP:
        </P>
        <Bullets
          items={[
            "RPL PS Tunjangan Kinerja dan RPL PS Penagihan — keduanya merupakan RPL PS, namun dengan tujuan penggunaan yang berbeda.",
            "RPL Penyidikan — dibuka khusus di tingkat Kanwil.",
            "Jenis RPL lain juga bisa dibuka sesuai kebutuhan yang muncul ke depan, misalnya RPL Bantuan Global atau RPL PS Penampungan Efek.",
          ]}
        />
      </>
    ),
  },
  {
    id: "penutupan-tidak-digunakan",
    q: "Ketentuan Penutupan RPL yang Tidak Digunakan",
    a: (
      <P>
        Bank biasanya akan menonaktifkan otomatis RPL yang tidak ada transaksi selama <strong>6 bulan sampai 1 tahun</strong>.
        Apabila rekening tersebut masih akan digunakan kembali, satker cukup mengajukan permohonan ke bank untuk mengaktifkan
        kembali statusnya — tidak perlu membuka rekening baru.
      </P>
    ),
  },
  {
    id: "rekonsiliasi-rpl",
    q: "Frekuensi Rekonsiliasi RPL ke KPPN",
    a: (
      <P>
        Umumnya <strong>setiap bulan</strong>, dituangkan dalam Berita Acara rekonsiliasi. Karena ketentuan teknis ini bisa
        berubah atau berbeda mekanismenya antar KPPN, tetap konfirmasi ke KPPN mitra kerja masing-masing untuk memastikan
        jadwal dan mekanisme yang berlaku saat ini.
      </P>
    ),
  },
  {
    id: "kpa-berhalangan",
    q: "Penggantian KPA yang Berhalangan Sementara",
    a: (
      <P>
        Apabila KPA berhalangan sementara — misalnya cuti panjang — bukan mutasi permanen, penggantiannya melalui{" "}
        <strong>Pelaksana Harian (Plh) atau Pelaksana Tugas (Plt) KPA</strong>, bukan proses mutasi penuh. Satker tetap wajib
        memberitahukan ke bank perihal penunjukan ini, disertai surat penunjukan Plh/Plt, dan mengubah data pemegang akun ke
        bank apabila memang diperlukan.
      </P>
    ),
  },
  {
    id: "jenis-rpl",
    q: "Jenis-Jenis Rekening Lainnya (RPL)",
    a: (
      <>
        <P>RPL PS dan PDT paling sering digunakan di DJP. 7 jenis lainnya dibuka sesuai kebutuhan spesifik:</P>
        <Bullets
          items={[
            "BLU — untuk satker berstatus Badan Layanan Umum.",
            "PWK — khusus perwakilan RI di luar negeri.",
            "DB — menyalurkan dana bantuan ke penerima melalui bank penyalur.",
            "PDHL — pengelolaan hibah langsung dalam bentuk uang.",
            "PDH — menyalurkan dana dari Rekening Penampungan Dana Hibah Langsung.",
            "KS — menampung dana kerja sama dua pihak.",
            "PDJ — menampung dana jaminan pihak ketiga yang akan dikembalikan.",
          ]}
        />
      </>
    ),
  },
  {
    id: "waktu-persetujuan-rpl",
    q: "Jangka Waktu Proses Persetujuan Pembukaan RPL di KPPN",
    a: (
      <P>
        KPPN menerbitkan persetujuan atau penolakan <strong>paling lambat 5 hari kerja</strong> sejak permohonan diterima. Surat
        persetujuan yang terbit berlaku selama <strong>15 hari kerja</strong> — satker harus buka rekening di bank dalam jangka
        waktu itu. Setelah rekening dibuka, laporan pembukaan wajib disampaikan ke KPPN paling lambat 20 hari kerja sejak surat
        persetujuan terbit.
      </P>
    ),
  },
  {
    id: "sikka",
    q: "Kewajiban Pendaftaran RPL pada SIKKA",
    a: (
      <P>
        Karena itu kewajiban Bendahara — setiap RPL PS wajib didaftarkan dan/atau dimutakhirkan datanya di Sistem Informasi
        Keuangan, Kepegawaian, dan Aktiva (SIKKA). Ini bukan opsional; apabila data di SIKKA tidak sesuai dengan rekening yang
        sebenarnya, satker berisiko dianggap belum tertib administrasi saat pemeriksaan.
      </P>
    ),
  },
  {
    id: "tnp",
    q: "Program TNP untuk Penyetoran Bunga/Jasa Giro",
    a: (
      <P>
        TNP adalah program konsolidasi otomatis untuk penyetoran bunga/jasa giro rekening ke Kas Negara. Apabila rekening telah
        terdaftar pada TNP, penyetorannya terkonsolidasi secara otomatis — satker tidak perlu menyetor secara manual tiap
        bulan. Apabila belum ikut, satker harus menyetorkan sendiri ke Kas Negara setiap akhir bulan. Sangat dianjurkan
        mendaftarkan rekening ke program TNP untuk memudahkan pengelolaan.
      </P>
    ),
  },
  {
    id: "batas-laporan-saldo",
    q: "Batas Waktu Penyampaian Laporan Saldo Bulanan ke KPPN",
    a: (
      <P>
        Paling lambat <strong>tanggal 10 bulan berikutnya</strong>, untuk seluruh rekening yang dikelola satker. Apabila tanggal
        10 jatuh pada hari libur, laporan disampaikan pada hari kerja sebelumnya — bukan diundur ke hari kerja setelahnya.
      </P>
    ),
  },
  {
    id: "rekening-pasif",
    q: "Kriteria Rekening RPL Pasif dan Kewajiban Penutupannya",
    a: (
      <P>
        Rekening dikategorikan pasif apabila tidak ada transaksi debit maupun kredit selama <strong>1 tahun</strong> sejak
        transaksi terakhir. KPPN akan mengirim surat pemberitahuan rekening pasif <strong>6 bulan sebelum</strong> batas waktu
        penutupan, sehingga satker masih memiliki waktu untuk menindaklanjuti sebelum dilakukan penutupan.
      </P>
    ),
  },
  {
    id: "perubahan-nama",
    q: "Perubahan Nama Rekening akibat Perubahan Nomenklatur Satker",
    a: (
      <P>
        Dapat dilakukan. Satker mengajukan permohonan persetujuan perubahan nama Rekening ke KPPN mitra kerja, tanpa mengubah
        tujuan penggunaan rekening. KPPN lalu menerbitkan Surat Perubahan Nama Rekening yang ditujukan ke bank, dan bank yang
        mengeksekusi perubahan nama sekaligus memberi tahu KPPN dan satker.
      </P>
    ),
  },
  {
    id: "perubahan-kolektif",
    q: "Ketentuan Pengajuan Perubahan Bank secara Kolektif",
    a: (
      <P>
        Tidak diperbolehkan. Perubahan bank tempat pembukaan rekening diajukan satu per satu, tidak dapat dilakukan secara
        kolektif untuk banyak rekening sekaligus — meskipun rekening-rekening itu dikelola satker yang sama.
      </P>
    ),
  },
  {
    id: "format-nama-rpl",
    q: "Dasar Penggunaan Format Khusus pada Nama Rekening RPL",
    a: (
      <P>
        Supaya bisa langsung dikenali jenis dan asal-usulnya. Formatnya kira-kira:{" "}
        <strong>"RPL (kode KPPN) (kode jenis, mis. PS) (nama satker) untuk ..."</strong> — jadi siapa pun yang melihat nama
        rekening di rekening koran bisa langsung tahu itu RPL jenis apa, punya satker mana, dan di bawah KPPN mana, tanpa perlu
        buka dokumen pendukung lain.
      </P>
    ),
  },
  {
    id: "pembukuan-rpl",
    q: "Penanggung Jawab Pembukuan Transaksi RPL",
    a: (
      <P>
        Bendahara satker. Bendahara wajib membukukan dan mempertanggungjawabkan seluruh dana yang keluar-masuk di rekening RPL
        yang dikelolanya — tidak hanya menyimpan bukti transaksi, tetapi juga mencatatnya secara tertib sebagai bagian dari
        laporan pertanggungjawaban.
      </P>
    ),
  },
  {
    id: "koordinasi-p3",
    q: "Koordinasi Seksi P3 dan Bendahara dalam Pengelolaan RPL PS Penagihan",
    a: (
      <P>
        Kolaborasi penggunaan rekening RPL PS Penagihan mengikuti ketentuan di masing-masing kantor. Praktik yang dianjurkan:
        pemberitahuan adanya pengkreditan (uang masuk) dan rencana pendebitan (uang keluar) disampaikan melalui Nota Dinas oleh
        Seksi P3 — ini jadi dasar Bendahara melakukan transaksi, sekaligus dokumen pendukung yang dilampirkan dalam Laporan
        Pertanggungjawaban Bendahara.
      </P>
    ),
  },
  {
    id: "lokasi-format-giro",
    q: "Lokasi Format Surat yang Diperlukan",
    a: (
      <P>
        Buka menu <strong>Rekening Giro</strong>, lalu masuk ke submenu{" "}
        <Link to="giro/format" className="doc-link">
          Format Dokumen
        </Link>
        . Seluruh format telah dikelompokkan per kategori (Pembukaan, Perubahan & Penutupan, Non-PMK) dan dapat dibuka
        langsung pada SharePoint Kemenkeu.
      </P>
    ),
  },
];

/* ===================================== Rekening Virtual ===================================== */
export const faqVirtual = [
  {
    id: "virtual-vs-giro",
    q: "Pengertian Rekening Virtual dan Perbedaannya dengan Rekening Giro",
    a: (
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Aspek</span>
              </th>
              <th scope="col">Rekening Giro</th>
              <th scope="col">Rekening Virtual (VA)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cakupan", "Hanya untuk jenis RPL", "Untuk seluruh rekening BPG, BPP, dan BPG VAT"],
              ["Dasar hukum", "PMK-182/PMK.05/2017 — pembukaan s.d. penutupan", "PMK-183/PMK.05/2019 — pembukaan & penutupan (pengoperasian relatif sama dengan PMK-182)"],
              ["Data rekening", "Terpisah-pisah, kantor pusat DJP tidak dapat memonitor", "Terkonsolidasi dan tersambung melalui kanal Dashboard"],
              ["Pengambilan uang", "Cek/bilyet giro. Internet banking bisa digunakan sebagaimana mestinya", "Surat pendebitan (SPPR). Internet banking digunakan berdampingan dengan Dashboard"],
              ["Penyelesaian kendala", "Melalui cabang padanan masing-masing", "Dapat melalui cabang, grup WhatsApp Satker–KPDJP–Bank, atau kanal khusus bank"],
            ].map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "melalui-eselon-i",
    q: "Dasar Pengajuan Permohonan Rekening Virtual melalui Eselon I",
    a: (
      <P>
        Beda dari RPL yang satker ajukan langsung ke KPPN, Rekening Satker (BPG/BPP) itu sub-akun virtual yang terkonsolidasi
        ke satu Rekening Induk di tingkat Eselon I. Karena itu, permohonan pembukaan, perubahan, maupun penutupan Rekening
        Satker harus melalui Eselon I (di DJP: Sekretariat DJP/Bagian Keuangan Kantor Pusat) dulu, baru diteruskan ke KPPN
        Jakarta II.
      </P>
    ),
  },
  {
    id: "bpg-bpp-vat",
    q: "Perbedaan BPG, BPP, dan BPG VAT",
    a: (
      <Cards cols={3}>
        <Card title="BPG" badge={<Badge kind="wajib">Sudah pasti ada</Badge>}>
          Menampung dana operasional harian. Hanya 1 per satker — tidak bisa dibuka baru.
        </Card>
        <Card title="BPP" badge={<Badge kind="opsional">Opsional</Badge>}>
          Dananya dari BPG. Biasanya untuk satker yang punya KP2KP. Boleh lebih dari 1.
        </Card>
        <Card title="BPG VAT" badge={<Badge kind="opsional">Terbatas</Badge>}>
          Untuk VAT Refund di bandara besar. Saat ini hanya di 5 satker.
        </Card>
      </Cards>
    ),
  },
  {
    id: "rekening-induk",
    q: "Rekening Induk dan Struktur Konsolidasi Rekening Virtual",
    a: (
      <>
        <P>
          Rekening Satker yang dikelola sehari-hari pada dasarnya merupakan nomor identifikasi virtual di bawah Rekening Induk
          yang dikelola kantor pusat. Satker tidak perlu mengelola Rekening Induk tersebut.
        </P>
        <StrukturDiagram />
      </>
    ),
  },
  {
    id: "penihilan-virtual",
    q: "Ketentuan Penyetoran dan Penihilan Rekening Virtual",
    a: (
      <P>
        <strong>Rekening Virtual (BPG/BPP):</strong> saldo UP/TUP wajib nihil di akhir hari kerja tahun anggaran.
      </P>
    ),
  },
  {
    id: "cms-dashboard",
    q: "Pengertian CMS dan Dashboard",
    a: (
      <Cards cols={2}>
        <Card title="CMS (Cash Management System)">
          Tools/website bank untuk transaksi online — transfer, bayar pajak, dsb. Sangat disarankan semua satker punya.
        </Card>
        <Card title="Dashboard">
          Website yang mencatat seluruh transaksi satker, terkonsolidasi & bisa dilihat KPDJP/Kementerian/DJPb. Hanya ada untuk
          rekening Virtual.
        </Card>
      </Cards>
    ),
  },
  {
    id: "kartu-debit-hilang",
    q: "Penanganan Kartu Debit Hilang atau Rusak",
    a: (
      <Steps
        items={[
          "Segera kontak PIC Rekening atau beritahukan di Grup Rekening.",
          "Bank Pusat biasanya menghubungi satker & Bank Cabang untuk otorisasi tarik tunai teller sementara tanpa kartu debit — akses Dashboard tetap bisa digunakan untuk memantau transaksi.",
          "Bank Pusat menerbitkan kartu debit baru, dikirim melalui Bank Cabang ke satker.",
        ]}
      />
    ),
  },
  {
    id: "mutasi-virtual",
    q: "Prosedur saat Terjadi Mutasi KPA/Bendahara",
    a: (
      <>
        <P>
          Secara ringkas: pejabat lama wajib menyusun BAST (termasuk akses Dashboard), sedangkan pejabat baru menyampaikan
          pemberitahuan ke bank dan memastikan aksesnya berfungsi. Prosedur lengkap pada masing-masing bank
          (BRI/Mandiri/BNI/BSI) berbeda-beda.
        </P>
        <GuideButton to="mutasi/rekening" />
      </>
    ),
  },
  {
    id: "perubahan-bank-virtual",
    q: "Prosedur Perubahan Bank Tempat Pembukaan Rekening",
    a: (
      <P>
        Dapat dilakukan. Satker mengajukan permohonan melalui <strong>Eselon I</strong> ke <strong>KPPN Jakarta II</strong>, lalu
        membuka rekening VA baru di bank tujuan — satker akan pegang <strong>2 rekening VA aktif sementara</strong> selama masa
        transisi sebelum yang lama ditutup.
      </P>
    ),
  },
  {
    id: "selisih-saldo",
    q: "Penanganan Selisih Saldo Dashboard dengan Catatan Bank",
    a: (
      <P>
        Hubungi Bank Pusat melalui Grup Rekening WhatsApp, atau melalui kanal resmi perbankan (email/telepon), untuk meminta
        rekonsiliasi ulang antara data Dashboard dan catatan bank. Selisih tersebut agar tidak dibiarkan — semakin cepat
        dilaporkan, semakin mudah sumber selisih ditelusuri.
      </P>
    ),
  },
  {
    id: "bpg-vat-satker",
    q: "Cakupan Satker Pengelola BPG VAT dan Ketentuan Penambahannya",
    a: (
      <>
        <P>Saat ini BPG VAT hanya ada di 5 satker:</P>
        <Bullets
          items={["KPP Pratama Lubuk Pakam", "KPP Pratama Tangerang Barat", "KPP Pratama Sidoarjo Utara", "KPP Pratama Badung Selatan", "KPP Pratama Wates"]}
        />
        <P>
          Satker di luar daftar ini tidak bisa mengajukan BPG VAT sendiri, kecuali ada ketentuan baru dari regulasi VAT Refund
          yang mengizinkannya.
        </P>
      </>
    ),
  },
  {
    id: "pemulihan-dashboard",
    q: "Pemulihan Akses Dashboard di Luar Konteks Mutasi",
    a: (
      <P>
        Buat surat permohonan perubahan data perbankan, isi dengan data akses yang baru yang dibutuhkan satker. Ini prosedur
        yang sama dengan permohonan perubahan data pemegang CMS & Dashboard saat mutasi — dengan dasar yang berbeda, yaitu
        bukan karena pergantian pejabat.
      </P>
    ),
  },
  {
    id: "maksimal-bpp",
    q: "Ketentuan Jumlah Maksimal BPP yang Dapat Dibuka",
    a: (
      <P>
        Tidak ada batas angka pasti — jumlah BPP yang dibuka bebas mengikuti kebutuhan satker, dengan{" "}
        <strong>maksimal sebanyak jumlah KP2KP</strong> yang dimiliki satker tersebut, kecuali ada pengecualian khusus dari
        regulasi yang berlaku untuk satker tertentu.
      </P>
    ),
  },
  {
    id: "penanda-tangan-sppr",
    q: "Pihak Penanda Tangan SPPR",
    a: (
      <>
        <P>
          Surat Perintah Pendebitan Rekening (SPPR) ditandatangani <strong>KPA/PPK dan Bendahara</strong>. Wajib dibuat untuk:
        </P>
        <Bullets
          items={[
            "Penarikan tunai melalui teller — SPPR diserahkan ke teller, salinannya disimpan satker sebagai arsip.",
            "Penarikan tunai melalui ATM — SPPR disimpan sebagai arsip pendukung transaksi.",
          ]}
        />
        <P>
          Untuk transaksi melalui CMS, SPPR tidak diperlukan — dasar pendebitannya telah tercatat secara otomatis pada sistem
          CMS.
        </P>
      </>
    ),
  },
  {
    id: "waktu-pembukaan-virtual",
    q: "Jangka Waktu Proses Pembukaan Rekening Virtual",
    a: (
      <P>
        Eselon I meneruskan permohonan ke Kuasa BUN di Daerah <strong>paling lambat 5 hari kerja</strong> sejak diterima dari
        satker. Setelah disetujui, bank membuka Rekening Satker dan mengirimkan user Dashboard, akses CMS, serta kartu debit ke
        satker <strong>paling lambat 10 hari kerja</strong>.
      </P>
    ),
  },
  {
    id: "bpp-bank-sama",
    q: "Dasar Ketentuan BPP Dibuka pada Bank yang Sama dengan BPG Induk",
    a: (
      <P>
        Karena Rekening Pengeluaran Pembantu (BPP) memang dibuka di bank mitra yang sama dengan Rekening Pengeluaran (BPG)
        satker yang bersangkutan — bukan pilihan bebas. Ini bagian dari desain struktur konsolidasi VA, supaya pengkreditan BPP
        tetap bisa otomatis terhubung ke Rekening Induk melalui BPG induknya.
      </P>
    ),
  },
  {
    id: "operator-bpg-bpp",
    q: "Pihak yang Mengoperasikan BPG dan BPP",
    a: (
      <P>
        <strong>Rekening Pengeluaran (BPG)</strong> dioperasikan oleh Bendahara Pengeluaran.{" "}
        <strong>Rekening Pengeluaran Pembantu (BPP)</strong> dioperasikan oleh Bendahara Pengeluaran Pembantu — beda orang,
        beda rekening, meski dananya berasal dari BPG yang sama.
      </P>
    ),
  },
  {
    id: "transaksi-tunai",
    q: "Kondisi yang Memperbolehkan Transaksi Tunai pada Rekening Virtual",
    a: (
      <>
        <P>Transaksi diusahakan selalu non-tunai (melalui CMS atau kartu debit). Tunai hanya untuk kondisi tertentu:</P>
        <Bullets
          items={[
            "Gangguan sistem perbankan.",
            "Pihak ketiga (penerima pembayaran) tidak menerima transaksi non-tunai.",
            "Keadaan kahar — bencana, epidemik, kerusuhan.",
          ]}
        />
      </>
    ),
  },
  {
    id: "kewajiban-sppr",
    q: "Ketentuan Kewajiban Pembuatan SPPR",
    a: (
      <P>
        Setiap kali ada pengambilan tunai — baik melalui ATM maupun teller — wajib disertai Kartu Debit <strong>DAN</strong>{" "}
        Surat Perintah Pendebitan Rekening (SPPR). Formatnya ada di Lampiran PMK-183/PMK.05/2019. Transaksi melalui CMS tidak
        butuh SPPR terpisah, karena dasar pendebitannya telah tercatat secara otomatis pada sistem CMS.
      </P>
    ),
  },
  {
    id: "penihilan-up-tup",
    q: "Kewajiban Penihilan Saldo UP/TUP Akhir Tahun Anggaran",
    a: (
      <P>
        Ini kewajiban penihilan akhir tahun anggaran — pada akhir hari kerja tahun anggaran, sisa saldo Rekening Pengeluaran yang
        bersumber dari dana UP/TUP wajib nihil, mengikuti ketentuan PMK mengenai tata cara pembayaran APBN dan pedoman akhir
        tahun anggaran.
      </P>
    ),
  },
  {
    id: "pelaporan-virtual-vs-rpl",
    q: "Dasar Perbedaan Mekanisme Pelaporan Rekening Virtual dan RPL",
    a: (
      <P>
        Pelaporan saldo Rekening Pengeluaran telah dihasilkan secara elektronik melalui Dashboard yang diberikan bank — beda dari
        RPL yang harus disusun dan dikirim manual tiap bulan. Satker cukup pastikan akses Dashboard aktif dan dipantau rutin.
      </P>
    ),
  },
  {
    id: "tahapan-panjang",
    q: "Latar Belakang Panjangnya Tahapan Perubahan Bank Rekening Virtual",
    a: (
      <P>
        Rekening VA tidak dapat dipindahkan secara langsung — prosesnya harus melalui Eselon I, KPPN Jakarta II, bank lama, dan
        bank baru secara berurutan, plus ada masa transisi di mana satker memegang 2 rekening VA aktif sekaligus sebelum yang
        lama benar-benar ditutup. Setiap tahap punya dokumen dan pihak yang berbeda, makanya jadi panjang.
      </P>
    ),
  },
  {
    id: "va-kp2kp",
    q: "Prosedur Pembukaan Rekening Virtual Baru untuk KP2KP",
    a: (
      <P>
        Dapat dilakukan. Ketentuan ini berlaku bagi KP2KP yang perlu membuka rekening VA baru, menggunakan bank yang sama dengan
        Bank BPG induknya. Prosesnya mirip pembukaan rekening biasa: surat permohonan sesuai Format IV melalui aplikasi Nadine ke
        Sekretaris Direktorat Jenderal Pajak, diteruskan Kantor Pusat DJP ke KPPN Jakarta II, sampai akhirnya VA baru aktif dan
        terdaftar di SAKTI dan SPAN. Detail lengkapnya ada di menu{" "}
        <Link to="virtual/operasional" className="doc-link">
          Operasional Rekening Virtual
        </Link>{" "}
        bagian "Kasus Khusus KP2KP".
      </P>
    ),
  },
  {
    id: "dua-va-aktif",
    q: "Jangka Waktu Kepemilikan Dua Rekening Virtual Aktif saat Perubahan Bank",
    a: (
      <P>
        Sampai rekening VA baru dipastikan lancar menerima SP2D dari KPPN dan Laporan Pemindahbukuan (Format X) telah disusun.
        Setelah itu, KPPN Jakarta II menerbitkan surat perintah penutupan kepada bank lama. Tidak ada angka hari pasti karena
        tergantung kecepatan verifikasi tiap tahap; yang penting satker tidak menutup rekening lama sebelum rekening baru
        benar-benar berfungsi penuh.
      </P>
    ),
  },
  {
    id: "lokasi-format-virtual",
    q: "Lokasi Format Surat yang Diperlukan",
    a: (
      <P>
        Buka menu <strong>Rekening Virtual</strong>, lalu masuk ke submenu{" "}
        <Link to="virtual/format" className="doc-link">
          Format Dokumen
        </Link>
        . Seluruh format telah dikelompokkan per kategori dan dapat dibuka langsung pada SharePoint Kemenkeu.
      </P>
    ),
  },
];

/* ===================================== KKP ===================================== */
export const faqKKP = [
  {
    id: "bo-vs-pd",
    q: "Perbedaan KKP-BO dan KKP-PD",
    a: <Codes items={jenisKKP} />,
  },
  {
    id: "pihak-berwenang-kkp",
    q: "Pihak yang Berwenang Mengelola KKP di Satker",
    a: (
      <Cards cols={3}>
        <Card title="KPA">
          Kepala Kantor (Sesditjen di Kantor Pusat). Menunjuk Admin KKP, satu-satunya yang berwenang menyetujui/menandatangani
          SK.
        </Card>
        <Card title="Admin KKP">
          Ditunjuk KPA untuk mengelola operasional KKP sehari-hari — PKS, SK, pengajuan kartu. Boleh lebih dari satu.
        </Card>
        <Card title="PPK">Menguji bukti pengeluaran, mengesahkan DPT KKP, menerbitkan/menolak SPBy.</Card>
      </Cards>
    ),
  },
  {
    id: "pks-sk",
    q: "Pengertian PKS dan SK/KEP dalam Pengelolaan KKP",
    a: (
      <P>
        Dua dokumen dasar yang wajib ada sebelum satker bisa punya kartu apa pun. <strong>PKS (Perjanjian Kerja Sama)</strong>{" "}
        adalah perjanjian satker dengan bank penerbit kartu. <strong>SK/KEP</strong> adalah Surat Keputusan KPA yang menetapkan
        siapa saja pemegang kartu dan Admin KKP — dasar hukum satu-satunya, bukan sekadar penunjukan lisan atau memo internal.
      </P>
    ),
  },
  {
    id: "muatan-perjanjian",
    q: "Muatan Surat Perjanjian Penggunaan KKP",
    a: (
      <>
        <P>
          Beda dari PKS (satker–bank) dan SK (KPA–internal), ini perjanjian antara{" "}
          <strong>KPA dengan tiap pemegang kartu</strong> — ditandatangani <strong>bersamaan dengan BAST</strong>, tepat saat
          kartu diserahkan. Menandatanganinya adalah kewajiban resmi Pemegang KKP per PMK-196/PMK.05/2018, bukan formalitas
          opsional. Isinya minimal memuat:
        </P>
        <P>
          Definisi, maksud dan tujuan, ruang lingkup perjanjian, penerbitan dan penerimaan kartu, penggunaan KKP, hak dan
          kewajiban para pihak, PIN, limit penggunaan kartu, penghentian perjanjian, sanksi, dan penyelesaian perselisihan.
        </P>
      </>
    ),
  },
  {
    id: "kanal-transaksi",
    q: "Kanal Transaksi KKP: EDC, e-Katalog, dan DIGIPay",
    a: (
      <Cards cols={3}>
        <Card title="EDC">Mesin Electronic Data Capture milik rekanan — kanal paling umum untuk KKP-BO dan KKP-PD.</Card>
        <Card title="e-Katalog">
          Katalog elektronik LKPP — membuka batas nilai lebih tinggi (sampai Rp200 juta) khusus produk dalam negeri UMK.
        </Card>
        <Card title="DIGIPay">Marketplace pembayaran pemerintah milik Kemenkeu — batas nilai sama seperti e-Katalog.</Card>
      </Cards>
    ),
  },
  {
    id: "maks-kartu",
    q: "Ketentuan Jumlah Maksimal Kartu per Pemegang",
    a: (
      <P>
        Maksimal <strong>2 kartu aktif per pemegang</strong> — 1 KKP-BO dan 1 KKP-PD sekaligus, tidak lebih dari itu
        masing-masing.
      </P>
    ),
  },
  {
    id: "kkp-hilang",
    q: "Penanganan Kartu KKP Hilang atau Rusak",
    a: (
      <Steps
        items={[
          "Segera ajukan surat permohonan penutupan KKP (menggunakan format Surat Penarikan KKP) ke bank penerbit, dilampiri surat kehilangan untuk kartu yang hilang.",
          "Setelah kartu ditutup, Admin KKP mengajukan kartu pengganti melalui Surat Permohonan Penerbitan KKP yang sama seperti pengajuan kartu baru — karena pemegangnya tetap sama, tidak perlu melalui siklus perubahan SK.",
          "Catat kejadian ini pada dokumentasi internal satker.",
        ]}
      />
    ),
  },
  {
    id: "mutasi-kkp",
    q: "Prosedur saat Terjadi Mutasi Pemegang Kartu atau Admin KKP",
    a: (
      <>
        <P>
          Secara ringkas: apabila pemegang KKP mutasi, KPA wajib menarik kartu dan menyampaikan Surat Penarikan KKP kepada Bank
          Penerbit KKP sebagai dasar penutupan, setelah memastikan tidak terdapat tunggakan pembayaran. Apabila satker akan
          menerbitkan kartu baru, satker menetapkan KEP baru terlebih dahulu, kemudian mengajukan permohonan penerbitan sesuai
          KEP tersebut. Apabila hanya Admin KKP yang berubah, satker memperbarui KEP dan memberitahukannya kepada Bank Penerbit
          KKP.
        </P>
        <GuideButton to="mutasi/kkp" />
      </>
    ),
  },
  {
    id: "kpa-mutasi",
    q: "Ketentuan apabila KPA Mengalami Mutasi",
    a: (
      <P>
        Dalam hal pejabat yang mutasi merupakan KPA, proses administrasi penutupan KKP serta pembaruan KEP pemegang dan Admin KKP
        dilaksanakan oleh pejabat baru yang menduduki jabatan KPA. Pelaksanaannya mengikuti prosedur penarikan kartu dan/atau
        pembaruan KEP sesuai kondisi di satker.
      </P>
    ),
  },
  {
    id: "kartu-dormant",
    q: "Pengertian dan Risiko Kartu Dormant",
    a: (
      <P>
        Kartu dormant adalah kartu yang tetap aktif secara sistem meskipun pemegangnya telah mutasi, pensiun, meninggal dunia,
        atau cuti di luar tanggungan negara — biasanya karena SK-nya tidak segera diperbarui. Ini isu kepatuhan, bukan sekadar
        urusan administratif yang bisa ditunda: segera proses perubahan SK dan penarikan kartu begitu kondisi ini terjadi.
      </P>
    ),
  },
  {
    id: "limit-kkp-bo",
    q: "Ketentuan Perubahan Limit KKP-BO",
    a: (
      <P>
        Dapat dilakukan. KPA mengajukan permohonan kepada bank penerbit disertai justifikasi kebutuhan — umumnya untuk transaksi
        melalui e-Katalog atau DIGIPay. Limit KKP-BO dapat dinaikkan dari batas umum Rp50 juta sampai maksimal Rp200 juta per
        rekanan, khusus untuk transaksi produk dalam negeri UMK.
      </P>
    ),
  },
  {
    id: "digipay-vs-ekatalog",
    q: "Kriteria Pemilihan Kanal DIGIPay atau e-Katalog",
    a: (
      <P>
        Tidak ada kriteria kelayakan khusus yang membedakan keduanya — pemilihan kanal mengikuti ketentuan pengadaan yang
        berlaku dan ketersediaan penyedia/produk di masing-masing kanal saat transaksi dilakukan.
      </P>
    ),
  },
  {
    id: "di-luar-peruntukan",
    q: "Konsekuensi Penggunaan KKP di Luar Peruntukan",
    a: (
      <P>
        Ada. Apabila kartu digunakan untuk transaksi di luar peruntukannya (misalnya untuk keperluan non-operasional), tagihan
        tersebut <strong>tidak dapat dibebankan ke APBN</strong>. Satker dan/atau pemegang KKP yang melakukan transaksi tersebut
        wajib mengganti sendiri tagihannya.
      </P>
    ),
  },
  {
    id: "antarsatker",
    q: "Ketentuan Penggunaan KKP Antarsatker",
    a: (
      <P>
        Tidak diperbolehkan. KKP bersifat <strong>satu kartu untuk satu satker</strong> — Kanwil dan Kantor Pusat tidak bisa
        menggunakan KKP milik satker/KPP di bawahnya, dan begitu juga sebaliknya. Setiap satker mengelola KKP-nya masing-masing
        melalui PKS dan SK-nya sendiri.
      </P>
    ),
  },
  {
    id: "dasar-hukum-kkp",
    q: "Dasar Hukum Pengelolaan KKP",
    a: (
      <P>
        <strong>PMK-196/PMK.05/2018</strong> tentang Tata Cara Pembayaran dan Penggunaan Kartu Kredit Pemerintah, sebagaimana
        diubah dengan <strong>PMK-97/PMK.05/2021</strong>. Khusus di lingkungan DJP, ada juga{" "}
        <strong>Nota Dinas ND-1951/PJ.01/2026</strong> yang mengimbau seluruh satker menggunakan KKP dan menetapkan 5 dokumen
        administrasi wajib.
      </P>
    ),
  },
  {
    id: "pertimbangan-imbauan",
    q: "Dasar Pertimbangan Imbauan Penggunaan KKP di DJP",
    a: (
      <>
        <P>Per ND-1951/PJ.01/2026, ada 4 pertimbangan utama:</P>
        <Bullets
          items={[
            "Fleksibel — jangkauan pemakaian luas, transaksi bisa di seluruh merchant yang menerima EDC/media daring.",
            "Aman — menghindari penyimpangan (fraud) dari transaksi tunai.",
            "Efektif — mengurangi Uang Persediaan (UP) yang menganggur (idle cash) dan biaya dana (cost of fund) pemerintah.",
            "Akuntabel — pembayaran tagihan negara dan pembebanan biaya UP KKP lebih mudah dipertanggungjawabkan.",
          ]}
        />
      </>
    ),
  },
  {
    id: "dokumen-wajib",
    q: "Dokumen Wajib Administrasi KKP",
    a: (
      <>
        <P>Sesuai ND-1951/PJ.01/2026, satker wajib punya kelengkapan dokumen administrasi berikut:</P>
        <Steps
          items={[
            "SK KPA tentang Daftar Pemegang KKP dan Daftar Administrator KKP.",
            "Perjanjian Kerja Sama (PKS) antara Satker dengan Bank Penerbit KKP.",
            "Surat Permohonan Penerbitan KKP kepada Bank Penerbit, dilampiri Surat Referensi.",
            "Surat Perjanjian Penggunaan KKP antara KPA dengan Pemegang KKP.",
            "Berita Acara Serah Terima (BAST) KKP antara KPA dengan Pemegang KKP.",
          ]}
        />
      </>
    ),
  },
  {
    id: "verifikasi-penerbitan",
    q: "Jangka Waktu Verifikasi Permohonan Penerbitan KKP",
    a: (
      <P>
        Paling lambat <strong>6 hari kerja</strong> setelah surat permohonan diterima bank penerbit.
      </P>
    ),
  },
  {
    id: "kriteria-pemegang",
    q: "Kriteria Pemegang KKP-BO dan KKP-PD",
    a: (
      <P>
        <strong>KKP-BO:</strong> pejabat pengadaan, pejabat struktural, pelaksana, atau pegawai lain yang bertugas dalam
        pengadaan barang/jasa. <strong>KKP-PD:</strong> pejabat atau pegawai yang menjalankan perjalanan dinas. Dua-duanya harus
        tercantum pada SK terakhir yang berlaku, bukan sekadar penunjukan lisan.
      </P>
    ),
  },
  {
    id: "rangkap-jabatan",
    q: "Ketentuan Rangkap Jabatan Admin KKP dan Pemegang Kartu",
    a: (
      <P>
        Secara ketentuan diperbolehkan — PMK KKP tidak melarangnya secara eksplisit. Namun demikian, praktik ini tidak dianjurkan
        karena mengurangi pemisahan tugas (segregation of duties) antara pihak yang mengelola administrasi kartu dan pihak yang
        melakukan transaksi dengan kartu tersebut.
      </P>
    ),
  },
  {
    id: "jumlah-admin",
    q: "Ketentuan Jumlah Admin KKP per Satker",
    a: (
      <P>
        Diperbolehkan. Satu satker dapat memiliki lebih dari satu Admin KKP — tidak dibatasi hanya satu orang. Seluruh pihak yang
        ditunjuk KPA dan tercantum pada SK terakhir yang berlaku adalah Admin KKP yang sah.
      </P>
    ),
  },
  {
    id: "gup-terpisah",
    q: "Dasar Pemisahan Pengajuan GUP KKP dari SPP/SPM Lainnya",
    a: (
      <P>
        Karena SPP-GUP KKP/SPM-GUP KKP punya alur dan dasar dokumen sendiri — berdasarkan Daftar Pembayaran Tagihan (DPT) yang
        sudah disahkan PPK, bukan tagihan pelaksanaan APBN pada umumnya. Mencampur keduanya berisiko menimbulkan ketidakjelasan
        dalam proses verifikasi di KPPN mengenai bagian yang termasuk pertanggungjawaban KKP dan mana yang bukan.
      </P>
    ),
  },
  {
    id: "kesalahan-dpt",
    q: "Kesalahan Umum dalam Pengisian DPT KKP",
    a: (
      <P>
        Kolom yang dibiarkan kosong — terutama <strong>nama pemegang KKP dan nomor KKP</strong>. Pastikan seluruh kolom DPT
        terisi lengkap dan sesuai ketentuan sebelum diajukan, supaya tidak terkena koreksi dari KPPN dan proses GUP tidak
        terhambat.
      </P>
    ),
  },
  {
    id: "pelaporan-kkp",
    q: "Mekanisme Pelaporan Penggunaan KKP",
    a: (
      <P>
        Penggunaan UP KKP dilaporkan sebagai bagian dari Laporan Pertanggungjawaban (LPJ) Bendahara bulanan — tidak ada laporan
        terpisah khusus KKP di luar LPJ tersebut.
      </P>
    ),
  },
  {
    id: "rekonsiliasi-kkp",
    q: "Persiapan Satker dalam Rekonsiliasi Data KKP",
    a: (
      <P>
        Pastikan data pemegang kartu, nomor kartu, dan limit yang tercatat di satker selalu sesuai dengan catatan bank penerbit.
        Ketidaksesuaian data ini yang paling sering jadi temuan saat rekonsiliasi berkala dilakukan.
      </P>
    ),
  },
  {
    id: "inventarisasi-2026",
    q: "Inventarisasi KKP di Lingkungan DJP Tahun 2026",
    a: (
      <P>
        Sesuai ND-1951/PJ.01/2026 (8 Juni 2026), seluruh satker diminta melakukan inventarisasi dan menyampaikan informasi
        terkait penggunaan KKP serta kelengkapan dokumen administrasinya melalui tautan resmi yang dicantumkan di nota dinas
        tersebut, dengan tenggat <strong>12 Juni 2026</strong>. Ini permintaan satu kali terkait pemantauan implementasi KKP di
        lingkungan DJP saat itu — apabila ada inventarisasi serupa berikutnya, biasanya akan diedarkan melalui nota dinas baru.
      </P>
    ),
  },
  {
    id: "lokasi-format-kkp",
    q: "Lokasi Format Surat yang Diperlukan",
    a: (
      <P>
        Buka menu <strong>Kartu Kredit</strong>, lalu masuk ke submenu{" "}
        <Link to="kkp/format" className="doc-link">
          Format Dokumen
        </Link>
        . Semua format dikelompokkan per kategori (Dasar Legal — 5 dokumen wajib per ND-1951/PJ.01/2026 — dan Perubahan &
        Penutupan).
      </P>
    ),
  },
];

export const faqGroups = [
  { id: "giro", label: "Rekening Giro", short: "Giro", items: faqGiro },
  { id: "virtual", label: "Rekening Virtual", short: "Virtual", items: faqVirtual },
  { id: "kkp", label: "Kartu Kredit", short: "KKP", items: faqKKP },
];
