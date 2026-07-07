import { Code2, ExternalLink } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type CSSProperties, useRef } from "react";
import FadeIn from "./FadeIn";
import { projects, type Project } from "../data/sections";

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isFeatured = index === 0;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.78", "end 0.22"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const cardStyle = {
    "--project-card-offset": `${index * 28}px`,
  } as CSSProperties;

  return (
    <div ref={ref} className="relative lg:h-[85vh]">
      <motion.article
        className={`border border-[#D7E2EA]/[0.18] bg-[#0C0C0C] p-5 text-[#D7E2EA] shadow-[0_26px_70px_rgba(0,0,0,0.42)] lg:sticky lg:top-[calc(6rem+var(--project-card-offset))] lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden xl:top-[calc(8rem+var(--project-card-offset))] ${
          isFeatured ? "md:p-7" : "md:p-6"
        }`}
        style={{
          ...cardStyle,
          scale: reduceMotion ? 1 : scale,
          zIndex: index + 1,
          transformOrigin: "50% 0%",
        }}
      >
      <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr]">
        <div className="flex min-h-full flex-col justify-between gap-8">
          <div>
            <div className="flex items-center justify-between gap-5 border-b border-[#D7E2EA]/[0.16] pb-5">
              <span className="text-[clamp(2.5rem,6vw,5.2rem)] font-black leading-none tracking-[-0.055em] text-[#F4F7F8]">
                {project.number}
              </span>
              <span className="text-right text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/[0.6]">
                {project.status}
              </span>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/[0.55]">
              {project.subtitle}
            </p>
            <h3 className="mt-4 text-[clamp(2rem,4.4vw,4.7rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#F4F7F8]">
              {project.title}
            </h3>
            <p className="mt-6 max-w-xl text-[clamp(1.05rem,2vw,1.45rem)] font-medium leading-tight tracking-[-0.015em] text-[#D7E2EA]">
              {project.oneLiner}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.proof.map((item) => (
              <span
                key={item}
                className="border border-[#D7E2EA]/[0.28] px-3 py-2 text-xs font-medium uppercase tracking-[0.13em] text-[#D7E2EA]/[0.88]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-7">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F7F8]">
                Problem
              </h4>
              <p className="mt-3 text-sm font-light leading-6 text-[#D7E2EA]/[0.72]">
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F7F8]">
                Why it matters
              </h4>
              <p className="mt-3 text-sm font-light leading-6 text-[#D7E2EA]/[0.72]">
                {project.description}
              </p>
            </div>
          </div>

          <div className="border-y border-[#D7E2EA]/[0.16] py-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F7F8]">
              Build notes
            </h4>
            <div className="mt-5 grid gap-4">
              {project.build.map((item) => (
                <p key={item} className="text-sm font-light leading-6 text-[#D7E2EA]/[0.74]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="bg-[#D7E2EA]/[0.09] px-3 py-1.5 text-xs font-light text-[#D7E2EA]/[0.82]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.a
              href={project.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-[#D7E2EA] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#0C0C0C] transition-colors hover:bg-white"
            >
              <Code2 size={16} />
              Inspect repo
            </motion.a>
            <motion.a
              href={project.liveHref ?? project.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 border border-[#D7E2EA]/[0.55] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/[0.12]"
            >
              <ExternalLink size={16} />
              {project.liveHref ? "Live proof" : "View proof"}
            </motion.a>
          </div>
        </div>
      </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-20 bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:px-8 sm:py-24 md:px-10 md:py-32"
    >
      <div className="film-grain pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="relative z-10 mx-auto mb-16 max-w-7xl sm:mb-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeIn>
            <h2 className="text-[clamp(3.3rem,9vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-[#F4F7F8]">
              Projects with evidence.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="max-w-2xl text-base font-light leading-7 text-[#D7E2EA]/[0.72] sm:text-lg">
              Each project is framed as a small engineering case study: the problem, the build choices, the proof a reviewer can inspect, and the repo or live link.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
