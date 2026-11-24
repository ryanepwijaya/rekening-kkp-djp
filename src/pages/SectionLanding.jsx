import { ChevronRight } from "lucide-react";
import BankCard from "../components/BankCard.jsx";
import { Callout } from "../components/ui.jsx";
import { Link } from "../lib/router.jsx";
import { sections, topicIcons } from "../data/site.js";

const notices = {
  giro: (
    <>
      Halaman ini <strong>berlaku khusus untuk Rekening Lainnya (RPL)</strong>. Untuk Rekening Pengeluaran (BPG) dan Rekening
      Pengeluaran Pembantu (BPP), satker mengikuti ketentuan terbaru yang menggunakan skema Rekening Virtual — lihat menu{" "}
      <Link to="virtual" className="doc-link">
        Rekening Virtual
      </Link>
      .
    </>
  ),
  virtual: (
    <>
      Halaman ini <strong>berlaku khusus untuk Rekening Pengeluaran (BPG) dan Rekening Pengeluaran Pembantu (BPP)</strong> yang
      berbasis skema virtual. Untuk Rekening Lainnya (RPL), lihat menu{" "}
      <Link to="giro" className="doc-link">
        Rekening Giro
      </Link>
      .
    </>
  ),
};

export default function SectionLanding({ sectionId }) {
  const s = sections[sectionId];
  return (
    <>
      <header className="page-head">
        <div className="container landing-head">
          <div>
            <h1 className="page-title">{s.label}</h1>
            <p className="page-lead">{s.tagline}. Pilih salah satu topik di bawah untuk melihat detailnya.</p>
          </div>
          <BankCard id={sectionId} as="static" />
        </div>
      </header>
      <div className="container">
        {notices[sectionId] && (
          <div className="article">
            <Callout tone="info">
              <p>{notices[sectionId]}</p>
            </Callout>
          </div>
        )}
        <div className="topic-grid mt-6">
          {s.pages.map((p) => {
            const Icon = topicIcons[p.id];
            return (
              <Link key={p.id} to={`${sectionId}/${p.id}`} className="topic">
                <span className="topic__icon">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <span className="topic__body">
                  <span className="topic__title">
                    {p.title}
                    <ChevronRight size={20} />
                  </span>
                  <span className="topic__desc">{p.desc}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
