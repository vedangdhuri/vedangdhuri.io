"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Force window scroll to top when visiting /projects
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // --- Ambient breathing pulse background loop ---
      gsap.to(".ambient-glow-1", {
        opacity: 0.08,
        scale: 1.1,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".ambient-glow-2", {
        opacity: 0.06,
        scale: 1.15,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // --- Hero entrance timeline (plays on mount with Premium Motion easing) ---
      const heroTl = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
      });

      // Back button
      if (backRef.current) {
        heroTl.fromTo(
          backRef.current,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.7 }
        );
      }

      // 3D character-by-character title reveal with depth
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        heroTl.fromTo(
          chars,
          { opacity: 0, y: 60, rotateX: -70, transformOrigin: "50% 100%" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.035,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        );
      }

      // Accent line expansion
      if (accentRef.current) {
        heroTl.fromTo(
          accentRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.5"
        );
      }

      // Subtitle fade-up
      if (subtitleRef.current) {
        heroTl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
      }

      // Project counter ticker
      if (counterRef.current) {
        const target = projects.length;
        heroTl.fromTo(
          counterRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onStart: () => {
              let current = 0;
              const increment = Math.ceil(target / 15);
              const timer = setInterval(() => {
                current = Math.min(current + increment, target);
                if (counterRef.current) {
                  counterRef.current.textContent = `${current} Projects`;
                }
                if (current >= target) clearInterval(timer);
              }, 45);
            },
          },
          "-=0.3"
        );
      }

      // --- Grid cards: GSAP 3D Cascade Wave Reveal ---
      if (gridRef.current) {
        const cards = gsap.utils.toArray<Element>(
          ".project-card",
          gridRef.current
        );

        gsap.fromTo(
          cards,
          { opacity: 0, y: 70, rotateX: 12, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.85,
            stagger: {
              amount: 0.4,
              from: "start",
              ease: "power2.out",
            },
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onToggle: (self) => triggers.push(self),
            },
          }
        );
      }

      return () => {
        triggers.forEach((st) => st.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, [projects.length]);

  // Split title text into individual character spans
  const titleText = "Projects";
  const titleChars = titleText.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ transformOrigin: "center bottom" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div ref={containerRef} className="relative">
      {/* Ambient background glows */}
      <div className="ambient-glow-1 absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00E5FF]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="ambient-glow-2 absolute top-[400px] right-0 w-[400px] h-[300px] bg-[#0A3BFF]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
        {/* Back to Home */}
        <Link
          ref={backRef}
          href="/"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#00E5FF] transition-colors duration-300 mb-12 group opacity-0"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-xs font-mono tracking-widest uppercase">
            Home
          </span>
        </Link>

        {/* Header */}
        <div className="mb-20 md:mb-28 space-y-6">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
            style={{ perspective: "600px" }}
          >
            {titleChars}
          </h1>

          {/* Accent line */}
          <div
            ref={accentRef}
            className="h-[2px] w-24 bg-gradient-to-r from-[#00E5FF] to-[#00E5FF]/20 origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed opacity-0"
            >
              Robust, scalable applications and creative experiments crafted
              with modern technologies and premium design.
            </p>
            <span
              ref={counterRef}
              className="text-xs font-mono tracking-widest uppercase text-[#00E5FF]/60 opacity-0 whitespace-nowrap"
            >
              {projects.length} Projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-mono text-sm">
              No projects found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
