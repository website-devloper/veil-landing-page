import Rise from "./Rise";
import SplitHeading from "./SplitHeading";
import CountUp from "./CountUp";
import { SPECS, STEPS } from "../data/content";

/*
  Rebuilt. The old grid was auto-fit, which gave six columns on a wide screen and
  left two orphans stranded on a second row; long values like "Dual 4K micro-OLED"
  wrapped mid-phrase. Now: a fixed 4x2 lattice, short values that never wrap, and
  the qualifier demoted to a note underneath.
*/
export default function Specs() {
  return (
    <section className="band band-specs" id="specs">
      <div className="band-glow" />
      <div className="band-inner">
        <header className="band-head">
          <Rise as="span" className="band-eyebrow" y={22}>
            Specification
          </Rise>
          <SplitHeading className="band-title" text="The Hardware, *Plainly*" />
          <Rise as="p" className="band-lede" y={30} i={2}>
            Everything that matters, nothing that does not.
          </Rise>
        </header>

        <div className="spec-lattice">
          {SPECS.map((s, i) => (
            <Rise key={s.label} className="spec-cell" y={34} i={i}>
              <span className="spec-label">{s.label}</span>
              <b className="spec-value"><CountUp value={s.value} /></b>
              <span className="spec-note">{s.note}</span>
            </Rise>
          ))}
        </div>

        <div className="step-row">
          {STEPS.map((st, i) => (
            <Rise key={st.no} className="step" y={54} scale={0.98} i={i}>
              <span className="step-no">{st.no}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
