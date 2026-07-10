import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import FadeIn from "./FadeIn";
import RoleRotator from "./RoleRotator";

const StormCore = lazy(() => import("./StormCore"));

const introGreetings = ["Hello", "Namaste", "Bonjour"];
const PRE_INTRO_MS = 5400;
const INTRO_MAX_MS = 5600;
const CLOUD_TRANSITION_MS = 1450;
const welcomeText = "Harshit Sharma builds deployable cloud, AI, and backend systems.";
const MAINFRAME_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

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
            style={{ animationDelay: `${index * 1.28}s` }}
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
      exit={{ opacity: 0, scale: 1.025, filter: "blur(10px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
      style={{
        y: reduceMotion ? 0 : scrollY,
        scale: reduceMotion ? 1 : scrollScale,
        opacity: reduceMotion ? 1 : scrollOpacity,
      }}
      onPointerEnter={() => setIsActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setIsActive(false);
        setCursor({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className="galaxy-glow absolute inset-[8%] rounded-full"
        aria-hidden="true"
        animate={reduceMotion ? {} : { x: isActive ? cursor.x * 8 : 0, y: isActive ? cursor.y * 8 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="galaxy-ripple absolute inset-[10%] rounded-full"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.66 }}
        animate={{
          opacity: ignited ? 1 : 0,
          scale: ignited ? 1 : 0.66,
          x: isActive ? cursor.x * 5 : 0,
          y: isActive ? cursor.y * 5 : 0,
        }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="galaxy-ripple galaxy-ripple-b absolute inset-[20%] rounded-full"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{
          opacity: ignited ? 1 : 0,
          scale: ignited ? 1 : 0.72,
          x: isActive ? cursor.x * -4 : 0,
          y: isActive ? cursor.y * -4 : 0,
        }}
        transition={{ duration: 1.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="galaxy-ignite"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.24 }}
        animate={reduceMotion ? {} : { opacity: [0, 0.85, 0], scale: [0.24, 1.05, 1.42] }}
        transition={{ duration: 1.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
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

      <motion.span
        className="galaxy-node galaxy-node-a"
        animate={reduceMotion ? {} : { rotate: isActive ? 22 : [0, 360] }}
        transition={{ duration: isActive ? 0.6 : 18, repeat: isActive ? 0 : Infinity, ease: "linear" }}
      ><span /></motion.span>
      <motion.span
        className="galaxy-node galaxy-node-b"
        animate={reduceMotion ? {} : { rotate: isActive ? -18 : [360, 0] }}
        transition={{ duration: isActive ? 0.6 : 22, repeat: isActive ? 0 : Infinity, ease: "linear" }}
      ><span /></motion.span>
      <motion.span
        className="galaxy-node galaxy-node-c"
        animate={reduceMotion ? {} : { rotate: isActive ? 14 : [0, 360] }}
        transition={{ duration: isActive ? 0.6 : 28, repeat: isActive ? 0 : Infinity, ease: "linear" }}
      ><span /></motion.span>
      <motion.div
        className="galaxy-proof-card"
        initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={reduceMotion ? {} : { opacity: 1, y: [0, -6, 0], filter: "blur(0px)" }}
        transition={{ opacity: { duration: 0.8, delay: 0.7 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, filter: { duration: 0.8, delay: 0.7 } }}
      >
        <span>Deployable systems</span>
        <strong>AWS / Docker / Terraform / CI/CD / logs</strong>
      </motion.div>

      <motion.div
        className="galaxy-core-wrap"
        animate={reduceMotion ? {} : { x: isActive ? cursor.x * 10 : 0, y: isActive ? cursor.y * 8 : 0 }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="galaxy-core relative aspect-square overflow-hidden rounded-full border border-white/35 bg-white/[0.06] p-2 backdrop-blur-xl">
          <img
            src="https://github.com/Harshitsharma010.png"
            alt="Harshit Sharma"
            className="h-full w-full rounded-full object-cover contrast-[1.04] saturate-[1.08]"
            loading="eager"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const galaxyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const galaxyScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const galaxyOpacity = useTransform(scrollYProgress, [0, 0.84, 1], [1, 0.72, 0.22]);
  const [introPhase, setIntroPhase] = useState<"welcome" | "video" | "clouds" | "done">(
    () => {
      if (typeof window === "undefined") return "welcome";
      const hasSectionDeepLink = Boolean(window.location.hash && window.location.hash !== "#home");
      if (hasSectionDeepLink || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
      return "welcome";
    },
  );
  const [introVideoReady, setIntroVideoReady] = useState(false);
  const finishIntro = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setIntroPhase("done");
  }, []);
  const introActive = introPhase !== "done";
  const startTrainVideo = () => {
    setIntroPhase((phase) => (phase === "welcome" ? "video" : phase));
  };
  const startIntroTransition = () => {
    setIntroPhase((phase) => (phase === "video" ? "clouds" : phase));
  };
  useEffect(() => {
    if (reduceMotion) {
      finishIntro();
    }
  }, [reduceMotion, finishIntro]);

  useEffect(() => {
    if (introPhase !== "welcome") return;
    const timer = window.setTimeout(startTrainVideo, PRE_INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "clouds") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = window.setTimeout(finishIntro, CLOUD_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [introPhase, finishIntro]);

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
    if (!introActive) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const lockIntroScroll = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", lockIntroScroll, { passive: false });
    window.addEventListener("touchmove", lockIntroScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", lockIntroScroll);
      window.removeEventListener("touchmove", lockIntroScroll);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
  }, [introActive]);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#09060B] text-[#D7E2EA]">
      <AnimatePresence>
      {introPhase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-40 overflow-hidden bg-[#0C0C0C]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          role="region"
          aria-label="Cinematic portfolio introduction"
        >
          <button
            type="button"
            onClick={finishIntro}
            className="absolute right-5 top-5 z-50 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:border-white/55 hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-7"
          >
            Skip intro
          </button>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: introPhase === "video" ? 1 : 0,
              scale: introPhase === "video" ? 1 : 1.035,
              filter: introPhase === "video" ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              ref={introVideoRef}
              className="h-full w-full bg-[#0C0C0C] object-cover object-center"
              src="/media/intro-hero-20260703.mp4"
              muted
              playsInline
              preload="auto"
              onPlaying={() => setIntroVideoReady(true)}
              onEnded={startIntroTransition}
              onError={startIntroTransition}
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="intro-vignette absolute inset-0" />
            <div className="film-grain pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
            <div className="intro-letterbox pointer-events-none absolute inset-0" aria-hidden="true" />
            {introVideoReady && introPhase === "video" ? <GreetingOverlay /> : null}
          </motion.div>

          <AnimatePresence>
          {introPhase === "welcome" ? (
            <WelcomeIntro
              reduceMotion={reduceMotion}
              onContinue={startTrainVideo}
            />
          ) : null}
          </AnimatePresence>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[#030308]"
            initial={{ opacity: 0 }}
            animate={{ opacity: introPhase === "clouds" ? 0.78 : 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="cloud-field pointer-events-none absolute inset-[-12%] opacity-0"
            animate={{
              opacity: introPhase === "clouds" ? [0, 0.92, 0.18] : 0,
              scale: introPhase === "clouds" ? [0.94, 1.03, 1.15] : 0.94,
            }}
            transition={{ duration: 1.45, times: [0, 0.58, 1], ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="intro-aperture pointer-events-none absolute inset-0"
            animate={{
              opacity: introPhase === "clouds" ? 1 : 0,
              clipPath: introPhase === "clouds" ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)",
            }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      ) : null}
      </AnimatePresence>

      <div className="film-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="magnetic-hero-field pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />
      <div className="absolute inset-0 z-10 cinema-vignette" />
      <div className="relative z-20 grid min-h-screen items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pt-24">
        <div className="max-w-2xl">
          <FadeIn delay={0.08} y={30}>
            <h1 className="hero-heading max-w-[8.9ch] text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84] tracking-[-0.024em] text-balance">
              Cloud, DevOps &amp; AI Engineer
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

        </div>

        <FadeIn delay={0.2} y={34} className="relative">
          <Suspense fallback={<div className="aspect-[1.08] w-[min(94vw,660px)]" aria-hidden="true" />}>
            <StormCore
              reduceMotion={reduceMotion}
              scrollY={galaxyY}
              scrollScale={galaxyScale}
              scrollOpacity={galaxyOpacity}
            />
          </Suspense>
        </FadeIn>
      </div>
    </section>
  );
}
