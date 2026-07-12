import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import RoleRotator from "./RoleRotator";

const StormCore = lazy(() => import("./StormCore"));

const introGreetings = ["Hello", "Namaste", "Bonjour"];
const PRE_INTRO_MS = 5400;
const INTRO_MAX_MS = 5600;
const CLOUD_TRANSITION_MS = 1450;
const welcomeText = "Harshit Sharma builds deployable cloud, AI, and backend systems.";
const MAINFRAME_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
let gsapModule: Promise<typeof import("gsap")> | null = null;

function loadGsap() {
  gsapModule ??= import("gsap");
  return gsapModule;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isReloadNavigation() {
  const [navigationEntry] = window.performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return navigationEntry?.type === "reload";
}

function GreetingOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative h-32 w-full text-center">
        {introGreetings.map((word, index) => (
          <span
            key={word}
            className="intro-greeting absolute inset-0 flex items-center justify-center px-6 font-display text-[clamp(3.8rem,10vw,8rem)] text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: `${index * 1.55}s` }}
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
      }, 38);
    }, 600);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typeTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setActionsVisible(true), 400);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const sensitivity = 0.8;

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
      const offset = (delta / window.innerWidth) * sensitivity * video.duration;
      targetTime.current = clamp(targetTime.current + offset, 0, video.duration);
      requestSeek();
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
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

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) targetTime.current = video.currentTime;
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      seeking.current = false;
      return;
    }

    seeking.current = false;
    if (Math.abs(video.currentTime - targetTime.current) > 0.04) {
      seeking.current = true;
      video.currentTime = clamp(targetTime.current, 0, video.duration);
    }
  };

  return (
    <motion.div
      className="preintro-source-shell absolute inset-0 z-30 overflow-hidden bg-[#A8A9A7] text-[#111111]"
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

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1500px] flex-col px-5 py-5 sm:px-8 md:px-10">
        <motion.header
          className="flex items-center justify-between gap-4 text-[0.95rem] font-medium text-black"
          initial={reduceMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" onClick={onContinue} className="preintro-brand min-h-11 font-black tracking-[-0.04em]">
            Harshit Sharma <span className="text-black/45">*</span>
          </button>
          <p className="hidden text-black/80 md:block" aria-hidden="true">
            Cloud systems, AI tools, deployable proof
          </p>
          <button type="button" onClick={copyEmail} className="min-h-11 underline decoration-black/35 underline-offset-4 transition-opacity hover:opacity-65">
            {copied ? "Email copied" : "Get in touch"}
          </button>
        </motion.header>

        <section className="relative z-10 flex flex-1 flex-col justify-start pb-12 pt-24 sm:pt-28 md:justify-center md:pb-0 md:pt-20">
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

export default function Hero() {
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroSequenceRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const galaxyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const galaxyScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const galaxyOpacity = useTransform(scrollYProgress, [0, 0.84, 1], [1, 0.72, 0.22]);
  const [introPhase, setIntroPhase] = useState<"welcome" | "video" | "clouds" | "done">(
    () => {
      if (typeof window === "undefined") return "welcome";
      const pageWasReloaded = isReloadNavigation();

      if (pageWasReloaded && window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }

      const hasSectionDeepLink = Boolean(!pageWasReloaded && window.location.hash && window.location.hash !== "#home");
      if (hasSectionDeepLink || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
      return "welcome";
    },
  );
  const [introVideoReady, setIntroVideoReady] = useState(false);
  const [stormEnabled, setStormEnabled] = useState(() => introPhase !== "welcome");
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
    if (introPhase !== "welcome") {
      setStormEnabled(true);
      if (!reduceMotion) void loadGsap();
    }
  }, [introPhase, reduceMotion]);

  useLayoutEffect(() => {
    if (introPhase !== "done" || !heroSequenceRef.current || reduceMotion) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !heroSequenceRef.current) return;
      context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
        timeline
          .from("[data-hero-copy]", {
            x: -34,
            autoAlpha: 0,
            filter: "blur(9px)",
            duration: 0.78,
            stagger: 0.1,
            clearProps: "transform,opacity,visibility,filter",
          })
          .from(
            "[data-hero-core]",
            {
              scale: 0.9,
              autoAlpha: 0,
              filter: "blur(14px)",
              duration: 1.05,
              clearProps: "transform,opacity,visibility,filter",
            },
            0.08,
          );
      }, heroSequenceRef);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [introPhase, reduceMotion]);

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
        video.playbackRate = 1;
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
    <section ref={heroRef} id="home" className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#09060B] text-[#D7E2EA]">
      <AnimatePresence>
      {introPhase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-40 overflow-hidden bg-[#0C0C0C]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: introPhase === "clouds" ? [1, 0.92, 0] : 1,
            scale: introPhase === "clouds" ? [1, 1.006, 1.02] : 1,
            filter: introPhase === "clouds" ? ["blur(0px)", "blur(1px)", "blur(12px)"] : "blur(0px)",
            backgroundColor: introPhase === "clouds" ? "rgba(12, 12, 12, 0)" : "rgba(12, 12, 12, 1)",
          }}
          transition={{
            duration: introPhase === "clouds" ? 1.35 : 0.6,
            times: introPhase === "clouds" ? [0, 0.34, 1] : undefined,
            ease: [0.16, 1, 0.3, 1],
          }}
          exit={{ opacity: 0 }}
          role="region"
          aria-label="Cinematic portfolio introduction"
          data-intro-phase={introPhase}
        >
          {introPhase !== "clouds" ? (
            <button
              type="button"
              onClick={finishIntro}
              className="absolute bottom-5 right-5 z-50 min-h-11 rounded-full bg-white px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-black shadow-[0_8px_8px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-7 sm:right-8"
            >
              Skip to portfolio
            </button>
          ) : null}
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
              opacity: introPhase === "clouds" ? [0, 0.88, 0.12] : 0,
              scale: introPhase === "clouds" ? [0.9, 1.04, 1.22] : 0.9,
            }}
            transition={{ duration: 1.45, times: [0, 0.58, 1], ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="intro-aperture pointer-events-none absolute inset-0"
            animate={{
              opacity: introPhase === "clouds" ? [0, 0.72, 0] : 0,
              clipPath: introPhase === "clouds" ? ["circle(0% at 50% 50%)", "circle(48% at 50% 50%)", "circle(120% at 50% 50%)"] : "circle(0% at 50% 50%)",
            }}
            transition={{ duration: 1.35, times: [0, 0.46, 1], ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      ) : null}
      </AnimatePresence>

      <div className="film-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="magnetic-hero-field pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />
      <div className="absolute inset-0 z-10 cinema-vignette" />
      <div
        ref={heroSequenceRef}
        className="relative z-20 mx-auto grid min-h-[100dvh] w-full max-w-[1500px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 md:px-10 lg:grid-cols-[1fr_0.95fr] lg:gap-10 lg:pt-24"
      >
        <div className="max-w-2xl">
          <div data-hero-copy>
            <h1 className="hero-heading max-w-[9.2ch] text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.024em] text-balance">
              Cloud, DevOps &amp; AI Engineer
            </h1>
          </div>

          <div data-hero-copy>
            <p className="mt-7 text-[clamp(1.2rem,2.5vw,2rem)] font-medium uppercase tracking-[0.08em] text-[#D7E2EA]">
              <RoleRotator />
            </p>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-[#D7E2EA]/[0.72] sm:text-lg">
              I build deployable AWS systems and AI-backed products, from Terraform and CI/CD to monitored APIs and reviewer-ready proof.
            </p>
          </div>

          <div data-hero-copy>
            <div className="mt-9 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center rounded-full bg-[#D7E2EA] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0C0C] transition-colors hover:bg-white sm:px-8 sm:py-3.5"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#proof"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center rounded-full border border-[#D7E2EA]/[0.3] bg-white/[0.035] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D7E2EA] backdrop-blur-xl transition-colors hover:border-[#D7E2EA]/[0.62] hover:bg-white/[0.08] sm:px-8 sm:py-3.5"
              >
                See Live Proof
              </motion.a>
            </div>
            <p className="mt-6 text-sm font-light tracking-[0.04em] text-[#D7E2EA]/55">
              AWS infrastructure / Terraform / Docker / FastAPI / applied ML
            </p>
          </div>

        </div>

        <div data-hero-core className="relative flex justify-center lg:justify-end">
          {stormEnabled ? (
            <Suspense fallback={<div className="aspect-square w-[min(88vw,560px)]" aria-hidden="true" />}>
              <StormCore
                reduceMotion={reduceMotion}
                scrollY={galaxyY}
                scrollScale={galaxyScale}
                scrollOpacity={galaxyOpacity}
              />
            </Suspense>
          ) : (
            <div className="aspect-square w-[min(88vw,560px)]" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
