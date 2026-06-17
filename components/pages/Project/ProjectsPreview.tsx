"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/data/projects";
import { kebabCase } from "@/utils/utils";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Starfield Background                                               */
/* ------------------------------------------------------------------ */
const Starfield = () => {
  const [stars, setStars] = useState<
    Array<{ left: number; top: number; size: number; opacity: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    setStars(
      [...Array(60)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Featured Project Card (Hero-style, full width)                     */
/* ------------------------------------------------------------------ */
const FeaturedProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    <Link href={`/projects/${kebabCase(project.title)}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-700 cursor-pointer"
      >
        {/* Thumbnail */}
        <div className="absolute inset-0">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Spotlight follow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.07), transparent 60%)`,
          }}
        />

        {/* Scan-line sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent -top-full group-hover:top-full transition-all duration-[2000ms] ease-linear" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
          {/* Mission badge + FEATURED */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Featured
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-400 tracking-wider">
              MISSION-{String(index + 1).padStart(3, "0")}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors duration-500 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-300 mb-5 max-w-2xl leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech stack + status */}
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/10 group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-all duration-500"
              >
                {tech}
              </span>
            ))}
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-green-400 bg-green-500/10 border border-green-500/20 rounded-full ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Corner coordinates */}
        <div className="absolute top-4 right-4 text-[10px] font-mono text-white/20 group-hover:text-cyan-400/40 transition-colors duration-500">
          [{mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}]
        </div>

        {/* Grid overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </Link>
  );
};

/* ------------------------------------------------------------------ */
/*  Mission Card (grid items)                                          */
/* ------------------------------------------------------------------ */
const MissionCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    <Link href={`/projects/${kebabCase(project.title)}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative h-full flex flex-col bg-[#080c14] rounded-xl border border-white/[0.07] overflow-hidden hover:border-cyan-500/30 transition-all duration-700 cursor-pointer"
        style={{
          transform: `perspective(800px) rotateX(${isHovered ? (mousePos.y - 50) * -0.08 : 0}deg) rotateY(${isHovered ? (mousePos.x - 50) * 0.08 : 0}deg)`,
          transition: isHovered
            ? "transform 0.1s ease-out, border-color 0.7s"
            : "transform 0.5s ease-out, border-color 0.7s",
        }}
      >
        {/* Mission header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="text-[11px] font-mono text-gray-500 tracking-wider uppercase">
            Mission-{String(index + 1).padStart(3, "0")}
          </span>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-500">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              CODE
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-neutral-900/50">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/50 to-transparent" />

          {/* Scan line on hover */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -top-full group-hover:top-full transition-all duration-[1500ms] ease-linear" />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {/* Spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.06), transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 space-y-3">
          <h3 className="text-lg font-bold text-white line-clamp-2 min-h-[3rem] group-hover:text-cyan-200 transition-colors duration-500">
            {project.title}
          </h3>

          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed flex-1">
            {project.shortDescription}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[11px] font-medium bg-white/[0.04] text-gray-400 rounded border border-white/[0.06] group-hover:border-cyan-500/20 group-hover:text-cyan-300/80 transition-all duration-500"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-0.5 text-[11px] font-medium text-gray-500 rounded border border-white/[0.06]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.01]">
          <span className="text-xs text-gray-500 font-mono group-hover:text-cyan-400/70 transition-colors duration-500">
            {">"} read_more
          </span>
          <svg
            className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Projects Preview Section                                      */
/* ------------------------------------------------------------------ */
export default function ProjectsPreview() {
  const featuredProject = projects[0];
  const gridProjects = projects.slice(1, 5);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Heading reveal
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
            onToggle: (self) => triggers.push(self),
          },
        }
      );
    }

    // Subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "restart none none reset",
            onToggle: (self) => triggers.push(self),
          },
        }
      );
    }

    // Featured card
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 82%",
            toggleActions: "restart none none reset",
            onToggle: (self) => triggers.push(self),
          },
        }
      );
    }

    // Grid cards stagger
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "restart none none reset",
            onToggle: (self) => triggers.push(self),
          },
        }
      );
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Starfield background */}
      <Starfield />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-indigo-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header — Terminal-style */}
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400/70 uppercase tracking-[0.3em]">
              // Mission Log
            </span>
          </div>

          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-neutral-100 tracking-tight opacity-0"
          >
            Projects
          </h2>

          <p
            ref={subtitleRef}
            className="text-base font-mono text-gray-500 max-w-xl opacity-0"
          >
            <span className="text-cyan-500/60">{">"}</span> Completed
            deployments and active operations —{" "}
            <span className="text-gray-400">{projects.length} missions</span>{" "}
            logged
          </p>

          {/* Accent line */}
          <div className="h-[1px] w-full max-w-xs bg-gradient-to-r from-cyan-500/40 via-cyan-500/10 to-transparent" />
        </div>

        {/* Featured Project */}
        <div ref={featuredRef} className="mb-8">
          <FeaturedProjectCard project={featuredProject} index={0} />
        </div>

        {/* Grid Projects */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {gridProjects.map((project, i) => (
            <MissionCard key={project.title} project={project} index={i + 1} />
          ))}
        </div>

        {/* View All — Command prompt style */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-mono text-gray-300 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-cyan-500/[0.05] hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.08)] transition-all duration-700 overflow-hidden cursor-pointer focus:outline-none"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative flex items-center gap-2">
              <span className="text-cyan-500/60">{">"}</span>
              EXECUTE view_all_missions
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
