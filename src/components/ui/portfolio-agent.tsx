"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Cpu, User, ArrowRight, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { label: "Tell me about StadiumOPS", q: "Tell me about StadiumOPS." },
  { label: "AI Engineering experience?", q: "What AI projects and systems has Kiruthick built?" },
  { label: "Data Engineering background?", q: "What Data Engineering experience and skills does he have?" },
  { label: "Work at HST Global?", q: "Tell me about his work and responsibilities at HST Global." },
  { label: "Cloud & Devops technologies?", q: "What cloud and DevOps technologies has he used?" },
];

const KNOWLEDGE_BASE: Record<string, string> = {
  default: `### Portfolio Recruiter Assistant
I am Kiruthick's **Portfolio Knowledge Agent**. Ask me anything about his experience, projects, skills, or certifications!

Here are some suggested topics:
* **StadiumOPS**: His flagship project that placed in the **Top 15 nationally** in the Google Agentic Premier League.
* **HST Global**: His current full-time Software Developer role (focusing on GCP, IaC with Terraform, and event-driven functions).
* **Data Engineering Transition**: His skills in SQL stored procedures, MySQL/PostgreSQL, and PySpark.
* **AI Systems & RAG**: Practical experience building dual-engine systems, MCP servers, and recursive character-splitter RAG pipelines.`,

  stadiumops: `### 🏆 StadiumOPS (Flagship Project)
StadiumOPS is a real-time command-and-control platform designed for IPL-scale cricket venues (60,000+ capacity) during crowd-coordination emergencies and severe weather disruptions.

#### **Key Credibility Indicators:**
* **Top 15 Nationally**: Placed among the top 15 teams in the **Google Agentic Premier League 2026** national hackathon.
* **Dual-Engine Architecture**: Built with an **AI Recommendation Engine** (Groq + LLaMA 3) and a **Deterministic Rules Fallback Engine** running concurrently in parallel.
* **Fail-Safe Design**: If AI API latency exceeds 1.2 seconds or goes offline entirely, the deterministic fallback seamlessly takes over, ensuring the operations dashboard never goes blind.
* **Pydantic Validation**: Enforces strict type-safe schemas on all AI recommendation outputs to prevent non-deterministic payload drift.
* **Optimized Networking**: Implemented low-overhead **stateless short-polling (4s interval)** instead of WebSockets to survive cell tower congestion inside crowded venues.`,

  ai: `### 🤖 AI, GenAI & Machine Learning (ML) Capabilities
Kiruthick specializes in **AI Systems, Generative AI, and Machine Learning** rather than generic API integrations. He designs fail-safe, production-grade ML/DL pipelines and LLM applications.

#### **Core AI & ML Projects:**
* **StadiumOPS (GenAI / AI Systems)**: Dual-engine platform featuring parallel execution of Groq LLaMA 3 and deterministic fallback safety checks. Integrates strict Pydantic parsing.
* **Model Context Protocol (MCP) (AI Tooling)**: Built a custom **MCP Server** in Python for Dev.to publishing, allowing IDE AI agents (like Claude Desktop) to invoke publishing functions as native tools.
* **Ingestion-to-Q&A RAG Pipeline (GenAI)**: Developed a robust Retrieval-Augmented Generation pipeline using **LangChain** and **Groq LLaMA 3**. Implemented dynamic recursive character chunk splitters (500 chars / 50 overlap) and strict prompt context-binding to eliminate hallucination.
* **Deepfake Video Detection (DeepTruth) (Machine Learning / Deep Learning)**: Built a two-stage deep learning/ML pipeline (ResNet CNN spatial extraction followed by LSTM temporal tracking) yielding a **97.76% validation accuracy**.

#### **Certifications & Training:**
* **Kaggle Certification**: Holds a verified **Generative AI Intensive** certificate from Kaggle.`,

  data: `### 📊 Data Engineering & Core Databases
Kiruthick holds an **M.Tech in Integrated Computer Science with a specialization in Data Science** from VIT Vellore, providing him with a strong academic foundation in big data and database theory.

#### **Technical Evidence & Skills:**
* **GCP Event Pipelines**: Builds event-driven data ingestion routes using **GCP Pub/Sub** and **Cloud Functions** in production at HST Global.
* **SQL Optimization**: Designed highly optimized database schemas and high-performance **MySQL Stored Procedures** for Udayam. Aggregation queries run natively in database memory, reducing API latencies from **1.8s down to 120ms** and slashing serverless database compute costs.
* **Data Pipelines**: Staging PySpark ingestion and ELT architectures. Experiential knowledge of **MySQL**, **PostgreSQL**, and data warehouse architectures.
* **Skills Staggering**: Currently transitioning his backend systems experience toward heavy-duty data orchestration (Prefect, Airflow) and analytics warehousing (BigQuery, Snowflake).`,

  hst: `### 💼 Professional Experience @ HST Global
Kiruthick is currently a **Software Developer** at **HST Global** based in Bengaluru.

#### **Top Credibility Signals:**
* **Intern-to-Full-Time Conversion**: Started as a Software Developer Intern (Dec 2024 – Jun 30, 2025). Converted to a **Full-Time Software Developer** on July 1, 2025, based on outstanding performance and project ownership.
* **Infrastructure-as-Code (IaC)**: Automates production GCP IAM role provisioning and environment configurations using **Terraform**, enforcing strict security-by-default access policies.
* **Event-Driven Services**: Architects highly scalable, event-driven background handlers deploying **GCP Cloud Functions** triggered by **GCP Pub/Sub** messaging queues.
* **Testing Engineering**: Developed comprehensive E2E automation suites utilizing **Cypress**, decreasing deployment regression incidents significantly.`,

  cloud: `### ☁️ Cloud, DevOps & Infrastructure Skills
Kiruthick designs backends with **production-grade serverless scalability** and operational efficiency.

#### **GCP Credentials (HST Global):**
* **Terraform IaC**: Automates structural IAM access, environment resources, and cloud instances.
* **Serverless Compute**: Deploys lightweight microservices via **GCP Cloud Functions** and scalable containers on **GCP Cloud Run**.
* **Messaging Queues**: Connects distributed event-driven systems using **GCP Pub/Sub**.

#### **AWS Credentials (Udayam Financial Backend):**
* **Serverless Deployment**: Built the **Udayam Financial Backend Platform** (FastAPI) deployed entirely on **AWS Lambda** routed through **AWS API Gateway**, keeping idle compute costs at exactly **$0.00**.
* **Lambda Connection Pooling**: Implemented persistent connection pooling outside the serverless execution loop, reducing AWS Lambda container overhead and preventing database lockouts.
* **Secrets Management**: Integrated **AWS Secrets Manager** to rotate database credentials dynamically without requiring application redeployments.`,
};

