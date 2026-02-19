import { projects } from "@/data/projects";
import { kebabCase } from "@/utils/utils";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Metadata } from "next";

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

  return (
    <main className="min-h-screen text-neutral-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back to Projects */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors duration-300 mb-8 group"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Projects</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          {project.thumbnail && (
            <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden mb-8 border border-neutral-800">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-neutral-400 mb-6">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-medium bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-white transition-colors"
            >
              View on GitHub
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800 text-neutral-100 rounded-lg font-medium border border-neutral-700 hover:bg-neutral-700 transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </header>

        {project.readme ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-200 pb-4">
              Read Me
            </h2>
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-neutral-200 prose-p:text-neutral-400 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.readme}
              </ReactMarkdown>
            </div>
          </section>
        ) : (
          <div className="text-neutral-500 italic">
            No Read Me available for this project.
          </div>
        )}
      </div>
    </main>
  );
}
