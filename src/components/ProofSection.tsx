import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CloudCog,
  Code2,
  ExternalLink,
  Radar,
} from "lucide-react";
import { useState } from "react";
import FadeIn from "./FadeIn";
import ParticleField from "./ParticleField";

const trustnetVisuals = [
  {
    id: "console",
    label: "Live console",
    icon: Radar,
    image: "/media/projects/trustnet-dashboard-live.png",
    alt: "TrustNet CyberCop dashboard showing an 87 percent dangerous URL result",
    title: "A working URL intelligence console.",
    detail: "Paste a URL, run the deployed analysis path, and inspect the model verdict in one product surface.",
    proof: "Live AWS API / 87% risk result",
    href: "https://main.dqqhdlk8jbmoh.amplifyapp.com",
  },
  {
    id: "signals",
    label: "ML signals",
    icon: Activity,
    image: "/media/projects/trustnet-signals-live.png",
    alt: "TrustNet signal graph and explainable phishing risk evidence",
    title: "The verdict stays inspectable.",
    detail: "Risk score, confidence, feature count, signal weights, and plain-English reasons expose what drove the result.",
    proof: "47 URL features / explainable reasons",
    href: "https://main.dqqhdlk8jbmoh.amplifyapp.com",
  },
  {
    id: "deployment",
    label: "AWS proof",
    icon: CloudCog,
    image: "/media/projects/trustnet-deployment-live.png",
    alt: "TrustNet architecture strip, recent scans, and AWS deployment proof",
    title: "Deployment evidence is part of the product.",
    detail: "The live surface exposes its AWS path, model signals, observability checks, and recent scan behavior.",
    proof: "Lambda / API Gateway / ECR / CloudWatch",
    href: "https://github.com/Harshitsharma010/trustnet-cybercop",
  },
];

const architecture = ["React Dashboard", "API Gateway", "Lambda Container", "ML Model", "CloudWatch Logs"];

