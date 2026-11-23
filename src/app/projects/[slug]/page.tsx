import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Ammar Riaz`, description: project.description } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pb-24">
      <div className="container pt-10">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-[#aaaabd] hover:text-white">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <header className="pt-16 pb-10">
          <p className="eyebrow">{project.category} · {project.platform}</p>
          <h1 className="section-title">{project.title}</h1>
          <p className="muted max-w-2xl text-lg">{project.description}</p>
        </header>
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-[#10121a]">
          <Image src={project.image} alt={`${project.title} project preview`} fill className="object-cover" priority />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold"><ExternalLink size={16}/> Live Demo</a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold"><GitBranch size={16}/> GitHub</a>}
        </div>
        <section className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            ["Project overview", project.description],
            ["Purpose", project.purpose],
            ["My contribution", project.contribution],
            ["Development challenges", project.challenges],
            ["Lessons learned", project.lessons],
          ].map(([title, text]) => (
            <article key={title} className="glass rounded-2xl p-7">
              <h2 className="mb-3 text-xl font-semibold">{title}</h2>
              <p className="muted leading-7">{text}</p>
            </article>
          ))}
        </section>
        <section className="glass mt-5 rounded-2xl p-7">
          <h2 className="mb-4 text-xl font-semibold">Implemented features</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => <li key={feature} className="muted flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-violet-400"/> {feature}</li>)}
          </ul>
          <h2 className="mb-4 mt-8 text-xl font-semibold">Technologies</h2>
          <div className="flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-violet-400/20 bg-violet-400/8 px-3 py-1.5 text-sm text-violet-200">{tech}</span>)}</div>
        </section>
      </div>
    </main>
  );
}
