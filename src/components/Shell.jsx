import { Fragment, useEffect, useState } from "react";
import {
  ChevronRight,
  CircleHelp,
  Download,
  Ellipsis,
  House,
  Landmark,
  LifeBuoy,
  Megaphone,
  Moon,
  Search,
  Share,
  Sun,
  Users,
} from "lucide-react";
import { Link, useRoute } from "../lib/router.jsx";
import { DISCLAIMER, sectionList, sections } from "../data/site.js";
import { Swatch } from "./ui.jsx";

function Brand({ className = "brand" }) {
  return (
    <Link to="" className={className} aria-label="Rekening & KKP — Beranda">
      <span className="brand__mark">
        <Landmark size={20} strokeWidth={2.2} />
      </span>
      <span className="brand__text">
        <span className="brand__name">Rekening & KKP</span>
        {className === "brand" && <span className="brand__org">Direktorat Jenderal Pajak</span>}
      </span>
    </Link>
  );
}

const guides = [
  { to: "mutasi/rekening", match: "mutasi", label: "Serah terima saat mutasi", Icon: Users },
  { to: "isu/penagihan", match: "isu", label: "RPL PS Penagihan", Icon: Megaphone },
];
const others = [
  { to: "faq/giro", match: "faq", label: "Pertanyaan umum", Icon: CircleHelp },
  { to: "bantuan", match: "bantuan", label: "Bantuan", Icon: LifeBuoy },
];

