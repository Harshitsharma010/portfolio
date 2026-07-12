import { Binary, CloudCog, Code2, ExternalLink, MonitorUp, ShieldCheck, Waypoints } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import FadeIn from "./FadeIn";
import ParticleField from "./ParticleField";

const trustnetSteps = [
  {
    number: "01",
    shortLabel: "Browser",
    label: "Browser signal",
    title: "A suspicious link enters the workflow.",
    detail: "The Manifest V3 extension shows a risk signal where users encounter suspicious URLs.",
    proof: "Chrome extension",
  },
  {
    number: "02",
    shortLabel: "Features",
    label: "Feature extraction",
    title: "The system extracts URL features.",
    detail: "TrustNet extracts URL-level signals such as length, subdomain count, TLD, HTTPS presence, and suspicious keywords.",
    proof: "Python + scikit-learn",
  },
  {
    number: "03",
    shortLabel: "API",
    label: "Model inference",
    title: "The API returns a risk prediction.",
    detail: "Backend APIs serve model predictions to the extension and React dashboard.",
    proof: "Backend API contract",
  },
  {
    number: "04",
    shortLabel: "AWS",
    label: "Deployment evidence",
    title: "The repository documents the AWS path.",
    detail: "AWS deployment notes cover Lambda containers, API Gateway, ECR, Amplify, CloudWatch logging, and security considerations.",
    proof: "Deployment notes",
  },
];

const verificationRows = [
  { label: "Live interface", value: "AWS Amplify" },
  { label: "User surface", value: "Manifest V3 extension" },
  { label: "Deployment record", value: "Lambda / API Gateway / ECR / CloudWatch" },
];

const architectureIcons = [MonitorUp, Binary, Waypoints, CloudCog];

function StageContent({ step }: { step: (typeof trustnetSteps)[number] }) {
  return (
    <>
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        <span className="text-white">{step.number}</span>
        <span className="h-px w-12 bg-[#D9B86F]" />
        <span>{step.label}</span>
      </div>
      <h3 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,4.4rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white">
        {step.title}
      </h3>
      <p className="mt-4 max-w-xl text-base font-light leading-7 text-white/[0.68] sm:text-lg">
        {step.detail}
      </p>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Proof: {step.proof}</p>
    </>
  );
}

function StaticStages({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={expanded ? "grid gap-x-10 gap-y-12 lg:grid-cols-2" : "space-y-9 lg:hidden"}>
      {trustnetSteps.map((step) => (
        <article key={step.number} className="border-t border-white/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{step.number} / {step.label}</p>
          <h3 className="mt-4 text-3xl font-black uppercase leading-[0.9] tracking-[-0.035em]">{step.title}</h3>
          <p className="mt-4 text-sm font-light leading-6 text-white/[0.68]">{step.detail}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Proof: {step.proof}</p>
        </article>
      ))}
    </div>
  );
}

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (reduceMotion) return;
    const nextStage = Math.max(
      0,
      Math.min(trustnetSteps.length - 1, Math.floor(latest * trustnetSteps.length)),
    );
    setActiveStage((current) => (current === nextStage ? current : nextStage));
  });

  const staticLayout = Boolean(reduceMotion);

  return (
    <section
      ref={sectionRef}
      id="proof"
      className={`relative z-20 overflow-x-clip bg-[#100A13] text-[#F4F0F3] ${staticLayout ? "" : "lg:min-h-[220vh]"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,78,142,0.16),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(217,184,111,0.12),transparent_36%),linear-gradient(180deg,#100A13_0%,#09070B_100%)]" />
      <ParticleField variant="proof" className="particle-mask-proof absolute inset-0 z-[1] opacity-55" />

      <div className={`px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 ${staticLayout ? "" : "lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:min-h-0 lg:py-8"}`}>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between lg:h-full lg:min-h-0">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Strongest project / AWS + ML</p>
              <h2 className="mt-5 text-[clamp(2.8rem,6.2vw,5rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">TrustNet<br />CyberCop.</h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="max-w-2xl text-base font-light leading-7 text-white/[0.68] sm:text-lg">
                A phishing detection system with a live AWS dashboard, browser extension, model inference API, and documented deployment path.
              </p>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-12 lg:mt-5 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                <ShieldCheck size={18} />
                <span>Live proof</span>
              </div>
              <p className="mt-5 max-w-xs text-sm font-light leading-6 text-white/[0.64] lg:mt-3">
                Use the live interface for the product flow and the repository for architecture and deployment details.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 lg:mt-5">
                <a href="https://main.dqqhdlk8jbmoh.amplifyapp.com" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#100A13] transition-transform hover:-translate-y-0.5">
                  <ExternalLink size={15} /> Live dashboard
                </a>
                <a href="https://github.com/Harshitsharma010/trustnet-cybercop" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10">
                  <Code2 size={15} /> Inspect repo
                </a>
              </div>
              <dl className="mt-8 max-w-sm divide-y divide-white/10 border-y border-white/10 lg:mt-5">
                {verificationRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[0.78fr_1.22fr] gap-4 py-2.5 text-xs leading-5">
                    <dt className="font-medium uppercase tracking-[0.12em] text-white/40">{row.label}</dt>
                    <dd className="text-right font-light text-white/72">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {!staticLayout ? (
              <div className="hidden lg:block">
                <div className="relative h-20" aria-hidden="true">
                  <div className="absolute left-[12.5%] right-[12.5%] top-8 h-px bg-white/15" />
                  <motion.div className="absolute left-[12.5%] right-[12.5%] top-8 h-px origin-left bg-[#D9B86F]" style={{ scaleX: progressScale }} />
                  <div className="relative z-10 grid grid-cols-4 gap-2">
                    {trustnetSteps.map((step, index) => {
                      const Icon = architectureIcons[index];
                      const active = index === activeStage;
                      const complete = index <= activeStage;
                      return (
                        <motion.div
                          key={step.number}
                          className={`mx-auto flex w-full max-w-32 flex-col items-center gap-1.5 border px-2 py-2 backdrop-blur-md transition-colors ${active ? "border-[#D9B86F]/70 bg-[#D9B86F]/[0.12] text-white" : complete ? "border-white/20 bg-white/[0.055] text-white/70" : "border-white/10 bg-black/20 text-white/35"}`}
                          animate={reduceMotion ? undefined : { y: active ? -4 : 0, scale: active ? 1.04 : 1 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Icon size={17} strokeWidth={1.6} />
                          <span className="text-[0.56rem] font-semibold uppercase tracking-[0.12em]">{step.shortLabel}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative mt-4 min-h-[250px] overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.article
                      key={trustnetSteps[activeStage].number}
                      initial={{ opacity: 0, y: 22, filter: "blur(7px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <StageContent step={trustnetSteps[activeStage]} />
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            ) : null}

            {staticLayout ? <StaticStages expanded /> : <StaticStages />}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45 lg:mt-3">
            <span className="hidden lg:inline">{staticLayout ? "Architecture overview" : "Scroll to trace the system"}</span>
            <span>TrustNet / 04 stages</span>
          </div>
        </div>
      </div>
    </section>
  );
}
