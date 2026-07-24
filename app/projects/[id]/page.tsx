import { projects } from "@/data/projects";
import { kebabCase } from "@/utils/utils";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetail from "@/components/pages/Project/ProjectDetail";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: kebabCase(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => kebabCase(p.title) === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => kebabCase(p.title) === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
