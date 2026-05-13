"use client";
import About from "@/components/pages/About/About";
import Contact from "@/components/pages/Contact/Contact";
import Hero from "@/components/pages/Hero/Hero";
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
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem("visited");

    if (hasVisited) {
      setLoading(false);
      setIsStarted(true);
    }
  }, []);

  const handleLoaderFinished = () => {
    setLoading(false);
    setIsStarted(true);
    sessionStorage.setItem("visited", "true");
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
      {loading && <Loader onFinished={handleLoaderFinished} />}
      <div
        ref={containerRef}
        className={`w-full overflow-hidden ${!isStarted ? "opacity-0" : "opacity-100"}`}
      >
        <div id="home" className="relative z-10">
          <Hero isStarted={isStarted} />
        </div>
        <div id="about" className="relative z-20">
          <About />
        </div>
        <div id="skills" className="relative z-30">
          <SkillsSection />
        </div>
        <div id="projects" className="relative z-40 bg-black">
          <ProjectsPreview />
        </div>
        <div id="contact" className="relative z-50">
          <Contact />
        </div>
        <div id="github" className="relative z-[60]">
          <GitHubGraph />
        </div>
      </div>
    </>
  );
}
