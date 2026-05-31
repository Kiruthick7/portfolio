import fs from "fs";
import path from "path";

const GITHUB_USERNAME = "Kiruthick7";
const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");
const REGISTRY_FILE = path.join(process.cwd(), "src/lib/projects.ts");

// Common tech stack keywords to auto-detect from repository topics & README contents
const TECH_KEYWORDS = [
  "FastAPI", "Python", "React", "TypeScript", "JavaScript", "Next.js", "TailwindCSS",
  "GCP", "AWS", "Docker", "Terraform", "PostgreSQL", "MySQL", "MongoDB", "Redis",
  "PySpark", "Flutter", "LangChain", "TensorFlow", "PyTorch", "Kubernetes", "Cypress"
];

// Helper to sanitize text for frontmatter block
const cleanYamlString = (str) => {
  if (!str) return '""';
  return `"${str.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
};

async function fetchWithFallback(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ...options.headers
    }
  });
  return res;
}

async function fetchReadme(repoName, defaultBranch = "main") {
  const branches = [defaultBranch, "master", "main"];
  for (const branch of branches) {
    const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${branch}/README.md`;
    try {
      const res = await fetchWithFallback(url);
      if (res.ok) {
        return await res.text();
      }
    } catch {
      // Continue to next branch
    }
  }
  return null;
}

