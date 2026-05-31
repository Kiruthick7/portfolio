import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/lib/experience";
import { Trophy, FileText, ArrowUpRight, Cpu, Database, Cloud, Terminal, Calendar, Award, Layout } from "lucide-react";
import PortfolioAgent from "@/components/ui/portfolio-agent";
import ContactForm from "@/components/ui/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Engineering Summary — Kiruthick B",
  description: "Career evolutionary narrative, technical timeline milestones, database performance metrics, and stateful contact gateway.",
};

const ARTICLES = [
  {
    title: "Why We Chose a Deterministic Fallback Engine over LLM Retries in StadiumOPS",
    category: "AI Systems",
    date: "May 2026",
    readTime: "5 min read",
    url: "https://kiruthick-builds.hashnode.dev/stadiumops-ai-assisted-command-center",
    description: "Deep engineering review of the dual-engine architecture built for the Google Agentic Premier League, detailing watchdog timers and Pydantic validators."
  }
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-16 animate-fade-up">
      <div className="container-content">

        {/* ── Recruiter Quick View Snapshot ── */}
        <section className="mb-12 rounded-xl border border-amber-500/25 dark:border-amber-400/20 bg-gradient-to-br from-amber-500/5 via-card to-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border/60">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/20">
                🚀 15-Second Recruiter Summary
              </span>
              <h2 className="text-sm font-semibold text-foreground mt-1.5 font-sans tracking-tight">Kiruthick B Profile Dashboard</h2>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <FileText size={12} />
              Open Resume (PDF)
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-xs">
            <div>
              <div className="text-muted-foreground/70 mb-0.5 font-medium">Target Specialization</div>
              <div className="font-semibold text-foreground">Backend / Data / AI Systems</div>
            </div>
            <div>
              <div className="text-muted-foreground/70 mb-0.5 font-medium">Current Status</div>
              <div className="font-semibold text-foreground flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Software Developer @ HST Global
              </div>
            </div>
            <div>
              <div className="text-muted-foreground/70 mb-0.5 font-medium">Top Achievement</div>
              <div className="font-semibold text-amber-800 dark:text-amber-400">Google APL Hackathon Top 15</div>
            </div>
            <div>
              <div className="text-muted-foreground/70 mb-0.5 font-medium">Core Stack</div>
              <div className="font-semibold text-foreground">Python, GCP, AWS, Terraform</div>
            </div>
          </div>
        </section>

        {/* Title */}
        <div className="mb-12">
          <h1 className="mb-3 text-foreground text-3xl font-bold tracking-tight">About Me</h1>
          <p className="text-muted-foreground max-w-lg text-[15px] leading-relaxed">
            Software Developer specializing in highly resilient cloud-native backend systems, advanced GenAI/ML workflows, and optimized database architectures.
          </p>
        </div>

        {/* Narrative & Strategic Focus */}
        <section className="mb-16" aria-labelledby="narrative-heading">
          <h2 id="narrative-heading" className="sr-only">Professional Journey</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6 text-[15px] text-muted-foreground leading-relaxed">
              <p>
                I build software with production constraints and reliability in mind. My technical journey began with building responsive mobile client-side widgets, which developed my appreciation for intuitive user interfaces. However, my curiosity about system scaling, transaction safety, and operational stability quickly pulled me down the stack toward backend architecture and cloud networks.
              </p>
              <p>
                Today, I focus on building reliable cloud infrastructure automation, high-performance backends, and reliable integrations for AI-powered agents. My production experience at <span className="text-foreground font-medium">HST Global</span> covers automating GCP IAM provisioning using Terraform (IaC), developing event-driven Cloud Functions, and architecting Cypress E2E automation suites.
              </p>
              <p>
                My design ethos is content-first and understated. I believe that engineering complexity should be wrapped in robust fail-safes—a philosophy I validated when building <span className="text-foreground font-medium">StadiumOPS</span> for the Google Agentic Premier League, where our deterministic fallback system kept our IPL-scale command center running flawlessly during live demo API downtime.
              </p>
              <p>
                I am moving deliberately toward data-intensive backends, cloud architectures, and AI platform engineering.
              </p>
            </div>

            {/* Visual Accomplishments Stack */}
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-500" />
                  Key Accomplishments
                </h3>
                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">#1</span>
                    <span>Top 15 Nationally in Google Agentic Premier League Hackathon (StadiumOPS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">#2</span>
                    <span>Optimized MySQL Stored Procedures (1.8s down to 120ms Latency Reduction)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">#3</span>
                    <span>Automated GCP Identity Access Management (IaC via Terraform)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">#4</span>
                    <span>Rapid promotion from Intern to Full-Time Developer @ HST Global</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Terminal size={14} className="text-purple-400" />
                  My Engineering Transition
                </h3>
                <div className="space-y-3.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span>Software Engineering (Core)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Cloud Backend Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>AI Tools & LLM Integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Data Systems & Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Career Milestone Timeline ── */}
        <section className="mb-16" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-8">
            Technical Career Timeline
          </h2>
          
          <div className="relative border-l border-border pl-5 md:pl-8 ml-2 md:ml-3 space-y-10">
            {EXPERIENCE.map((role, idx) => {
              const isHST = role.company === "HST Global";
              const showConversionDetails = isHST;

              return (
                <div key={idx} className="relative group">
                  {/* Circle timeline dot */}
                  <div className="absolute -left-[27px] md:-left-[37px] top-1.5 w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full border border-border bg-background flex items-center justify-center">
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isHST ? "bg-amber-500 animate-pulse" : "bg-muted-foreground/50"}`} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {role.title}
                        </h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                          {role.company}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">
                        {role.location} · {role.type === "full-time" ? "Full-time" : "Internship"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 sm:text-right flex items-center gap-1">
                      <Calendar size={12} />
                      {role.startDate} – {role.endDate}
                    </span>
                  </div>

                  {showConversionDetails && (
                    <div className="mb-4 p-3 rounded-lg border border-green-500/30 dark:border-green-500/20 bg-green-500/10 dark:bg-green-500/5 text-xs text-green-800 dark:text-green-400 max-w-xl">
                      <span className="font-semibold text-green-900 dark:text-green-300">Conversion Event:</span> Started as Software Developer Intern (Dec 2024 – Jun 30, 2025). Promoted to Full-Time Software Developer on Jul 1, 2025, based on performance.
                    </div>
                  )}

                  <ul className="space-y-2 mb-4">
                    {role.description.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground border border-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Conversational RAG Portfolio Agent ── */}
        <section className="mb-16" aria-labelledby="agent-heading">
          <div className="mb-6">
            <h2 id="agent-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Interact with my Career Agent
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Ask questions about my experience at HST Global, my Google Top 15 project StadiumOPS, or cloud and database skills.
            </p>
          </div>
          <PortfolioAgent />
        </section>

        {/* ── Technical Writing Showcase ── */}
        <section className="mb-16" aria-labelledby="writing-heading">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 id="writing-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-1.5">
                Technical Writing & Engineering Insights
              </h2>
              <p className="text-xs text-muted-foreground max-w-lg">
                I document architectural trade-offs, systems design concepts, and lessons from building production cloud tools.
              </p>
            </div>
            <a
              href="https://kiruthick-builds.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground font-semibold flex items-center gap-1 hover:underline"
            >
              Visit My Blog <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((art) => (
              <a
                key={art.title}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl border border-border bg-card hover:border-foreground/15 hover:bg-secondary/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-3 font-semibold">
                    <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-foreground">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:underline underline-offset-4 mb-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/90 leading-relaxed mb-4">
                    {art.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 border-t border-border/40 pt-3">
                  <span>{art.date}</span>
                  <span className="inline-flex items-center gap-0.5 group-hover:text-foreground font-semibold">
                    Read Article <ArrowUpRight size={10} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Education & Certs */}
        <div className="grid gap-12 sm:grid-cols-2 mb-16">
          <section aria-labelledby="education-heading">
            <h2 id="education-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-6">
              Education
            </h2>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="text-[15px] font-semibold text-foreground mb-1">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground/80 mt-3 border-t border-border/40 pt-3">
                  <span>{edu.period}</span>
                  <span className="font-medium text-foreground/90">{edu.detail}</span>
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="certs-heading">
            <h2 id="certs-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-6">
              Certifications & Credentials
            </h2>
            <div className="grid gap-3 sm:grid-cols-1">
              {CERTIFICATIONS.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl border border-border bg-card hover:border-foreground/15 hover:bg-secondary/20 transition-all flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center p-2 rounded bg-secondary shrink-0" aria-hidden>
                      <Trophy size={14} className="text-amber-500" />
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-foreground group-hover:underline underline-offset-2">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground/40 group-hover:text-foreground transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Dynamic Skill Showcase */}
        <section className="mb-16" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Core Skill Sets
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cloud size={16} className="text-sky-400" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Cloud & Systems</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Python, FastAPI, Node.js, GCP, AWS, Docker, Terraform.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database size={16} className="text-emerald-400" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Database & Data</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                MySQL, PostgreSQL.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={16} className="text-purple-400" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">AI & Machine Learning</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                LangChain, Groq, HuggingFace, PyTorch, CNN ResNet, RNN LSTM sequence classification.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layout size={16} className="text-pink-400" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Frontend & Interface</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                React, Next.js, Flutter, TypeScript.
              </p>
            </div>
          </div>
        </section>

        {/* Stateful Contact Funnel */}
        <section className="border-t border-border pt-16" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed mb-8">
            I am always open to discussing backend engineering roles, cloud automation, data systems, and agentic AI tools.
          </p>

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
