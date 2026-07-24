"use client";

import { useRef, useState } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`project-card group relative h-full flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#00E5FF]/25 hover:shadow-[0_0_40px_rgba(0,229,255,0.06)] cursor-pointer ${className}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
      }}
    >
      {/* Spotlight follow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${50 + tilt.y * 4}% ${50 + tilt.x * -4}%, rgba(0,229,255,0.06), transparent 60%)`
            : "none",
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
