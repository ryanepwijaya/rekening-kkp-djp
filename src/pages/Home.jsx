import { CircleHelp, FileText, Info, LifeBuoy, Lock, Megaphone, Search, ShieldCheck, Users } from "lucide-react";
import BankCard from "../components/BankCard.jsx";
import { Link } from "../lib/router.jsx";
import { DISCLAIMER } from "../data/site.js";
import { WaGroups } from "./Bantuan.jsx";

export default function Home({ onSearch }) {
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div>
            <p className="home-hero__hello">
              <ShieldCheck size={16} />
              Referensi internal untuk satker DJP
            </p>
            <h1 className="home-hero__title">Rekening & Kartu Kredit Pemerintah</h1>
            <p className="home-hero__lead">
              Panduan pengelolaan Rekening Giro, Rekening Virtual, dan KKP dari sudut pandang satker — lengkap dengan format
              dokumennya.
            </p>
            <button type="button" className="home-search" onClick={onSearch}>
              <Search size={20} aria-hidden="true" />
              <span className="home-search__label">Cari prosedur, format, atau pertanyaan…</span>
              <kbd>{isMac ? "⌘ K" : "Ctrl K"}</kbd>
            </button>
            <div className="home-hero__chips">
              <Link to="giro/format" className="chip-link">
                Format Giro
              </Link>
              <Link to="virtual/format" className="chip-link">
                Format Virtual
              </Link>
              <Link to="kkp/format" className="chip-link">
                Format KKP
              </Link>
              <Link to="faq/giro" className="chip-link">
                FAQ
              </Link>
            </div>
          </div>
          <div className="card-fan" aria-label="Pilih jenis rekening">
            <BankCard id="giro" />
            <BankCard id="virtual" />
            <BankCard id="kkp" />
          </div>
        </div>
      </section>

      <div className="container">
        <section className="home-section" aria-labelledby="perlu-tindakan">
          <h2 className="home-section__title" id="perlu-tindakan">
            Perlu perhatian
          </h2>
          <div className="feature-grid">
            <Link to="mutasi/rekening" className="feature feature--maroon">
              <span className="feature__tag">
                <Users size={14} />
                Tindakan penting terkini
              </span>
              <span className="feature__title">[PENTING] Prosedur Serah Terima Rekening & KKP sehubungan Mutasi</span>
              <span className="feature__desc">
                Sehubungan dengan mutasi KPA, Bendahara, Admin KKP, dan/atau pemegang kartu KKP di satker.
              </span>
              <span className="feature__cta">Pelajari prosedurnya</span>
              <Users className="feature__bg" size={170} strokeWidth={1.2} aria-hidden="true" />
            </Link>
            <Link to="isu/penagihan" className="feature">
              <span className="feature__tag">
                <Megaphone size={14} />
                Isu rekening terkini
              </span>
              <span className="feature__title">RPL PS Penagihan — Boleh Dibuka Sesuai Kebutuhan!</span>
              <span className="feature__desc">
                Ketentuan pembukaan & kolaborasi KPA–Kasi P3–Bendahara untuk RPL Penampungan Sementara Penagihan.
              </span>
              <span className="feature__cta">Baca ketentuannya</span>
              <Megaphone className="feature__bg" size={170} strokeWidth={1.2} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="home-section">
          <div className="secure">
            <div>
              <span className="secure__icon">
                <Lock size={24} />
              </span>
              <h2 className="secure__title">Kerahasiaan data rekening satker wajib dijaga.</h2>
              <p className="text">
                Untuk memperoleh informasi terkini dan berbagi pengetahuan, satker diimbau bergabung dalam grup rekening. Daftar
                tautan undangan dapat diakses melalui salah satu pilihan di samping (memerlukan akun Kemenkeu).
              </p>
            </div>
            <div>
              <p className="label">WhatsApp Grup Rekening</p>
              <WaGroups />
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="jalan-pintas">
          <h2 className="home-section__title" id="jalan-pintas">
            Jalan pintas
          </h2>
          <div className="shortcuts">
            <Link to="giro/format" className="shortcut">
              <span className="shortcut__icon shortcut__icon--giro">
                <FileText size={19} />
              </span>
              <span className="shortcut__title">Format Dokumen Giro</span>
              <span className="shortcut__sub">PMK-182 & Non-PMK</span>
            </Link>
            <Link to="virtual/format" className="shortcut">
              <span className="shortcut__icon shortcut__icon--virtual">
                <FileText size={19} />
              </span>
              <span className="shortcut__title">Format Dokumen Virtual</span>
              <span className="shortcut__sub">PMK-183 & Non-PMK</span>
            </Link>
            <Link to="kkp/format" className="shortcut">
              <span className="shortcut__icon shortcut__icon--kkp">
                <FileText size={19} />
              </span>
              <span className="shortcut__title">Format Dokumen KKP</span>
              <span className="shortcut__sub">5 dokumen wajib</span>
            </Link>
            <Link to="faq/giro" className="shortcut">
              <span className="shortcut__icon">
                <CircleHelp size={19} />
              </span>
              <span className="shortcut__title">Pertanyaan Umum</span>
              <span className="shortcut__sub">Giro, Virtual, KKP</span>
            </Link>
            <Link to="bantuan" className="shortcut">
              <span className="shortcut__icon">
                <LifeBuoy size={19} />
              </span>
              <span className="shortcut__title">Bantuan</span>
              <span className="shortcut__sub">Kontak & dukungan</span>
            </Link>
          </div>
        </section>

        <p className="disclaimer">
          <Info size={16} />
          {DISCLAIMER}
        </p>
      </div>
    </>
  );
}
