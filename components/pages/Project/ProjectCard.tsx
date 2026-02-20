"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { kebabCase } from "@/utils/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -12;
    const tiltY = (x - 0.5) * 12;
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
      className="group relative bg-indigo-950/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -4 : 0}px)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
      }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${50 + tilt.y * 4}% ${50 + tilt.x * -4}%, rgba(59,130,246,0.08), transparent 60%)`
            : "none",
        }}
      />

      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden bg-neutral-900/50">
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {/* Hover tint */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white line-clamp-2 min-h-[3.5rem] group-hover:text-blue-300 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/10 hover:border-blue-500/40 hover:bg-white/10 hover:text-blue-300 transition-all duration-300"
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Link
              href={`/projects/${kebabCase(project.title)}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              Read More
            </Link>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-900 bg-neutral-100 rounded-lg hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 group/btn"
            >
              Github Link
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
