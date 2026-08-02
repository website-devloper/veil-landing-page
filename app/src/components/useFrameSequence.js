import { useEffect, useRef } from "react";

const TOTAL = 420;
const PATH = "/assets/images/frames/seq/frame_";

/* Cover-fit anchor. The headset lives in the upper half of every frame, so
   overflow is cropped off the bottom only. */
const FOCUS_X = 0.5;
const FOCUS_Y = 0;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const src = (n) => PATH + String(n + 1).padStart(3, "0") + ".jpg";

/*
  Paints the 35s take onto a canvas from a MotionValue of scroll progress.
  Kept out of React state entirely: 420 frames at 60fps through a reducer would
  be 25k renders a scroll. The canvas is imperative, the way it should be.
*/
export default function useFrameSequence(canvasRef, progress, onReady) {
  const state = useRef({ shown: 0, target: 0, settled: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const frames = new Array(TOTAL);
    const st = state.current;

    const conn = navigator.connection || {};
    const lean =
      window.innerWidth < 768 ||
      conn.saveData === true ||
      /^(slow-)?2g$/.test(conn.effectiveType || "");
    const STRIDE = lean ? 2 : 1;

    const slotOf = (pos) =>
      Math.min(TOTAL - 1, Math.round(pos / STRIDE) * STRIDE);

    let alive = true;
    let lastDrawn = null;
    let announced = false;

    function nearest(target) {
      if (frames[target]) return frames[target];
      for (let d = 1; d < TOTAL; d++) {
        if (target - d >= 0 && frames[target - d]) return frames[target - d];
        if (target + d < TOTAL && frames[target + d]) return frames[target + d];
      }
      return null;
    }

    function paint(frame) {
      const img = nearest(Math.min(TOTAL - 1, Math.max(0, frame)));
      if (!img || img === lastDrawn) return;
      lastDrawn = img;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) * FOCUS_X, (ch - dh) * FOCUS_Y, dw, dh);
    }

    /* Coarse-to-fine: the first pass skims the whole timeline so the story is
       scrubbable in about a second, then it sharpens in place. */
    function buildQueue() {
      const seen = {};
      const queue = [];
      [56, 28, 14, 7, 3, STRIDE].forEach((step) => {
        if (step < STRIDE) return;
        for (let i = 0; i < TOTAL; i += step) {
          const f = slotOf(i);
          if (!seen[f]) {
            seen[f] = 1;
            queue.push(f);
          }
        }
      });
      return queue;
    }

    const queue = buildQueue();
    const firstPass = Math.ceil(TOTAL / 56);
    let cursor = 0;
    let inflight = 0;
    let loaded = 0;

    function pump() {
      while (alive && cursor < queue.length && inflight < 8) load(queue[cursor++]);
    }

    function load(n) {
      if (frames[n]) return;
      inflight++;
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        inflight--;
        loaded++;
        if (img.naturalWidth) frames[n] = img;
        if (!alive) return;

        if (!announced && frames[n]) {
          announced = true;
          onReady && onReady(1);
        } else if (!announced && onReady) {
          onReady(Math.min(0.99, loaded / firstPass));
        }

        if (st.settled) paint(slotOf(st.shown));
        pump();
      };
      img.src = src(n);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr) || window.innerWidth;
      canvas.height = Math.round(canvas.clientHeight * dpr) || window.innerHeight;
      lastDrawn = null;
      paint(slotOf(st.shown));
    }

    /* Easing the shown frame toward the target keeps fast flicks cinematic
       instead of strobing, and hides gaps while frames still stream. */
    function tick() {
      if (!alive) return;
      const delta = st.target - st.shown;
      if (Math.abs(delta) < 0.6) {
        st.shown = st.target;
        st.settled = true;
      } else {
        st.shown += delta * 0.24;
        st.settled = false;
      }
      paint(slotOf(st.shown));
      if (!st.settled) requestAnimationFrame(tick);
    }

    const unsub = progress.on("change", (p) => {
      st.target = slotOf(clamp01(p) * (TOTAL - 1));
      if (st.settled) tick();
    });

    window.addEventListener("resize", resize, { passive: true });

    load(0);
    pump();
    resize();
    st.target = slotOf(clamp01(progress.get()) * (TOTAL - 1));
    tick();

    return () => {
      alive = false;
      unsub();
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, progress, onReady]);
}
