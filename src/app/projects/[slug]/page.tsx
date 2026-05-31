import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trophy, ExternalLink, BookOpen } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.frontmatter.title} — Case Study`,
    description: project.frontmatter.tagline,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <div className="pb-24 pt-12 animate-fade-up">
      <article className="mx-auto w-full max-w-[800px] px-6">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={12} />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {frontmatter.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground"
              >
                {cat}
              </span>
            ))}
            {frontmatter.achievement && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-medium border border-amber-500/20 dark:border-amber-400/20 rounded-full px-2 py-0.5 bg-amber-500/5 dark:bg-amber-400/5">
                <Trophy size={10} />
                {frontmatter.achievement}
              </span>
            )}
          </div>

          <h1 className="mb-3 text-foreground text-3xl font-bold tracking-tight">
            {frontmatter.title}
          </h1>

          <p className="text-[16px] text-muted-foreground leading-relaxed mb-6">
            {frontmatter.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Timeline: {frontmatter.date}</span>

            <div className="flex items-center gap-4">
              {frontmatter.githubUrl && (
                <a
                  href={frontmatter.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={13} />
                  Code
                </a>
              )}
              {frontmatter.liveUrl && (
                <a
                  href={frontmatter.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
              {frontmatter.blogUrl && (
                <a
                  href={frontmatter.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen size={13} className="text-amber-600 dark:text-amber-400" />
                  Read Blog
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Tech Stack Bar */}
        <div className="mb-10 p-4 rounded-xl border border-border bg-secondary/20">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded bg-secondary text-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Content */}
        <div className="prose-portfolio">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
