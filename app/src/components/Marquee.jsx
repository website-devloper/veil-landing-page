import { useReducedMotion } from "framer-motion";

const DEFAULT = [
  "Free shipping worldwide",
  "2-year warranty",
  "30-day returns",
  "Ships Spring 2049",
  "No PC required",
  "Spatial audio built in"
];

/*
  Infinite ticker between bands.

  The track is rendered twice and translated by exactly -50%, so the second copy
  lands where the first began and the loop is seamless — no snap, no gap. Both
  copies are needed: animating one and wrapping it leaves a visible blank.

  The duplicate is aria-hidden so screen readers hear the list once.
*/
export default function Marquee({ items = DEFAULT, speed = 46, className = "" }) {
  const reduce = useReducedMotion();

  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i}>
          <span>{t}</span>
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={
          reduce ? { animation: "none" } : { animationDuration: `${speed}s` }
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
