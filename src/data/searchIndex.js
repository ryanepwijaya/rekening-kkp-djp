import { sectionList } from "./site.js";
import { formatsBySection } from "./formats.js";
import { faqGroups } from "./faq.jsx";

export const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

// Indeks pencarian: halaman, format dokumen (langsung ke SharePoint), dan pertanyaan FAQ.
function build() {
  const out = [];

  sectionList.forEach((s) => {
    out.push({ type: "page", section: s.id, title: s.label, sub: s.tagline, to: s.id, keys: `${s.code} ${s.reg}` });
    s.pages.forEach((p) =>
      out.push({ type: "page", section: s.id, title: `${p.title}`, sub: `${s.label} — ${p.desc}`, to: `${s.id}/${p.id}`, keys: s.short })
    );
  });

  out.push(
    {
      type: "page",
      section: "umum",
      title: "Serah Terima Rekening sehubungan Mutasi",
      sub: "Panduan lengkap mutasi KPA/Bendahara — BAST, pemberitahuan ke bank",
      to: "mutasi/rekening",
      keys: "mutasi pejabat bendahara kpa bast cms dashboard bri bni mandiri bsi",
    },
    {
      type: "page",
      section: "kkp",
      title: "Serah Terima KKP sehubungan Mutasi",
      sub: "Panduan lengkap mutasi pemegang KKP, Admin KKP, dan KPA",
      to: "mutasi/kkp",
      keys: "mutasi penarikan kartu dormant kep skenario",
    },
    {
      type: "page",
      section: "giro",
      title: "RPL PS Penagihan",
      sub: "Isu rekening terkini — boleh dibuka sesuai kebutuhan",
      to: "isu/penagihan",
      keys: "penagihan juru sita lelang barang sitaan seksi p3 kanwil kpp",
    },
    { type: "page", section: "umum", title: "Bantuan", sub: "Grup WhatsApp rekening & koordinasi bank cabang", to: "bantuan", keys: "kontak grup wa whatsapp" },
    ...faqGroups.map((g) => ({
      type: "page",
      section: g.id,
      title: `FAQ ${g.label}`,
      sub: `${g.items.length} pertanyaan umum`,
      to: `faq/${g.id}`,
      keys: "pertanyaan faq",
    }))
  );

  sectionList.forEach((s) => {
    formatsBySection[s.id].forEach((g) =>
      g.docs.forEach((d) => {
        if (d.hrefs) {
          d.hrefs.forEach((h) =>
            out.push({ type: "doc", section: s.id, title: `${d.nama} — ${h.label}`, sub: `Format ${s.label} — ${d.badge}`, href: h.url, keys: "perjanjian" })
          );
        } else {
          out.push({
            type: "doc",
            section: s.id,
            title: d.nama,
            sub: `Format ${s.label} — ${d.badge}${d.href ? "" : " — lihat keterangan"}`,
            href: d.href,
            to: d.href ? undefined : `${s.id}/format`,
            keys: d.keys,
          });
        }
      })
    );
  });

  faqGroups.forEach((g) =>
    g.items.forEach((it) =>
      out.push({ type: "faq", section: g.id, title: it.q, sub: `FAQ ${g.label}`, to: `faq/${g.id}?q=${it.id}` })
    )
  );

  return out.map((e) => ({ ...e, hay: norm(`${e.title} ${e.sub || ""} ${e.keys || ""}`), titleN: norm(e.title) }));
}

export const searchIndex = build();

export function search(query, limitPerType = 7) {
  const q = norm(query.trim());
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = [];
  for (const e of searchIndex) {
    if (!tokens.every((t) => e.hay.includes(t))) continue;
    let score = 0;
    if (e.titleN.startsWith(q)) score += 60;
    if (e.titleN.includes(q)) score += 30;
    tokens.forEach((t) => {
      if (e.titleN.includes(t)) score += 10;
      if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(e.titleN)) score += 5;
    });
    if (e.type === "page") score += 4;
    scored.push({ ...e, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const byType = { page: [], doc: [], faq: [] };
  scored.forEach((e) => {
    if (byType[e.type].length < limitPerType) byType[e.type].push(e);
  });
  return byType;
}
