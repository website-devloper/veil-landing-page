import { motion, useReducedMotion } from "framer-motion";

/*
  Word-by-word masked reveal.

  Each word sits in an overflow-hidden box and slides up from below it, so the
  type appears to rise out of the page rather than fade onto it. That mask is the
  whole effect — a plain translate looks ordinary.

  Copy is written with *asterisks* around the accent words:
    "Games That Need *Your Hands*"
  which keeps the data file readable and avoids JSX in content.

  The full string is rendered once for screen readers and the split copy is
  hidden from them, otherwise every word is announced as a separate item.
*/

function parse(text) {
  return text.split("*").map((chunk, i) => ({ chunk, accent: i % 2 === 1 }));
}

export default function SplitHeading({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.h2;
  const Plain = as;

  if (reduce) {
    return (
      <Plain className={className} {...rest}>
        {parse(text).map((p, i) =>
          p.accent ? <em key={i}>{p.chunk}</em> : p.chunk
        )}
      </Plain>
    );
  }

  let index = -1;

  return (
    <Tag
      className={`split ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      {...rest}
    >
      <span className="sr-only">{text.replace(/\*/g, "")}</span>

      <span aria-hidden="true">
        {parse(text).map((part, p) =>
          part.chunk.split(/(\s+)/).map((word, w) => {
            if (!word.trim()) return " ";
            index += 1;
            const Word = part.accent ? "em" : "span";
            return (
              <span className="split-mask" key={`${p}-${w}`}>
                <motion.span
                  className="split-word"
                  variants={{
                    hidden: { y: "110%" },
                    shown: { y: "0%" }
                  }}
                  transition={{
                    duration: 0.85,
                    delay: delay + index * stagger,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Word>{word}</Word>
                </motion.span>
              </span>
            );
          })
        )}
      </span>
    </Tag>
  );
}
