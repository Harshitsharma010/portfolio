import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { marqueeSkills, projects, standards } from "../data/sections";

const firstRow = marqueeSkills;

const secondRow = [
  ...standards,
  "Cost notes",
  "Reviewer depth",
  "Security notes",
  "Deployment proof",
];

function MarqueeTile({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex h-[170px] w-[300px] shrink-0 flex-col justify-between border border-[#D7E2EA]/[0.18] bg-[#D7E2EA]/[0.08] p-5 text-[#D7E2EA] sm:h-[220px] sm:w-[380px]">
      <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/[0.55]">
        {meta}
      </span>
      <span className="max-w-[12ch] text-4xl font-black uppercase leading-[0.88] tracking-[-0.04em] sm:text-5xl">
        {label}
      </span>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.28);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] py-20 sm:py-28 md:py-36">
      <div className="mb-10 flex justify-between gap-8 px-5 text-[#D7E2EA] sm:px-8 md:px-10">
        <p className="max-w-xs text-sm font-light uppercase leading-snug tracking-[0.22em] text-[#D7E2EA]/[0.68]">
          Proof signals recruiters can scan quickly.
        </p>
        <p className="hidden max-w-sm text-right text-sm font-light leading-6 text-[#D7E2EA]/[0.62] md:block">
          The movement is atmospheric, but the content is practical: deployment, documentation, security notes, and working links.
        </p>
      </div>

      <div className="space-y-3">
        <div
          className="flex gap-3"
          style={{
            transform: reduceMotion ? "translate3d(-120px, 0, 0)" : `translate3d(${offset - 220}px, 0, 0)`,
            willChange: reduceMotion ? "auto" : "transform",
          }}
        >
          {[...firstRow, ...firstRow, ...firstRow].map((label, index) => (
            <MarqueeTile
              key={`${label}-${index}`}
              label={label}
              meta={projects[index % projects.length].language}
            />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: reduceMotion ? "translate3d(-80px, 0, 0)" : `translate3d(${-offset + 220}px, 0, 0)`,
            willChange: reduceMotion ? "auto" : "transform",
          }}
        >
          {[...secondRow, ...secondRow, ...secondRow].map((label, index) => (
            <MarqueeTile key={`${label}-${index}`} label={label} meta="Project standard" />
          ))}
        </div>
      </div>
    </section>
  );
}
