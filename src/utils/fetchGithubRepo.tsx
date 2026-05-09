export interface GithubRepoData {
  title: string;
  desc: string;
  link: string;
  stack: string[];
  type: "backend" | "frontend" | "fullstack";
  stars: number;
}

const BACKEND_HINTS =  ["node", "express", "django", "flask", "rails", "go", "rust", "java", "spring", "fastapi", "postgresql", "mysql", "mongodb", "redis", "docker", "kubernetes", "aws", "api", "backend", "server", "graphql", "prisma"];
const FRONTEND_HINTS = ["react", "vue", "angular", "svelte", "nextjs", "next", "tailwind", "css", "html", "ui", "frontend", "design", "components", "storybook", "vite", "webpack"];


function detectType(topics: string[], language: string| null): "backend" | "frontend" | "fullstack"{
    const all = [...topics.map((t) => t.toLowerCase()), (language ?? "").toLowerCase()];
    const isBackend = all.some((t) => BACKEND_HINTS.some((h) => t.includes(h)));
    const isFrontend = all.some((t) => FRONTEND_HINTS.some((h) => t.includes(h)));
    if(isBackend && isFrontend) return "fullstack";
    if (isBackend) return "backend";
    if (isFrontend) return "frontend";
    return "fullstack";
}

export async function fetchGithubRepo(url: string): Promise<GithubRepoData | null> {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!match) return null;

    const [, owner, repo] = match;

    const [repoRes, topicsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`),
      fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, {
        headers: { Accept: "application/vnd.github.mercy-preview+json" },
      }),
    ]);

    if (!repoRes.ok) return null;

    const repoData = await repoRes.json();
    const topicsData = topicsRes.ok ? await topicsRes.json() : { names: [] };
    const topics: string[] = topicsData.names ?? [];

    return {
      title: repoData.name
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      desc: repoData.description ?? "",
      link: repoData.html_url,
      stack: topics.length > 0 ? topics: [repoData.language].filter(Boolean),
      type: detectType(topics, repoData.language),
      stars: repoData.stargazers_count ?? 0
    };
  } catch {
    return null;
  }
}