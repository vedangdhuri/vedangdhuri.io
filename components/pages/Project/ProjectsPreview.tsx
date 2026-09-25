"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/data/projects";
import { kebabCase } from "@/utils/utils";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Project Card (Bento Box style)                                    */
/* ------------------------------------------------------------------ */
const ProjectCard = ({
  project,
  index,
  className = "",
}: {
  project: (typeof projects)[0];
  index: number;
  className?: string;
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    []
  );

  return (
    <Link
      href={`/projects/${kebabCase(project.title)}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card group relative flex flex-col overflow-hidden border border-white/10 bg-black/35 backdrop-blur-md transition-all duration-700 hover:border-[#00E5FF]/45 hover:bg-[#00E5FF]/[0.035] cursor-pointer ${className}`}
    >
      {/* Dynamic Hover Gradient (Glass Shimmer) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />

      {/* Image Container */}
      <div className="relative w-full h-full flex-1 overflow-hidden min-h-[160px]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 pointer-events-none z-20">
        
        {/* Top Badges */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {index === 0 && (
              <span className="border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md shadow-xl">
                Featured
              </span>
            )}
            {project.liveUrl && (
              <span className="flex items-center gap-1.5 border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400 backdrop-blur-md shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
          </div>
          
          {/* Arrow Icon */}
          <div className="flex h-9 w-9 items-center justify-center border border-white/10 bg-black/45 text-white/50 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#00E5FF]/50 group-hover:bg-[#00E5FF]/15 group-hover:text-[#00E5FF]">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Text Content */}
        <div className="relative transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 leading-tight">
            {project.title}
          </h3>
          
          <div className="overflow-hidden">
            <p className="text-sm text-neutral-400 mb-4 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-h-0 group-hover:max-h-[80px]">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, index === 0 ? 6 : 3).map((tech) => (
              <span
                key={tech}
                className="border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] font-medium text-neutral-300 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (index === 0 ? 6 : 3) && (
              <span className="border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] font-medium text-neutral-500 backdrop-blur-md">
                +{project.techStack.length - (index === 0 ? 6 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Projects Preview Section                                      */
/* ------------------------------------------------------------------ */
export default function ProjectsPreview() {
  // Take exactly 5 projects for our custom Bento Box layout
  const displayProjects = projects.slice(0, 5);

  const gridRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const createAnimation = (el: Element | Element[], yOffset = 50, delay = 0, stagger = 0) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          stagger,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el instanceof Element ? el : el[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
            onToggle: (self) => triggers.push(self),
          },
        }
      );
    };

    if (gridRef.current) {
      const cards = gsap.utils.toArray(".bento-card", gridRef.current) as Element[];
      createAnimation(cards, 60, 0, 0.1);
    }
    if (btnRef.current) createAnimation(btnRef.current, 20, 0.2);

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Map index to bento box classes
  const getBentoClasses = (index: number) => {
    switch (index) {
      case 0:
        return "md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[500px]";
      case 1:
        return "md:col-span-1 md:row-span-1 min-h-[250px]";
      case 2:
        return "md:col-span-1 md:row-span-1 min-h-[250px]";
      case 3:
        return "md:col-span-1 md:row-span-1 min-h-[250px]";
      case 4:
        return "md:col-span-2 md:row-span-1 min-h-[250px]";
      default:
        return "md:col-span-1 md:row-span-1 min-h-[250px]";
    }
  };

  return (
    <section id="projects" className="relative isolate overflow-hidden border-y border-white/5 bg-[#07090d] px-4 py-24 text-white sm:px-6 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(0,229,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.045)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute right-[-12rem] top-1/4 -z-10 h-96 w-96 rounded-full bg-[#00E5FF]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Header */}
        <header className="mb-16 border-b border-white/10 pb-8 md:mb-20 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00E5FF]">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.9)]" />
              03 // Project Archive
            </div>
            <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              Selected <span className="text-[#00E5FF]">Works</span>
            </h2>
          </div>
          <p className="mt-5 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-white/45 md:mt-0 md:text-right">
            Robust, scalable products built with modern web technologies and a focus on thoughtful user experience.
          </p>
        </header>

        {/* Bento Box Grid */}
        <div className="mb-6 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00E5FF]">
          <span className="h-px w-8 bg-[#00E5FF]" />
          Featured Deployments
        </div>
        <div ref={gridRef} className="mb-16 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {displayProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              className={getBentoClasses(i)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            ref={btnRef as React.RefObject<HTMLAnchorElement>}
            href="/projects"
            className="group flex items-center gap-2 border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white opacity-0 transition-all duration-300 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
