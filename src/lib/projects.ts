// All project data — Dynamically compiled static registry from MDX content
// RUN: npm run sync-projects to regenerate this file!

export type ProjectStatus = "flagship" | "supporting";
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

export const PROJECTS: Project[] = [
  {
    "slug": "stadiumops",
    "title": "StadiumOPS (AI Emergency Ops Platform)",
    "tagline": "🏆 Top 15 Nationally — Google Agentic Premier League. Real-time emergency command dashboard featuring parallel execution of Groq LLaMA 3 and deterministic watchdog fallbacks.",
    "description": "🏆 Top 15 Nationally — Google Agentic Premier League. Real-time emergency command dashboard featuring parallel execution of Groq LLaMA 3 and deterministic watchdog fallbacks.",
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
    "slug": "udayam_trailbalance",
    "title": "Udayam Financial Mobile Platform",
    "tagline": "Enterprise double-entry ledger mobile client built with Flutter. Translates complex trial balances and multi-company account summaries into highly readable, real-time dashboards.",
    "description": "Enterprise double-entry ledger mobile client built with Flutter. Translates complex trial balances and multi-company account summaries into highly readable, real-time dashboards.",
    "status": "flagship",
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
    "slug": "udayam_fastapi",
    "title": "Udayam Financial Backend Platform",
    "tagline": "Serverless financial ledger backend deployed on AWS Lambda. Features high-performance MySQL connection pooling and highly optimized stored procedures.",
    "description": "Serverless financial ledger backend deployed on AWS Lambda. Features high-performance MySQL connection pooling and highly optimized stored procedures.",
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
    "slug": "carbonpilotai",
    "title": "CarbonPilotAI",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "supporting",
    "categories": [
      "Backend"
    ],
    "stack": [
      "Software Engineering"
    ],
    "date": "Jun 2026",
    "githubUrl": "https://github.com/Kiruthick7/CarbonPilotAI",
    "featured": false
  },
  {
    "slug": "pulseai",
    "title": "PulseAI",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
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
    "title": "second_innings_ai",
    "tagline": "AI cricket companion with live match predictions and gamified fan engagement built for Google Cloud APL.",
    "description": "AI cricket companion with live match predictions and gamified fan engagement built for Google Cloud APL.",
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
    "slug": "jira_status_report_tool",
    "title": "Jira_Status_Report_Tool",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "supporting",
    "categories": [
      "Cloud",
      "Backend"
    ],
    "stack": [
      "Python",
      "GCP",
      "AWS",
      "Docker",
      "Terraform"
    ],
    "date": "Feb 2026",
    "githubUrl": "https://github.com/Kiruthick7/Jira_Status_Report_Tool",
    "featured": false
  },
  {
    "slug": "portfolio",
    "title": "portfolio",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "supporting",
    "categories": [
      "AI",
      "Cloud",
      "Mobile",
      "Frontend",
      "Backend"
    ],
    "stack": [
      "TypeScript",
      "FastAPI",
      "React",
      "Next.js",
      "TailwindCSS",
      "AWS",
      "MySQL",
      "Flutter"
    ],
    "date": "Dec 2025",
    "githubUrl": "https://github.com/Kiruthick7/portfolio",
    "liveUrl": "https://kiruthickdev.vercel.app",
    "featured": false
  },
  {
    "slug": "mcp",
    "title": "Dev.to Model Context Protocol (MCP) Server",
    "tagline": "Production-ready Model Context Protocol server exposing Dev.to APIs as native agentic tools. Built with Python and uv packaging.",
    "description": "Production-ready Model Context Protocol server exposing Dev.to APIs as native agentic tools. Built with Python and uv packaging.",
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
    "description": "Enterprise document RAG pipeline featuring recursive character splitters (500 chars / 50 overlap) and strict prompt context-binding to eliminate LLM hallucinations.",
    "status": "supporting",
    "categories": [
      "Backend",
      "AI"
    ],
    "stack": [
      "Python",
      "LangChain",
      "Vector DB",
      "FAISS",
      "Groq"
    ],
    "date": "Nov 2025",
    "githubUrl": "https://github.com/Kiruthick7/rag",
    "featured": false
  },
  {
    "slug": "concourse-learn",
    "title": "concourse-learn",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "supporting",
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
    "description": "Flutter mobile application provides a curated feed of space news from the Spaceflight News API with support for dark and light mode.",
    "status": "supporting",
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
    "slug": "deepfake-detection",
    "title": "DeepTruth: Deepfake Video Detection",
    "tagline": "Two-stage machine learning/deep learning pipeline utilizing a ResNet spatial CNN frame feature extractor coupled to an LSTM temporal sequence tracker. Yields 97.76% validation accuracy.",
    "description": "Two-stage machine learning/deep learning pipeline utilizing a ResNet spatial CNN frame feature extractor coupled to an LSTM temporal sequence tracker. Yields 97.76% validation accuracy.",
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
    "title": "Dynamic-Pricing-System-for-E-commerce",
    "tagline": "Machine learning based dynamic pricing system for demand forecasting and revenue optimization.",
    "description": "Machine learning based dynamic pricing system for demand forecasting and revenue optimization.",
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
    "slug": "face-recognition-attendance-system",
    "title": "Face-Recognition-Attendance-System",
    "tagline": "Open source software development project.",
    "description": "Open source software development project.",
    "status": "supporting",
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

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
