import Link from "next/link";
import { Trophy, ArrowRight, ExternalLink, Code, Cloud, Brain, Cpu } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { PROJECTS, ProjectCategory } from "@/lib/projects";
import { EXPERIENCE } from "@/lib/experience";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiruthick B — Software Developer",
  description:
    "Software developer at HST Global building cloud-native backend systems and AI-powered applications. Top 15 — Google Agentic Premier League 2026.",
};

function getCategoryIcon(cat: ProjectCategory) {
  switch (cat) {
    case "AI":
      return <Brain size={14} className="text-purple-400" />;
    case "Backend":
      return <Code size={14} className="text-sky-400" />;
    case "Cloud":
      return <Cloud size={14} className="text-emerald-400" />;
    case "ML":
      return <Cpu size={14} className="text-amber-400" />;
    default:
      return <Code size={14} />;
  }
}

export default function HomePage() {
  const currentRole = EXPERIENCE[0];

  return (
    <div className="pb-24">
      {/* ── Hero ── */}
      <section className="container-content pt-20 pb-20 animate-fade-up">
        {/* Current role pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden />
          <span className="text-xs text-muted-foreground">
            {currentRole.title} @ {currentRole.company} · {currentRole.location}
          </span>
        </div>

        {/* Name + positioning */}
        <h1 className="mb-4 text-foreground">
          Kiruthick B
        </h1>
        <p className="mb-6 max-w-lg text-[17px] text-muted-foreground leading-relaxed">
          Building cloud-native backend systems and AI-powered applications.
          Interested in the intersection of reliable infrastructure and intelligent software.
        </p>

        {/* Google badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3.5 py-2">
          <Trophy size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-sm text-foreground/90">
            <span className="font-medium">Top 15</span>
            <span className="text-muted-foreground"> — Google Agentic Premier League 2026</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            View Projects
            <ArrowRight size={14} />
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
          >
            View Resume →
          </a>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container-content">
        <hr className="border-border" />
      </div>

      {/* ── All Projects ── */}
      <section className="container-content pt-16 pb-4" aria-labelledby="projects-heading">
        <div className="mb-8 flex items-center justify-between">
          <h2 id="projects-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            All projects <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const isStadiumOps = project.slug === "stadiumops";
            
            return (
              <div
                key={project.slug}
                className={`group relative rounded-xl border p-6 transition-all duration-300 flex flex-col justify-between min-h-[260px] ${
                  isStadiumOps
                    ? "md:col-span-2 lg:col-span-3 border-amber-500/50 dark:border-amber-400/40 bg-gradient-to-br from-amber-500/5 via-card to-card shadow-[0_0_15px_rgba(245,158,11,0.04)] dark:shadow-[0_0_25px_rgba(245,158,11,0.02)] hover:border-amber-500/75 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]"
                    : "border-border bg-card hover:border-foreground/20 hover:bg-card/80"
                }`}
              >
                <div className="flex flex-col gap-3.5">
                  {/* Header line */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{project.date}</span>
                    <div className="flex items-center gap-1.5">
                      {isStadiumOps && (
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30">
                          🏆 Google Agentic Premier League Hackathon Finalist
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <Link href={`/projects/${project.slug}`} className="relative z-10">
                        <h3 className={`font-bold text-foreground group-hover:underline underline-offset-4 cursor-pointer ${
                          isStadiumOps ? "text-lg md:text-xl" : "text-[16px]"
                        }`}>
                          {project.title}
                        </h3>
                      </Link>
                      {project.achievement && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 dark:text-amber-400 border border-amber-500/20 dark:border-amber-400/20 rounded-full px-2 py-0.5 bg-amber-500/5 dark:bg-amber-400/5 font-medium" title={project.achievement}>
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

      {/* ── Experience Snapshot ── */}
      <section className="container-content pt-16 pb-4" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Experience
        </h2>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[15px] font-semibold text-foreground">{currentRole.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                  Full-time
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {currentRole.company} · {currentRole.location}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {currentRole.startDate} – {currentRole.endDate}
            </span>
          </div>
          <ul className="space-y-2">
            {currentRole.description.slice(0, 3).map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {currentRole.stack.map((tech) => (
              <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trajectory Statement ── */}
      <section className="container-content pt-16">
        <blockquote className="border-l-2 border-border pl-5">
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            I&apos;m a software developer moving deliberately toward data engineering and
            AI engineering. My current work in cloud infrastructure and AI-powered systems
            is building the foundation for that path.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/60">
            <Link href="/about" className="hover:text-foreground transition-colors underline underline-offset-4">
              More about me →
            </Link>
          </p>
        </blockquote>
      </section>

      {/* ── Social links ── */}
      <section className="container-content pt-12">
        <div className="flex items-center gap-4">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href={SITE.hashnode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink size={14} />
            Writing
          </a>
        </div>
      </section>
    </div>
  );
}
