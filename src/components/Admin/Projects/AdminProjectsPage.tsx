"use client";

import { ImageUploadInput } from "@/components/Admin/ImageUploadInput";
import { RichTextEditor } from "@/components/Admin/RichTextEditor";
import type { Project } from "@/data/projects";
import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { queryKeys, useQueryProjects } from "@/lib/queries";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertCircle,
  Check,
  Edit2,
  Layers,
  MapPin,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const CATEGORIES = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Community Solar",
];

const projectSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters"),
  slug: yup
    .string()
    .required("Slug is required")
    .matches(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens (e.g. standard-solar-setup)",
    ),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(CATEGORIES, "Invalid category selection"),
  imageUrl: yup.string().required("Image is required"),
  isFeatured: yup.boolean().default(false),
  client: yup
    .string()
    .required("Client name is required")
    .min(3, "Client name must be at least 3 characters"),
  location: yup
    .string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters"),
  projectDetails: yup
    .string()
    .required("Project details is required")
    .min(20, "Project details must be at least 20 characters"),
});

type ProjectFormData = yup.InferType<typeof projectSchema>;

export default function AdminProjectsPage() {
  const { data: projects = [], isLoading } = useQueryProjects();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form Setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      imageUrl: "",
      isFeatured: false,
      client: "",
      location: "",
      projectDetails: "",
    },
  });

  // Automatically generate slug from Title
  const formTitle = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    if (formTitle && !editingProject) {
      const generatedSlug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [formTitle, setValue, editingProject]);

  const handleAddClick = () => {
    setEditingProject(null);
    reset({
      title: "",
      slug: "",
      category: "",
      imageUrl: "",
      isFeatured: false,
      client: "",
      location: "",
      projectDetails: "",
    });
    setIsOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      slug: project.slug,
      category: project.category,
      imageUrl: project.imageUrl,
      isFeatured: project.isFeatured,
      client: project.client,
      location: project.location,
      projectDetails: project.projectDetails,
    });
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const res = await apiClient(`/api/projects?id=${id}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (json.success) {
          queryClient.invalidateQueries({ queryKey: queryKeys.projects });
          toast.success("Project deleted successfully!");
        } else {
          toast.error("Failed to delete project: " + json.error);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to delete project", error);
        toast.error("Failed to delete project: " + message);
      }
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (editingProject) {
        const res = await apiClient("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...data }),
        });
        const json = await res.json();
        if (json.success) {
          queryClient.invalidateQueries({ queryKey: queryKeys.projects });
          toast.success("Project updated successfully!");
          setIsOpen(false);
        } else {
          toast.error("Failed to update project: " + json.error);
        }
      } else {
        const res = await apiClient("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success) {
          queryClient.invalidateQueries({ queryKey: queryKeys.projects });
          toast.success("Project added successfully!");
          setIsOpen(false);
        } else {
          toast.error("Failed to add project: " + json.error);
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Failed to save project", error);
      toast.error("Failed to save project: " + message);
    }
  };

  // Filter & Search Logics
  const filteredProjects = projects.filter((p) => {
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (isLoading) {
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
          Loading Projects...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Projects</h2>
          <p className="admin-page-header-sub">
            Track and show off solar installation projects ({projects?.length}{" "}
            total)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button onClick={handleAddClick} className="admin-btn-primary">
            <Plus size={14} />
            Add Project
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
              onClick={() => setActiveCategory(cat)}
              className={`admin-filter-chip ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="admin-table-search relative w-full md:w-80">
          <Search size={14} className="admin-table-search-icon" />
          <input
            placeholder="Search projects, clients, locations..."
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

      {/* Projects List Card */}
      <div className="admin-table-card">
        {filteredProjects?.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <Layers size={26} />
            </div>
            <p className="admin-empty-title">No projects found</p>
            <p className="admin-empty-desc">
              Try adjusting your category filters or search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Project Info</th>
                  <th>Client</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th className="text-center">Featured</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects?.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-9 rounded-md bg-cover bg-center border border-(--admin-border) shrink-0"
                          style={{
                            backgroundImage: `url(${project.imageUrl})`,
                          }}
                        />
                        <div>
                          <p className="font-semibold text-[14.5px] text-(--admin-text-primary) max-w-xs truncate">
                            {project.title}
                          </p>
                          <p className="font-mono text-[11px] text-(--admin-text-muted) mt-0.5">
                            {project.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-sm text-(--admin-text-secondary)">
                        <User size={13} className="text-(--admin-text-muted)" />
                        {project.client}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-sm text-(--admin-text-secondary)">
                        <MapPin
                          size={13}
                          className="text-(--admin-text-muted)"
                        />
                        {project.location}
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgba(59,130,246,0.08)] text-(--admin-info) border border-[rgba(59,130,246,0.15)]">
                        {project.category}
                      </span>
                    </td>
                    <td className="text-center">
                      {project.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-(--admin-success) bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.15)] px-2 py-0.5 rounded">
                          <Check size={11} strokeWidth={3} /> Yes
                        </span>
                      ) : (
                        <span className="text-[11.5px] text-(--admin-text-muted)">
                          -
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(project)}
                          className="admin-action-btn"
                          title="Edit Project"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(project.id)}
                          className="admin-action-btn danger"
                          title="Delete Project"
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
                <Layers size={18} className="text-(--admin-accent)" />
                {editingProject ? "Edit Project" : "Add Project"}
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
              {/* Project Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial 500kW Array"
                  {...register("title")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.title ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.title && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.title.message}
                  </span>
                )}
              </div>

              {/* Project Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Slug (URL Segment) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. commercial-500kw-array"
                  {...register("slug")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.slug ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm font-mono text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.slug && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.slug.message}
                  </span>
                )}
              </div>

              {/* Category & Featured Switch */}
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

                <div className="flex items-center gap-3 bg-(--admin-surface-2) border border-(--admin-border) rounded-lg p-2.5 mt-auto h-11">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    {...register("isFeatured")}
                    className="w-4 h-4 text-(--admin-accent) focus:ring-(--admin-accent) border-(--admin-border) rounded accent-(--admin-accent) cursor-pointer"
                  />
                  <label
                    htmlFor="isFeatured"
                    className="text-sm font-medium text-(--admin-text-primary) cursor-pointer select-none"
                  >
                    Feature on Landing Page
                  </label>
                </div>
              </div>

              {/* Client & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vanguard Logistics Corp"
                    {...register("client")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.client ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.client && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.client.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Phoenix, AZ"
                    {...register("location")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.location ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.location && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.location.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Image Upload Component */}
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <ImageUploadInput
                    label="Project Cover Image"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.imageUrl?.message}
                    placeholder="/images/projects/project-1.jpg"
                  />
                )}
              />

              {/* Project Details (Rich Content) */}
              <Controller
                name="projectDetails"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    label="Project Details (Rich Content)"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.projectDetails?.message}
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
                      Saving...
                    </div>
                  ) : (
                    "Save Project"
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
