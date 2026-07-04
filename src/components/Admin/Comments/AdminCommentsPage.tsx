"use client";

import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { Calendar, MessageCircle, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CommentItem {
  id: number;
  name: string;
  email: string;
  website: string;
  comment: string;
  date: string;
  blogTitle: string;
  blogSlug: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await apiClient("/api/comments");
        const json = await res.json();
        if (json.success) {
          setComments(json.data);
        }
      } catch (error) {
        console.error("Failed to load comments", error);
        toast.error("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, []);

  const handleDeleteClick = async (item: CommentItem) => {
    if (confirm(`Delete comment by "${item.name}" from "${item.blogTitle}"?`)) {
      try {
        const res = await apiClient(
          `/api/comments?blogSlug=${item.blogSlug}&commentId=${item.id}`,
          { method: "DELETE" },
        );
        const json = await res.json();
        if (json.success) {
          setComments((prev) =>
            prev.filter(
              (c) => c.id !== item.id || c.blogSlug !== item.blogSlug,
            ),
          );
          toast.success("Comment deleted successfully!");
        } else {
          toast.error("Failed to delete comment: " + json.error);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to delete comment", error);
        toast.error("Failed to delete comment: " + message);
      }
    }
  };

  const filteredComments = comments.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.comment.toLowerCase().includes(q) ||
      c.blogTitle.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <Image
          src={DEFAULT_ADMIN_LOGO}
          alt="Loading"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-auto animate-pulse opacity-70"
          priority
        />
        <p className="mt-4 text-(--admin-text-secondary) font-medium">
          Loading comments...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Comments</h2>
          <p className="admin-page-header-sub">
            Manage visitor comments across all blog posts ({comments.length}{" "}
            total)
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="admin-table-search relative w-full md:w-80">
          <Search size={14} className="admin-table-search-icon" />
          <input
            placeholder="Search by name, email, comment, or blog..."
            className="admin-table-search-input w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "var(--admin-surface-2)",
              border: "1px solid var(--admin-border)",
              color: "var(--admin-text-primary)",
              borderRadius: 8,
              padding: "8px 12px 8px 34px",
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>
      </div>

      <div className="admin-table-card">
        {filteredComments.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <MessageCircle size={26} />
            </div>
            <p className="admin-empty-title">No comments found</p>
            <p className="admin-empty-desc">
              {comments.length === 0
                ? "No comments have been submitted yet."
                : "Try a different search query."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Commenter</th>
                  <th>Comment</th>
                  <th>Blog Post</th>
                  <th>Date</th>
                  <th className="text-center w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments?.map((item) => (
                  <tr key={`${item.blogSlug}-${item.id}`}>
                    <td>
                      <div className="flex flex-col gap-0.5 max-w-48">
                        <p className="font-semibold text-[14px] text-(--admin-text-primary) truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-(--admin-text-muted) truncate">
                          {item.email}
                        </p>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-(--admin-text-secondary) max-w-xs line-clamp-2 leading-relaxed">
                        {item.comment}
                      </p>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-(--admin-text-primary) truncate block max-w-40">
                        {item.blogTitle}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-xs text-(--admin-text-secondary)">
                        <Calendar
                          size={12}
                          className="text-(--admin-text-muted)"
                        />
                        {item.date}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="admin-action-btn danger"
                          title="Delete Comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

