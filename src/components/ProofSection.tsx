import { Cloud, Code2, ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const proofSignals = [
  {
    title: "Live apps",
    value: "2",
    detail: "Nexus and TrustNet can be opened directly, not just viewed as screenshots.",
    tags: ["Nexus", "TrustNet"],
    icon: ExternalLink,
  },
  {
    title: "Cloud deployment proof",
    value: "AWS",
    detail: "Docker, ECR, ECS Fargate, ALB, Terraform, GitHub Actions, and CloudWatch notes.",
    tags: ["Terraform", "ECS", "Logs"],
    icon: Cloud,
  },
  {
    title: "Inspectable repos",
    value: "4",
    detail: "Each main build has a repo path, setup context, stack notes, and review signals.",
    tags: ["GitHub", "Docs", "Limits"],
    icon: Code2,
  },
];

export default function ProofSection() {
  return (
    <section
      id="proof"
      className="relative z-20 overflow-hidden bg-[#E7EBEE] px-5 py-20 text-[#0C0C0C] sm:px-8 sm:py-24 md:px-10 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(12,12,12,0.08),transparent_30%),radial-gradient(circle_at_84%_80%,rgba(217,184,111,0.16),transparent_34%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <FadeIn>
            <h2 className="text-[clamp(3rem,8vw,5.6rem)] font-black uppercase leading-[0.88] tracking-[-0.035em]">
              Live proof.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="max-w-2xl text-base font-light leading-7 text-black/[0.68] sm:text-lg">
              A compact inspection layer before the case studies: what is live, what is deployed, and what a recruiter can verify quickly.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {proofSignals.map(({ title, value, detail, tags, icon: Icon }, index) => (
            <FadeIn key={title} delay={index * 0.06}>
              <article className="group relative min-h-[286px] overflow-hidden rounded-2xl border border-black/[0.12] bg-white/[0.62] p-6 shadow-[0_18px_54px_rgba(12,12,12,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.8] hover:shadow-[0_26px_72px_rgba(12,12,12,0.12)]">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.12] bg-black/[0.05]">
                    <Icon size={20} />
                  </div>
                  <p className="text-[clamp(2.8rem,5vw,4.8rem)] font-black uppercase leading-none tracking-[-0.05em]">
                    {value}
                  </p>
                </div>
                <h3 className="mt-7 text-[clamp(1.25rem,2vw,1.8rem)] font-black uppercase leading-none tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-4 text-sm font-light leading-6 text-black/[0.66]">
                  {detail}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/[0.12] bg-black/[0.035] px-3 py-1.5 text-[0.68rem] font-semibold uppercase leading-none tracking-[0.14em] text-black/[0.62]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/[0.12] bg-white/[0.5] p-5 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <GitBranch className="mt-1 shrink-0" size={18} />
              <p className="max-w-2xl text-sm font-light leading-6 text-black/[0.68] sm:text-base">
                Full project details are kept in one place below, with problem, build notes, stack, live proof, and repo links.
              </p>
            </div>
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0C0C0C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F4F7F8] transition-colors hover:bg-black"
            >
              View case studies
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
