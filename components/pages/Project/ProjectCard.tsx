"use client";

import { useRef } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { kebabCase } from "@/utils/utils";
import { ArrowUpRight, Github } from "lucide-react";
import Magnet from "@/components/ui/Magnet";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    // Tilt calculations (-8deg to 8deg)
    const rotateX = (yPct * -16).toFixed(2);
    const rotateY = (xPct * 16).toFixed(2);

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
    cardRef.current.style.setProperty("--rx", `${rotateX}deg`);
    cardRef.current.style.setProperty("--ry", `${rotateY}deg`);
    cardRef.current.style.setProperty("--opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
    cardRef.current.style.setProperty("--opacity", "0");
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card group relative h-full flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#00E5FF]/30 hover:shadow-[0_10px_30px_-10px_rgba(0,229,255,0.15)] ${className}`}
      style={{
        transform: "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        transition: "transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {/* React Bits Dynamic Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 z-30"
        style={{
          opacity: "var(--opacity, 0)",
          background: "radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(0, 229, 255, 0.1), transparent 60%)",
        }}
      />

      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-neutral-950">
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
        {/* Cyan tinted overlay on hover */}
        <div className="absolute inset-0 bg-[#00E5FF]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white line-clamp-2 min-h-[3rem] group-hover:text-[#00E5FF] transition-colors duration-400">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[10px] font-mono font-medium tracking-wider uppercase text-neutral-400 bg-white/[0.04] rounded-full border border-white/[0.06] group-hover:border-[#00E5FF]/20 group-hover:text-[#00E5FF]/70 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-medium tracking-wider text-neutral-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-1">
          <Magnet padding={40} magnetStrength={3}>
            <Link
              href={`/projects/${kebabCase(project.title)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-black bg-[#00E5FF] rounded-lg hover:bg-[#00E5FF]/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 cursor-pointer"
            >
              View Project
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </Magnet>
          <Magnet padding={40} magnetStrength={3}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white/80 bg-white/[0.04] border border-white/[0.08] rounded-lg hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          </Magnet>
        </div>
      </div>
    </article>
  );
}
