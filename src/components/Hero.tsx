import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import FadeIn from "./FadeIn";
import RoleRotator from "./RoleRotator";

const introGreetings = ["Hello", "Namaste", "Bonjour"];
const PRE_INTRO_MS = 5200;
const INTRO_MAX_MS = 4300;
const CLOUD_TRANSITION_MS = 720;
const welcomeText = "Harshit Sharma builds deployable cloud, AI, and backend systems.";
const heroSkills = ["AWS", "Docker", "Terraform", "CI/CD", "FastAPI", "AI/ML"];
const valueStatements = [
  "Deployable cloud systems",
  "Backend APIs with live proof",
  "AI pipelines with documented tradeoffs",
  "Infrastructure with CI/CD, logs, and inspection paths",
];

const particles = [
  { x: 12, y: 18, s: 2, d: 0 },
  { x: 22, y: 72, s: 1.5, d: 0.3 },
  { x: 34, y: 28, s: 1.8, d: 0.6 },
  { x: 46, y: 12, s: 1.2, d: 0.1 },
  { x: 58, y: 82, s: 2, d: 0.5 },
  { x: 72, y: 24, s: 1.4, d: 0.2 },
  { x: 84, y: 66, s: 1.7, d: 0.7 },
  { x: 18, y: 48, s: 1.1, d: 0.4 },
  { x: 79, y: 42, s: 1.2, d: 0.9 },
  { x: 41, y: 67, s: 1.5, d: 0.8 },
  { x: 63, y: 55, s: 1, d: 0.25 },
  { x: 30, y: 88, s: 1.3, d: 0.65 },
  { x: 8, y: 58, s: 1.1, d: 1.1 },
  { x: 52, y: 34, s: 1.2, d: 1.25 },
  { x: 88, y: 18, s: 1.5, d: 1.35 },
  { x: 91, y: 51, s: 1.1, d: 1.45 },
  { x: 67, y: 11, s: 1, d: 1.55 },
  { x: 26, y: 37, s: 1.2, d: 1.65 },
  { x: 47, y: 92, s: 1, d: 1.75 },
  { x: 73, y: 76, s: 1.3, d: 1.85 },
];

function GreetingOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative h-32 w-full text-center">
        {introGreetings.map((word, index) => (
          <span
            key={word}
            className="intro-greeting absolute inset-0 flex items-center justify-center px-6 font-display text-[clamp(3.8rem,10vw,8rem)] text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: `${index * 1.05}s` }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

function WelcomeIntro({
  reduceMotion,
  onContinue,
  onSkipTo,
}: {
  reduceMotion: boolean | null;
  onContinue: () => void;
  onSkipTo: (targetId: string) => void;
}) {
  const [typedText, setTypedText] = useState(reduceMotion ? welcomeText : "");
  const [copied, setCopied] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.35 });
  const headX = useTransform(smoothX, [-1, 1], [-17, 17]);
  const headY = useTransform(smoothY, [-1, 1], [-9, 9]);
  const headRotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const headRotateX = useTransform(smoothY, [-1, 1], [7, -7]);
  const bodyX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const bodyY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const bodyRotateY = useTransform(smoothX, [-1, 1], [-4, 4]);
  const bodyRotateX = useTransform(smoothY, [-1, 1], [2.5, -2.5]);
  const cursorX = useTransform(smoothX, [-1, 1], [-112, 112]);
  const cursorY = useTransform(smoothY, [-1, 1], [-74, 74]);
  const cursorRotate = useTransform(smoothX, [-1, 1], [-17, -5]);
  const ringX = useTransform(smoothX, [-1, 1], [-92, 92]);
  const ringY = useTransform(smoothY, [-1, 1], [-62, 62]);
  const ringScale = useTransform(smoothX, [-1, 0, 1], [1.08, 1, 1.08]);

  useEffect(() => {
    if (reduceMotion) {
      setTypedText(welcomeText);
      return;
    }

    setTypedText("");
    let index = 0;
    let typeTimer = 0;
    const startTimer = window.setTimeout(() => {
      typeTimer = window.setInterval(() => {
        index += 1;
        setTypedText(welcomeText.slice(0, index));

        if (index >= welcomeText.length) {
          window.clearInterval(typeTimer);
        }
      }, 34);
    }, 260);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typeTimer);
    };
  }, [reduceMotion]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("harshitbhardwajhs@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      onContinue();
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="absolute inset-0 z-30 overflow-hidden bg-[#D7D6D1] text-[#111111]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="preintro-paper-grain absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(255,255,255,0.48),transparent_36%),radial-gradient(circle_at_22%_74%,rgba(217,184,111,0.2),transparent_28%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 md:px-10">
        <motion.header
          className="flex items-center justify-between gap-4 text-sm font-medium"
          initial={reduceMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" onClick={onContinue} className="font-black tracking-[-0.035em]">
            Harshit Sharma <span className="text-[#5D5B56]">*</span>
          </button>
          <div className="hidden items-center gap-1 text-[#35332F] md:flex">
            <button type="button" onClick={() => onSkipTo("projects")} className="transition-opacity hover:opacity-60">
              Projects
            </button>
            <span>,</span>
            <button type="button" onClick={() => onSkipTo("proof")} className="transition-opacity hover:opacity-60">
              Proof
            </button>
            <span>,</span>
            <button type="button" onClick={() => onSkipTo("skills")} className="transition-opacity hover:opacity-60">
              Skills
            </button>
            <span>,</span>
            <button type="button" onClick={() => onSkipTo("contact")} className="transition-opacity hover:opacity-60">
              Contact
            </button>
          </div>
          <button type="button" onClick={copyEmail} className="underline decoration-black/35 underline-offset-4 transition-opacity hover:opacity-65">
            Get in touch
          </button>
        </motion.header>

        <div className="grid flex-1 items-center gap-10 py-10 md:grid-cols-[0.95fr_1.05fr] md:py-0">
          <motion.div
            className="relative z-20 max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex rounded-full border border-black/10 bg-white/30 px-4 py-2 shadow-[0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl">
              <p className="text-sm leading-6 text-black/72 sm:text-base">
                Hey there, initializing workspace.
                <br />
                Cloud systems, AI signals, and deployable proof.
              </p>
            </div>

            <h2 className="mt-7 min-h-[4.7em] text-[clamp(2.15rem,5vw,4.95rem)] font-black leading-[0.95] tracking-[-0.038em] text-[#111111] sm:min-h-[2.9em]">
              <span className={typedText.length < welcomeText.length ? "preintro-cursor" : ""}>
                {typedText}
              </span>
            </h2>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onSkipTo("projects")}
                className="preintro-pill rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-colors hover:bg-black hover:text-white"
                style={{ animationDelay: "0.7s" }}
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => onSkipTo("proof")}
                className="preintro-pill rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-colors hover:bg-black hover:text-white"
                style={{ animationDelay: "0.8s" }}
              >
                See Live Proof
              </button>
              <a
                href="/Harshit-Sharma-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="preintro-pill rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-colors hover:bg-black hover:text-white"
                style={{ animationDelay: "0.9s" }}
              >
                Open Resume
              </a>
              <button
                type="button"
                onClick={onContinue}
                className="preintro-pill rounded-full border border-black/15 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
                style={{ animationDelay: "1s" }}
              >
                Enter Portfolio
              </button>
              <button
                type="button"
                onClick={copyEmail}
                className="preintro-pill rounded-full border border-black/15 bg-white/35 px-5 py-2.5 text-sm text-black/74 backdrop-blur-xl transition-colors hover:bg-white hover:text-black"
                style={{ animationDelay: "1.1s" }}
              >
                {copied ? "Email copied" : "Reach me"}
              </button>
            </div>
          </motion.div>

          <motion.div
            className="preintro-figure-shell relative mx-auto flex w-full max-w-[520px] items-center justify-center md:justify-end"
            style={reduceMotion ? undefined : { rotateY: bodyRotateY, rotateX: bodyRotateX }}
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="preintro-photo-stage preintro-person-stage relative aspect-[0.86] w-[min(64vw,260px)] overflow-hidden rounded-[26px] border border-black/10 bg-[#C7C5BF] shadow-[0_28px_80px_rgba(17,17,17,0.22)] md:w-[min(78vw,410px)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_25%,rgba(255,255,255,0.62),transparent_34%),linear-gradient(180deg,#D6D4CE,#B9B8B2)]" />
              <div className="absolute bottom-[-1%] left-1/2 z-[1] w-[87%] -translate-x-1/2">
                <motion.img
                  src="/media/intro-monitor-body.png"
                  alt=""
                  className="preintro-person-body w-full select-none"
                  style={reduceMotion ? undefined : { x: bodyX, y: bodyY }}
                  loading="eager"
                  draggable={false}
                />
              </div>
              <div className="absolute left-1/2 top-[15.5%] z-[2] w-[60%] -translate-x-1/2 md:top-[15.5%]">
                <motion.img
                  src="/media/intro-monitor-head.png"
                  alt="Monitor head portrait"
                  className="preintro-monitor-head w-full select-none"
                  style={reduceMotion ? undefined : { x: headX, y: headY, rotateY: headRotateY, rotateX: headRotateX }}
                  loading="eager"
                  draggable={false}
                />
              </div>
              <div className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_42%,rgba(0,0,0,0.1))]" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                Harshit Sharma
              </div>
              <div className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs text-black/70 backdrop-blur-xl">
                Cloud / DevOps / AI
              </div>
            </div>
            <motion.div className="preintro-cursor-arrow" style={reduceMotion ? undefined : { x: cursorX, y: cursorY, rotate: cursorRotate }} aria-hidden="true">
              <svg viewBox="0 0 54 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 5L45 42L27 45L18 59L7 5Z" fill="#111111" stroke="#F4F1EA" strokeWidth="4" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.span className="preintro-cursor-ring" style={reduceMotion ? undefined : { x: ringX, y: ringY, scale: ringScale }} aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ValueStrip() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % valueStatements.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <span>{valueStatements[0]}</span>;
  }

  return (
    <span className="relative inline-flex min-h-[1.5em] min-w-[min(25rem,86vw)] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={valueStatements[index]}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          {valueStatements[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function MagneticGalaxy({
  reduceMotion,
  scrollY,
  scrollScale,
  scrollOpacity,
}: {
  reduceMotion: boolean | null;
  scrollY: MotionValue<number>;
  scrollScale: MotionValue<number>;
  scrollOpacity: MotionValue<number>;
}) {
  const [isActive, setIsActive] = useState(false);
  const [ignited, setIgnited] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) {
      setIgnited(true);
      return;
    }
    const timer = window.setTimeout(() => setIgnited(true), 220);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <motion.div
      className="magnetic-galaxy group relative mx-auto aspect-square w-[min(82vw,540px)]"
      style={{ y: reduceMotion ? 0 : scrollY, scale: reduceMotion ? 1 : scrollScale, opacity: reduceMotion ? 1 : scrollOpacity }}
      onPointerEnter={() => setIsActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsActive(false)}
    >
      <motion.div
        className="galaxy-glow absolute inset-[8%] rounded-full"
        aria-hidden="true"
        animate={reduceMotion ? {} : { x: isActive ? cursor.x * 8 : 0, y: isActive ? cursor.y * 8 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="astral-dust absolute inset-0 rounded-full"
        aria-hidden="true"
        animate={reduceMotion ? {} : { x: isActive ? cursor.x * -5 : 0, y: isActive ? cursor.y * -5 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="galaxy-ripple galaxy-ripple-a absolute inset-[10%] rounded-full"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.66 }}
        animate={reduceMotion ? {} : { opacity: ignited ? 1 : 0, scale: ignited ? 1 : 0.66, x: isActive ? cursor.x * 5 : 0, y: isActive ? cursor.y * 5 : 0 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="galaxy-ripple galaxy-ripple-b absolute inset-[20%] rounded-full"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={reduceMotion ? {} : { opacity: ignited ? 1 : 0, scale: ignited ? 1 : 0.72, x: isActive ? cursor.x * -4 : 0, y: isActive ? cursor.y * -4 : 0 }}
        transition={{ duration: 1.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="galaxy-ignite"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.24 }}
        animate={reduceMotion ? {} : { opacity: [0, 0.85, 0], scale: [0.24, 1.05, 1.42] }}
        transition={{ duration: 1.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="shooting-star shooting-star-a" aria-hidden="true" />
      <span className="shooting-star shooting-star-b" aria-hidden="true" />
      <span className="shooting-star shooting-star-c" aria-hidden="true" />

      <motion.svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 100 100"
        aria-hidden="true"
        animate={reduceMotion ? {} : { x: isActive ? cursor.x * 3 : 0, y: isActive ? cursor.y * 3 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <path className="constellation-line" d="M18 48 L34 28 L46 12 M58 82 L63 55 L79 42 L84 66" />
        <path className="constellation-line constellation-line-soft" d="M22 72 L41 67 L58 82" />
      </motion.svg>

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          className="galaxy-particle absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.s,
            height: particle.s,
          }}
          animate={
            reduceMotion
              ? {}
              : {
                  x: isActive ? (50 - particle.x) * 1.45 + cursor.x * 2 : [0, index % 2 === 0 ? 4 : -3, 0],
                  y: isActive ? (50 - particle.y) * 1.45 + cursor.y * 2 : [0, index % 3 === 0 ? -5 : 4, 0],
                  opacity: isActive ? 0.92 : [0.28, 0.86, 0.36],
                }
          }
          initial={reduceMotion ? false : { x: (particle.x - 50) * 0.46, y: (particle.y - 50) * 0.46, opacity: 0 }}
          transition={{ duration: isActive ? 0.55 : 3.8 + particle.d, repeat: isActive ? 0 : Infinity, ease: "easeInOut", delay: particle.d }}
        />
      ))}

      <motion.span
        className="galaxy-node galaxy-node-a"
        animate={reduceMotion ? {} : { rotate: isActive ? 22 : [0, 360] }}
        transition={{ duration: isActive ? 0.6 : 18, repeat: isActive ? 0 : Infinity, ease: "linear" }}
      >
        <span />
      </motion.span>
      <motion.span
        className="galaxy-node galaxy-node-b"
        animate={reduceMotion ? {} : { rotate: isActive ? -18 : [360, 0] }}
        transition={{ duration: isActive ? 0.6 : 22, repeat: isActive ? 0 : Infinity, ease: "linear" }}
      >
        <span />
      </motion.span>
      <motion.span
        className="galaxy-node galaxy-node-c"
        animate={reduceMotion ? {} : { rotate: isActive ? 14 : [0, 360] }}
        transition={{ duration: isActive ? 0.6 : 28, repeat: isActive ? 0 : Infinity, ease: "linear" }}
      >
        <span />
      </motion.span>
      <span className="galaxy-planet galaxy-planet-a" aria-hidden="true" />
      <span className="galaxy-planet galaxy-planet-b" aria-hidden="true" />
      <motion.div
        className="galaxy-proof-card"
        initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={reduceMotion ? {} : { opacity: 1, y: [0, -6, 0], filter: "blur(0px)" }}
        transition={{ opacity: { duration: 0.8, delay: 0.7 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, filter: { duration: 0.8, delay: 0.7 } }}
      >
        <span>Deployable systems</span>
        <strong>AWS / Docker / Terraform / CI/CD / logs</strong>
      </motion.div>

      <div className="galaxy-core-wrap">
        <div className="galaxy-core relative aspect-square overflow-hidden rounded-full border border-white/35 bg-white/[0.06] p-2 backdrop-blur-xl">
          <img
            src="https://github.com/Harshitsharma010.png"
            alt="Harshit Sharma"
            className="h-full w-full rounded-full object-cover contrast-[1.04] saturate-[1.08]"
            loading="eager"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const galaxyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const galaxyScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const galaxyOpacity = useTransform(scrollYProgress, [0, 0.84, 1], [1, 0.72, 0.22]);
  const [introPhase, setIntroPhase] = useState<"welcome" | "video" | "clouds" | "done">(
    reduceMotion ? "done" : "welcome",
  );
  const [introVideoReady, setIntroVideoReady] = useState(false);
  const startTrainVideo = () => {
    setIntroPhase((phase) => (phase === "welcome" ? "video" : phase));
  };
  const startIntroTransition = () => {
    setIntroPhase((phase) => (phase === "video" ? "clouds" : phase));
  };
  const advanceIntro = () => {
    setIntroPhase((phase) => {
      if (phase === "welcome") return "video";
      if (phase === "video") return "clouds";
      return phase;
    });
  };
  const skipIntroTo = (targetId: string) => {
    setIntroPhase("done");
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    }, 40);
  };

  useEffect(() => {
    if (reduceMotion) {
      setIntroPhase("done");
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (introPhase !== "welcome") return;
    const timer = window.setTimeout(startTrainVideo, PRE_INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "clouds") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = window.setTimeout(() => setIntroPhase("done"), CLOUD_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase === "video") {
      setIntroVideoReady(false);
    }
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "video") return;
    const video = introVideoRef.current;
    if (!video) return;
    const maxIntroTimer = window.setTimeout(startIntroTransition, INTRO_MAX_MS);

    const startIntro = () => {
      try {
        video.currentTime = 0;
        video.playbackRate = 1.08;
      } catch {
        // Some browsers can reject currentTime while metadata is still settling.
      }

      void video
        .play()
        .then(() => setIntroVideoReady(true))
        .catch(() => {
          startIntroTransition();
        });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startIntro();
      return () => window.clearTimeout(maxIntroTimer);
    }

    video.addEventListener("loadeddata", startIntro, { once: true });
    return () => {
      window.clearTimeout(maxIntroTimer);
      video.removeEventListener("loadeddata", startIntro);
    };
  }, [introPhase]);

  useEffect(() => {
    if (introPhase === "done") return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const skipIntro = (event: Event) => {
      event.preventDefault();
      advanceIntro();
    };
    const skipIntroFromKey = (event: KeyboardEvent) => {
      const keys = ["ArrowDown", "PageDown", " ", "Spacebar", "Enter"];
      if (!keys.includes(event.key)) return;
      skipIntro(event);
    };

    window.addEventListener("wheel", skipIntro, { passive: false });
    window.addEventListener("touchmove", skipIntro, { passive: false });
    window.addEventListener("keydown", skipIntroFromKey);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.removeEventListener("wheel", skipIntro);
      window.removeEventListener("touchmove", skipIntro);
      window.removeEventListener("keydown", skipIntroFromKey);
    };
  }, [introPhase]);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0C0C0C] text-[#D7E2EA]">
      {introPhase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-40 bg-[#0C0C0C]"
          initial={{ opacity: 1 }}
          animate={{ opacity: introPhase === "clouds" ? 0.92 : 1 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        >
          {introPhase === "welcome" ? (
            <WelcomeIntro
              reduceMotion={reduceMotion}
              onContinue={startTrainVideo}
              onSkipTo={skipIntroTo}
            />
          ) : null}
          {introPhase === "video" ? (
            <>
              <video
                ref={introVideoRef}
                className="h-full w-full bg-[#0C0C0C] object-cover object-center"
                src="/media/intro-hero-20260703.mp4"
                muted
                playsInline
                autoPlay
                preload="auto"
                onPlaying={() => setIntroVideoReady(true)}
                onEnded={startIntroTransition}
                onError={startIntroTransition}
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="intro-vignette absolute inset-0" />
              <div className="film-grain pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
              <div className="intro-letterbox pointer-events-none absolute inset-0" aria-hidden="true" />
              {introVideoReady ? <GreetingOverlay /> : null}
            </>
          ) : null}
          <motion.div
            className="absolute inset-0 bg-[#0C0C0C]"
            initial={{ opacity: 0 }}
            animate={{ opacity: introPhase === "clouds" ? 0.42 : 0 }}
            transition={{ duration: 0.45 }}
          />
          <motion.div
            className="cloud-field absolute inset-[-12%] opacity-0"
            animate={{
              opacity: introPhase === "clouds" ? 0.95 : 0,
              scale: introPhase === "clouds" ? 1.1 : 1,
            }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-transparent to-[#0C0C0C]"
            animate={{ opacity: introPhase === "clouds" ? 1 : 0 }}
          />
        </motion.div>
      ) : null}

      <div className="noise-field absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="film-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="magnetic-hero-field pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />
      <div className="absolute inset-0 z-10 cinema-vignette" />
      <div className="cinematic-stars absolute inset-0 z-10 opacity-25" aria-hidden="true" />
      <div className="relative z-20 grid min-h-screen items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pt-24">
        <div className="max-w-2xl">
          <FadeIn delay={0.08} y={30}>
            <h1 className="hero-heading max-w-[8.9ch] text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84] tracking-[-0.024em] text-balance">
              Cloud &amp; AI/ML Developer
            </h1>
          </FadeIn>

          <FadeIn delay={0.18} y={24}>
            <p className="mt-7 text-[clamp(1.2rem,2.5vw,2rem)] font-medium uppercase tracking-[0.08em] text-[#D7E2EA]">
              <RoleRotator />
            </p>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-[#D7E2EA]/[0.72] sm:text-lg">
              I build deployable cloud systems, backend services, and AI-driven tools with real architecture, CI/CD, monitoring, and documented tradeoffs.
            </p>
          </FadeIn>

          <FadeIn delay={0.28} y={20}>
            <div className="mt-9 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-[#D7E2EA] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0C0C] transition-colors hover:bg-white sm:px-8 sm:py-3.5"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#proof"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-[#D7E2EA]/[0.3] bg-white/[0.035] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D7E2EA] backdrop-blur-xl transition-colors hover:border-[#D7E2EA]/[0.62] hover:bg-white/[0.08] sm:px-8 sm:py-3.5"
              >
                See Live Proof
              </motion.a>
            </div>
          </FadeIn>

          <FadeIn delay={0.32} y={18}>
            <div className="mt-7 inline-flex max-w-full rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-light text-[#D7E2EA]/[0.78] backdrop-blur-xl">
              <ValueStrip />
            </div>
          </FadeIn>

          <FadeIn delay={0.36} y={18}>
            <div className="mt-8 flex max-w-xl flex-wrap gap-2">
              {heroSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-light leading-none text-[#D7E2EA]/[0.72] backdrop-blur-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} y={34} className="relative">
          <MagneticGalaxy
            reduceMotion={reduceMotion}
            scrollY={galaxyY}
            scrollScale={galaxyScale}
            scrollOpacity={galaxyOpacity}
          />
        </FadeIn>
      </div>
    </section>
  );
}
