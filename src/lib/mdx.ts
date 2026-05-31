import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content/projects");

export interface ProjectFrontmatter {
  title: string;
  tagline: string;
  date: string;
  achievement?: string;
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  stack: string[];
  categories: string[];
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export interface ProjectData {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Simple frontmatter parser
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return {
      slug,
      frontmatter: {
        title: slug,
        tagline: "",
        date: "",
        stack: [],
        categories: [],
      },
      content: fileContent,
    };
  }

  const [, frontmatterYaml, content] = match;
  const frontmatter: Record<string, string | string[]> = {};

  frontmatterYaml.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(":").trim();

      // Handle array parsing
      if (val.startsWith("[") && val.endsWith("]")) {
        frontmatter[key] = val
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ""));
      } else {
        // Remove surrounding quotes if present
        frontmatter[key] = val.replace(/^['"]|['"]$/g, "");
      }
    }
  });

  return {
    slug,
    frontmatter: frontmatter as unknown as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): ProjectData[] {
  const slugs = getProjectSlugs();
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}
