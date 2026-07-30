import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { snapshotItems } from "../data/sections";

const proofItems = snapshotItems.slice(0, 4);

export default function RecruiterSnapshot() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="snapshot"
      aria-label="Recruiter snapshot"
      className="relative z-20 overflow-hidden border-y border-white/[0.08] bg-[#090B0D] px-5 text-[#D7E2EA] sm:px-8 md:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(68,209,197,0.08),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:auto,72px_72px]"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto grid max-w-7xl divide-y divide-white/[0.09] lg:grid-cols-[1.08fr_2.92fr] lg:divide-x lg:divide-y-0"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.45 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <motion.div
          className="flex min-h-32 flex-col justify-center py-7 pr-6 lg:min-h-40 lg:py-8"
          variants={{
            hidden: { opacity: 0, x: -16 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#8FE3DC]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#53C9BF] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#53C9BF]" />
            </span>
            Open to opportunities
          </div>
          <p className="mt-4 max-w-sm text-xl font-semibold leading-snug text-[#F4F7F8] sm:text-2xl">
            Cloud, DevOps and AI/ML engineering.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FE3DC]"
          >
            Start a conversation <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item, index) => (
            <motion.a
              key={`${item.value}-${item.label}`}
              href="#projects"
              title={item.detail}
              aria-label={`${item.value} ${item.label}. ${item.detail}`}
              className={`group relative flex min-h-32 flex-col justify-center py-7 transition-colors hover:bg-white/[0.035] focus-visible:bg-white/[0.035] focus-visible:outline-none lg:min-h-40 lg:py-8 ${
                index % 2 === 0 ? "pr-5" : "border-l border-white/[0.09] pl-5"
              } ${index > 1 ? "border-t border-white/[0.09] lg:border-t-0" : ""} ${
                index > 0 ? "lg:border-l lg:border-white/[0.09] lg:pl-6" : "lg:pl-6"
              }`}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-[#53C9BF] transition-transform duration-300 group-hover:scale-x-100" />
              <span className="text-3xl font-black leading-none text-[#F4F7F8] sm:text-4xl">{item.value}</span>
              <span className="mt-3 flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-white/52 transition-colors group-hover:text-[#8FE3DC]">
                {item.label}
                <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
