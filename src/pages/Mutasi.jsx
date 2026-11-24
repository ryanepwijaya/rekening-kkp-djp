import { useState } from "react";
import { ArrowRight, CreditCard, FileText, IdCard, KeyRound, Landmark, ShieldAlert } from "lucide-react";
import { Badge, Callout, Card, Cards, DocLink, Page, Section, Steps, Tabs } from "../components/ui.jsx";
import { Link, navigate } from "../lib/router.jsx";
import { SP } from "../data/sharepoint.js";
import { alurBankMutasi } from "../data/content.js";

/* ===== Panduan Lengkap: Serah Terima Rekening & KKP sehubungan Mutasi ===== */
export default function Mutasi({ tab = "rekening" }) {
  const active = tab === "kkp" ? "kkp" : "rekening";
  return (
    <Page
      section={active === "kkp" ? "kkp" : "umum"}
      kicker={<span className="page-head__kicker">Panduan lengkap</span>}
      title="Prosedur Serah Terima Rekening & KKP sehubungan Mutasi"
      lead="Berlaku setiap kali KPA, Bendahara, Admin KKP, dan/atau pemegang kartu KKP berganti. Pilih tab sesuai keperluan."
      subnav={
        <div className="mt-6">
          <Tabs
            label="Jenis serah terima"
            tabs={[
              { id: "rekening", label: "Rekening", icon: <Landmark size={17} /> },
              { id: "kkp", label: "KKP", icon: <CreditCard size={17} /> },
            ]}
            active={active}
            onChange={(id) => navigate(`mutasi/${id}`)}
          />
        </div>
      }
    >
      {active === "rekening" ? <RekeningMutasi key="rek" /> : <KKPMutasi key="kkp" />}
    </Page>
  );
}

function BankTabPanel() {
  const [active, setActive] = useState(0);
  const bank = alurBankMutasi[active];
  return (
    <div>
      <Tabs
        small
        label="Bank padanan"
        tabs={alurBankMutasi.map((b, i) => ({ id: i, label: b.nama }))}
        active={active}
        onChange={setActive}
      />
      <div className="bank-panel" role="tabpanel">
        <div className="bank-panel__head">
          <span className="bank-mark">{bank.inisial}</span>
          <p className="h3 mb-0">{bank.nama}</p>
        </div>
        <Steps items={bank.steps} />
      </div>
    </div>
  );
}

