import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import FadeIn from "./FadeIn";
import RoleRotator from "./RoleRotator";

const introGreetings = ["Hello", "Namaste", "Bonjour"];
const PRE_INTRO_MS = 4600;
const INTRO_MAX_MS = 3600;
const CLOUD_TRANSITION_MS = 480;
const welcomeText = "Harshit Sharma builds deployable cloud, AI, and backend systems.";
const MAINFRAME_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function GreetingOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative h-32 w-full text-center">
        {introGreetings.map((word, index) => (
          <span
            key={word}
            className="intro-greeting absolute inset-0 flex items-center justify-center px-6 font-display text-[clamp(3.8rem,10vw,8rem)] text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: `${index * 0.95}s` }}
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
}: {
  reduceMotion: boolean | null;
  onContinue: () => void;
}) {
  const [typedText, setTypedText] = useState(reduceMotion ? welcomeText : "");
  const [typingDone, setTypingDone] = useState(Boolean(reduceMotion));
  const [actionsVisible, setActionsVisible] = useState(Boolean(reduceMotion));
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previousX = useRef<number | null>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setTypedText(welcomeText);
      setTypingDone(true);
      return;
    }

    setTypedText("");
    setTypingDone(false);
    let index = 0;
    let typeTimer = 0;
    const startTimer = window.setTimeout(() => {
      typeTimer = window.setInterval(() => {
        index += 1;
        setTypedText(welcomeText.slice(0, index));

        if (index >= welcomeText.length) {
          window.clearInterval(typeTimer);
          setTypingDone(true);
        }
      }, 28);
    }, 420);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typeTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setActionsVisible(true), 900);
    return () => window.clearTimeout(timer);
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

  useEffect(() => {
    if (reduceMotion) return;
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointerQuery.matches) return;

    const requestSeek = () => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || seeking.current) return;
      seeking.current = true;
      video.currentTime = clamp(targetTime.current, 0, video.duration);
    };

    const handleMove = (event: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        previousX.current = event.clientX;
        return;
      }

      if (previousX.current === null) {
        previousX.current = event.clientX;
        targetTime.current = video.currentTime;
        return;
      }

      const delta = event.clientX - previousX.current;
      previousX.current = event.clientX;
      targetTime.current = clamp(targetTime.current + (delta / window.innerWidth) * video.duration * 0.85, 0, video.duration);
      requestSeek();
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduceMotion]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const startAt = Number.isFinite(video.duration) ? Math.min(video.duration * 0.42, 1.4) : 0;
    targetTime.current = startAt;
    try {
      video.currentTime = startAt;
    } catch {
      targetTime.current = 0;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      seeking.current = false;
      return;
    }

    seeking.current = false;
    if (Number.isFinite(video.duration) && Math.abs(video.currentTime - targetTime.current) > 0.04) {
      seeking.current = true;
      video.currentTime = clamp(targetTime.current, 0, video.duration);
    }
  };

  return (
    <motion.div
      className="preintro-source-shell absolute inset-0 z-30 overflow-hidden bg-[#f4f2ec] text-[#111111]"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        ref={videoRef}
        className="preintro-source-video"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        aria-hidden="true"
      >
        <source src={MAINFRAME_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="preintro-source-wash" aria-hidden="true" />
      <div className="preintro-source-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-5 py-5 sm:px-8 md:px-10">
        <motion.header
          className="flex items-center justify-between gap-4 text-[0.95rem] font-medium text-black"
          initial={reduceMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" onClick={onContinue} className="font-black tracking-[-0.04em]">
            Harshit Sharma <span className="text-black/45">*</span>
          </button>
          <div className="hidden items-center gap-1 text-black/80 md:flex" aria-hidden="true">
            <span>Cloud systems</span>
            <span>,</span>
            <span>AI tools</span>
            <span>,</span>
            <span>deployable proof</span>
          </div>
          <button type="button" onClick={copyEmail} className="underline decoration-black/35 underline-offset-4 transition-opacity hover:opacity-65">
            {copied ? "Email copied" : "Get in touch"}
          </button>
        </motion.header>

        <section className="relative z-10 flex flex-1 flex-col justify-end pb-12 pt-20 md:justify-center md:pb-0">
          <motion.div
            className="preintro-source-copy max-w-[39rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="preintro-source-label">
              Hey there, I am Harshit.
              <br />
              Cloud / DevOps / AI engineer.
            </p>

            <h2 className="preintro-source-type" aria-live="polite">
              <span className={typedText.length < welcomeText.length ? "preintro-cursor" : ""}>
                {typedText}
              </span>
            </h2>

            <div className={`preintro-source-actions${actionsVisible || typingDone ? " is-visible" : ""}`}>
              <button
                type="button"
                onClick={onContinue}
                className="preintro-source-pill preintro-source-pill-dark"
              >
                Start Experience
              </button>
              <button
                type="button"
                onClick={copyEmail}
                className="preintro-source-pill preintro-source-pill-outline"
              >
                {copied ? "Email copied" : "Reach me"}
              </button>
            </div>
          </motion.div>
        </section>
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
