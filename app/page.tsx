"use client";
import About from "@/components/pages/About/About";
import Contact from "@/components/pages/Contact/Contact";
import HeroVisual from "@/components/pages/Hero/HeroVisual";
import SkillsSection from "@/components/pages/Skills/Skills";
import Loader from "@/components/pages/Loader/Loader";
import { useEffect, useState, useRef } from "react";
import GitHubGraph from "@/components/pages/GitHub/GitHubGraph";
import ProjectsPreview from "@/components/pages/Project/ProjectsPreview";
import CertificationsSection from "@/components/pages/Certifications/Certifications";
import CursorGrid from "@/components/ui/CursorGrid";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDeviceTier } from "@/utils/useDeviceTier";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Track if website has already loaded during this browser session
let hasLoadedBefore = false;

export default function Home() {
  const [loading, setLoading] = useState(!hasLoadedBefore);
  const [isExiting, setIsExiting] = useState(hasLoadedBefore);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToHashTarget = () => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  };

  useEffect(() => {
    if (hasLoadedBefore) {
      // Ensure Navbar and ScrollTrigger know page is already active on client navigation
      window.dispatchEvent(new Event("portfolio-loaded"));
      setTimeout(() => {
        ScrollTrigger.refresh();
        scrollToHashTarget();
      }, 100);
    }
  }, []);

  const handleExitStart = () => {
    setIsExiting(true);
  };

  const handleLoadingComplete = () => {
    hasLoadedBefore = true;
    setLoading(false);

    const hash = window.location.hash;
    if (!hash || hash === "#home") {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      scrollToHashTarget();
    }

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
          <div id="certifications" className="relative z-10">
            <CertificationsSection />
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
