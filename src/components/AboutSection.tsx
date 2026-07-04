import AnimatedText from "./AnimatedText";
import FadeIn from "./FadeIn";
import { certifications, focusItems, principles } from "../data/sections";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0C0C0C] px-5 py-24 text-[#D7E2EA] sm:px-8 sm:py-28 md:px-10 md:py-36"
    >
      <div className="film-grain pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(215,226,234,0.1),transparent_28%),linear-gradient(180deg,#0C0C0C_0%,#141414_52%,#0C0C0C_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <FadeIn>
          <div className="sticky top-28">
            <p className="max-w-xs text-sm font-medium uppercase leading-6 tracking-[0.22em] text-[#D7E2EA]/[0.58]">
              CSE student, placement focused
            </p>
            <h2 className="mt-6 text-[clamp(3.1rem,8vw,5.8rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-[#F4F7F8]">
              I build systems that survive deployment.
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-12">
          <AnimatedText
            text="Most student projects stop at 'it runs.' Mine start there."
            className="max-w-3xl text-[clamp(1.45rem,3vw,2.55rem)] font-medium leading-tight tracking-[-0.025em] text-[#F4F7F8]"
          />

          <FadeIn className="max-w-3xl space-y-6 text-base font-light leading-8 text-[#D7E2EA]/[0.78] sm:text-lg">
            <p>
              I am a Computer Science student building cloud, AI, and security projects that can be inspected beyond a screenshot. Over the past year, that has meant containerizing APIs with Docker, pushing images through Amazon ECR, wiring CI checks in GitHub Actions, and reading CloudWatch logs to see if the system behaves outside my laptop.
            </p>
            <p>
              I care about the parts that usually get skipped in student portfolios: environment variables, health checks, deployment notes, security limits, cost tradeoffs, and the question a teammate would ask before trusting the repo. The projects below are written to show how I think, how I ship, and what I still know needs work.
            </p>
          </FadeIn>

          <div className="grid gap-3 md:grid-cols-2">
            {principles.map((item, index) => (
              <FadeIn
                key={item}
                delay={index * 0.06}
                className="border border-[#D7E2EA]/[0.16] bg-[#D7E2EA]/[0.06] p-5"
              >
                <p className="text-sm font-light leading-6 text-[#D7E2EA]/[0.78]">{item}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="border-y border-[#D7E2EA]/[0.16] py-8">
              <h3 className="text-[clamp(1.6rem,3vw,2.7rem)] font-black uppercase leading-none tracking-[-0.03em] text-[#F4F7F8]">
                Currently focused on
              </h3>
              <div className="mt-6 grid gap-4">
                {focusItems.map((item) => (
                  <p key={item} className="max-w-3xl text-sm font-light leading-6 text-[#D7E2EA]/[0.72] sm:text-base">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <p className="text-sm font-light leading-7 text-[#D7E2EA]/[0.64]">
              <span className="font-medium text-[#F4F7F8]">Coursework and certifications:</span>{" "}
              {certifications.join(" | ")}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
