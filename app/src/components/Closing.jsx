import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Rise from "./Rise";
import SplitHeading from "./SplitHeading";
import { BRAND, FAQS } from "../data/content";
import Logo from "./Logo";

export function Preorder() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="band band-preorder" id="preorder">
      <div className="band-glow" />
      <div className="band-inner">
        <Rise className="preorder-inner" y={58} scale={0.985}>
          <span className="band-eyebrow">Reserve Yours</span>
          <SplitHeading className="band-title" text="Step Inside *First*" />
          <div className="preorder-price">
            <b>$599</b>
            <span>512 GB · ships with strap and two controllers</span>
          </div>

          <form
            className="preorder-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSent(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              <span>{sent ? "Reserved" : "Reserve"}</span>
            </button>
          </form>

          <AnimatePresence>
            {sent && (
              <motion.p
                className="preorder-note"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Reserved against {email} — no charge until it ships.
              </motion.p>
            )}
          </AnimatePresence>

          {!sent && (
            <p className="preorder-note">
              Ships Spring 2049 · Free returns for 30 days · Or call{" "}
              <a href={BRAND.phoneHref}>{BRAND.phone}</a>
            </p>
          )}
        </Rise>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="band band-faq" id="faq">
      <div className="band-inner">
        <header className="band-head">
          <Rise as="span" className="band-eyebrow" y={22}>
            Questions
          </Rise>
          <SplitHeading className="band-title" text="Before You *Commit*" />
        </header>

        <div className="faq">
          {FAQS.map((f, i) => (
            <Rise key={f.q} className="faq-item" y={30} i={i}>
              <button
                className={`faq-q${open === i ? " is-open" : ""}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <i />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

const NAV = [
  ["#story", "Experience"],
  ["#games", "VR Games"],
  ["#audio", "3D Audio"],
  ["#specs", "Specs"],
  ["#faq", "FAQ"],
  ["#preorder", "Pre-Order"]
];

export function Footer() {
  return (
    <footer>
      <div className="band-inner">
        <Rise className="footer-inner" y={26}>
          <div className="footer-brand">
            <Logo href="#top" className="is-footer" />
            <p className="footer-line">{BRAND.line}</p>
            <a className="footer-phone" href={BRAND.phoneHref}>
              <span>Talk to us</span>
              <b>{BRAND.phone}</b>
            </a>
          </div>

          {/* the header drops its links on small screens — these keep every
              section reachable without scrolling the whole page back */}
          <nav className="footer-nav" aria-label="Sections">
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
        </Rise>

        <div className="footer-base">
          <p>&copy; 2049 {BRAND.name} — All rights reserved</p>
          <p className="footer-disclaimer">
            Concept piece · {BRAND.name} is a fictional product · Game artwork
            belongs to its respective publishers
          </p>
        </div>
      </div>
    </footer>
  );
}
