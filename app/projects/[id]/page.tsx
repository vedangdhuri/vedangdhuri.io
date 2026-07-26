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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vedangdhuri.xyz";
  const projectUrl = `${siteUrl}/projects/${id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.shortDescription,
    url: projectUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "Vedang Dhuri",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
