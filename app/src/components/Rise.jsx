import { motion, useReducedMotion } from "framer-motion";

/*
  The one motion primitive the whole page uses.

  whileInView with `once` rather than a scroll-linked transform: for section
  content the arrival should finish and stay finished. (The hero is the opposite
  case — it is genuinely scroll-driven, and lives in Hero.jsx.)

  `i` staggers within a group, capped so the last card in a long row is never
  left waiting half a second behind the first.
*/
export default function Rise({
  children,
  y = 44,
  x = 0,
  scale = 1,
  i = 0,
  duration = 0.85,
  className = "",
  as = "div",
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration,
        delay: Math.min(i * 0.075, 0.45),
        ease: [0.22, 1, 0.36, 1]
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
