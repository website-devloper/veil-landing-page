import { BRAND } from "../data/content";

/*
  Horizontal lockup: the trimmed mark + a live wordmark.

  The supplied logo.png is a portrait lockup on a 500x500 canvas that is ~64%
  empty margin, so the artwork never read at header scale. logo-mark-lift.png is
  that same mark cropped to its bounds (and with the lower arcs lifted, which are
  dark navy in the original and vanish on this page's near-black).

  The word is set in Sora rather than using the baked-in one: the original's
  wordmark is very low-contrast, and live text stays crisp at any size, is
  selectable, and is announced correctly by screen readers.
*/
export default function Logo({ href = "#top", className = "" }) {
  return (
    <a href={href} className={`brand-lockup ${className}`} aria-label={BRAND.name}>
      <img
        className="brand-mark"
        src="/assets/images/logo-lockup.png"
        alt=""
        width={340}
        height={402}
        decoding="async"
      />
    </a>
  );
}
