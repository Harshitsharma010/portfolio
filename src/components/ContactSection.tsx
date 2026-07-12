import { Code2, Mail, Network } from "lucide-react";
import { useState } from "react";
import FadeIn from "./FadeIn";

const email = "harshitbhardwajhs@gmail.com";
const links = [
  { label: "Email", value: email, href: `mailto:${email}`, icon: Mail },
  { label: "GitHub", value: "github.com/Harshitsharma010", href: "https://github.com/Harshitsharma010", icon: Code2 },
  { label: "LinkedIn", value: "linkedin.com/in/harshitsharma624", href: "https://www.linkedin.com/in/harshitsharma624", icon: Network },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0C0C0C] px-5 py-24 text-[#D7E2EA] sm:px-8 sm:py-28 md:px-10 md:py-36"
    >
      <div className="cinematic-stars absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <FadeIn>
          <h2 className="hero-heading text-[clamp(3.2rem,8vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.035em]">
            Let's build something useful.
          </h2>
          <p className="mt-8 max-w-2xl text-base font-light leading-7 text-[#D7E2EA]/[0.7] sm:text-lg">
            I am seeking entry-level Cloud Engineering, DevOps, Infrastructure, or Technical Consulting roles where I can ship, troubleshoot, document, and improve real systems.
          </p>
        </FadeIn>

        <div className="grid gap-3">
          {links.map(({ label, value, href, icon: Icon }, index) => (
            <FadeIn key={label} delay={index * 0.08}>
              <div className="flex flex-col gap-4 rounded-xl border border-[#D7E2EA]/[0.16] bg-[#D7E2EA]/[0.08] p-4 text-left transition-colors hover:bg-[#D7E2EA]/[0.13] sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="font-medium uppercase tracking-[0.16em]">{label}</span>
                </span>
                <span className="flex min-w-0 flex-wrap items-center gap-3 text-sm font-light text-[#D7E2EA]/[0.68] sm:justify-end sm:text-right">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="max-w-full break-words transition-colors hover:text-[#D7E2EA]"
                  >
                    {value}
                  </a>
                  {label === "Email" ? (
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="min-h-11 rounded-full border border-[#D7E2EA]/[0.22] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  ) : null}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      {copied ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#D7E2EA] px-5 py-3 text-sm font-medium text-[#0C0C0C] shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
          Email copied
        </div>
      ) : null}
    </section>
  );
}
