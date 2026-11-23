export type ProjectCategory = "Web Applications" | "Frontend Development" | "Mobile Applications";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  platform: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  apkUrl?: string;
  featured: boolean;
  purpose: string;
  contribution: string;
  features: string[];
  challenges: string;
  lessons: string;
};