export default function ProofSection() {
  const reduceMotion = useReducedMotion();
  const [activeVisual, setActiveVisual] = useState(0);
  const active = trustnetVisuals[activeVisual];

  return (
    <section id="proof" className="relative z-20 overflow-hidden bg-[#0D0910] px-5 py-20 text-[#F4F0F3] sm:px-8 sm:py-24 md:px-10 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(68,209,197,0.09),transparent_32%),radial-gradient(circle_at_14%_72%,rgba(183,73,116,0.11),transparent_34%),linear-gradient(180deg,#0D0910_0%,#08090B_100%)]" />
      <ParticleField variant="proof" className="particle-mask-proof absolute inset-0 z-[1] opacity-35" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#8FE3DC]">
            <span>01</span>
            <span className="h-px w-10 bg-[#53C9BF]/70" aria-hidden="true" />
            <span>Flagship security project</span>
          </div>
          <h2 className="mt-5 max-w-4xl text-[clamp(3rem,5.8vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.035em] text-white">
            TrustNet CyberCop.
          </h2>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-base font-light leading-7 text-white/[0.68] sm:text-lg">
              A live phishing intelligence product connecting URL analysis, explainable ML signals, and inspectable AWS deployment proof.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://main.dqqhdlk8jbmoh.amplifyapp.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#0D0910] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FE3DC]"
              >
                <ExternalLink size={15} aria-hidden="true" /> Live dashboard
              </a>
              <a
                href="https://github.com/Harshitsharma010/trustnet-cybercop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:border-white/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FE3DC]"
              >
                <Code2 size={15} aria-hidden="true" /> Inspect repo
              </a>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 sm:mt-16">
          <div className="hide-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1 sm:justify-end">
            {trustnetVisuals.map((visual, index) => {
              const Icon = visual.icon;
              const selected = index === activeVisual;

              return (
                <button
                  key={visual.id}
                  type="button"
                  onClick={() => setActiveVisual(index)}
                  aria-pressed={selected}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.13em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FE3DC] ${
                    selected
                      ? "border-[#53C9BF]/55 bg-[#53C9BF]/[0.11] text-[#A7F0EA]"
                      : "border-white/10 bg-white/[0.035] text-white/48 hover:border-white/22 hover:text-white/80"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                  {visual.label}
                </button>
              );
            })}
          </div>

          <div className="relative h-[430px] [perspective:1400px] sm:h-[540px] lg:h-[620px]">
            {trustnetVisuals.map((visual, index) => {
              const relativePosition = (index - activeVisual + trustnetVisuals.length) % trustnetVisuals.length;
              const isActive = relativePosition === 0;
              const isLeft = relativePosition === trustnetVisuals.length - 1;
              const positionClass = isActive
                ? "left-[2%] top-[2%] z-30 h-[82%] w-[96%] sm:left-[7%] sm:h-[88%] sm:w-[86%]"
                : isLeft
                  ? "left-0 top-[27%] z-10 h-[52%] w-[38%]"
                  : "right-0 top-[27%] z-20 h-[52%] w-[38%]";

              return (
                <motion.a
                  key={visual.id}
                  href={visual.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                    if (!isActive) {
                      event.preventDefault();
                      setActiveVisual(index);
                    }
                  }}
                  aria-label={isActive ? `Open ${visual.label}` : `Bring ${visual.label} forward`}
                  className={`group absolute overflow-hidden rounded-lg border bg-[#070B0E] shadow-[0_30px_80px_rgba(0,0,0,0.48)] outline-none transition-[left,right,top,width,height,border-color,opacity,transform] duration-500 focus-visible:ring-2 focus-visible:ring-[#8FE3DC] ${positionClass} ${
                    isActive
                      ? "border-white/20 opacity-100"
                      : "border-white/10 opacity-45 hover:border-[#53C9BF]/35 hover:opacity-75"
                  }`}
                  animate={reduceMotion ? undefined : {
                    rotateY: isActive ? 0 : isLeft ? 8 : -8,
                    rotateZ: isActive ? 0 : isLeft ? -2.4 : 2.4,
                    y: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.96,
                  }}
                  whileHover={reduceMotion ? undefined : { y: isActive ? -3 : 3, scale: isActive ? 1.005 : 0.985 }}
                  transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex h-10 items-center justify-between border-b border-white/10 bg-[#090D10]/95 px-3 sm:px-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#53C9BF]" aria-hidden="true" />
                      <span className="text-[0.57rem] font-semibold uppercase tracking-[0.15em] text-white/55">
                        TrustNet / {visual.label}
                      </span>
                    </div>
                    <ArrowUpRight size={14} className={`transition-opacity ${isActive ? "opacity-70" : "opacity-0 group-hover:opacity-70"}`} aria-hidden="true" />
                  </div>
                  <img
                    src={visual.image}
                    alt={visual.alt}
                    className="h-[calc(100%-2.5rem)] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.012]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
                  {!isActive ? (
                    <span className="absolute bottom-3 left-3 hidden text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/70 sm:block">
                      Click to inspect
                    </span>
                  ) : null}
                </motion.a>
              );
            })}
          </div>

          <div className="-mt-7 grid gap-5 border-t border-white/12 pt-6 sm:-mt-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#8FE3DC]">{active.proof}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">{active.title}</h3>
                <p className="mt-3 max-w-2xl text-sm font-light leading-6 text-white/60 sm:text-base">{active.detail}</p>
              </motion.div>
            </AnimatePresence>
            <a
              href={active.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-[#A7F0EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FE3DC]"
            >
              Open this evidence <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 border-y border-white/10 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/38">Deployment path</p>
              <p className="mt-1 text-sm text-white/62">A reviewer-readable route from interface to runtime evidence.</p>
            </div>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="TrustNet deployment architecture">
              {architecture.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[0.64rem] font-semibold uppercase tracking-[0.11em] text-white/65">{item}</span>
                  {index < architecture.length - 1 ? <ArrowRight size={13} className="text-[#53C9BF]/60" aria-hidden="true" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
