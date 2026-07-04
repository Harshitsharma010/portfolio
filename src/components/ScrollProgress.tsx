import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-[#D7E2EA]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
