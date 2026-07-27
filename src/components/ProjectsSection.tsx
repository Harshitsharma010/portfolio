import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "./FadeIn";
import { projects, type Project } from "../data/sections";

const projectAccents = ["255, 66, 112", "229, 190, 96", "196, 211, 203", "76, 196, 185"];

const visualMap: Record<string, { image: string; alt: string; note: string }> = {
  "TrustNet CyberCop": {
    image: "/media/projects/trustnet-cover.png",
    alt: "Crimson glass security shield surrounded by threat signals",
    note: "Threat intelligence",
  },
  "AWS ECS Fargate Terraform CI/CD": {
    image: "/media/projects/ecs-cover.png",
    alt: "Warm signal travelling through a dark cloud deployment landscape",
    note: "Deployment in motion",
  },
  "Local AI RAG Assistant": {
    image: "/media/projects/rag-cover.png",
    alt: "Floating documents converging around a private local intelligence core",
    note: "Private retrieval",
  },
  "Nexus Command Center": {
    image: "/media/projects/nexus-cover.png",
    alt: "Colored translucent forms moving together through a dark workspace",
    note: "Work in flow",
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const visual = visualMap[project.title];
  const destination = project.liveHref ?? project.href;
  const isFeatured = index === 0;
  const gridSpan = index === 0 || index === 3 ? "md:col-span-2 lg:col-span-7" : "lg:col-span-5";
  const cardStyle = { "--project-accent": projectAccents[index] } as React.CSSProperties;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`project-showcase-card group relative overflow-hidden rounded-lg border border-white/[0.12] ${gridSpan}`}
      style={cardStyle}
    >
      <a
        href={destination}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}${project.liveHref ? " live project" : " repository"}`}
        className={`project-cover relative block overflow-hidden ${isFeatured ? "min-h-[29rem] sm:min-h-[34rem]" : "min-h-[25rem] sm:min-h-[29rem]"}`}
      >
        <img src={visual.image} alt={visual.alt} className="project-cover-image absolute inset-0 h-full w-full object-cover" />
        <div className="project-cover-veil absolute inset-0" aria-hidden="true" />
        <div className="project-cover-noise pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
          <span className="border border-white/20 bg-black/25 px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/76 backdrop-blur-sm">
            {project.number}
          </span>
          <span className="max-w-[11rem] text-right text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/65 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            {visual.note}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex translate-y-1 items-end justify-between gap-4 transition-transform duration-300 ease-out group-hover:translate-y-0 sm:bottom-5 sm:left-5 sm:right-5">
          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.19em] text-white/60">{project.subtitle}</p>
            <h3 className={`mt-2 max-w-xl font-black uppercase leading-[0.89] tracking-[-0.04em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] ${isFeatured ? "text-[clamp(2.25rem,4.8vw,4.65rem)]" : "text-[clamp(2rem,3.5vw,3.25rem)]"}`}>
              {project.title}
            </h3>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/[0.09] text-white backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:bg-white/20">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </a>

      <div className="relative z-10 flex flex-col gap-4 bg-[#0C0C0C] p-4 sm:p-5">
        <p className="max-w-2xl text-sm leading-6 text-[#D7E2EA]/[0.72]">{project.oneLiner}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.proof.map((item) => (
            <span key={item} className="border border-[#D7E2EA]/[0.15] px-2 py-1 text-[0.57rem] font-medium uppercase tracking-[0.11em] text-[#D7E2EA]/[0.68]">
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[#D7E2EA]/[0.1] pt-3">
          <a
            href={destination}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#F4F7F8] transition-colors hover:text-[rgb(var(--project-accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ExternalLink size={14} />
            {project.liveHref ? "Open project" : "Inspect build"}
          </a>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#D7E2EA]/[0.54] transition-colors hover:text-[#F4F7F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Code2 size={14} />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-20 bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:px-8 sm:py-24 md:px-10 md:py-28">
      <div className="film-grain pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="relative z-10 mx-auto mb-14 max-w-7xl sm:mb-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeIn>
            <h2 className="text-[clamp(3.1rem,8vw,5.7rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-[#F4F7F8]">
              Choose a world to inspect.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="max-w-2xl text-base font-light leading-7 text-[#D7E2EA]/[0.72] sm:text-lg">
              Each cover opens the real project. The artwork gives the first impression; the live app and repository carry the proof.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
