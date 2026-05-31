// All project data — Dynamically compiled static registry from MDX content
// RUN: npm run sync-projects to regenerate this file!

export type ProjectStatus = "flagship" | "supporting" | "archived";
export type ProjectCategory = "AI" | "Backend" | "Cloud" | "ML" | "Mobile" | "Frontend";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  categories: ProjectCategory[];
  stack: string[];
  date: string;
  achievement?: string;
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  featured: boolean;
}

const ALL_PROJECTS: Project[] = [
  {
    "slug": "stadiumops",
    "title": "StadiumOPS (AI Emergency Ops Platform)",
    "tagline": "🏆 Top 15 Nationally — Google Agentic Premier League. Real-time crowd management dashboard featuring parallel execution of Groq LLaMA 3 and deterministic watchdog fallbacks.",
    "description": "Winning entry in the Google Agentic Premier League. A real-time command-and-control platform designed for IPL-scale venues (60k+ capacity) operating under weather and safety disruptions. Built with a dual-engine architecture: an LLM recommendation assistant with a robust deterministic rules fallback to guarantee zero downtime.",
    "status": "flagship",
    "categories": [
      "AI",
      "Frontend",
      "Backend"
    ],
    "stack": [
      "TypeScript",
      "FastAPI",
      "Python",
      "React",
      "TailwindCSS",
      "Redis"
    ],
    "date": "May 2026",
    "githubUrl": "https://github.com/Kiruthick7/StadiumOPS",
    "liveUrl": "https://cricketpulse-neural-uplink-77.web.app/",
    "blogUrl": "https://kiruthick-builds.hashnode.dev/stadiumops-ai-assisted-command-center",
    "featured": true
  },
  {
    "slug": "udayam_fastapi",
    "title": "Udayam Financial Backend Platform",
    "tagline": "Serverless financial ledger backend deployed on AWS Lambda. Features high-performance MySQL connection pooling and highly optimized stored procedures.",
    "description": "Commercial multi-company financial reporting engine. Relies on persistent database connection pooling outside the serverless execution loop, reducing API gateway latency from 1.8s down to 120ms and slashing serverless database compute costs.",
    "status": "flagship",
    "categories": [
      "Cloud",
      "Backend"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "AWS",
      "Docker",
      "MySQL"
    ],
    "date": "Dec 2025",
    "githubUrl": "https://github.com/Kiruthick7/udayam_fastapi",
    "featured": true
  },
  {
    "slug": "udayam_trailbalance",
    "title": "Udayam Financial Mobile Platform",
    "tagline": "Enterprise double-entry ledger mobile client built with Flutter. Translates complex trial balances and multi-company account summaries into highly readable, real-time dashboards.",
    "description": "Companion financial reporting client built for business executives. Translates high-volume multi-company ledger balances into unified spatial assets using state-driven widgets and reactive Dart pipelines.",
    "status": "supporting",
    "categories": [
      "Cloud",
      "Mobile",
      "Frontend"
    ],
    "stack": [
      "Dart",
      "AWS",
      "Flutter"
    ],
    "date": "Jan 2026",
    "githubUrl": "https://github.com/Kiruthick7/udayam_trailbalance",
    "featured": true
  },
  {
    "slug": "pulseai",
    "title": "PulseAI: Real-Time Patient Monitoring",
    "tagline": "Edge-compatible clinical alert system utilizing structured stream ingestion and real-time medical metric classification.",
    "description": "Patient vitals monitoring dashboard built with Next.js. Features sub-second telemetry state updates and highly accessible responsive data charts.",
    "status": "supporting",
    "categories": [
      "AI",
      "Frontend"
    ],
    "stack": [
      "TypeScript",
      "Next.js"
    ],
    "date": "May 2026",
    "githubUrl": "https://github.com/Kiruthick7/PulseAI",
    "featured": false
  },
  {
    "slug": "second_innings_ai",
    "title": "Second Innings: AI Cricket Companion",
    "tagline": "AI cricket analysis model built for Google Cloud APL, deploying real-time context injections and prompt-tuned match predictions.",
    "description": "Real-time match predictor utilizing Google Cloud Vertex AI and Gemini APIs. Processes active cricket datasets via lightweight prompt engineering routes to deliver live winner probability scores.",
    "status": "supporting",
    "categories": [
      "AI",
      "Frontend"
    ],
    "stack": [
      "TypeScript",
      "Next.js",
      "Docker"
    ],
    "date": "May 2026",
    "githubUrl": "https://github.com/Kiruthick7/second_innings_ai",
    "featured": false
  },
  {
    "slug": "mcp",
    "title": "Dev.to Model Context Protocol (MCP) Server",
    "tagline": "Production-ready Model Context Protocol server exposing Dev.to APIs as native agentic tools. Built with Python and uv packaging.",
    "description": "Model Context Protocol server that bridges IDE AI agents (such as Claude Desktop or Cursor) to the Dev.to publishing platform. Exposes clean, bounded tool APIs allowing agents to draft and publish articles with zero human intervention.",
    "status": "supporting",
    "categories": [
      "Backend"
    ],
    "stack": [
      "Python"
    ],
    "date": "Nov 2025",
    "githubUrl": "https://github.com/Kiruthick7/mcp",
    "featured": false
  },
  {
    "slug": "rag",
    "title": "LangChain Ingestion-to-Q&A RAG System",
    "tagline": "Enterprise document RAG pipeline featuring recursive character splitters (500 chars / 50 overlap) and strict prompt context-binding to eliminate LLM hallucinations.",
    "description": "Retrieval-Augmented Generation (RAG) system processing heavy corpus sets. Uses FAISS vector indices, HuggingFace embeddings, and LangChain to implement context-locked question-answering systems.",
    "status": "supporting",
    "categories": [
      "Backend"
    ],
    "stack": [
      "Jupyter Notebook"
    ],
    "date": "Nov 2025",
    "githubUrl": "https://github.com/Kiruthick7/rag",
    "featured": false
  },
  {
    "slug": "deepfake-detection",
    "title": "DeepTruth: Deepfake Video Detection",
    "tagline": "Two-stage machine learning/deep learning pipeline utilizing a ResNet spatial CNN frame feature extractor coupled to an LSTM temporal sequence tracker. Yields 97.76% validation accuracy.",
    "description": "High-performance video deepfake classifier built using PyTorch. Leverages convolutional spatial feature extractions coupled to recurrent sequence networks to capture temporal micro-expression frame transitions.",
    "status": "supporting",
    "categories": [
      "ML"
    ],
    "stack": [
      "Jupyter Notebook"
    ],
    "date": "May 2024",
    "githubUrl": "https://github.com/Kiruthick7/Deepfake-Detection",
    "featured": false
  },
  {
    "slug": "dynamic-pricing-system-for-e-commerce",
    "title": "E-Commerce Dynamic Demand Forecasting",
    "tagline": "Predictive demand regression and revenue optimization pipeline. Features scikit-learn models, dynamic feature scaling, and daily batch training triggers.",
    "description": "Predictive pricing model designed to adjust e-commerce stock prices based on real-time market dynamics. Utilizes Random Forest regression models trained on historical inventory data to maximize daily margins.",
    "status": "supporting",
    "categories": [
      "Backend"
    ],
    "stack": [
      "Python"
    ],
    "date": "May 2024",
    "githubUrl": "https://github.com/Kiruthick7/Dynamic-Pricing-System-for-E-commerce",
    "featured": false
  },
  {
    "slug": "concourse-learn",
    "title": "concourse-learn",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "archived",
    "categories": [
      "Backend"
    ],
    "stack": [
      "TypeScript"
    ],
    "date": "Mar 2025",
    "githubUrl": "https://github.com/Kiruthick7/concourse-learn",
    "featured": false
  },
  {
    "slug": "space-news-aggregator-app",
    "title": "Space-News-Aggregator-App",
    "tagline": "Flutter mobile application provides a curated feed of space news from the Spaceflight News API with support for dark and light mode.",
    "description": "Flutter mobile application provides a curated feed of space news from the Spaceflight News API.",
    "status": "archived",
    "categories": [
      "Mobile",
      "Frontend"
    ],
    "stack": [
      "Dart",
      "Flutter"
    ],
    "date": "Aug 2024",
    "githubUrl": "https://github.com/Kiruthick7/Space-News-Aggregator-App",
    "featured": false
  },
  {
    "slug": "face-recognition-attendance-system",
    "title": "Face-Recognition-Attendance-System",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "archived",
    "categories": [
      "Backend"
    ],
    "stack": [
      "HTML"
    ],
    "date": "May 2024",
    "githubUrl": "https://github.com/Kiruthick7/Face-Recognition-Attendance-System",
    "featured": false
  }
];

export const PROJECTS: Project[] = ALL_PROJECTS.filter((p) => p.status !== "archived");
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
