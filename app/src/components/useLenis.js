import { useEffect } from "react";
import Lenis from "lenis";

/*
  Smooth scroll.

  Lenis drives the real scroll position rather than transforming a wrapper, so
  everything already built on top of scroll keeps working untouched — Framer
  Motion's useScroll, the frame scrubber's MotionValue subscription, whileInView,
  and plain #anchor links.

  It also replaces CSS scroll-behavior: smooth, which would otherwise fight it
  for control of anchor jumps.
*/
export default function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.05,
      // gentle exponential ease-out: quick to respond, long to settle
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // touch devices already have momentum; hijacking it feels broken
      smoothTouch: false,
      touchMultiplier: 1.6
    });

    document.documentElement.style.scrollBehavior = "auto";

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // route #links through Lenis so they ease instead of jumping
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
}
