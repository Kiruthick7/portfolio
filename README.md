# 🏆 Kiruthick B — Software Developer Portfolio

A premium, high-conversion career portfolio engineered using **Next.js 16 (Turbopack)**, **TypeScript**, **TailwindCSS**, and **MDX Remote**. Specifically designed to demonstrate technical depth, systems design credentials, and zero-friction pathways for recruiters.

---

## 🚀 Key Flagship Projects

### 🏆 1. StadiumOPS (Flagship AI/Systems Platform)
* **Status**: `Google Agentic Premier League 2026 National Finalist` (Top 15 Nationally)
* **Core Architecture**: **Dual-Engine Design** running an AI Recommendation Engine (Groq + LLaMA 3) and a **Deterministic Rules Fallback Engine** concurrently in parallel.
* **Fail-Safe Operation**: If AI API latency exceeds 1.2s or goes offline, the deterministic engine seamlessly takes over instantly so the venue dashboard never goes blind.
* **Networking**: Uses optimized stateless short-polling (4s interval) to survive extreme cell-tower congestion inside 60,000+ capacity cricket venues.

### 💼 2. Udayam (Production Cloud Backend)
* **Architecture**: FastAPI commercial backend deployed entirely serverless on **AWS Lambda** routed through **AWS API Gateway** (idle compute costs: exactly `$0.00`).
* **Database Optimization**: Designed highly optimized schemas and high-performance **MySQL Stored Procedures**, slashing reporting API latencies from **1.8s down to 120ms** and cutting compute charges.
* **Infrastructure**: Features database connection pooling outside the Lambda execution loop, Secrets Manager key rotations, and a Flutter mobile interface.

---

## 🔒 Security-First Ingestion Gateway

The contact ingestion gateway inside [contact-form.tsx](src/components/ui/contact-form.tsx) is engineered to bypass typical serverless CloudflareTurnstile locks while enforcing production-grade security:

* **Scraper Shield (API Key Obfuscation)**: Web3Forms access key is segmented and dynamically assembled at runtime to block automated regex-based scanner bots from extracting your key from the JS bundle.
* **Invisible Honeypot (`botcheck`)**: Injects a hidden checkbox field. Automated spam scripts crawl and fill it automatically. Web3Forms automatically drops any submission where this field is checked, giving you **99% spam protection with zero friction for human recruiters**.
* **Input Sanitization (Anti-XSS)**: Strips out HTML/XML tags and neutralizes inputs to prevent script injection or cross-site scripting (XSS) payloads.
* **Gmail One-Click Reply**: Injects a dynamic `replyto` header inside the API request so you can reply to recruiter submissions in Gmail with a single click.

---

## 🤖 Automated GitHub Project Sync Engine

No more manual case study updates. The portfolio is equipped with an automated **GitHub Project Sync Engine**:

* **Sync Script** ([sync-projects.mjs](scripts/sync-projects.mjs)): A native ESM Node.js script that fetches your public repositories from GitHub.
  * For any new repository, it **downloads its `README.md`** and converts it into a beautifully formatted Next.js `.mdx` case study inside `src/content/projects/`!
  * **Auto-detects Technical Stack**: Automatically scans topics and README keywords to compile the `stack` array.
  * **Smart Preservation**: **Never** overwrites your manually refined `.mdx` write-ups.
  * **Static Compilation**: Automatically scans your MDX directory and compiles the TS registry `src/lib/projects.ts` statically, ensuring **zero runtime overhead**.
* **GitHub Action** ([sync-projects.yml](.github/workflows/sync-projects.yml)): Runs nightly. If new repositories or updates are detected, it automatically commits them back to the repository, triggering your hosting provider (e.g. Vercel) to redeploy the site with your latest work!

---

## 🛠️ Technical Stack & Frameworks

* **Framework**: Next.js 16.2.6 (App Router, Turbopack, static export optimization)
* **Primitives**: `@base-ui/react` (Accessible custom components)
* **MDX remote**: `next-mdx-remote` (Server-side case study compiling)
* **Language**: TypeScript (Strict typing, 100% compile safety)
* **Styling**: TailwindCSS & PostCSS 4

---

## 💻 Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Run Sync Engine (Locally fetch latest projects)
```bash
npm run sync-projects
```

### 3. Start Dev Server
```bash
npm run dev
```

### 4. Production Build & Lint Checks
```bash
npm run build && npm run lint
```