async function syncProjects() {
  console.log(`🚀 Starting GitHub Project Sync for user: ${GITHUB_USERNAME}...`);

  // Ensure content directory exists
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }

  // 1. Fetch repositories from GitHub API
  let repos = [];
  try {
    const res = await fetchWithFallback(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!res.ok) {
      throw new Error(`GitHub API returned HTTP ${res.status}`);
    }
    repos = await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch repositories from GitHub API:", error.message);
    console.warn("⚠️ Continuing to regenerate projects.ts from existing local MDX files only.");
  }

  // Process fetched repositories
  if (Array.isArray(repos)) {
    // Filter out forks, private, and archived repositories
    const sourceRepos = repos.filter(repo => !repo.fork && !repo.private && !repo.archived);
    console.log(`📦 Found ${sourceRepos.length} public source repositories.`);

    for (const repo of sourceRepos) {
      const slug = repo.name.toLowerCase();
      
      // Exclude profile README repository
      if (slug === GITHUB_USERNAME.toLowerCase()) {
        console.log(`ℹ️ Excluding profile repository: ${repo.name}`);
        continue;
      }

      const mdxPath = path.join(PROJECTS_DIR, `${slug}.mdx`);

      // Skip generating if it already exists (preserves manual edits!)
      if (fs.existsSync(mdxPath)) {
        console.log(`ℹ️ Preserving custom case study: src/content/projects/${slug}.mdx`);
        continue;
      }

      console.log(`✨ Syncing new repository: ${repo.name}...`);

      // Try fetching README
      let readmeContent = await fetchReadme(repo.name, repo.default_branch);
      if (!readmeContent) {
        readmeContent = `# ${repo.name}\n\n${repo.description || "A project developed on GitHub."}\n\nView the repository on GitHub at [${repo.html_url}](${repo.html_url}).`;
      }

      // Auto-detect and rewrite relative image paths to Next.js public absolute paths!
      // Maps relative markdown images (e.g. screenshots/img.png) to /images/projects/slug/img.png
      const relativeImageRegex = /!\[(.*?)\]\((?:\.\/)?screenshots\/(.*?)\)/g;
      readmeContent = readmeContent.replace(relativeImageRegex, `![$1](/images/projects/${slug}/$2)`);
      
      // Also handle relative HTML img tags if any, e.g. <img src="screenshots/file.png" />
      const htmlImageRegex = /<img([\s\S]*?)src="(?:\.\/)?screenshots\/(.*?)"([\s\S]*?)>/g;
      readmeContent = readmeContent.replace(htmlImageRegex, `<img$1src="/images/projects/${slug}/$2"$3>`);

      // Auto-detect tech stack
      const detectedStack = new Set();
      
      // Add primary language
      if (repo.language) detectedStack.add(repo.language);
      
      // Scan topics
      if (repo.topics) {
        repo.topics.forEach(topic => {
          const match = TECH_KEYWORDS.find(keyword => keyword.toLowerCase() === topic.toLowerCase());
          if (match) detectedStack.add(match);
        });
      }

      // Scan README content
      TECH_KEYWORDS.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(".", "\\.")}\\b`, "i");
        if (regex.test(readmeContent)) {
          detectedStack.add(keyword);
        }
      });

      const stackArray = Array.from(detectedStack);
      if (stackArray.length === 0) stackArray.push("Software Engineering");

      // Auto-map categories using BOTH topics, stack contents, and README keywords
      const categories = new Set();
      const lowerTopics = (repo.topics || []).map(t => t.toLowerCase());
      const lowerStack = stackArray.map(s => s.toLowerCase());
      const fullText = (repo.name + " " + (repo.description || "") + " " + readmeContent).toLowerCase();
      
      // AI detection
      if (
        lowerTopics.includes("ai") || lowerTopics.includes("llm") || lowerTopics.includes("rag") || 
        lowerTopics.includes("langchain") || lowerTopics.includes("agent") ||
        lowerStack.includes("groq") || lowerStack.includes("llama 3") || lowerStack.includes("langchain") ||
        fullText.includes("agentic") || fullText.includes("llama") || fullText.includes("recommendation engine")
      ) {
        categories.add("AI");
      }
      
      // ML detection
      if (
        lowerTopics.includes("machine-learning") || lowerTopics.includes("ml") || 
        lowerTopics.includes("deep-learning") || lowerTopics.includes("tensorflow") || 
        lowerTopics.includes("pytorch") || lowerStack.includes("tensorflow") || 
        lowerStack.includes("pytorch") || fullText.includes("deepfake") || fullText.includes("neural network")
      ) {
        categories.add("ML");
      }
      
      // Cloud detection
      if (
        lowerTopics.includes("aws") || lowerTopics.includes("gcp") || lowerTopics.includes("cloud") || 
        lowerTopics.includes("serverless") || lowerTopics.includes("terraform") ||
        lowerStack.includes("aws") || lowerStack.includes("gcp") || lowerStack.includes("terraform")
      ) {
        categories.add("Cloud");
      }
      
      // Mobile detection
      if (
        repo.language === "Dart" || lowerTopics.includes("flutter") || lowerTopics.includes("react-native") || 
        lowerTopics.includes("ios") || lowerTopics.includes("android") || lowerStack.includes("flutter")
      ) {
        categories.add("Mobile");
      }
      
      // Frontend detection
      if (
        lowerStack.includes("react") || lowerStack.includes("tailwind-css") || 
        lowerStack.includes("next.js") || lowerStack.includes("tailwindcss") ||
        fullText.includes("react") || fullText.includes("flutter") || fullText.includes("frontend")
      ) {
        categories.add("Frontend");
      }
      
      // Backend detection
      if (
        repo.language === "Python" || repo.language === "Go" || 
        lowerStack.includes("fastapi") || lowerStack.includes("python") ||
        lowerStack.includes("mysql") || lowerStack.includes("postgresql") ||
        categories.size === 0
      ) {
        categories.add("Backend");
      }

      // Format Date
      const dateObj = new Date(repo.created_at);
      const formattedDate = dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short" });

      // Generate Frontmatter
      const frontmatter = [
        "---",
        `title: ${cleanYamlString(repo.name)}`,
        `tagline: ${cleanYamlString(repo.description || "Open source software development project.")}`,
        `date: "${formattedDate}"`,
        `stack: ${JSON.stringify(stackArray)}`,
        `categories: ${JSON.stringify(Array.from(categories))}`,
        `githubUrl: "${repo.html_url}"`,
        repo.homepage ? `liveUrl: "${repo.homepage}"` : "",
        repo.stargazers_count > 0 ? `achievement: "GitHub Stars: ${repo.stargazers_count}"` : "",
        "---\n\n"
      ].filter(Boolean).join("\n");

      // Save MDX file
      fs.writeFileSync(mdxPath, frontmatter + readmeContent);
      console.log(`✅ Saved generated case study: src/content/projects/${slug}.mdx`);
    }
  }

  // 2. Scan all local MDX files and dynamically rewrite projects.ts registry
  console.log("📝 Re-scanning all local case studies to compile the projects.ts registry...");
  const mdxFiles = fs.readdirSync(PROJECTS_DIR).filter(file => file.endsWith(".mdx"));
  const registryProjects = [];

  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract frontmatter block
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) continue;

    const frontmatterYaml = match[1];
    const parsedFrontmatter = {};

    frontmatterYaml.split("\n").forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(":").trim();

        if (val.startsWith("[") && val.endsWith("]")) {
          parsedFrontmatter[key] = val
            .slice(1, -1)
            .split(",")
            .map((item) => item.trim().replace(/^['"]|['"]$/g, ""));
        } else {
          parsedFrontmatter[key] = val.replace(/^['"]|['"]$/g, "").replace(/\\"/g, '"');
        }
      }
    });

    // Mark stadiumops, udayam_fastapi, and udayam_trailbalance as flagship/featured
    const flagshipSlugs = ["stadiumops", "udayam_fastapi", "udayam_trailbalance"];
    const isFlagship = flagshipSlugs.includes(slug) ? "flagship" : "supporting";
    const featured = flagshipSlugs.includes(slug);

    registryProjects.push({
      slug,
      title: parsedFrontmatter.title || slug,
      tagline: parsedFrontmatter.tagline || "",
      description: parsedFrontmatter.tagline || "",
      status: isFlagship,
      categories: parsedFrontmatter.categories || ["Backend"],
      stack: parsedFrontmatter.stack || [],
      date: parsedFrontmatter.date || "",
      achievement: parsedFrontmatter.achievement || undefined,
      githubUrl: parsedFrontmatter.githubUrl || undefined,
      liveUrl: parsedFrontmatter.liveUrl || undefined,
      blogUrl: parsedFrontmatter.blogUrl || undefined,
      featured,
    });
  }

  // Sort registry: Flagship projects first, then supporting sorted by Date (descending)
  registryProjects.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "flagship" ? -1 : 1;
    }
    // Parse month/year to timestamps for sorting
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });

  // Construct projects.ts TypeScript code
  const codeContent = `// All project data — Dynamically compiled static registry from MDX content
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

export const PROJECTS: Project[] = ${JSON.stringify(registryProjects, null, 2)};

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
`;

  fs.writeFileSync(REGISTRY_FILE, codeContent);
  console.log(`✨ Registry updated successfully: ${REGISTRY_FILE}`);
  console.log("🚀 GitHub Project Sync completed successfully!");
}

syncProjects();
