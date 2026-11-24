import { ArrowRight, CreditCard, Layers } from "lucide-react";
import { Link } from "../lib/router.jsx";
import { sections } from "../data/site.js";

const icons = { virtual: Layers, kkp: CreditCard };

/**
 * Elemen khas situs. Rekening Giro (RPL) tidak punya kartu, jadi tampil sebagai
 * lembar bilyet giro dari buku cek. Virtual dan KKP tampil sebagai kartu.
 */
export default function BankCard({ id, to, as = "link" }) {
  const s = sections[id];
  const isLink = as === "link";
  const inner = id === "giro" ? <ChequeFace s={s} isLink={isLink} /> : <CardFace s={s} id={id} isLink={isLink} />;
  const className = id === "giro" ? "cheque" : `bank-card bank-card--${id}`;

  if (isLink) {
    return (
      <Link to={to || id} className={className} aria-label={`${s.label} — ${s.tagline}`}>
        {inner}
      </Link>
    );
  }
  return (
    <div className={className} aria-hidden="true">
      {inner}
    </div>
  );
}

function GoButton() {
  return (
    <span className="bank-card__go" aria-hidden="true">
      <ArrowRight size={18} strokeWidth={2.4} />
    </span>
  );
}

function CardFace({ s, id, isLink }) {
  const Icon = icons[id];
  return (
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
        {isLink && <GoButton />}
      </span>
    </>
  );
}

function ChequeFace({ s, isLink }) {
  return (
    <span className="cheque__sheet">
      {/* Bonggol (stub) yang tertinggal di buku cek */}
      <span className="cheque__stub" aria-hidden="true">
        <span className="cheque__stub-label">No.</span>
        <span className="cheque__stub-line" />
        <span className="cheque__stub-line" />
        <span className="cheque__stub-line" />
      </span>

      <span className="cheque__body">
        <span className="cheque__top">
          <span>
            <span className="cheque__name">{s.label}</span>
            <span className="cheque__issuer">Direktorat Jenderal Pajak</span>
          </span>
          <span className="cheque__kind">Bilyet giro</span>
        </span>

        <span className="cheque__fields" aria-hidden="true">
          <span className="cheque__field">
            <span className="cheque__field-label">Pindahkan ke</span>
            <span className="cheque__field-line" />
          </span>
          <span className="cheque__field">
            <span className="cheque__field-label">Sejumlah</span>
            <span className="cheque__field-line" />
            <span className="cheque__amount">Rp</span>
          </span>
        </span>

        <span className="cheque__bottom">
          <span>
            <span className="cheque__code">{s.code}</span>
            <span className="cheque__micr">{s.reg}</span>
          </span>
          {isLink && <GoButton />}
        </span>
      </span>
    </span>
  );
}
