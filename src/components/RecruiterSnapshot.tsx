import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CloudCog,
  Crosshair,
  FolderGit2,
  Radio,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "./FadeIn";
import { snapshotItems } from "../data/sections";

const snapshotPaths: Array<{ href: string; action: string; icon: LucideIcon }> = [
  { href: "#projects", action: "Open projects", icon: Radio },
  { href: "#projects", action: "Inspect IaC", icon: CloudCog },
  { href: "#projects", action: "Inspect RAG", icon: BrainCircuit },
  { href: "#projects", action: "View studies", icon: FolderGit2 },
  { href: "#skills", action: "Review skills", icon: Crosshair },
  { href: "#contact", action: "Start conversation", icon: BriefcaseBusiness },
];

export default function RecruiterSnapshot() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="snapshot"
      className="relative z-20 overflow-hidden bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:px-8 sm:py-24 md:px-10"
    >
      <div className="film-grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,45,107,0.08),transparent_30%),radial-gradient(circle_at_62%_4%,rgba(217,184,111,0.11),transparent_34%),linear-gradient(180deg,#0C0C0C_0%,#130E12_48%,#0C0C0C_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <FadeIn>
            <h2 className="text-[clamp(2.8rem,7vw,5.6rem)] font-black uppercase leading-[0.88] tracking-[-0.035em] text-[#F4F7F8]">
              Recruiter snapshot.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="max-w-2xl text-base font-light leading-7 text-[#D7E2EA]/[0.72] sm:text-lg">
              A quick view of the live apps, inspectable infrastructure, and engineering work most relevant to recruiters.
            </p>
          </FadeIn>
        </div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.055 } },
          }}
        >
          {snapshotItems.map((item, index) => {
            const isRoleCard = index >= 4;
            const path = snapshotPaths[index];
            const Icon = path.icon;

            return (
              <motion.a
                key={`${item.value}-${item.label}`}
                href={path.href}
                aria-label={`${item.label}: ${item.detail}. ${path.action}`}
                variants={{
                  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.075] focus-visible:border-white/35 sm:p-6 ${isRoleCard ? "min-h-[176px] lg:col-span-6" : "min-h-[208px] lg:col-span-3"}`}
              >
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#D9B86F]/70 to-transparent opacity-75" />
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D9B86F]/10 blur-2xl transition-transform duration-500 group-hover:translate-y-4" />

                {isRoleCard ? (
                  <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-end">
                    <div>
                      <Icon className="mb-6 h-6 w-6 text-[#D9B86F]" strokeWidth={1.5} aria-hidden="true" />
                      <p className="text-[clamp(2.9rem,6vw,4.8rem)] font-black uppercase leading-none tracking-[-0.045em] text-[#F4F7F8]">
                        {item.value}
                      </p>
                      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#D9B86F]">
                        {item.label}
                      </h3>
                    </div>
                    <div className="max-w-sm sm:text-right">
                      <p className="text-sm font-light leading-6 text-[#D7E2EA]/[0.7]">{item.detail}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#D7E2EA]/70 transition-colors group-hover:text-white">
                        {path.action} <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[clamp(3rem,6vw,4.8rem)] font-black uppercase leading-none tracking-[-0.045em] text-[#F4F7F8]">
                        {item.value}
                      </p>
                      <Icon className="mt-1 h-6 w-6 text-[#D9B86F]" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div className="mt-auto pt-7">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D7E2EA]">
                          {item.label}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-[#D7E2EA]/40 transition-colors group-hover:text-white" aria-hidden="true" />
                      </div>
                      <p className="mt-3 text-sm font-light leading-6 text-[#D7E2EA]/[0.66]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                )}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
