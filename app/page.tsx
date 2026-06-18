"use client";
import About from "@/components/pages/About/About";
import Contact from "@/components/pages/Contact/Contact";
import HeroVisual from "@/components/pages/Hero/HeroVisual";
import SkillsSection from "@/components/pages/Skills/Skills";
import Loader from "@/components/pages/Loader/Loader";
import { useEffect, useState, useRef } from "react";
import GitHubGraph from "@/components/pages/GitHub/GitHubGraph";
import ProjectsPreview from "@/components/pages/Project/ProjectsPreview";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDeviceTier } from "@/utils/useDeviceTier";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem("visited");

    if (hasVisited) {
      const immediateTimer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(immediateTimer);
    } else {
      // Simulate loading time
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("visited", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

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
      {loading && <Loader />}
      <div
        ref={containerRef}
        className={`transition-opacity duration-1000 w-full overflow-hidden ${loading ? "opacity-0" : "opacity-100"} z-100`}
      >
        {/*
          We remove large margins/paddings here and handle spacing within components
          to allow for continuous storytelling transitions.
        */}
        <div id="home" className="relative z-10">
          <HeroVisual />
        </div>
        <div className="section-divider" />
        <div id="about" className="relative z-20">
          <About />
        </div>
        <div className="section-divider" />
        <div id="skills" className="relative z-30">
          <SkillsSection />
        </div>
        <div className="section-divider" />
        <div id="projects" className="relative z-40">
          <ProjectsPreview />
        </div>
        <div className="section-divider" />
        <div id="contact" className="relative z-50">
          <Contact />
        </div>
        <div className="section-divider" />
        <div id="github" className="relative z-60">
          <GitHubGraph />
        </div>
      </div>
    </>
  );
}
