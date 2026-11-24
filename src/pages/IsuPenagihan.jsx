import { Banknote, Building2, ClipboardList, Gavel, Receipt, Scale, UserRound } from "lucide-react";
import { Callout, Card, Cards, DocLink, Flow, Page, Section, Steps, Bullets } from "../components/ui.jsx";
import { SP } from "../data/sharepoint.js";

/* ===== Isu Rekening Terkini: RPL PS Penagihan ===== */
export default function IsuPenagihan() {
  return (
    <Page
      section="giro"
      kicker={<span className="page-head__kicker">Isu rekening terkini</span>}
      title="RPL PS Penagihan — Boleh Dibuka Sesuai Kebutuhan!"
      meta="Berlaku khusus Unit Vertikal — Kanwil & KPP"
    >
      <Section title="Latar Belakang">
        <div className="prose">
          <p>
            Tindakan penagihan pajak seringkali menghasilkan suatu penjualan — tindak lanjut atas penjualan barang sitaan,
            baik secara lelang maupun penjualan selain lelang. Sebelum uang hasil penjualan tersebut disetor ke Kas Negara,
            dana ini perlu tempat penyimpanan sementara.
          </p>
          <p>
            <strong>Bukan</strong> di rekening pribadi Juru Sita, dan <strong>bukan</strong> di rekening operasional
            kantor/Bendahara — melainkan di <strong>Rekening Penampungan Sementara (RPL PS)</strong> sesuai
            PMK-182/PMK.05/2017.
          </p>
        </div>
      </Section>

      <Section title="Data Kinerja Penagihan" lead="Diolah dari Dit. P2, per akhir 2023.">
        <div className="stats">
          <div className="stat">
            <span className="stat__value">~101 M</span>
            Rata-rata nilai rupiah penjualan barang sitaan per tahun.
          </div>
          <div className="stat stat--maroon">
            <span className="stat__value">60 / 391</span>
            KPP yang baru memiliki rekening penampungan untuk penagihan (hingga akhir 2023).
          </div>
        </div>
        <p className="note">
          Kesenjangan ini yang jadi alasan satker perlu tahu: membuka RPL PS untuk Penagihan itu boleh dan bisa dilakukan
          sesuai kebutuhan kantor masing-masing.
        </p>
      </Section>

      <Section
        title="Kolaborasi 3 Pihak"
        lead="Berkolaborasi dengan baik antara 3 pihak ini penting: soal siapa pemilik rekening, siapa yang kasih info transaksi, dan siapa yang eksekusi dana."
      >
        <Cards cols={3}>
          <Card icon={UserRound} title="KPA">
            Kepala Kantor selaku Kuasa Pengguna Anggaran — <strong>pemilik rekening</strong>.
          </Card>
          <Card icon={Gavel} title="Penagihan">
            Kepala Seksi P3, Juru Sita, dan/atau Pelaksana — <strong>memberikan informasi</strong> adanya penjualan.
          </Card>
          <Card icon={Banknote} title="Bendahara">
            Melakukan <strong>eksekusi dana</strong> sesuai petunjuk dari Penagihan dengan persetujuan KPA.
          </Card>
        </Cards>
      </Section>

      <Section title="Alur Pembukaan">
        <Steps
          items={[
            {
              t: "Surat Permohonan ke KPPN",
              d: (
                <>
                  Bendahara membuat surat permohonan izin pembukaan rekening ke KPPN mitra, ditandatangani Kepala Kantor selaku
                  KPA. <DocLink href={SP.permohonanPembukaanRPL}>Buka format surat permohonan</DocLink>
                </>
              ),
            },
            { t: "Surat Izin dari KPPN", d: "Setelah izin diberikan, surat izin dari KPPN tersebut berlaku selama 15 hari." },
            {
              t: "Proses Pembukaan ke Bank",
              d: "Bendahara membuka rekening ke Bank Cabang yang dituju (Bank Mandiri, BRI, BNI, atau BSI). Proses pembukaan mengikuti ketentuan perbankan.",
            },
            {
              t: "Laporan Pembukaan ke KPPN",
              d: (
                <>
                  Setelah rekening dibuka, Bendahara menyampaikan laporan pembukaan rekening kepada KPPN paling lambat 20 hari
                  kerja sejak surat persetujuan terbit. <DocLink href={SP.laporanPembukaanRPL}>Buka format laporan pembukaan</DocLink>
                </>
              ),
            },
          ]}
        />
        <p className="note">
          Seksi P3 dapat memberikan rekomendasi Bank tempat rekening dibuka. Setelah dibuka, rekening disampaikan ke KPKNL atau
          institusi terkait.
        </p>
      </Section>

      <Section title="Ketentuan Rekening">
        <Cards cols={2}>
          <Card title="Jenis Rekening">Dibuka dengan jenis Rekening Lainnya (RPL) untuk Penampungan Sementara (PS).</Card>
          <Card title="Treasury National Pooling (TNP)">
            Rekening RPL PS didaftarkan sebagai TNP dan bebas biaya/pajak sebagaimana ketentuan Rekening Pemerintah.
          </Card>
          <Card title="Masa Aktif">Bendahara menyampaikan ke Bank agar rekening tidak ditutup otomatis apabila tidak ada transaksi.</Card>
          <Card title="Tidak Boleh Dobel dengan RPL PS Tukin">
            Tidak diperkenankan menggunakan RPL PS Tukin untuk Penagihan. Harus buka/menggunakan RPL PS khusus Penagihan —
            prinsipnya, 1 rekening 1 tujuan penggunaan.
          </Card>
          <Card title="Internet Banking">Sangat direkomendasikan untuk dimintakan akun internet banking ke Bank Cabang.</Card>
        </Cards>
      </Section>

      <Section title="Pengoperasian">
        <div className="stack-lg">
          <div>
            <p className="h3">Kredit — Apabila Terdapat Uang Masuk</p>
            <Flow nodes={["KPKNL/LJK", "Seksi P3", "ND Pengkreditan", "KPA (cc Bendahara)", "Pencatatan SAKTI"]} />
            <p className="text mt-4">
              Hasil penjualan barang sitaan, oleh Kepala Seksi P3 diberitahukan kepada KPA dengan tembusan Bendahara,
              menggunakan Nota Dinas internal. Bendahara mencatat uang masuk pada Aplikasi SAKTI.
            </p>
          </div>
          <div>
            <p className="h3">Debit — Penyetoran atas Hasil</p>
            <Flow nodes={["Seksi P3 (hitung)", "ND ke KPA (cc Bendahara)", "Pendebitan Rekening", "Pencatatan SAKTI"]} />
            <p className="text mt-4">
              Seksi P3 melakukan perhitungan serta pengalokasian atas hasil penjualan barang sitaan untuk: pembayaran Utang
              Pajak, pembayaran Biaya Penagihan Pajak, dan/atau pengembalian kelebihan hasil penjualan kepada Penanggung Pajak.
              Kepala Seksi P3 mengirimkan Nota Dinas berisi detail tujuan penyaluran dana kepada KPA (tembusan Bendahara), lalu
              Bendahara melakukan pendebitan.
            </p>
            <p className="label mt-6">Dokumen Pendukung Pendebitan</p>
            <Cards cols={3}>
              <Card icon={Receipt} title="ID Billing">Dalam rangka pembayaran utang pajak ke Kas Negara.</Card>
              <Card icon={ClipboardList} title="SSBP">Dalam rangka pembayaran Biaya Penagihan.</Card>
              <Card icon={Building2} title="Rekening Lain">Apabila ada kelebihan yang perlu dikembalikan ke Penanggung Pajak.</Card>
            </Cards>
          </div>
        </div>
      </Section>

      <Section title="Penyetoran Akhir Tahun">
        <Callout tone="wajib">Seluruh hasil penjualan wajib disetor (rekening dikosongkan) paling lambat 31 Desember setiap tahun.</Callout>
        <p className="text">
          Dalam hal tidak dapat dilakukan penyetoran, Kepala Seksi P3 membuat Berita Acara berisi penjelasan mengenai tidak
          dapat dilakukannya penyetoran, dilaporkan kepada Kepala KPP dan Kepala Subbagian Umum dan Kepatuhan Internal. Berita
          Acara ini digunakan sebagai dokumen pendukung Catatan atas Laporan Keuangan (CALK).
        </p>
      </Section>

      <Section title="Administrasi & Pelaporan">
        <Cards cols={3}>
          <Card title="Laporan Rekening ke KPA">Seksi P3 menyampaikan daftar transaksi ke Kepala Kantor selaku KPA.</Card>
          <Card title="Rekonsiliasi Transaksi">Bendahara melakukan pencocokan laporan dari Seksi P3 dengan rekening koran.</Card>
          <Card title="Laporan ke KPPN">Bendahara menyampaikan rekening dalam Laporan Pertanggungjawaban (LPJ) Bendahara.</Card>
        </Cards>
      </Section>

      <Section
        title="Format Dokumen Terkait"
        lead="RPL PS untuk Penagihan menggunakan format dokumen yang sama dengan pengelolaan Rekening Lainnya (RPL) pada umumnya sesuai PMK-182/PMK.05/2017. Seluruh format tersedia pada SharePoint Kemenkeu."
      >
        <div className="stack">
          {[
            ["Surat Permohonan Persetujuan Pembukaan Rekening", "Digunakan pada tahap awal pengajuan izin pembukaan ke KPPN mitra kerja.", SP.permohonanPembukaanRPL],
            ["Surat Laporan Pembukaan Rekening", "Disampaikan kepada KPPN paling lambat 20 hari kerja sejak surat persetujuan terbit.", SP.laporanPembukaanRPL],
            ["Berita Acara Serah Terima (BAST) Akun Perbankan", "Digunakan apabila terjadi mutasi KPA dan/atau Bendahara pengelola rekening.", SP.bastAkunPerbankan],
            ["Surat Perubahan Data Pemegang CMS (KPA/Bendahara)", "Diajukan kepada bank apabila terjadi pergantian pengelola rekening.", SP.perubahanDataCMS],
            [
              "Surat Laporan Penutupan Rekening",
              "Digunakan apabila rekening pada akhirnya perlu ditutup, disampaikan paling lambat 5 hari kerja setelah tanggal penutupan.",
              SP.laporanPenutupanRPL,
            ],
          ].map(([t, d, url]) => (
            <Card key={t} title={t}>
              {d}
              <span className="doc-links">
                <DocLink href={url}>Buka format</DocLink>
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Ketentuan Penutup">
        <div className="prose">
          <p>
            RPL PS yang telah dibuka oleh KPA dengan tujuan penampungan dana atas tindakan penagihan pajak (bukan penampungan
            Tukin) <strong>tidak perlu ditutup</strong> dan dapat tetap digunakan sebagaimana mestinya.
          </p>
          <p>Pengoperasian dan pelaporan RPL PS yang telah dan akan dibuka, mengikuti ketentuan PMK-182/PMK.05/2017.</p>
          <p>
            Kolaborasi dalam rangka penggunaan rekening mengikuti ketentuan di masing-masing kantor. Pemberitahuan adanya
            pengkreditan (uang masuk) dan pelaksanaan pendebitan (uang keluar) diharapkan dapat disampaikan melalui Nota Dinas
            oleh Seksi P3, sebagai dasar Bendahara melakukan transaksi dan dokumen pendukung dalam Laporan Pertanggungjawaban
            Bendahara.
          </p>
        </div>
      </Section>

      <p className="source">Sumber: Bimtek Penagihan Pajak (Bandung, 21–22 Agustus 2024) — Bagian Keuangan Sekretariat DJP.</p>
    </Page>
  );
}