function RekeningMutasi() {
  return (
    <>
      <Callout tone="wajib">Satker WAJIB membuat BAST setiap kali terjadi mutasi — jangan pernah serah terima akses hanya lisan.</Callout>

      <Section title="Kapan Ini Berlaku?">
        <p className="text">
          Setiap kali terjadi mutasi/pergantian KPA dan/atau Bendahara, akses ke rekening satker — akun CMS, kartu debit dan
          akun Dashboard (khusus rekening Virtual) — perlu dipindahtangankan secara resmi dari pejabat lama ke pejabat baru.
          Tanpa serah terima yang jelas, pejabat baru bisa kesulitan mengakses rekening dan riwayat pertanggungjawabannya
          jadi tidak jelas.
        </p>
      </Section>

      <Section title="Alur Besar: Pejabat Lama ke Pejabat Baru">
        <div className="handover">
          <div className="handover__panel handover__panel--old">
            <p className="handover__tag">Tahap 1</p>
            <p className="handover__title">Pejabat Lama</p>
            <Steps
              items={[
                <>
                  Membuat Berita Acara Serah Terima (BAST) dokumen rekening.{" "}
                  <DocLink href={SP.bastAkunPerbankan}>Buka format BAST</DocLink>
                </>,
                "Menandatangani BAST, lalu menyerahkannya ke pejabat baru.",
              ]}
            />
          </div>
          <div className="handover__arrow" aria-hidden="true">
            <ArrowRight size={28} strokeWidth={2.4} />
          </div>
          <div className="handover__panel handover__panel--new">
            <p className="handover__tag">Tahap 2</p>
            <p className="handover__title">Pejabat Baru</p>
            <Steps
              items={[
                <>
                  Menerima dan menandatangani BAST dari pejabat lama, lalu join Grup Rekening.{" "}
                  <DocLink to="bantuan">Lihat link grup</DocLink>
                </>,
                <>
                  Memberitahukan ke Bank Padanan Satker sesuai dokumen yang ditentukan bank.{" "}
                  <DocLink href={SP.perubahanDataCMS}>Buka format surat perubahan data</DocLink>
                </>,
                "Memastikan login akun perbankan dan transaksi telah dapat dijalankan.",
                "Berkonsultasi ke cabang Bank Padanan bila ada kendala akses/transaksi.",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Apa yang Perlu Ada di BAST?"
        lead="Berita Acara Serah Terima bukan sekadar formalitas — ini dokumen yang jadi dasar hukum pemindahan tanggung jawab akun perbankan."
      >
        <Cards cols={2}>
          <Card icon={IdCard} title="Identitas Para Pihak">
            Nama, NIP, jabatan PIHAK PERTAMA (pejabat lama) dan dasar SK/penunjukan PIHAK KEDUA (pejabat baru).
          </Card>
          <Card icon={Landmark} title="Rincian Rekening">
            Nomor rekening dan nama rekening yang diserahterimakan.
          </Card>
          <Card icon={CreditCard} title="Kartu Debit">
            Fisik kartu beserta PIN — khusus rekening Virtual. RPL tidak menerbitkan kartu debit.
          </Card>
          <Card icon={KeyRound} title="Akses CMS & Dashboard">
            Company ID/Corporate ID, Username, Password (khusus rekening Virtual — apabila RPL cukup akses CMS saja).
          </Card>
        </Cards>
        <p className="note">
          BAST ditandatangani PIHAK KEDUA setelah SK penunjukan resmi terbit, dan diketahui oleh atasan (Kasubbag
          Keuangan/pejabat setara eselon IV).
        </p>
      </Section>

      <Section title="Langkah yang Perlu Dilakukan Bendahara Baru">
        <Steps
          items={[
            { t: "Pahami isi BAST", d: "Baca detail rekening, akses, dan tanggung jawab yang diserahterimakan." },
            { t: "Masuk ke Grup Rekening DJP", d: "Hubungi Bendahara lama / LO / PIC Rekening untuk link gabung WhatsApp Grup Rekening." },
            { t: "Cek akun perbankan", d: "Pastikan bisa login ke CMS dan/atau Dashboard dengan akses yang diserahkan." },
            { t: "Perkenalan ke Bank Cabang", d: "Datangi atau hubungi Bank Cabang Padanan untuk memperkenalkan diri sebagai pengurus baru." },
            {
              t: "Ubah data perbankan",
              d: (
                <>
                  Ajukan permohonan perubahan data pemegang rekening sesuai prosedur bank (lihat tab bank di bawah).{" "}
                  <DocLink href={SP.perubahanDataCMS}>Buka format surat</DocLink>
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="Prosedur Pemberitahuan ke Bank" lead="Pilih bank padanan satker untuk lihat langkah spesifiknya.">
        <BankTabPanel />
      </Section>

      <Section
        title="Format BAST & Surat Perubahan Data"
        lead="Tersedia di SharePoint melalui submenu Format Dokumen — pilih sesuai jenis rekening satker."
      >
        <div className="btn-row">
          <Link to="giro/format" className="btn btn--ghost">
            <FileText size={17} />
            Format Dokumen — Rekening Giro
          </Link>
          <Link to="virtual/format" className="btn btn--ghost">
            <FileText size={17} />
            Format Dokumen — Rekening Virtual
          </Link>
        </div>
      </Section>

      <Callout tone="alert" icon={ShieldAlert}>
        <p>
          Jaga selalu kerahasiaan akses perbankan. Jangan bagikan password CMS/Dashboard ke siapa pun di luar proses serah
          terima resmi.
        </p>
      </Callout>
    </>
  );
}

function Scenario({ code, title, steps, tone }) {
  return (
    <div className="card">
      <div className="card__top">
        <Badge kind={tone === "maroon" ? "nonpmk" : "pmk"}>Skenario {code}</Badge>
      </div>
      <p className="card__title">{title}</p>
      <Steps items={steps} />
    </div>
  );
}

function KKPMutasi() {
  return (
    <>
      <Callout tone="wajib">
        Dalam hal pemegang KKP mengalami mutasi, satker WAJIB melakukan penarikan KKP dari pemegang yang bersangkutan. Kartu
        yang tertinggal pada pemegang yang telah tidak bertugas berisiko menjadi kartu dormant.
      </Callout>

      <Section title="Kapan Ini Berlaku?">
        <p className="text">
          Ketentuan ini berlaku apabila pemegang KKP, Admin KKP, dan/atau KPA mengalami mutasi atau pindah tempat tugas,
          termasuk kondisi lain yang menyebabkan yang bersangkutan tidak lagi bertugas pada satker, seperti pensiun,
          meninggal dunia, atau cuti di luar tanggungan negara.
        </p>
      </Section>

      <Section title="Ringkasan">
        <div className="handover__panel handover__panel--old">
            <Steps
              items={[
                "Dalam hal terdapat penggantian pemegang KKP sehubungan dengan mutasi, satker wajib melakukan penarikan KKP dari pemegang yang bersangkutan.",
                "KPA menyampaikan Surat Penarikan KKP kepada Bank Penerbit KKP sebagai dasar penutupan kartu.",
                "Dalam hal satker akan menerbitkan KKP baru, satker wajib (a) menetapkan KEP baru tentang pemegang dan Admin KKP, dan (b) mengajukan permohonan penerbitan kepada Bank Penerbit KKP sesuai KEP tersebut.",
                "Setelah kartu baru terbit, satker mengadministrasikan KKP sesuai PMK-196/PMK.05/2018 sebagaimana telah diubah dengan PMK-97/PMK.05/2021.",
              ]}
            />
        </div>
      </Section>

      <Section
        title="Rincian Prosedur"
        lead="Pilih skenario sesuai kondisi di satker. Apabila satu pejabat merangkap beberapa peran (misalnya Admin KKP sekaligus pemegang KKP), seluruh skenario yang relevan dilaksanakan."
      >
        <Cards cols={2}>
          <Scenario
            code="A"
            tone="maroon"
            title="Pemegang KKP Mutasi — Penarikan dan Penutupan Kartu"
            steps={[
              "Pastikan tidak terdapat tunggakan pembayaran KKP. Apabila masih terdapat tagihan, agar segera dilakukan pelunasan.",
              <>
                Mengacu pada PMK-196/PMK.05/2018, KPA melakukan penarikan KKP dari pemegang dan menerbitkan Surat Penarikan KKP.{" "}
                <DocLink href={SP.penarikanKKP}>Buka format Surat Penarikan</DocLink>
              </>,
              "Surat Penarikan KKP disampaikan oleh KPA kepada Bank Penerbit KKP, dengan tembusan kepada pemegang KKP yang bersangkutan.",
              "Berdasarkan surat penarikan tersebut, Bank Penerbit KKP melakukan penutupan KKP.",
              "Dokumen pendukung penutupan disesuaikan dengan ketentuan atau permintaan masing-masing Bank Penerbit KKP.",
            ]}
          />
          <Scenario
            code="B"
            title="Admin KKP Mutasi"
            steps={[
              <>
                Satker memperbarui KEP tentang Daftar Pemegang KKP dan Daftar Administrator KKP.{" "}
                <DocLink href={SP.skPerubahanKKP}>Buka format KEP Perubahan</DocLink>
              </>,
              "Satker memberitahukan pergantian Admin KKP kepada Bank Penerbit KKP, melalui surat maupun sarana komunikasi lain sesuai prosedur masing-masing bank.",
            ]}
          />
          <Scenario
            code="C"
            title="KPA Mutasi"
            steps={[
              "Proses administrasi penutupan KKP dan pembaruan KEP pemegang dan Admin KKP dilaksanakan oleh pejabat baru yang menduduki jabatan KPA.",
              "Pelaksanaannya mengikuti Skenario A dan/atau B sesuai kondisi di satker.",
            ]}
          />
          <Scenario
            code="D"
            tone="maroon"
            title="Penerbitan KKP Baru (Apabila Diperlukan)"
            steps={[
              <>
                Satker menetapkan KEP baru tentang pemegang dan Admin KKP.{" "}
                <DocLink href={SP.skPerubahanKKP}>Buka format KEP Perubahan</DocLink>
              </>,
              <>
                Satker mengajukan Surat Permohonan Penerbitan KKP, dilampiri Surat Referensi, kepada Bank Penerbit KKP sesuai KEP
                tersebut. <DocLink href={SP.penerbitanKKP}>Buka format Surat Penerbitan</DocLink>
              </>,
              <>
                Setelah kartu terbit, KPA dan pemegang KKP menandatangani BAST KKP bersamaan dengan Surat Perjanjian Penggunaan
                KKP.
                <span className="doc-links">
                  <DocLink href={SP.bastKKP}>Buka format BAST</DocLink>
                  <DocLink href={SP.perjanjianKKPBO}>Surat Perjanjian (KKP-BO)</DocLink>
                  <DocLink href={SP.perjanjianKKPPD}>Surat Perjanjian (KKP-PD)</DocLink>
                </span>
              </>,
              "Pemegang KKP baru agar memahami limit dan kanal transaksi (EDC, e-Katalog, DIGIPay) sebelum mulai bertransaksi.",
              "Satker mengadministrasikan KKP sesuai PMK KKP, termasuk menyimpan salinan KEP, BAST, dan Surat Perjanjian Penggunaan KKP sebagai arsip.",
            ]}
          />
        </Cards>
      </Section>

      <Section title="Daftar Lengkap Format Dokumen KKP" lead="Seluruh format juga tersedia pada submenu Format Dokumen KKP.">
        <div className="btn-row">
          <Link to="kkp/format" className="btn btn--ghost">
            <FileText size={17} />
            Format Dokumen — Kartu Kredit
          </Link>
        </div>
      </Section>

      <Callout tone="alert" icon={ShieldAlert}>
        <p>
          Penarikan KKP dan pembaruan KEP agar tidak ditunda. Kartu yang tertinggal pada pemegang yang telah tidak bertugas
          merupakan risiko kepatuhan, bukan sekadar urusan administratif.
        </p>
      </Callout>
    </>
  );
}
