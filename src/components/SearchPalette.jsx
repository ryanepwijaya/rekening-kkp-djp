import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, CircleHelp, CornerDownLeft, ExternalLink, FileText, Search, SearchX, Compass } from "lucide-react";
import { navigate } from "../lib/router.jsx";
import { norm, search } from "../data/searchIndex.js";

const groups = [
  { type: "page", label: "Halaman", Icon: Compass },
  { type: "doc", label: "Format dokumen", Icon: FileText },
  { type: "faq", label: "Pertanyaan umum", Icon: CircleHelp },
];

const suggestions = ["BAST", "mutasi bendahara", "kartu debit hilang", "SIKKA", "penarikan KKP", "laporan saldo", "Format VIII"];

function Highlight({ text, query }) {
  const tokens = norm(query).split(/\s+/).filter((t) => t.length > 1);
  if (!tokens.length) return text;
  const n = norm(text);
  const marks = new Array(text.length).fill(false);
  tokens.forEach((t) => {
    let i = n.indexOf(t);
    while (i !== -1) {
      for (let k = i; k < i + t.length; k++) marks[k] = true;
      i = n.indexOf(t, i + t.length);
    }
  });
  const out = [];
  let buf = "";
  let on = marks[0];
  for (let i = 0; i < text.length; i++) {
    if (marks[i] !== on) {
      out.push(on ? <mark key={i}>{buf}</mark> : buf);
      buf = "";
      on = marks[i];
    }
    buf += text[i];
  }
  out.push(on ? <mark key="end">{buf}</mark> : buf);
  return out;
}

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => search(query), [query]);
  const flat = useMemo(() => groups.flatMap((g) => (results[g.type] || []).map((r) => ({ ...r, group: g }))), [results]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (prev && prev.focus) prev.focus();
    };
  }, [open]);

  useEffect(() => setSel(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;

  const choose = (r) => {
    onClose();
    if (r.href) window.open(r.href, "_blank", "noopener,noreferrer");
    else navigate(r.to);
  };

  const onKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && flat[sel]) {
      e.preventDefault();
      choose(flat[sel]);
    }
  };

  let idx = -1;
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="palette" role="dialog" aria-modal="true" aria-label="Pencarian" onKeyDown={onKey}>
        <div className="palette__bar">
          <Search size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            autoFocus
            className="palette__input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari prosedur, format, atau pertanyaan…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={flat[sel] ? `pr-${sel}` : undefined}
            autoComplete="off"
            spellCheck="false"
          />
          <button type="button" className="palette__close" onClick={onClose}>
            Esc
          </button>
        </div>

        <div className="palette__results" id="palette-results" role="listbox" ref={listRef}>
          {!query.trim() && (
            <>
              <p className="palette__group">Coba cari</p>
              <div className="chip-row">
                {suggestions.map((s) => (
                  <button key={s} type="button" className="chip-link" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {query.trim() && flat.length === 0 && (
            <div className="palette__empty">
              <SearchX size={28} aria-hidden="true" />
              <p>Tidak ada hasil untuk “{query}”. Coba kata lain, misalnya nama dokumen atau istilah seperti BAST, SPPR, atau KEP.</p>
            </div>
          )}

          {groups.map((g) => {
            const list = results[g.type] || [];
            if (!list.length) return null;
            return (
              <div key={g.type} role="group" aria-label={g.label}>
                <p className="palette__group">{g.label}</p>
                {list.map((r) => {
                  idx += 1;
                  const i = idx;
                  return (
                    <a
                      key={`${r.type}-${r.title}-${r.to || r.href}`}
                      id={`pr-${i}`}
                      role="option"
                      aria-selected={sel === i}
                      className="palette__item"
                      href={r.href || `#/${r.to}`}
                      target={r.href ? "_blank" : undefined}
                      rel={r.href ? "noopener noreferrer" : undefined}
                      onMouseMove={() => sel !== i && setSel(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        choose(r);
                      }}
                    >
                      <span className="palette__item-icon">
                        <g.Icon size={17} />
                      </span>
                      <span className="palette__item-text">
                        <span className="palette__item-title">
                          <Highlight text={r.title} query={query} />
                        </span>
                        <span className="palette__item-sub">{r.sub}</span>
                      </span>
                      {r.href && <ExternalLink size={15} aria-label="Buka di SharePoint" />}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="palette__foot" aria-hidden="true">
          <span>
            <ArrowUp size={12} /> <ArrowDown size={12} /> pilih
          </span>
          <span>
            <CornerDownLeft size={12} /> buka
          </span>
          <span>Format dokumen dibuka di SharePoint</span>
        </div>
      </div>
    </>
  );
}
