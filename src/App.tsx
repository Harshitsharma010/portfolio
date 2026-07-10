import { lazy, Suspense, useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import ProofRail from "./components/ProofRail";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import RecruiterSnapshot from "./components/RecruiterSnapshot";
import ProofSection from "./components/ProofSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import HowIBuildSection from "./components/HowIBuildSection";
import ContactSection from "./components/ContactSection";

const StormCenterPreview = lazy(() => import("./components/StormCenterPreview"));

function App() {
  const showStormPreview = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("storm-preview") === "center";

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToLocation = () => {
      const sectionId = decodeURIComponent(window.location.hash.slice(1));
      if (!sectionId) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }

      const alignSection = () => {
        document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "instant" });
      };

      alignSection();
      window.requestAnimationFrame(() => window.requestAnimationFrame(alignSection));
      window.setTimeout(alignSection, 250);
    };

    scrollToLocation();
    window.addEventListener("pageshow", scrollToLocation);
    window.addEventListener("hashchange", scrollToLocation);

    return () => {
      window.removeEventListener("pageshow", scrollToLocation);
      window.removeEventListener("hashchange", scrollToLocation);
    };
  }, []);

  if (showStormPreview) {
    return (
      <Suspense fallback={<main className="min-h-[100dvh] bg-[#080508]" />}>
        <StormCenterPreview />
      </Suspense>
    );
  }

  return (
    <main className="bg-[#0C0C0C] font-body text-[#D7E2EA]">
      <ScrollProgress />
      <ProofRail />
      <Navbar />
      <Hero />
      <RecruiterSnapshot />
      <ProofSection />
      <ProjectsSection />
      <SkillsSection />
      <HowIBuildSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

export default App;
