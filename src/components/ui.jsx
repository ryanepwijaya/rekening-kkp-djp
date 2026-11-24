import { Fragment, createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileLock2,
  FileText,
  Hourglass,
  Info,
  Star,
  TriangleAlert,
} from "lucide-react";
import { Link, href } from "../lib/router.jsx";
import { sections, topicIcons } from "../data/site.js";

/* ---------------------------------------------------------------------------
   Daftar isi otomatis: setiap <Section> mendaftarkan judulnya ke <Page>.
--------------------------------------------------------------------------- */
const TocContext = createContext(null);

export function Page({ section = "umum", kicker, title, lead, meta, subnav, toc = true, children, after }) {
  const [items, setItems] = useState([]);
  const register = useCallback((item) => {
    setItems((prev) => (prev.some((p) => p.id === item.id) ? prev : [...prev, item]));
    return () => setItems((prev) => prev.filter((p) => p.id !== item.id));
  }, []);
  // Daftar isi hanya muncul bila ada minimal 2 bagian; tanpa daftar isi, konten dibuat lebar penuh.
  const hasToc = toc && items.length >= 2;

  return (
    <TocContext.Provider value={register}>
      <header className="page-head">
        <div className="container">
          {kicker}
          <h1 className="page-title">{title}</h1>
          {lead && <p className="page-lead">{lead}</p>}
          {meta && <p className="page-meta">{meta}</p>}
          {subnav}
        </div>
      </header>
      <div className="container">
        {hasToc ? (
          <div className="with-toc">
            <div className="article">
              {children}
              {after}
            </div>
            <Toc items={items} />
          </div>
        ) : (
          <div className="article article--full">
            {children}
            {after}
          </div>
        )}
      </div>
    </TocContext.Provider>
  );
}

