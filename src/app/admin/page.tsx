import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowRight,
  PencilLine,
  SquareChartGantt,
  Settings,
} from "lucide-react";

async function getStats() {
  const [totalPosts, publishedPosts, totalProjects, draftProjects] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "published" } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: "draft" } }),
    ]);

  return { totalPosts, publishedPosts, totalProjects, draftProjects };
}

async function getRecentPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, status: true, createdAt: true },
  });
}

export default async function AdminDashBoard() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Subhajeet</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-lime-400 text-gray-950 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-lime-300 transition"
        >
          + New post
        </Link>
      </div>

      <div className="grid grid-col-4 gap-4 mb-8">
        {[
          { label: "Total posts", value: stats.totalPosts },
          { label: "Published", value: stats.publishedPosts },
          { label: "Drafts", value: stats.draftProjects },
          { label: "Projects", value: stats.totalProjects },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <div className="font-mono text-3xl text-gray-100">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest">
            Recent posts
          </h2>
          <Link
            href="/admin/posts"
            className="font-mono text-xs text-lime-400 hover:underline"
          >
            View all <ArrowRight />
          </Link>
        </div>
        <div className="flex flex-col gap-0">
          {recentPosts.length === 0 ? (
            <p className="text-sm text-gray-600 py-4 text-center">
              No post yet.{" "}
              <Link
                href="/admin/posts/new"
                className="text-lime-400 hover:underline"
              >
                Write your first post <ArrowRight />
              </Link>
            </p>
          ) : (
            recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <span className="text-sm text-gray-200 font-medium truncate max-w-sm">
                  {post.title}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded border ${post.status === "published" ? "border-lime-400/30 text-lime-400 bg-lime-400/5" : "border-gray-700 text-gray-500 bg-gray-800"}`}
                  >
                    {post.status}
                  </span>
                  <span className="font-mono text-xs text-gray-600">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          {
            label: "Write new post",
            icon: <PencilLine />,
            href: "/admin/posts/new",
          },
          {
            label: "Add project",
            icon: <SquareChartGantt />,
            href: "/admin/projects/new",
          },
          {
            label: "Site settings",
            icon: <Settings />,
            href: "/admin/settings",
          },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm text-gray-400 hover:text-gray-100 hover:border-gray-700 transition-all"
          >
            <div className="flex items-center gap-2">
              {action.icon}
              {action.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
