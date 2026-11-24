import { ExternalLink, Handshake, ShieldAlert } from "lucide-react";
import { Badge, Callout, Page, Section } from "../components/ui.jsx";
import { waGrupRekening } from "../data/formats.js";

export function WaGroups() {
  return (
    <div className="wa-grid">
      {waGrupRekening.map((g) => (
        <a key={`${g.bank}-${g.cakupan}`} href={g.link} target="_blank" rel="noopener noreferrer" className="wa-item">
          <span className="bank-mark">{g.inisial}</span>
          <span className="wa-item__text">
            <span className="wa-item__name">{g.bank}</span>
            <span className="wa-item__sub">{g.cakupan}</span>
          </span>
          <ExternalLink size={16} aria-hidden="true" />
          <span className="sr-only"> (SharePoint, tab baru)</span>
        </a>
      ))}
    </div>
  );
}

export default function Bantuan() {
  return (
    <Page
      title="Bantuan"
      lead="Untuk pertanyaan yang tidak terjawab di halaman lain, satker dapat menghubungi Bagian Keuangan — Subbagian Perbendaharaan, atau menggunakan jalur koordinasi berikut."
    >
      <Section title="Grup Rekening">
        <p className="sec__lead">
          <Badge kind="wajib">Wajib gabung</Badge>{" "}
          Setiap bank mitra punya satu grup WhatsApp koordinasi berisi Tim KPDJP, Tim Perbankan, dan seluruh Bendahara satker.
          Daftar tautan undangan dapat diakses melalui salah satu pilihan di bawah pada SharePoint (memerlukan akun Kemenkeu).
        </p>
        <WaGroups />
      </Section>

      <Section title="Koordinasi dengan Bank Cabang Padanan">
        <Callout tone="info" icon={Handshake}>
          <p>
            Senantiasa berkoordinasi dengan cabang padanan agar terbina hubungan baik antara satker dan bank. Satker
            dipersilakan menyampaikan pertanyaan maupun kendala yang dihadapi.
          </p>
        </Callout>
      </Section>

      <Callout tone="wajib" icon={ShieldAlert} title="Pastikan akses perbankanmu aman. Hindari fraud." sub="Jangan bagikan password akun perbankan (CMS, Dashboard) kepada siapa pun." />
    </Page>
  );
}
