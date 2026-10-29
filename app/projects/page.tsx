import { projects } from "@/data/projects";
import ProjectsShowcase from "@/components/pages/Project/ProjectsShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Portfolio Showcase",
  description:
    "Showcasing impactful projects and technical achievements across web development, mobile apps, and creative tech.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsShowcase projects={projects} />;
}