export default function PortfolioAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: KNOWLEDGE_BASE.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      // Delay slightly to allow the DOM to render the new message node
      const timer = setTimeout(scrollToBottom, 60);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping]);

  const handleQuery = (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: queryText }]);
    setInput("");
    setIsTyping(true);

    // Dynamic semantic/keyword parsing to mimic true agent behavior
    setTimeout(() => {
      const normalized = queryText.toLowerCase();
      let response = "";

      if (normalized.includes("stadiumops") || normalized.includes("google") || normalized.includes("finalist") || normalized.includes("premier")) {
        response = KNOWLEDGE_BASE.stadiumops;
      } else if (normalized.includes("ai") || normalized.includes("genai") || normalized.includes("rag") || normalized.includes("mcp") || normalized.includes("deepfake")) {
        response = KNOWLEDGE_BASE.ai;
      } else if (normalized.includes("data") || normalized.includes("pyspark") || normalized.includes("database") || normalized.includes("sql") || normalized.includes("stored")) {
        response = KNOWLEDGE_BASE.data;
      } else if (normalized.includes("hst") || normalized.includes("global") || normalized.includes("experience") || normalized.includes("intern")) {
        response = KNOWLEDGE_BASE.hst;
      } else if (normalized.includes("cloud") || normalized.includes("aws") || normalized.includes("gcp") || normalized.includes("terraform") || normalized.includes("lambda") || normalized.includes("devops")) {
        response = KNOWLEDGE_BASE.cloud;
      } else {
        response = `### 🔍 Agent Search Details
I searched Kiruthick's portfolio and resume for **"${queryText}"**. 

Here is a quick summary:
* **Academic**: M.Tech Integrated Data Science from VIT Vellore (CGPA: 7.95).
* **Professional**: Full-Time Software Developer @ HST Global building GCP cloud backends.
* **Flagship Project**: StadiumOPS, a dual-engine FastAPI/React command center placing Top 15 nationally in Google's hackathon.
* **Core Technical Stack**: Python, FastAPI, TypeScript, GCP (Pub/Sub, IAM), AWS Lambda, MySQL/PostgreSQL, Terraform, LangChain.

Feel free to click one of the suggested chips below to query deep structural details!`;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Cpu size={14} className="text-amber-500" />
            Recruiter & Hiring Manager AI Assistant
          </h3>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Powered by Gemini Knowledge
        </span>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-secondary/5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 ${
              msg.role === "user"
                ? "bg-foreground border-foreground text-background"
                : "bg-secondary border-border text-foreground"
            }`}>
              {msg.role === "user" ? <User size={13} /> : <Sparkles size={13} className="text-amber-500" />}
            </div>

            <div className={`p-3.5 rounded-xl border leading-relaxed ${
              msg.role === "user"
                ? "bg-foreground/5 border-border/80 text-foreground"
                : "bg-card border-border/50 text-muted-foreground prose-portfolio"
            }`}>
              {msg.role === "user" ? (
                <p className="font-medium text-foreground">{msg.content}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ 
                  __html: formatMarkdown(msg.content)
                }} />
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="h-8 w-8 rounded-full border bg-secondary border-border text-foreground flex items-center justify-center shrink-0">
              <Sparkles size={13} className="text-amber-500 animate-spin" />
            </div>
            <div className="p-3.5 rounded-xl border bg-card border-border/50 text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      <div className="p-3 border-t border-border bg-secondary/15 flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => handleQuery(s.q)}
            className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all font-medium flex items-center gap-0.5 cursor-pointer"
          >
            {s.label}
            <ArrowRight size={10} />
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQuery(input);
        }}
        className="p-3 border-t border-border bg-card flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a technical question (e.g. Tell me about his Terraform usage)..."
          className="flex-1 bg-secondary/40 border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/20"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}

// Lightweight static markdown-to-HTML parser to support instant client-side rendering
function formatMarkdown(md: string): string {
  let html = md;
  // Titles
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-foreground mb-2 mt-3">$1</h4>');
  html = html.replace(/^#### (.*$)/gim, '<h5 class="text-xs font-semibold text-foreground mb-1.5 mt-2">$1</h5>');
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>');
  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-muted-foreground mb-1">$1</li>');
  // Code highlight
  html = html.replace(/`(.*?)`/g, '<code class="bg-secondary px-1 py-0.5 rounded text-xs font-mono border border-border text-foreground">$1</code>');
  // Linebreaks
  html = html.replace(/\n/g, "<br />");
  return html;
}
