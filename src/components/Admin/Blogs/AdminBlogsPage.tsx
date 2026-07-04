"use client";

import { ImageUploadInput } from "@/components/Admin/ImageUploadInput";
import { RichTextEditor } from "@/components/Admin/RichTextEditor";
import type { Blog } from "@/data/blogs";
import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertCircle,
  Calendar,
  Edit2,
  FileText,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const CATEGORIES = [
  "Residential Solar",
  "Solar Benefits",
  "Installation Guide",
  "Solar Panels",
  "Energy Solutions",
  "Solar Maintenance",
];

// Validation Schema using Yup
const blogSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters"),
  slug: yup
    .string()
    .required("Slug is required")
    .matches(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens (e.g. top-benefits-2026)",
    ),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(CATEGORIES, "Invalid category selection"),
  imageUrl: yup.string().required("Image is required"),
  content: yup
    .string()
    .required("Blog content text is required")
    .min(20, "Content must be at least 20 characters"),
  tagsString: yup
    .string()
    .required("At least one tag is required")
    .matches(
      /^[^,]+(,[^,]+)*$/,
      "Tags must be comma-separated strings (e.g. Solar, Batteries, Green)",
    ),
  blogDetails: yup
    .string()
    .required("Blog details is required")
    .min(20, "Blog details must be at least 20 characters"),
});

