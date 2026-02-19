"use client";

import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="space-y-8">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* No Results */}
      {projects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-400">No projects found.</p>
        </div>
      )}
    </div>
  );
}
