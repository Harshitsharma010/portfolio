import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Cloud Engineer.", "DevOps Engineer.", "AI/ML Engineer."];

export default function RoleRotator() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <span>Cloud Engineer / DevOps / AI/ML Engineer</span>;
  }

  return (
    <>
      <span className="sr-only">Cloud Engineer, DevOps, and AI/ML Engineer</span>
      <span aria-hidden="true" className="relative inline-flex min-h-[1.2em] min-w-[16ch] overflow-hidden align-bottom">
      <AnimatePresence initial={false} mode="sync">
        <motion.span
          key={roles[index]}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
      </span>
    </>
  );
}
