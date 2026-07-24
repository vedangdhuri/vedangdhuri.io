/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Magnet from "@/components/ui/Magnet";
import { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const readmeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // --- Mount entrance timeline ---
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      // Back button
      if (backRef.current) {
        tl.fromTo(
          backRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 }
        );
      }

      // Hero image reveal
      if (heroImgRef.current) {
        tl.fromTo(
          heroImgRef.current,
          { opacity: 0, scale: 1.08, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Title — character-by-character reveal
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { opacity: 0, y: 40, rotateX: -50 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.025,
            ease: "back.out(1.4)",
          },
          "-=0.7"
        );
      }

      // Description
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      // Tech tags stagger
      if (tagsRef.current) {
        const tags = tagsRef.current.children;
        tl.fromTo(
          tags,
          { opacity: 0, y: 12, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Action buttons
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
      }



      // --- README section reveal ---
      if (readmeRef.current) {
        gsap.fromTo(
          readmeRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: readmeRef.current,
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
  }, [project]);

  // Split title into character spans
  const titleChars = project.title.split("").map((char, i) => (
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00E5FF]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[400px] h-[300px] bg-[#0A3BFF]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 relative z-10">
        {/* Back to Projects */}
        <Link
          ref={backRef}
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#00E5FF] transition-colors duration-300 mb-10 group opacity-0"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-xs font-mono tracking-widest uppercase">
            Back to Projects
          </span>
        </Link>

        {/* Hero Section */}
        <header className="mb-16 space-y-8">
          {/* Thumbnail */}
          {project.thumbnail && (
            <div
              ref={heroImgRef}
              className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/[0.06] opacity-0"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            </div>
          )}

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
            style={{ perspective: "600px" }}
          >
            {titleChars}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base md:text-lg text-neutral-400 max-w-3xl leading-relaxed opacity-0"
          >
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div ref={tagsRef} className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase text-neutral-400 bg-white/[0.03] rounded-full border border-white/[0.06] hover:border-[#00E5FF]/25 hover:text-[#00E5FF]/70 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div ref={actionsRef} className="flex flex-wrap gap-3 opacity-0">
            <Magnet padding={50} magnetStrength={3}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-[#00E5FF] rounded-xl hover:bg-[#00E5FF]/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Magnet>
            {project.liveUrl && (
              <Magnet padding={50} magnetStrength={3}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/80 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Magnet>
            )}
          </div>
        </header>



        {/* README Section */}
        {project.readme ? (
          <section ref={readmeRef} className="opacity-0">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/50">
                README
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            {/* Glass container for markdown */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm p-6 sm:p-8 md:p-10">
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-neutral-200 prose-headings:font-semibold prose-p:text-neutral-400 prose-p:leading-relaxed prose-a:text-[#00E5FF] hover:prose-a:text-[#00E5FF]/80 prose-strong:text-neutral-200 prose-code:text-[#00E5FF]/80 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-white/[0.06] prose-pre:rounded-xl prose-li:text-neutral-400 prose-li:marker:text-[#00E5FF]/40 prose-hr:border-white/[0.06]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.readme}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        ) : (
          <div className="text-neutral-600 font-mono text-sm italic">
            No README available for this project.
          </div>
        )}
      </div>
    </div>
  );
}
