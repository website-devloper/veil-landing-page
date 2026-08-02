import { useCallback, useRef } from "react";

/*
  Cursor-follow spotlight.

  Returns handlers for a container that delegates to whichever card is under the
  pointer, so one listener serves the whole grid instead of one per card.

  Writes --mx / --my as percentages and lets CSS paint the gradient. Updates are
  batched into a rAF so a fast mousemove cannot outpace the frame, and each
  card's rect is measured once on entry rather than on every move — measuring
  per event would force layout on every pixel.
*/
export default function useSpotlight(selector = ".game-poster") {
  const frame = useRef(0);
  const active = useRef(null);
  const rect = useRef(null);
  const point = useRef({ x: 0, y: 0 });

  const paint = useCallback(() => {
    frame.current = 0;
    const el = active.current;
    const r = rect.current;
    if (!el || !r) return;
    el.style.setProperty("--mx", `${((point.current.x - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((point.current.y - r.top) / r.height) * 100}%`);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      const card = e.target.closest(selector);

      if (card !== active.current) {
        if (active.current) active.current.classList.remove("is-lit");
        active.current = card;
        rect.current = card ? card.getBoundingClientRect() : null;
        if (card) card.classList.add("is-lit");
      }
      if (!card) return;

      point.current.x = e.clientX;
      point.current.y = e.clientY;
      if (!frame.current) frame.current = requestAnimationFrame(paint);
    },
    [selector, paint]
  );

  const onMouseLeave = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (active.current) active.current.classList.remove("is-lit");
    active.current = null;
    rect.current = null;
  }, []);

  return { onMouseMove, onMouseLeave };
}
