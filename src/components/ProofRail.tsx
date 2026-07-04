import { motion, useScroll } from "framer-motion";

const nodes = ["Hero", "Snapshot", "Proof", "Projects", "Skills", "Contact"];

export default function ProofRail() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="pointer-events-none fixed left-5 top-1/2 z-30 hidden h-[58vh] -translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <div className="relative h-full w-8">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.08]" />
        <motion.div
          className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[#D9B86F] via-[#D7E2EA] to-transparent shadow-[0_0_18px_rgba(217,184,111,0.28)]"
          style={{ scaleY: scrollYProgress }}
        />
        {nodes.map((node, index) => (
          <div
            key={node}
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-white/25 bg-[#0C0C0C] shadow-[0_0_14px_rgba(215,226,234,0.18)]"
            style={{ top: `${(index / (nodes.length - 1)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
