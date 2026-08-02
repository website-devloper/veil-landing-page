import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND } from "../data/content";
import asset from "../lib/asset";

/*
  Loading reveal.

  The frame sequence has to stream before the hero can scrub, so that wait
  already exists — this spends it on the brand instead of a bare progress bar.
  When it completes the panel splits and the two halves part vertically, which
  is the name of the product doing what it says.

  A hard 6s ceiling dismisses it regardless of load state: a stalled image must
  never leave someone staring at a closed curtain.
*/
const EASE = [0.76, 0, 0.24, 1];

export default function Intro({ progress = 0 }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    // hold a beat at 100% so the fill is seen landing, not just gone
    if (progress >= 1) {
      const t = setTimeout(() => setDone(true), 420);
      return () => clearTimeout(t);
    }
  }, [progress, reduce]);

  useEffect(() => {
    const bail = setTimeout(() => setDone(true), 6000);
    return () => clearTimeout(bail);
  }, []);

  // lock the page while the curtain is up, or the hero scrubs behind it
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const pct = Math.round(Math.min(1, progress) * 100);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="intro" exit={{ pointerEvents: "none" }}>
          <motion.div
            className="intro-half intro-top"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.05, ease: EASE }}
          />
          <motion.div
            className="intro-half intro-bottom"
            exit={{ y: "100%" }}
            transition={{ duration: 1.05, ease: EASE }}
          />

          <motion.div
            className="intro-center"
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <img
              className="intro-logo"
              src={asset("assets/images/logo-lockup.png")}
              alt={BRAND.name}
              width={340}
              height={402}
            />

            <div className="intro-bar">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: Math.min(1, progress) }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </div>

            <span className="intro-pct">{String(pct).padStart(3, "0")}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
