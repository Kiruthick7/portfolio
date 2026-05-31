"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, ProjectCategory } from "@/lib/projects";
import { ArrowRight, Trophy, Code, Cloud, Brain, Cpu, ExternalLink, Smartphone, BookOpen } from "lucide-react";
import { Github } from "@/components/ui/icons";

const CATEGORIES: (ProjectCategory | "All")[] = ["All", "AI", "Backend", "Frontend", "Mobile", "Cloud", "ML"];

function getCategoryIcon(cat: ProjectCategory) {
  switch (cat) {
    case "AI":
      return <Brain size={14} className="text-purple-400" />;
    case "Backend":
      return <Code size={14} className="text-sky-400" />;
    case "Frontend":
      return <Code size={14} className="text-pink-400" />;
    case "Mobile":
      return <Smartphone size={14} className="text-rose-400" />;
    case "Cloud":
      return <Cloud size={14} className="text-emerald-400" />;
    case "ML":
      return <Cpu size={14} className="text-amber-600 dark:text-amber-400" />;
    default:
      return <Code size={14} />;
  }
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "All") return true;
    return p.categories.includes(activeCategory);
  });

  return (
    <div className="pb-24 pt-16">
      <section className="container-content animate-fade-up">
        {/* Header */}
        <div className="mb-10">
          <h1 className="mb-3 text-foreground">Projects</h1>
          <p className="text-muted-foreground max-w-lg text-[15px] leading-relaxed">
            A selective collection of backend engineering, cloud automation, and AI systems. Deployed solutions alongside prototypes designed with production constraints.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground font-medium"
                  : "bg-secondary/40 text-muted-foreground border-border hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const isStadiumOps = project.slug === "stadiumops";
            const isFlagship = project.status === "flagship";
            
            return (
              <div
                key={project.slug}
                className={`group relative rounded-xl border p-6 transition-all duration-300 flex flex-col justify-between min-h-[260px] ${
                  isStadiumOps
                    ? "md:col-span-2 lg:col-span-3 border-amber-500/40 dark:border-amber-400/30 bg-gradient-to-br from-amber-500/5 via-card to-card hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]"
                    : isFlagship
                      ? "border-border bg-card hover:border-foreground/20 hover:bg-card/80"
                      : "border-border/60 bg-card/45 hover:border-foreground/15 hover:bg-card/40"
                }`}
              >
                <div className="flex flex-col gap-3.5">
                  {/* Header line */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{project.date}</span>
                    <div className="flex items-center gap-1.5">
                      {isStadiumOps && (
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                          🏆 Google Agentic Premier League Hackathon Finalist
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <Link href={`/projects/${project.slug}`} className="relative z-10">
                        <h2 className={`font-bold text-foreground group-hover:underline underline-offset-4 cursor-pointer ${
                          isStadiumOps ? "text-lg md:text-xl" : "text-[16px]"
                        }`}>
                          {project.title}
                        </h2>
                      </Link>
                      {project.achievement && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 border border-amber-500/20 dark:border-amber-400/20 rounded-full px-2 py-0.5 bg-amber-500/5 dark:bg-amber-400/5 font-medium" title={project.achievement}>
                          <Trophy size={9} />
                          Top 15 Nationally
                        </span>
                      )}
                    </div>
                    <p className={`text-muted-foreground leading-relaxed ${
                      isStadiumOps ? "text-[14px] max-w-3xl line-clamp-3 mb-2" : "text-[13px] line-clamp-3"
                    }`}>
                      {isStadiumOps 
                        ? "Winning entry in the Google Agentic Premier League. A real-time command-and-control platform designed for IPL-scale venues (60K+ capacity) operating under weather and safety disruptions. Built with a dual-engine architecture: an LLM recommendation assistant with a robust deterministic rules fallback to guarantee zero downtime."
                        : project.tagline
                      }
                    </p>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.stack.map((tech, idx) => {
                      if (!isStadiumOps && idx >= 3) return null;
                      return (
                        <span
                          key={tech}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border/40"
                        >
                          {tech}
                        </span>
                      );
                    })}
                    {!isStadiumOps && project.stack.length > 3 && (
                      <span className="text-[10px] text-muted-foreground/60 px-1 py-0.5">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer divider & actions */}
                <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between gap-2">
                  {/* Categories list */}
                  <div className="flex items-center gap-1.5">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded"
                      >
                        {getCategoryIcon(cat)}
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 p-1.5 rounded-lg border border-border bg-secondary/35 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all flex items-center justify-center shrink-0"
                        title="View Source on GitHub"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 p-1.5 rounded-lg border border-border bg-secondary/35 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all flex items-center justify-center shrink-0"
                        title="View Live Site"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.blogUrl && (
                      <a
                        href={project.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 p-1.5 rounded-lg border border-border bg-secondary/35 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all flex items-center justify-center shrink-0"
                        title="Read Case Study Blog Post"
                      >
                        <BookOpen size={14} className="text-amber-600 dark:text-amber-400" />
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs text-muted-foreground group-hover:text-foreground font-semibold inline-flex items-center gap-0.5 transition-colors after:absolute after:inset-0 after:content-['']"
                    >
                      Case Study <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