export function Sidebar({ install, theme, onToggleTheme }) {
  const { parts } = useRoute();
  const [p0, p1] = parts;
  return (
    <aside className="sidebar" aria-label="Navigasi utama">
      <Brand />
      <div className="sidebar__scroll">
        <Link to="" className="nav-item" aria-current={!p0 ? "page" : undefined}>
          <span className="nav-item__icon">
            <House size={17} />
          </span>
          Beranda
        </Link>

        <p className="nav-label">Jenis rekening</p>
        {sectionList.map((s) => (
          <div key={s.id}>
            <Link to={s.id} className="nav-item" aria-current={p0 === s.id && !p1 ? "page" : undefined}>
              <Swatch id={s.id} />
              {s.label}
            </Link>
            {p0 === s.id && (
              <div className="nav-sub">
                {s.pages.map((pg) => (
                  <Link key={pg.id} to={`${s.id}/${pg.id}`} aria-current={p1 === pg.id ? "page" : undefined}>
                    {pg.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <p className="nav-label">Panduan</p>
        {guides.map((g) => (
          <Link key={g.to} to={g.to} className="nav-item" aria-current={p0 === g.match ? "page" : undefined}>
            <span className="nav-item__icon">
              <g.Icon size={17} />
            </span>
            {g.label}
          </Link>
        ))}

        <p className="nav-label">Lainnya</p>
        {others.map((g) => (
          <Link key={g.to} to={g.to} className="nav-item" aria-current={p0 === g.match ? "page" : undefined}>
            <span className="nav-item__icon">
              <g.Icon size={17} />
            </span>
            {g.label}
          </Link>
        ))}
      </div>
      <div className="sidebar__foot">
        <p className="sidebar__note">{DISCLAIMER}</p>
        <div className="sidebar__actions">
          {install.canInstall && (
            <button type="button" className="chrome-btn chrome-btn--gold chrome-btn--grow" onClick={install.install}>
              <Download size={16} />
              Pasang aplikasi
            </button>
          )}
          <button
            type="button"
            className={`chrome-btn${install.canInstall ? "" : " chrome-btn--grow"}`}
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {!install.canInstall && (theme === "dark" ? "Tema terang" : "Tema gelap")}
          </button>
        </div>
      </div>
    </aside>
  );
}

function crumbsFor(parts) {
  const [p0, p1] = parts;
  if (!p0) return [];
  if (sections[p0]) {
    const s = sections[p0];
    const c = [{ label: s.label, to: p0 }];
    const pg = s.pages.find((x) => x.id === p1);
    if (pg) c.push({ label: pg.title });
    return c;
  }
  const map = {
    faq: "Pertanyaan umum",
    bantuan: "Bantuan",
    mutasi: p1 === "kkp" ? "Serah terima KKP saat mutasi" : "Serah terima rekening saat mutasi",
    isu: "RPL PS Penagihan",
  };
  return [{ label: map[p0] || "Halaman tidak ditemukan" }];
}

export function Topbar({ onSearch, theme, onToggleTheme }) {
  const { parts } = useRoute();
  const crumbs = crumbsFor(parts);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <header className="topbar">
      <Brand className="topbar__brand" />
      <nav className="crumbs" aria-label="Lokasi">
        <Link to="">Beranda</Link>
        {crumbs.map((c, i) => (
          <Fragment key={i}>
            <ChevronRight size={14} aria-hidden="true" />
            {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </Fragment>
        ))}
      </nav>
      <span className="topbar__spacer" />
      <button type="button" className="search-trigger" onClick={onSearch} aria-label="Cari (Ctrl+K)">
        <Search size={18} aria-hidden="true" />
        <span className="search-trigger__label">Cari…</span>
        <kbd>{isMac ? "⌘ K" : "Ctrl K"}</kbd>
      </button>
      <button
        type="button"
        className="icon-btn"
        onClick={onToggleTheme}
        aria-label={theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

export function BottomNav({ install }) {
  const { parts } = useRoute();
  const [p0] = parts;
  const [sheet, setSheet] = useState(false);
  const inMore = ["mutasi", "isu", "faq", "bantuan"].includes(p0);

  useEffect(() => setSheet(false), [parts.join("/")]); // tutup saat pindah halaman

  useEffect(() => {
    if (!sheet) return undefined;
    const onKey = (e) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  return (
    <>
      <nav className="bottom-nav" aria-label="Navigasi utama">
        <Link to="" className="bottom-nav__item" aria-current={!p0 ? "page" : undefined}>
          <House size={21} />
          Beranda
        </Link>
        {sectionList.map((s) => (
          <Link key={s.id} to={s.id} className="bottom-nav__item" aria-current={p0 === s.id ? "page" : undefined}>
            <Swatch id={s.id} />
            {s.short}
          </Link>
        ))}
        <button
          type="button"
          className="bottom-nav__item"
          aria-current={inMore ? "page" : undefined}
          aria-expanded={sheet}
          onClick={() => setSheet(true)}
        >
          <Ellipsis size={21} />
          Lainnya
        </button>
      </nav>

      {sheet && (
        <>
          <div className="overlay" onClick={() => setSheet(false)} />
          <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu lainnya">
            <div className="sheet__grip" />
            <p className="sheet__title">Panduan</p>
            <div className="sheet__list">
              {guides.map((g) => (
                <Link key={g.to} to={g.to}>
                  <span className="sheet__icon">
                    <g.Icon size={19} />
                  </span>
                  {g.label}
                </Link>
              ))}
            </div>
            <p className="sheet__title">Lainnya</p>
            <div className="sheet__list">
              {others.map((g) => (
                <Link key={g.to} to={g.to}>
                  <span className="sheet__icon">
                    <g.Icon size={19} />
                  </span>
                  {g.label}
                </Link>
              ))}
              {install.canInstall && (
                <button type="button" onClick={install.install}>
                  <span className="sheet__icon">
                    <Download size={19} />
                  </span>
                  <span>
                    Pasang aplikasi
                    <span className="sheet__sub">Buka lebih cepat dari layar utama, tetap bisa dibaca saat offline</span>
                  </span>
                </button>
              )}
              {!install.canInstall && !install.installed && install.isIOS && (
                <div className="sheet__note">
                  <Share size={14} /> Untuk memasang di iPhone/iPad: ketuk tombol Bagikan di Safari, lalu pilih “Tambah ke Layar
                  Utama”.
                </div>
              )}
            </div>
            <p className="sheet__note">{DISCLAIMER}</p>
          </div>
        </>
      )}
    </>
  );
}
