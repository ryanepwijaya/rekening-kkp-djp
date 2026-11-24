import { ArrowRight, CreditCard, Landmark, Layers } from "lucide-react";
import { Link } from "../lib/router.jsx";
import { sections } from "../data/site.js";

const icons = { giro: Landmark, virtual: Layers, kkp: CreditCard };

/** Elemen khas situs: tiap jenis rekening tampil sebagai kartu bank. */
export default function BankCard({ id, to, as = "link" }) {
  const s = sections[id];
  const Icon = icons[id];
  const inner = (
    <>
      <span className="bank-card__top">
        <span>
          <span className="bank-card__name">{s.label}</span>
          <span className="bank-card__issuer">Direktorat Jenderal Pajak</span>
        </span>
        <Icon className="bank-card__icon" size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="bank-card__chip" aria-hidden="true" />
      <span className="bank-card__bottom">
        <span>
          <span className="bank-card__code">{s.code}</span>
          <span className="bank-card__reg">{s.cardReg || s.reg}</span>
        </span>
        {as === "link" && (
          <span className="bank-card__go" aria-hidden="true">
            <ArrowRight size={18} strokeWidth={2.4} />
          </span>
        )}
      </span>
    </>
  );
  if (as === "link") {
    return (
      <Link to={to || id} className={`bank-card bank-card--${id}`} aria-label={`${s.label} — ${s.tagline}`}>
        {inner}
      </Link>
    );
  }
  return (
    <div className={`bank-card bank-card--${id}`} aria-hidden="true">
      {inner}
    </div>
  );
}
