import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function StarfieldBackdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const skyY = useTransform(scrollY, [0, 6000], [-24, 96]);
  const hazeY = useTransform(scrollY, [0, 6000], [18, -72]);

  return (
    <div className="starfield-backdrop pointer-events-none fixed inset-0" aria-hidden="true">
      <motion.div
        className="starfield-photo absolute"
        style={{ y: reduceMotion ? 0 : skyY }}
      />
      <motion.div
        className="starfield-haze absolute inset-0"
        style={{ y: reduceMotion ? 0 : hazeY }}
      />
      <div className="starfield-veil absolute inset-0" />
    </div>
  );
}
