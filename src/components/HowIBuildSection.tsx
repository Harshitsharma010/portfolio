import { CheckCircle2 } from "lucide-react";
import FadeIn from "./FadeIn";
import { buildSteps } from "../data/sections";

export default function HowIBuildSection() {
  return (
    <section
      id="process"
      className="relative z-20 overflow-hidden bg-[#0C0C0C] px-5 py-24 text-[#D7E2EA] sm:px-8 sm:py-28 md:px-10 md:py-36"
    >
      <div className="film-grain pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(217,184,111,0.09),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(215,226,234,0.07),transparent_32%),linear-gradient(180deg,#0C0C0C_0%,#121212_50%,#0C0C0C_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <FadeIn>
          <div className="sticky top-28">
            <h2 className="text-[clamp(3rem,8vw,5.8rem)] font-black uppercase leading-[0.88] tracking-[-0.035em] text-[#F4F7F8]">
              How I build.
            </h2>
            <p className="mt-7 max-w-md text-base font-light leading-7 text-[#D7E2EA]/[0.68] sm:text-lg">
              The pattern behind the projects: make the system useful, deployable, inspectable, and honest about limits.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-transparent via-[#D9B86F]/45 to-transparent" />
          <div className="space-y-5">
            {buildSteps.map((step, index) => (
              <FadeIn
                key={step.title}
                delay={index * 0.06}
                className="relative grid grid-cols-[40px_1fr] gap-5"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#D9B86F]/30 bg-[#16130B] text-[#D9B86F] shadow-[0_0_28px_rgba(217,184,111,0.14)]">
                  <CheckCircle2 size={18} />
                </div>
                <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.065] sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D7E2EA]/[0.46]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.25rem,2vw,1.8rem)] font-black uppercase leading-none tracking-[-0.025em] text-[#F4F7F8]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-6 text-[#D7E2EA]/[0.7] sm:text-base">
                    {step.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
