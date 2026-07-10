import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import StormCore from "./StormCore";

export default function StormCenterPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const stationaryY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const stationaryScale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const stationaryOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.52], [1, 1, 0]);
  const heroX = useTransform(scrollYProgress, [0, 0.52], [0, -34]);
  const proofOpacity = useTransform(scrollYProgress, [0.46, 0.66, 1], [0, 1, 1]);
  const proofX = useTransform(scrollYProgress, [0.46, 0.72], [34, 0]);

  return (
    <main className="storm-preview bg-[#080508] text-[#F5F2F4]">
      <section ref={sectionRef} className="relative min-h-[200vh]">
        <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
          <div className="storm-preview-backdrop absolute inset-0" aria-hidden="true" />
          <div className="film-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

          <div className="storm-preview-copy-scrim pointer-events-none absolute inset-y-0 left-0 z-[15] w-[72%] max-w-[760px]" />

          <motion.div
            className="absolute left-5 top-1/2 z-20 w-[min(88vw,520px)] -translate-y-1/2 sm:left-10 lg:left-14"
            style={{ opacity: heroOpacity, x: heroX }}
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#FFD36B]/70">Harshit Sharma / Cloud systems</p>
            <h1 className="mt-5 text-[clamp(3rem,7vw,6.4rem)] font-black uppercase leading-[0.82] tracking-[-0.025em]">
              Cloud,<br />DevOps &amp;<br />AI Engineer
            </h1>
            <p className="mt-6 max-w-md text-sm font-light leading-6 text-white/65 sm:text-base sm:leading-7">
              I build deployable cloud systems, backend services, and AI-driven tools with real architecture, CI/CD, monitoring, and documented tradeoffs.
            </p>
            <div className="pointer-events-auto mt-7 flex flex-wrap gap-3">
              <a href="/?storm-core=1#projects" className="rounded-full bg-white px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#160914]">View projects</a>
              <a href="/?storm-core=1#proof" className="rounded-full border border-white/25 bg-black/15 px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">See live proof</a>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-5 top-1/2 z-20 w-[min(88vw,520px)] -translate-y-1/2 sm:left-10 lg:left-14"
            style={{ opacity: proofOpacity, x: proofX }}
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#FFD36B]/70">Strongest project / AWS + ML</p>
            <h2 className="mt-5 text-[clamp(3rem,7vw,6.2rem)] font-black uppercase leading-[0.82] tracking-[-0.025em]">
              TrustNet<br />CyberCop.
            </h2>
            <p className="mt-6 max-w-md text-sm font-light leading-6 text-white/65 sm:text-base sm:leading-7">
              A phishing-detection workflow connecting browser signals, model inference, API delivery, and a documented AWS deployment path.
            </p>
            <div className="mt-7 flex max-w-md flex-wrap gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/60">
              {['Chrome extension', 'Python model', 'Lambda API', 'CloudWatch proof'].map((item) => (
                <span key={item} className="border-l border-[#FFD36B]/45 py-1 pl-3 pr-2">{item}</span>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <StormCore
              reduceMotion={reduceMotion}
              scrollY={stationaryY}
              scrollScale={stationaryScale}
              scrollOpacity={stationaryOpacity}
              sceneProgress={scrollYProgress}
              fullscreen
              palette="original"
            />
          </div>

          <div className="absolute bottom-7 left-1/2 z-20 w-[min(78vw,420px)] -translate-x-1/2 sm:bottom-9">
            <div className="flex items-center justify-between text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-white/42">
              <span>Hover to scatter</span>
              <span>Scroll to enter</span>
            </div>
            <div className="mt-3 h-px overflow-hidden bg-white/15">
              <motion.div className="h-full origin-left bg-[#E5C77A]" style={{ scaleX: progressScale }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
