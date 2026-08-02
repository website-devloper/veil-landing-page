import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import useFrameSequence from "./useFrameSequence";

const BEATS = 7;
const DRIFT = 104; // px a block travels across its whole band
const EDGE = 0.1; // share of a band spent fading

/* Depth: each layer takes a different share of the drift, so the copy
   separates and re-converges as it passes through the frame. */
const DEPTH = { eyebrow: 1.45, title: 1, text: 0.68, action: 0.42 };

const beats = [
  {
    align: "align-left",
    eyebrow: "Standalone VR",
    title: (
      <>
        Step Inside<br />The <em>Game</em>
      </>
    ),
    text: "No wires, no base stations, no PC. Lift it on and the room you are standing in stops being the room you are in.",
    cta: { href: "#preorder", label: "Reserve Your Headset" },
    h1: true
  },
  {
    align: "align-right",
    eyebrow: "Built Around You",
    title: (
      <>
        It Knows The<br />Room <em>First</em>
      </>
    ),
    text: "Inside-out tracking maps your walls, your furniture and your reach before the first frame renders.",
    tags: ["6DoF Tracking", "Zero Setup", "Guardian Space"]
  },
  {
    align: "align-left",
    eyebrow: "The Library",
    title: (
      <>
        Hundreds Of Worlds,<br />One <em>Headset</em>
      </>
    ),
    text: "Physics-driven combat, rhythm shooters, mind-bending puzzle rooms. Reach out and the library reaches back.",
    cta: { href: "#games", label: "See What You Can Play" }
  },
  {
    align: "align-center",
    eyebrow: "The Numbers",
    title: (
      <>
        Built To <em>Disappear</em>
      </>
    ),
    spec: [
      ["4K", "Per Eye"],
      ["120Hz", "Refresh Rate"],
      ["110°", "Field Of View"]
    ],
    cta: { href: "#specs", label: "Full Specification" }
  },
  {
    align: "align-right",
    eyebrow: "Pick A Direction",
    title: (
      <>
        Every Genre,<br /><em>Rebuilt</em>
      </>
    ),
    text: "Combat. Rhythm. Puzzle. Social. Each one plays differently when the controller becomes your hands.",
    tags: ["Combat", "Rhythm", "Puzzle", "Social"],
    tagHref: "#games"
  },
  {
    align: "align-left",
    eyebrow: "And When You Stop",
    title: (
      <>
        Still The Best<br /><em>Headphones</em> You Own
      </>
    ),
    text: "Take it off, plug into your console, and the same spatial engine turns footsteps, vents and gunfire into a map you can hear.",
    cta: { href: "#audio", label: "Hear The Difference" }
  },
  {
    align: "align-center",
    eyebrow: "Full Circle",
    title: (
      <>
        It Is <em>Waiting</em>
      </>
    ),
    text: "Back where you started, and nothing looks the same.",
    cta: { href: "#preorder", label: "Pre-Order Now" }
  }
];

const SCRIM = {
  "align-left": "to-left",
  "align-right": "to-right",
  "align-center": "to-center"
};

function Beat({ beat, index, progress }) {
  /* Opacity and drift are read straight off scroll progress — no triggers, so a
     block is mid-arrival while you are mid-scroll. The first block never fades
     up from nothing and the last never fades out. */
  const opacity = useTransform(progress, (p) => {
    const local = p * BEATS - index;
    let o = 1;
    if (index > 0) o = Math.min(o, Math.max(0, Math.min(1, local / EDGE)));
    if (index < BEATS - 1)
      o = Math.min(o, Math.max(0, Math.min(1, (1 - local) / EDGE)));
    return o;
  });

  const drift = useTransform(progress, (p) => (0.5 - (p * BEATS - index)) * DRIFT);

  const yEyebrow = useTransform(drift, (d) => d * DEPTH.eyebrow);
  const yTitle = useTransform(drift, (d) => d * DEPTH.title);
  const yText = useTransform(drift, (d) => d * DEPTH.text);
  const yAction = useTransform(drift, (d) => d * DEPTH.action);

  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  const Title = beat.h1 ? motion.h1 : motion.h2;

  return (
    <motion.div className={`scrub-chapter ${beat.align}`} style={{ opacity, pointerEvents }}>
      <div className="scene-content">
        <motion.span className="scene-eyebrow" style={{ y: yEyebrow }}>
          {beat.eyebrow}
        </motion.span>

        <Title className="scene-title" style={{ y: yTitle }}>
          {beat.title}
        </Title>

        {beat.text && (
          <motion.p className="scene-text" style={{ y: yText }}>
            {beat.text}
          </motion.p>
        )}

        {beat.spec && (
          <motion.ul className="scene-spec" style={{ y: yText }}>
            {beat.spec.map(([v, l]) => (
              <li key={l}>
                <b>{v}</b>
                <small>{l}</small>
              </li>
            ))}
          </motion.ul>
        )}

        {beat.cta && (
          <motion.div style={{ y: yAction }}>
            <a href={beat.cta.href} className="scene-cta">
              <span>{beat.cta.label}</span>
              <i>&#8594;</i>
            </a>
          </motion.div>
        )}

        {beat.tags && (
          <motion.div className="scene-tags" style={{ y: yAction }}>
            {beat.tags.map((t) =>
              beat.tagHref ? (
                <a key={t} href={beat.tagHref} className="scene-tag">
                  {t}
                </a>
              ) : (
                <span key={t} className="scene-tag">
                  {t}
                </span>
              )
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Hero({ onProgress }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(0);
  const [dominant, setDominant] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"]
  });

  const onReady = useCallback(
    (v) => {
      setReady(v);
      if (onProgress) onProgress(v);
    },
    [onProgress]
  );
  useFrameSequence(canvasRef, scrollYProgress, onReady);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const d = Math.min(BEATS - 1, Math.floor(p * BEATS));
    setDominant((prev) => (prev === d ? prev : d));
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.015], [1, 0]);

  return (
    <section className="story" id="story">
      <div className="scrub-stage" ref={stageRef}>
        <div className="scrub-viewport">
          <div className="scrub-frame">
            <div className="scrub-media">
              <canvas
                id="scrub-canvas"
                ref={canvasRef}
                className={ready >= 1 ? "is-ready" : ""}
              />
            </div>

            <div className="scrub-overlay" />
            <div className={`scrub-scrim ${SCRIM[beats[dominant].align]}`} />
            <div className="scrub-grain" />

            <div className="scrub-chapters">
              {beats.map((beat, i) => (
                <Beat key={i} beat={beat} index={i} progress={scrollYProgress} />
              ))}
            </div>

            <motion.div className="scroll-hint" style={{ opacity: hintOpacity }}>
              Scroll
            </motion.div>

            <div className={`scrub-loader ${ready >= 1 ? "is-done" : ""}`}>
              <span>Loading the sequence</span>
              <div>
                <i style={{ width: `${Math.round(ready * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
