"use client";

import { DEFAULT_BLOGS, type Blog, type Comment } from "@/data/blogs";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";

const commentSchema = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .min(10, "Comment must be at least 10 characters"),
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  website: yup.string().url("Website must be a valid URL").notRequired(),
});

const replySchema = yup.object().shape({
  comment: yup
    .string()
    .required("Reply is required")
    .min(5, "Reply must be at least 5 characters"),
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  website: yup.string().url("Website must be a valid URL").notRequired(),
});

function SingleBlogPageInner({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const optimisticIdRef = useRef(0);

  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
    saveInfo: false,
  });
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>(
    {},
  );

  const [replyData, setReplyData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });
  const [replyErrors, setReplyErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data?.length > 0) {
          const found = json.data.find((b: Blog) => b.slug === slug);
          if (found) setBlog(found);
          else {
            const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
            if (fallback) setBlog(fallback);
          }
        } else {
          const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
          if (fallback) setBlog(fallback);
        }
      } catch {
        const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
        if (fallback) setBlog(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

  const addCommentLocally = (newComment: Comment) => {
    setBlog((prev) => {
      if (!prev) return prev;
      return { ...prev, comments: [newComment, ...(prev.comments || [])] };
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentErrors({});

    try {
      await commentSchema.validate(commentData, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((ve) => {
          if (ve.path) fieldErrors[ve.path] = ve.message;
        });
        setCommentErrors(fieldErrors);
        return;
      }
    }

    const payload = {
      blogSlug: slug,
      parentId: null,
      name: commentData.name,
      email: commentData.email,
      website: commentData.website,
      comment: commentData.comment,
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success && json.data) {
        addCommentLocally(json.data);
      }
    } catch {
      const optimistic: Comment = {
        id: ++optimisticIdRef.current,
        parentId: null,
        name: commentData.name,
        email: commentData.email,
        website: commentData.website,
        comment: commentData.comment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      addCommentLocally(optimistic);
    }

    setCommentData({
      comment: "",
      name: "",
      email: "",
      website: "",
      saveInfo: false,
    });
    if (commentData.saveInfo) {
      localStorage.setItem("commentName", commentData.name);
      localStorage.setItem("commentEmail", commentData.email);
      localStorage.setItem("commentWebsite", commentData.website);
    }
  };

  const handleReplySubmit = async (parentId: number) => {
    setReplyErrors({});

    try {
      await replySchema.validate(replyData, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((ve) => {
          if (ve.path) fieldErrors[ve.path] = ve.message;
        });
        setReplyErrors(fieldErrors);
        return;
      }
    }

    const payload = {
      blogSlug: slug,
      parentId,
      name: replyData.name,
      email: replyData.email,
      website: replyData.website,
      comment: replyData.comment,
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success && json.data) {
        addCommentLocally(json.data);
      }
    } catch {
      const optimistic: Comment = {
        id: ++optimisticIdRef.current,
        parentId,
        name: replyData.name,
        email: replyData.email,
        website: replyData.website,
        comment: replyData.comment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      addCommentLocally(optimistic);
    }

    setReplyData({ comment: "", name: "", email: "", website: "" });
    setReplyErrors({});
    setReplyingTo(null);
  };

  const comments = blog?.comments || [];
  const topLevelComments = comments.filter((c) => c.parentId === null);
  const getReplies = (parentId: number) =>
    comments.filter((c) => c.parentId === parentId);

  const renderFieldError = (errors: Record<string, string>, field: string) => {
    if (!errors[field]) return null;
    return (
      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3 h-3 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
        {errors[field]}
      </span>
    );
  };

  return (
    <div className="bg-white min-h-screen text-[#011c2b] font-sans antialiased selection:bg-green-100">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 md:py-20 flex flex-col gap-8">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-6">
            <div className="w-full h-56 sm:h-96 md:h-112.5 rounded-2xl bg-gray-200" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        ) : blog ? (
          <>
            <div
              className="w-full h-56 sm:h-96 md:h-112.5 rounded-2xl bg-cover bg-center shadow-md border border-gray-100"
              style={{ backgroundImage: `url('${blog.imageUrl}')` }}
            />

            <article className="prose prose-gray max-w-none text-sm sm:text-base text-gray-600 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: blog.blogDetails }} />
            </article>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-gray-100 py-6 my-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#011c2b] text-xs font-bold mr-1">
                  Tags:
                </span>
                {blog.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-medium px-3 py-1 rounded transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {["f", "t", "in"]?.map((social, idx) => (
                  <button
                    key={idx}
                    className="w-8 h-8 rounded bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-bold flex items-center justify-center transition-colors uppercase"
                    aria-label={`Share on ${social}`}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-6">
              <h3 className="text-[#011c2b] text-xl font-bold tracking-tight mb-6">
                Comments ({topLevelComments?.length})
              </h3>

              {topLevelComments?.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {topLevelComments?.map((comment) => {
                    const replies = getReplies(comment.id);
                    return (
                      <div key={comment.id}>
                        <div className="flex gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-sm font-bold shrink-0">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-[#011c2b]">
                                {comment.name}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {comment.date}
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                              {comment.comment}
                            </p>
                            <button
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === comment.id ? null : comment.id,
                                )
                              }
                              className="text-xs font-semibold text-[#4caf50] hover:text-[#43a047] mt-1.5 transition-colors"
                            >
                              {replyingTo === comment.id
                                ? "Cancel Reply"
                                : "Reply"}
                            </button>

                            {replyingTo === comment.id && (
                              <div className="mt-4 bg-[#f4f7f9] rounded-xl p-4 border border-gray-100">
                                <h4 className="text-xs font-bold text-[#011c2b] mb-3">
                                  Reply to {comment.name}
                                </h4>
                                <div className="flex flex-col gap-3">
                                  <div>
                                    <textarea
                                      rows={3}
                                      required
                                      placeholder="Write your reply..."
                                      className="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all resize-none"
                                      value={replyData.comment}
                                      onChange={(e) =>
                                        setReplyData({
                                          ...replyData,
                                          comment: e.target.value,
                                        })
                                      }
                                    />
                                    {renderFieldError(replyErrors, "comment")}
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                      <input
                                        type="text"
                                        required
                                        placeholder="Name *"
                                        className="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                                        value={replyData.name}
                                        onChange={(e) =>
                                          setReplyData({
                                            ...replyData,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                      {renderFieldError(replyErrors, "name")}
                                    </div>
                                    <div>
                                      <input
                                        type="email"
                                        required
                                        placeholder="Email *"
                                        className="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                                        value={replyData.email}
                                        onChange={(e) =>
                                          setReplyData({
                                            ...replyData,
                                            email: e.target.value,
                                          })
                                        }
                                      />
                                      {renderFieldError(replyErrors, "email")}
                                    </div>
                                    <div>
                                      <input
                                        type="url"
                                        placeholder="Website"
                                        className="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                                        value={replyData.website}
                                        onChange={(e) =>
                                          setReplyData({
                                            ...replyData,
                                            website: e.target.value,
                                          })
                                        }
                                      />
                                      {renderFieldError(replyErrors, "website")}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleReplySubmit(comment.id)
                                    }
                                    className="self-start bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-sm transition-colors duration-150"
                                  >
                                    Post Reply
                                  </button>
                                </div>
                              </div>
                            )}

                            {replies?.length > 0 && (
                              <div className="mt-4 ml-2 border-l-2 border-[#4caf50]/30 pl-4 flex flex-col gap-4">
                                {replies?.map((reply) => (
                                  <div key={reply.id} className="flex gap-3.5">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                      {reply.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-sm text-[#011c2b]">
                                          {reply.name}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                          {reply.date}
                                        </span>
                                      </div>
                                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                        {reply.comment}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </section>

            {/* Leave a Reply Form */}
            <section className="mt-8 border-t border-gray-100 pt-8">
              <h3 className="text-[#011c2b] text-xl font-bold tracking-tight mb-1">
                Leave a Reply
              </h3>
              <p className="text-gray-400 text-xs mb-6">
                Your email address will not be published. Required fields are
                marked *
              </p>

              <form
                onSubmit={handleCommentSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                    Comment *
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all resize-none"
                    value={commentData.comment}
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        comment: e.target.value,
                      })
                    }
                  />
                  {renderFieldError(commentErrors, "comment")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                      value={commentData.name}
                      onChange={(e) =>
                        setCommentData({ ...commentData, name: e.target.value })
                      }
                    />
                    {renderFieldError(commentErrors, "name")}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                      value={commentData.email}
                      onChange={(e) =>
                        setCommentData({
                          ...commentData,
                          email: e.target.value,
                        })
                      }
                    />
                    {renderFieldError(commentErrors, "email")}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                      Website
                    </label>
                    <input
                      type="url"
                      className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                      value={commentData.website}
                      onChange={(e) =>
                        setCommentData({
                          ...commentData,
                          website: e.target.value,
                        })
                      }
                    />
                    {renderFieldError(commentErrors, "website")}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mt-2">
                  <input
                    id="saveInfo"
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#4caf50] focus:ring-[#4caf50] border-gray-300 mt-0.5 accent-[#4caf50] cursor-pointer"
                    checked={commentData.saveInfo}
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        saveInfo: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="saveInfo"
                    className="text-gray-500 text-xs select-none cursor-pointer leading-normal"
                  >
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-sm transition-colors duration-150"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-semibold">Blog post not found</p>
            <Link href="/blogs" className="mt-4 text-[#4caf50] hover:underline">
              ← Back to all blogs
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SingleBlogPage({ slug }: { slug: string }) {
  return <SingleBlogPageInner key={slug} slug={slug} />;
}

