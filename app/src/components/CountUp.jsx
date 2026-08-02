import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
  Counts the numeric part of a spec value up from zero, leaving any prefix or
  suffix alone — "120 Hz" animates the 120, "Dual 4K" animates the 4, and
  "Spatial" is passed straight through untouched.

  Driven by rAF against a timestamp rather than incrementing per frame, so the
  duration holds regardless of refresh rate.
*/
const PARTS = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/s;

export default function CountUp({ value, duration = 1.5 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const match = String(value).match(PARTS);
  const target = match ? parseFloat(match[2]) : null;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [n, setN] = useState(target);

  useEffect(() => {
    if (target === null || reduce) return;
    if (!inView) {
      setN(0);
      return;
    }

    let frame;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setN(target * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reduce]);

  if (target === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {match[1]}
      {n.toFixed(decimals)}
      {match[3]}
    </span>
  );
}