function Toc({ items }) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!items.length) return undefined;
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // urutkan sesuai posisi di dokumen
  const ordered = [...items].sort((a, b) => {
    const ea = document.getElementById(a.id);
    const eb = document.getElementById(b.id);
    if (!ea || !eb) return 0;
    return ea.compareDocumentPosition(eb) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
  return (
    <aside className="toc" aria-label="Di halaman ini">
      <p className="toc__title">Di halaman ini</p>
      <ol>
        {ordered.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              aria-current={active === i.id ? "true" : undefined}
              onClick={() => document.getElementById(i.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              {i.title}
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Section({ title, lead, id, children, className = "", number, badges }) {
  const register = useContext(TocContext);
  const sid = id || slugify(title || "");
  // layout effect: daftar isi sudah terdaftar sebelum halaman tampil, jadi tata letak tidak "melompat"
  useLayoutEffect(() => {
    if (register && title) return register({ id: sid, title });
    return undefined;
  }, [register, sid, title]);
  return (
    <section className={`sec${number ? " sec--numbered" : ""} ${className}`} id={title ? sid : undefined}>
      {badges && <div className="sec__badges">{badges}</div>}
      {title && (
        <h2 className="sec__title">
          {number && <span className="sec__num">{number}</span>}
          {title}
        </h2>
      )}
      {lead && <p className="sec__lead">{lead}</p>}
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Header jenis rekening + navigasi sub-halaman
--------------------------------------------------------------------------- */
export function Swatch({ id }) {
  return <span className={`nav-item__swatch nav-item__swatch--${id}`} aria-hidden="true" />;
}

export function SectionKicker({ sectionId }) {
  const s = sections[sectionId];
  return (
    <Link to={sectionId} className="page-head__kicker">
      <Swatch id={sectionId} />
      {s.label}
    </Link>
  );
}

export function SectionSubnav({ sectionId, current }) {
  const s = sections[sectionId];
  return (
    <nav className="subnav" aria-label={`Topik ${s.label}`}>
      {s.pages.map((p) => {
        const Icon = topicIcons[p.id];
        return (
          <Link key={p.id} to={`${sectionId}/${p.id}`} aria-current={current === p.id ? "page" : undefined}>
            <Icon size={16} strokeWidth={2.2} />
            {p.title}
          </Link>
        );
      })}
    </nav>
  );
}

/** Kerangka standar untuk sub-halaman (regulasi/operasional/perubahan/format). */
export function TopicPage({ sectionId, topic, lead, children }) {
  const s = sections[sectionId];
  const idx = s.pages.findIndex((p) => p.id === topic);
  const page = s.pages[idx];
  const prev = s.pages[idx - 1];
  const next = s.pages[idx + 1];
  return (
    <Page
      section={sectionId}
      kicker={<SectionKicker sectionId={sectionId} />}
      title={page.title}
      lead={lead}
      subnav={<SectionSubnav sectionId={sectionId} current={topic} />}
      after={
        <Pager
          prev={prev && { to: `${sectionId}/${prev.id}`, title: prev.title }}
          next={next && { to: `${sectionId}/${next.id}`, title: next.title }}
        />
      }
    >
      {children}
    </Page>
  );
}

export function Pager({ prev, next }) {
  if (!prev && !next) return null;
  return (
    <nav className="pager" aria-label="Halaman sebelumnya dan berikutnya">
      {prev && (
        <Link to={prev.to}>
          <ChevronLeft size={20} />
          <span>
            <span className="pager__dir">Sebelumnya</span>
            <span className="pager__title">{prev.title}</span>
          </span>
        </Link>
      )}
      {next && (
        <Link to={next.to} className="pager__next">
          <span>
            <span className="pager__dir">Berikutnya</span>
            <span className="pager__title">{next.title}</span>
          </span>
          <ChevronRight size={20} />
        </Link>
      )}
    </nav>
  );
}

/* ---------------------------------------------------------------------------
   Elemen konten
--------------------------------------------------------------------------- */
export function Badge({ children, kind }) {
  const text = String(children);
  const k = kind || (text.startsWith("NON-PMK") ? "nonpmk" : text.startsWith("PMK") ? "pmk" : "neutral");
  return <span className={`badge badge--${k}`}>{children}</span>;
}

export function Callout({ tone = "info", title, children, sub, icon }) {
  const Icon = icon || (tone === "wajib" ? Star : tone === "alert" ? TriangleAlert : Info);
  return (
    <div className={`callout callout--${tone}`} role={tone === "wajib" ? "note" : undefined}>
      <Icon className="callout__icon" size={20} strokeWidth={2.2} fill={tone === "wajib" ? "currentColor" : "none"} />
      <div className="callout__body">
        {title && <p className="callout__title">{title}</p>}
        {typeof children === "string" ? <p>{children}</p> : children}
        {sub && <p className="callout__sub">{sub}</p>}
      </div>
    </div>
  );
}

export function Bullets({ items, className = "" }) {
  return (
    <ul className={`bullets ${className}`}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

/** items: node | { t, d } */
export function Steps({ items, className = "" }) {
  return (
    <ol className={`steps ${className}`}>
      {items.map((it, i) =>
        it && typeof it === "object" && "t" in it ? (
          <li key={i}>
            <span className="steps__title">{it.t}</span>
            {it.d}
          </li>
        ) : (
          <li key={i}>{it}</li>
        )
      )}
    </ol>
  );
}

export function Cards({ cols = 3, children }) {
  return <div className={`cards cards--${cols}`}>{children}</div>;
}

export function Card({ title, badge, icon: Icon, children, foot, footTone, solid }) {
  return (
    <div className={`card${solid ? " card--solid" : ""}`}>
      {(Icon || title || badge) && (
        <div className="card__top">
          {Icon && (
            <span className="card__icon">
              <Icon size={19} strokeWidth={2.1} />
            </span>
          )}
          {title && <p className="card__title">{title}</p>}
          {badge}
        </div>
      )}
      {children && <div className="card__body">{children}</div>}
      {foot && <p className={`card__foot${footTone === "alert" ? " card__foot--alert" : ""}`}>{foot}</p>}
    </div>
  );
}

export function Codes({ items, quietCodes = false, more }) {
  return (
    <div className="codes">
      {items.map((j) => (
        <div className="code-row" key={j.kode}>
          <span className={`code-chip${quietCodes ? " code-chip--quiet" : ""}`}>{j.kode}</span>
          <div>
            <p className="code-row__name">{j.nama}</p>
            <p className="code-row__desc">{j.ket}</p>
          </div>
        </div>
      ))}
      {more}
    </div>
  );
}

export function Disclosure({ lead, badges, title, summary, children, defaultOpen = false, indent = true, plain = false, id, open: controlledOpen, onToggle }) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? localOpen;
  const panelId = useId();
  const toggle = () => {
    if (onToggle) onToggle(!open);
    else setLocalOpen(!open);
  };
  return (
    <div className={`disclosure${plain ? " disclosure--plain" : ""}`} data-open={open} id={id}>
      <button type="button" className="disclosure__head" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        {lead && <span className="disclosure__lead">{lead}</span>}
        <span className="disclosure__text">
          {badges && <span className="disclosure__badges">{badges}</span>}
          <span className="disclosure__title">{title}</span>
          {summary && <span className="disclosure__summary">{summary}</span>}
        </span>
        <span className="disclosure__chev" aria-hidden="true">
          <ChevronDown size={18} strokeWidth={2.4} />
        </span>
      </button>
      <div className="disclosure__panel" id={panelId} role="region" hidden={false} aria-hidden={!open}>
        <div className="disclosure__inner" inert={open ? undefined : ""}>
          <div className={`disclosure__content${indent && lead ? " disclosure__content--indent" : ""}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function MiniDisclosure({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mini-disclosure" data-open={open}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        {title}
        <ChevronDown size={18} />
      </button>
      {open && <div className="mini-disclosure__body">{children}</div>}
    </div>
  );
}

/** Tautan format dokumen (SharePoint) atau tautan internal. */
export function DocLink({ href: url, to, children }) {
  if (to) {
    return (
      <Link to={to} className="doc-link">
        {children}
        <ArrowRight size={14} strokeWidth={2.4} />
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="doc-link">
      {children}
      <ExternalLink size={14} strokeWidth={2.4} />
      <span className="sr-only"> (SharePoint, tab baru)</span>
    </a>
  );
}

export function DocCard({ doc }) {
  return (
    <article className="doc-card">
      <div className="doc-card__top">
        <span className="doc-card__file" aria-hidden="true">
          <FileText size={20} strokeWidth={2} />
        </span>
        <div>
          <div className="doc-card__badges">
            <Badge>{doc.badge}</Badge>
          </div>
          <h3 className="doc-card__name">{doc.nama}</h3>
        </div>
      </div>
      {doc.caption && <p className="doc-card__caption">{doc.caption}</p>}
      {doc.note && <p className="doc-card__note">{doc.note}</p>}
      {(doc.href || doc.hrefs) && (
        <div className="doc-card__actions">
          {doc.hrefs ? (
            doc.hrefs.map((h) => (
              <a key={h.url} href={h.url} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                <ExternalLink size={15} />
                {h.label}
              </a>
            ))
          ) : (
            <a href={doc.href} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
              <ExternalLink size={15} />
              Buka di SharePoint
            </a>
          )}
        </div>
      )}
      {!doc.href && !doc.hrefs && !doc.note && (
        <span className="doc-card__pending">
          <Hourglass size={15} />
          Segera tersedia
        </span>
      )}
    </article>
  );
}

export function DocSections({ groups }) {
  return (
    <>
      <p className="sp-hint">
        <FileLock2 size={16} />
        Tautan dibuka di SharePoint Kemenkeu dan memerlukan akun Kemenkeu.
      </p>
      {groups.map((g) => (
        <Section key={g.id} id={g.id} title={g.label} className="doc-section">
          <div className="doc-grid">
            {g.docs.map((d) => (
              <DocCard key={d.nama} doc={d} />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

export function Flow({ nodes, roles = false }) {
  return (
    <div className={`flow${roles ? " flow--roles" : ""}`}>
      {nodes.map((n, i) => (
        <Fragment key={i}>
          {roles ? (
            <span className="flow__node">
              <span className="flow__role">{n[0]}</span>
              <span className="flow__who">{n[1]}</span>
            </span>
          ) : (
            <span className="flow__node">{n}</span>
          )}
          {i < nodes.length - 1 && <ArrowRight className="flow__arrow" size={18} strokeWidth={2.4} aria-hidden="true" />}
        </Fragment>
      ))}
    </div>
  );
}

export function Tabs({ tabs, active, onChange, small = false, label }) {
  const refs = useRef([]);
  const onKey = (e, i) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    onChange(tabs[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div className={`tabs${small ? " tabs--sm" : ""}`} role="tablist" aria-label={label}>
      {tabs.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => (refs.current[i] = el)}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          tabIndex={active === t.id ? 0 : -1}
          className="tabs__btn"
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t.icon}
          {t.short ? (
            <>
              <span className="tabs__long">{t.label}</span>
              <span className="tabs__short">{t.short}</span>
            </>
          ) : (
            t.label
          )}
          {t.count != null && <span className="tabs__count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function RegBanner({ children, links }) {
  return (
    <div className="reg">
      <div className="reg__body">
        <span className="reg__icon">
          <FileText size={22} />
        </span>
        <p>{children}</p>
      </div>
      <div className="reg__actions">
        {links.map((l, i) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? "btn--gold" : "btn--ghost"}`}>
            {l.label}
            <ExternalLink size={15} />
          </a>
        ))}
      </div>
    </div>
  );
}

export { href };
