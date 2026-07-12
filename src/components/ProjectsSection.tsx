import { ChevronDown, Code2, ExternalLink } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type CSSProperties, useRef } from "react";
import FadeIn from "./FadeIn";
import { projects, type Project } from "../data/sections";

const projectAccents = ["255, 45, 107", "229, 199, 122", "215, 226, 234", "184, 78, 142"];

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
    "--project-accent": projectAccents[index % projectAccents.length],
  } as CSSProperties;

  return (
    <div ref={ref} className={`relative lg:h-[130vh] ${index > 0 ? "lg:-mt-[42vh]" : ""}`}>
      <motion.article
        className={`project-case-card group relative overflow-hidden rounded-xl border border-[#D7E2EA]/[0.18] p-5 text-[#D7E2EA] lg:sticky lg:top-[calc(6rem+var(--project-card-offset))] lg:max-h-[calc(100vh-7rem)] xl:top-[calc(8rem+var(--project-card-offset))] ${
          isFeatured ? "md:p-7" : "md:p-6"
        }`}
        style={{
          ...cardStyle,
          scale: reduceMotion ? 1 : scale,
          zIndex: index + 1,
          transformOrigin: "50% 0%",
        }}
      >
      <div className="project-card-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="project-card-signal pointer-events-none absolute right-8 top-7 hidden w-52 lg:block" aria-hidden="true">
        <span /><span /><span /><i />
      </div>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.46fr_0.54fr]">
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

          <div className="hidden border-y border-[#D7E2EA]/[0.16] py-6 md:block">
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

          <details className="project-build-details border-y border-[#D7E2EA]/[0.16] py-1 md:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F7F8]">
              Build notes
              <ChevronDown className="h-4 w-4 transition-transform" aria-hidden="true" />
            </summary>
            <div className="grid gap-4 pb-5 pt-2">
              {project.build.map((item) => (
                <p key={item} className="text-sm font-light leading-6 text-[#D7E2EA]/[0.74]">
                  {item}
                </p>
              ))}
            </div>
          </details>

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
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D7E2EA] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#0C0C0C] transition-colors hover:bg-white"
            >
              <Code2 size={16} />
              Inspect repo
            </motion.a>
            {project.liveHref ? (
              <motion.a
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#D7E2EA]/[0.55] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/[0.12]"
              >
                <ExternalLink size={16} />
                Open live app
              </motion.a>
            ) : null}
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
              Each case study covers the problem, engineering decisions, inspectable evidence, and the repository or live application.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-5 lg:gap-0">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
