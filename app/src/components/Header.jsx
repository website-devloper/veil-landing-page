import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "./Logo";

/*
  Two independent states:

  is-tight          past 60px — the bar shortens from 88 to 72.
  background-header past the hero — it gains a solid plate. Over the hero it
                    stays fully transparent so the footage reads edge to edge;
                    past it, section headings would otherwise collide with the
                    nav, since there is nothing behind the type.

  It also lifts away on scroll down and returns on scroll up.
*/
export default function Header() {
  const { scrollY } = useScroll();
  const heroEnd = useRef(Infinity);

  const [tight, setTight] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("story");
      // swap to the solid plate just before the hero's last frame leaves
      heroEnd.current = hero
        ? hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.6
        : Infinity;
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setTight(y > 60);
    setSolid(y > heroEnd.current);
    setHidden(y > 240 && y > prev);
  });

  const cls = [
    "header-area",
    "header-sticky",
    tight ? "is-tight" : "",
    solid ? "background-header" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.header
      className={cls}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-head">
        <nav className="head-links head-links-left">
          <a href="#story">Experience</a>
          <a href="#games">Games</a>
        </nav>

        <Logo href="#top" />

        <nav className="head-links head-links-right">
          <a href="#specs">Specs</a>
          <a href="#preorder" className="head-cta">
            Pre-Order
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
