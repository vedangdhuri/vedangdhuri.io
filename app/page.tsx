"use client";
import About from "@/components/pages/About/About";
import Contact from "@/components/pages/Contact/Contact";
import HeroVisual from "@/components/pages/Hero/HeroVisual";
import SkillsSection from "@/components/pages/Skills/Skills";
import Loader from "@/components/pages/Loader/Loader";
import { useEffect, useState, useRef } from "react";
import GitHubGraph from "@/components/pages/GitHub/GitHubGraph";
import ProjectsPreview from "@/components/pages/Project/ProjectsPreview";
import CursorGrid from "@/components/ui/CursorGrid";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDeviceTier } from "@/utils/useDeviceTier";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If already visited this session, skip loader entirely
    const hasVisited = sessionStorage.getItem("visited");
    if (hasVisited) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      setIsExiting(true);
    }
  }, []);

  const handleExitStart = () => {
    setIsExiting(true);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    sessionStorage.setItem("visited", "true");

    // Dispatch custom event to notify Navbar that website content is fully shown
    window.dispatchEvent(new Event("portfolio-loaded"));

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // Initialize smooth scrolling with Lenis (skip on prefers-reduced-motion)
  useEffect(() => {
    const tier = getDeviceTier();
    // Tier 2 = prefers-reduced-motion: skip Lenis entirely
    if (tier === 2) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    // 500ms lag smoothing prevents burning CPU when tab is hidden
    gsap.ticker.lagSmoothing(500);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && (
        <Loader
          onComplete={handleLoadingComplete}
          onExitStart={handleExitStart}
        />
      )}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="w-full overflow-hidden"
      >
        {/*
          We remove large margins/paddings here and handle spacing within components
          to allow for continuous storytelling transitions.
        */}
        <div id="home" className="relative z-10">
          <HeroVisual />
        </div>
        <CursorGrid
          color="#00E5FF"
          maxOpacity={0.5}
          fadeDuration={1000}
          className="w-full"
        >
          <div className="section-divider" />
          <div id="about" className="relative z-10">
            <About />
          </div>
          <div className="section-divider" />
          <div id="skills" className="relative z-10">
            <SkillsSection />
          </div>
          <div className="section-divider" />
          <div id="projects" className="relative z-10">
            <ProjectsPreview />
          </div>
          <div className="section-divider" />
          <div id="contact" className="relative z-10">
            <Contact />
          </div>
          <div className="section-divider" />
          <div id="github" className="relative z-10">
            <GitHubGraph />
          </div>
        </CursorGrid>
      </motion.div>
    </>
  );
}
