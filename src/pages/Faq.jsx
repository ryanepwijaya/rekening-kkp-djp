import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Disclosure, Page, Tabs } from "../components/ui.jsx";
import { navigate } from "../lib/router.jsx";
import { faqGroups } from "../data/faq.jsx";

const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function Faq({ tab = "giro", openId }) {
  const group = faqGroups.find((g) => g.id === tab) || faqGroups[0];
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(() => new Set([openId || group.items[0].id]));

  // Saat tab atau target pertanyaan berubah (mis. dari pencarian), buka pertanyaan tersebut.
  useEffect(() => {
    setOpen(new Set([openId || group.items[0].id]));
    setFilter("");
    if (openId) {
      requestAnimationFrame(() => {
        document.getElementById(`faq-${openId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [group.id, openId]); // eslint-disable-line react-hooks/exhaustive-deps

  const items = useMemo(() => {
    const q = norm(filter.trim());
    if (!q) return group.items;
    return group.items.filter((it) => norm(it.q).includes(q));
  }, [filter, group]);

  const toggle = (id, next) =>
    setOpen((prev) => {
      const s = new Set(prev);
      next ? s.add(id) : s.delete(id);
      return s;
    });

  return (
    <Page
      section={group.id}
      title="Pertanyaan Umum"
      lead="Pertanyaan seputar Rekening Giro, Rekening Virtual, dan Kartu Kredit Pemerintah (KKP). Pilih tab sesuai topik, kemudian pilih pertanyaan untuk menampilkan jawabannya."
      toc={false}
      subnav={
        <div className="mt-6">
          <Tabs
            label="Topik FAQ"
            tabs={faqGroups.map((g) => ({ id: g.id, label: g.label, short: g.short, count: g.items.length }))}
            active={group.id}
            onChange={(id) => navigate(`faq/${id}`)}
          />
        </div>
      }
    >
      <div className="faq-tools">
        <label className="faq-filter">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Saring pertanyaan</span>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={`Saring ${group.items.length} pertanyaan ${group.label}`}
          />
          {filter && (
            <button type="button" onClick={() => setFilter("")} aria-label="Hapus saringan">
              <X size={16} />
            </button>
          )}
        </label>
        {filter && (
          <p className="faq-count" aria-live="polite">
            {items.length} pertanyaan cocok
          </p>
        )}
      </div>

      <div className="disclosures">
        {items.map((it) => (
          <Disclosure
            key={`${group.id}-${it.id}`}
            id={`faq-${it.id}`}
            plain
            title={it.q}
            open={open.has(it.id)}
            onToggle={(next) => toggle(it.id, next)}
          >
            {it.a}
          </Disclosure>
        ))}
        {items.length === 0 && (
          <p className="palette__empty">
            Tidak ada pertanyaan yang cocok. Coba kata lain, atau buka tab topik lainnya.
          </p>
        )}
      </div>

      <p className="source">
        Sumber: Tim Rekening KPDJP, "Pengelolaan Rekening" (Internal DJP, per Januari 2024); Tim Pengawasan KKP DJP, "URS Modul
        KKP" (Internal DJP, per Juli 2026).
      </p>
    </Page>
  );
}
