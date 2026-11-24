import { useCallback, useEffect, useState } from "react";
import { SearchX } from "lucide-react";
import { Link, RouterProvider, useRoute } from "./lib/router.jsx";
import { useInstall, useSearchShortcut, useTheme } from "./lib/hooks.js";
import { sections } from "./data/site.js";
import { BottomNav, Sidebar, Topbar } from "./components/Shell.jsx";
import SearchPalette from "./components/SearchPalette.jsx";
import Home from "./pages/Home.jsx";
import SectionLanding from "./pages/SectionLanding.jsx";
import { GiroFormat, GiroOperasional, GiroPerubahan, GiroRegulasi } from "./pages/Giro.jsx";
import { VirtualFormat, VirtualOperasional, VirtualPerubahan, VirtualRegulasi } from "./pages/Virtual.jsx";
import { KKPFormat, KKPOperasional, KKPPerubahan, KKPRegulasi } from "./pages/KKP.jsx";
import Faq from "./pages/Faq.jsx";
import Bantuan from "./pages/Bantuan.jsx";
import Mutasi from "./pages/Mutasi.jsx";
import IsuPenagihan from "./pages/IsuPenagihan.jsx";

const topicPages = {
  giro: { regulasi: GiroRegulasi, operasional: GiroOperasional, perubahan: GiroPerubahan, format: GiroFormat },
  virtual: { regulasi: VirtualRegulasi, operasional: VirtualOperasional, perubahan: VirtualPerubahan, format: VirtualFormat },
  kkp: { regulasi: KKPRegulasi, operasional: KKPOperasional, perubahan: KKPPerubahan, format: KKPFormat },
};

function NotFound() {
  return (
    <div className="container empty">
      <SearchX size={40} aria-hidden="true" />
      <h1>Halaman tidak ditemukan</h1>
      <p>Tautan ini mungkin sudah berubah. Kembali ke beranda atau gunakan pencarian.</p>
      <Link to="" className="btn btn--gold">
        Kembali ke beranda
      </Link>
    </div>
  );
}

function resolve({ parts, query }, openSearch) {
  const [p0, p1] = parts;
  if (!p0) return { el: <Home onSearch={openSearch} />, section: "umum", title: null };
  if (sections[p0]) {
    if (!p1) return { el: <SectionLanding sectionId={p0} />, section: p0, title: sections[p0].label };
    const Page = topicPages[p0][p1];
    if (Page) {
      const pg = sections[p0].pages.find((x) => x.id === p1);
      return { el: <Page />, section: p0, title: `${pg.title} — ${sections[p0].label}` };
    }
  }
  if (p0 === "faq") {
    const tab = ["giro", "virtual", "kkp"].includes(p1) ? p1 : "giro";
    return { el: <Faq tab={tab} openId={query.q} />, section: tab, title: "Pertanyaan Umum" };
  }
  if (p0 === "bantuan") return { el: <Bantuan />, section: "umum", title: "Bantuan" };
  if (p0 === "mutasi") {
    const tab = p1 === "kkp" ? "kkp" : "rekening";
    return { el: <Mutasi tab={tab} />, section: tab === "kkp" ? "kkp" : "umum", title: "Serah Terima saat Mutasi" };
  }
  if (p0 === "isu" && (!p1 || p1 === "penagihan")) return { el: <IsuPenagihan />, section: "giro", title: "RPL PS Penagihan" };
  return { el: <NotFound />, section: "umum", title: "Halaman tidak ditemukan" };
}

function AppInner() {
  const route = useRoute();
  const [theme, toggleTheme] = useTheme();
  const install = useInstall();
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchShortcut(openSearch);

  const { el, section, title } = resolve(route, openSearch);

  useEffect(() => {
    document.title = title ? `${title} | Rekening & KKP DJP` : "Rekening & KKP — Direktorat Jenderal Pajak";
  }, [title]);

  return (
    <div className="app">
      <a href="#konten" className="skip-link" onClick={(e) => {
        e.preventDefault();
        document.getElementById("konten")?.focus();
      }}>
        Langsung ke konten
      </a>
      <Sidebar install={install} theme={theme} onToggleTheme={toggleTheme} />
      <div className="main">
        <Topbar onSearch={openSearch} theme={theme} onToggleTheme={toggleTheme} />
        <main id="konten" className="view" data-section={section} tabIndex={-1} key={route.path}>
          {el}
        </main>
        <footer className="site-footer">
          <div className="container">
            <span>Rekening & KKP — Direktorat Jenderal Pajak</span>
            <span>Bagian Keuangan, Subbagian Perbendaharaan</span>
          </div>
        </footer>
      </div>
      <BottomNav install={install} />
      {searchOpen && <SearchPalette open onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppInner />
    </RouterProvider>
  );
}
