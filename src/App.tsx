import { useLayoutEffect } from "react";
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

function App() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    const resetToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    resetToTop();
    window.addEventListener("pageshow", resetToTop);

    return () => window.removeEventListener("pageshow", resetToTop);
  }, []);

  return (
    <main className="overflow-x-clip bg-[#0C0C0C] font-body text-[#D7E2EA]">
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
