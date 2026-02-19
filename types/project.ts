export type ProjectCategory = "personal" | "professional" | "hackathon";

export interface Project {
  title: string;
  shortDescription: string;
  techStack: string[];
  category: ProjectCategory;
  thumbnail: string;
  github: string;
  liveUrl?: string;
  readme?: string; // Markdown content
}