type BlogFormData = yup.InferType<typeof blogSchema>;

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await apiClient("/api/blogs");
        const json = await res.json();
        if (json.success) {
          setBlogs(json.data);
        }
      } catch (error) {
        console.error("Failed to load blogs", error);
        toast.error("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  // Form Setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      imageUrl: "",
      content: "",
      tagsString: "",
      blogDetails: "",
    },
  });

  // Automatically generate slug from Title
  const formTitle = useWatch({
    control,
    name: "title",
    defaultValue: "",
  });
  useEffect(() => {
    if (formTitle && !editingBlog) {
      const generatedSlug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [formTitle, setValue, editingBlog]);

  const handleAddClick = () => {
    setEditingBlog(null);
    reset({
      title: "",
      slug: "",
      category: "",
      imageUrl: "",
      content: "",
      tagsString: "",
      blogDetails: "",
    });
    setIsOpen(true);
  };

  const handleEditClick = (blog: Blog) => {
    setEditingBlog(blog);
    reset({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      imageUrl: blog.imageUrl,
      content: blog.content,
      tagsString: blog.tags.join(", "),
      blogDetails: blog.blogDetails,
    });
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const res = await apiClient(`/api/blogs?id=${id}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (json.success) {
          setBlogs((prev) => prev.filter((b) => b.id !== id));
          toast.success("Blog post deleted successfully!");
        } else {
          toast.error("Failed to delete blog post: " + json.error);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to delete blog", error);
        toast.error("Failed to delete blog post: " + message);
      }
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    const parsedTags = data.tagsString
      .split(",")
      ?.map((t) => t.trim())
      .filter((t) => t?.length > 0);

    const currentDateString = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const payload = {
      title: data.title,
      slug: data.slug,
      category: data.category,
      imageUrl: data.imageUrl,
      content: data.content,
      tags: parsedTags,
      date: currentDateString,
    };

    try {
      if (editingBlog) {
        const res = await apiClient("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingBlog.id, ...payload }),
        });
        const json = await res.json();
        if (json.success) {
          setBlogs((prev) =>
            prev?.map((b) =>
              b.id === editingBlog.id ? { ...b, ...payload } : b,
            ),
          );
          toast.success("Blog post updated successfully!");
          setIsOpen(false);
        } else {
          toast.error("Failed to update blog post: " + json.error);
        }
      } else {
        const res = await apiClient("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setBlogs((prev) => [...prev, json.data]);
          toast.success("Blog post added successfully!");
          setIsOpen(false);
        } else {
          toast.error("Failed to add blog post: " + json.error);
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Failed to save blog post", error);
      toast.error("Failed to save blog post: " + message);
    }
  };

  // Filter & Search Logics
  const filteredBlogs = blogs.filter((b) => {
    const matchCategory =
      selectedCategory === "All" || b.category === selectedCategory;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.content.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
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
          Loading Blogs inventory...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Blogs</h2>
          <p className="admin-page-header-sub">
            Publish and manage educational solar content ({blogs?.length}{" "}
            articles)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button onClick={handleAddClick} className="admin-btn-primary">
            <Plus size={14} />
            Write Post
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Chips */}
        <div className="admin-filter-bar flex-wrap gap-2">
          {["All", ...CATEGORIES]?.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`admin-filter-chip ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="admin-table-search relative w-full md:w-80">
          <Search size={14} className="admin-table-search-icon" />
          <input
            placeholder="Search posts by title, tags..."
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

      {/* Blogs List Table */}
      <div className="admin-table-card">
        {filteredBlogs?.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <FileText size={26} />
            </div>
            <p className="admin-empty-title">No articles found</p>
            <p className="admin-empty-desc">
              Try adjusting your category filter chips or type a different
              search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Article info</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Published Date</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs?.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-9 rounded-md bg-cover bg-center border border-(--admin-border) shrink-0"
                          style={{ backgroundImage: `url(${blog.imageUrl})` }}
                        />
                        <div className="max-w-xs md:max-w-md truncate">
                          <p className="font-semibold text-[14.5px] text-(--admin-text-primary) truncate">
                            {blog.title}
                          </p>
                          <p className="font-mono text-[11px] text-(--admin-text-muted) truncate mt-0.5">
                            {blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgba(245,158,11,0.08) text-(--admin-accent) border border-[rgba(245,158,11,0.15)">
                        {blog.category}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1 max-w-45">
                        {blog.tags?.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-(--admin-surface-2) text-(--admin-text-secondary) px-1.5 py-0.5 rounded border border-(--admin-border) flex items-center gap-0.5"
                          >
                            <Tag size={8} /> {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-xs text-(--admin-text-secondary)">
                        <Calendar
                          size={12}
                          className="text-(--admin-text-muted)"
                        />
                        {blog.date}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="admin-action-btn"
                          title="Edit Post"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(blog.id)}
                          className="admin-action-btn danger"
                          title="Delete Post"
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

      {/* CRUD Edit/Add Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[70%] bg-(--admin-surface) border border-(--admin-border-strong) rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-(--admin-border) bg-(--admin-surface-2)">
              <h3 className="text-base font-bold text-(--admin-text-primary) flex items-center gap-2">
                <FileText size={18} className="text-(--admin-accent)" />
                {editingBlog ? "Edit Blog Post" : "Write Blog Post"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-(--admin-text-muted) hover:text-(--admin-text-primary) transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 overflow-y-auto space-y-4 flex-1"
            >
              {/* Blog Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Post Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 Solar Storage Advantages"
                  {...register("title")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.title ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.title && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.title.message}
                  </span>
                )}
              </div>

              {/* Blog Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Slug (URL Segment) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5-solar-storage-advantages"
                  {...register("slug")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.slug ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm font-mono text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.slug && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.slug.message}
                  </span>
                )}
              </div>

              {/* Category & Tags Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    className="w-full bg-(--admin-surface-2) border border-(--admin-border) text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition"
                  >
                    {CATEGORIES?.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.category.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Tags (Comma-separated) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Green, Solar, Savings"
                    {...register("tagsString")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.tagsString ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.tagsString && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.tagsString.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Cover Image Upload Component */}
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <ImageUploadInput
                    label="Post Cover Image"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.imageUrl?.message}
                    placeholder="/images/blogs/post-1.jpg"
                  />
                )}
              />

              {/* Blog Content Description Text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Post Content Text *
                </label>
                <textarea
                  rows={6}
                  placeholder="Write the article content or summary details..."
                  {...register("content")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.content ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition resize-none`}
                />
                {errors.content && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.content.message}
                  </span>
                )}
              </div>

              {/* Blog Details (Rich Content) */}
              <Controller
                name="blogDetails"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    label="Blog Details (Rich Content)"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.blogDetails?.message}
                  />
                )}
              />

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-(--admin-border)">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="admin-btn-outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary px-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/loader.svg"
                        alt="Loading"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5"
                      />
                      Publishing...
                    </div>
                  ) : (
                    "Publish Post"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
