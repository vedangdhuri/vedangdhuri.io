"use client";

import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative bg-gradient-to-br from-[#0f1e30] to-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:shadow-neutral-900/50 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <div className="text-8xl font-bold text-neutral-700 italic select-none">
            v
          </div> */}
          <img src={project.thumbnail} alt={project.title} />
        </div>
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-100 line-clamp-2 min-h-[3.5rem]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-750 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-900 bg-neutral-100 rounded-lg hover:bg-white transition-all duration-300 group/btn"
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
    </article>
  );
}
