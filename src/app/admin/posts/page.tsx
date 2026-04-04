"use client";

import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { FaArrowRight } from "react-icons/fa";

type StatusFilter = "all" | "published" | "draft";

export default function AdminPostsPage() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const {
    data: posts,
    isLoading,
    refetch,
  } = trpc.post.getAll.useQuery({ status });

  const deleteMutation = trpc.post.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const publishMutation = trpc.post.publish.useMutation({
    onSuccess: () => refetch(),
  });

  const filtered = posts?.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            {posts?.length ?? 0} total · {""}
            {posts?.filter((p) => p.status === "published").length ?? 0}{" "}
            published · {""}
            {posts?.filter((p) => p.status === "draft").length ?? 0} drafts
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-lime-400 text-gray-950 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-lime-300 transition"
        >
          + New post
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {(["all", "published", "draft"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-md font-mono text-xs capitalize transition ${status === s ? "bg-gray-800 text-gray-100" : "text-gray-500 hover:text-gray-300"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
        />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="text-center py-16 text-gray-600 font-mono text-sm">
            Loading post...
          </div>
        ) : filtered?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-sm mb-2">No posts found</p>
            <Link
              href="/admin/posts/new"
              className="text-lime-400 text-sm hover:underline"
            >
              Write your first post <FaArrowRight />
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {["Title", "Status", "Category", "Date", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left font-mono text-xs text-gray-600 uppercase tracking-wider px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered?.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition"
                >
                  <td className="px-5 py-4 max-w-xs">
                    <p className="text-sm font-medium text-gray-100 truncate">
                      {post.title}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`font-mono text-xs px-2 py-1 rounded border
                                    ${post.status === "published" ? "border-lime-400/30 text-lime-400 bg-lime-400/5" : "border-gray-700 text-gray-500 bg-gray-800"}`}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-500">
                      {post.category ?? "-"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-mono text-xs px-2.5 py-1 rounded border border-gray-700 text-gray-400 hover:text-gray-100 hover:border-gray-500 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          publishMutation.mutate({
                            id: post.id,
                            publish: post.status === "draft",
                          })
                        }
                        className="font-mono text-xs px-2.5 py-1 rounded border border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/40 transition"
                      >
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete "${post.title}"`)) {
                            deleteMutation.mutate({ id: post.id });
                          }
                        }}
                        className="font-mono text-xs px-2.5 py-1 rounded border border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400/40 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
