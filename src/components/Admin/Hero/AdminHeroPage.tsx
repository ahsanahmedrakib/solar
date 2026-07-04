"use client";

import { ImageUploadInput } from "@/components/Admin/ImageUploadInput";
import type { HeroSlide } from "@/data/hero-slides";
import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertCircle,
  Edit2,
  ImageIcon,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const slideSchema = yup.object({
  tagline: yup.string().required("Tagline is required"),
  title: yup.string().required("Title is required"),
  titleAccent: yup.string().required("Accent title is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Background image is required"),
  videoUrl: yup.string().required("Video URL is required"),
  showVideoButton: yup.boolean().default(true),
  isActive: yup.boolean().default(true),
  order: yup.number().min(1).default(1),
});

type SlideFormData = yup.InferType<typeof slideSchema>;

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SlideFormData>({
    resolver: yupResolver(slideSchema),
    defaultValues: {
      tagline: "",
      title: "",
      titleAccent: "",
      description: "",
      image: "",
      videoUrl: "",
      showVideoButton: false,
      isActive: true,
      order: 1,
    },
  });

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await apiClient("/api/hero-slides");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setSlides(json.data);
        } else {
          setSlides([]);
          if (!json.success) {
            toast.error("Failed to load hero slides: " + json.error);
          }
        }
      } catch (error) {
        console.error("Failed to load hero slides", error);
        toast.error("Failed to load hero slides.");
      } finally {
        setLoading(false);
      }
    }
    loadSlides();
  }, []);

  const handleAddClick = () => {
    setEditingSlide(null);
    reset({
      tagline: "",
      title: "",
      titleAccent: "",
      description: "",
      image: "",
      videoUrl: "",
      showVideoButton: false,
      isActive: true,
      order: slides?.length + 1,
    });
    setIsOpen(true);
  };

  const handleEditClick = (slide: HeroSlide) => {
    setEditingSlide(slide);
    reset({
      tagline: slide.tagline,
      title: slide.title,
      titleAccent: slide.titleAccent,
      description: slide.description,
      image: slide.image,
      videoUrl: slide.videoUrl,
      showVideoButton: slide.showVideoButton,
      isActive: slide.isActive,
      order: slide.order,
    });
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm("Are you sure you want to delete this hero slide?")) return;

    try {
      const res = await apiClient(`/api/hero-slides?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
        toast.success("Hero slide deleted successfully!");
      } else {
        toast.error("Failed to delete hero slide: " + json.error);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to delete hero slide", error);
      toast.error("Failed to delete hero slide: " + message);
    }
  };

  const onSubmit = async (data: SlideFormData) => {
    try {
      if (editingSlide) {
        const res = await apiClient("/api/hero-slides", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingSlide.id, ...data }),
        });
        const json = await res.json();
        if (json.success) {
          setSlides((prev) =>
            prev?.map((s) =>
              s.id === editingSlide.id ? { ...s, ...data } : s,
            ),
          );
          toast.success("Hero slide updated successfully!");
          setIsOpen(false);
        } else {
          toast.error("Failed to update hero slide: " + json.error);
        }
      } else {
        const res = await apiClient("/api/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success) {
          setSlides((prev) => [...prev, json.data]);
          toast.success("Hero slide added successfully!");
          setIsOpen(false);
        } else {
          toast.error("Failed to add hero slide: " + json.error);
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to save hero slide", error);
      toast.error("Failed to save hero slide: " + message);
    }
  };

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
          Loading hero slides...
        </p>
      </div>
    );
  }

  const filteredSlides = slides.filter(
    (slide) =>
      slide.title.toLowerCase().includes(search.toLowerCase()) ||
      slide.titleAccent.toLowerCase().includes(search.toLowerCase()) ||
      slide.tagline.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Hero Slider</h2>
          <p className="admin-page-header-sub">
            Manage homepage hero background slides and content ({slides?.length}{" "}
            slides)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button onClick={handleAddClick} className="admin-btn-primary">
            <Plus size={14} />
            Add Slide
          </button>
        </div>
      </div>

      <div className="admin-table-search relative w-full sm:w-80">
        <Search size={14} className="admin-table-search-icon" />
        <input
          placeholder="Search slides by title or tagline..."
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

      <div className="admin-table-card">
        {filteredSlides?.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <ImageIcon size={26} />
            </div>
            <p className="admin-empty-title">No hero slides found</p>
            <p className="admin-empty-desc">
              Add a slide to populate the homepage hero carousel
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Slide</th>
                  <th>Video</th>
                  <th className="text-center">Order</th>
                  <th className="text-center">Status</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSlides?.map((slide) => (
                  <tr key={slide.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-20 h-12 rounded-md bg-cover bg-center border border-(--admin-border) shrink-0"
                          style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] text-(--admin-accent) font-semibold uppercase tracking-wide">
                            {slide.tagline}
                          </p>
                          <p className="font-semibold text-[14.5px] text-(--admin-text-primary)">
                            {slide.title}{" "}
                            <span className="text-(--admin-text-secondary)">
                              {slide.titleAccent}
                            </span>
                          </p>
                          <p className="text-[12px] text-(--admin-text-muted) line-clamp-1 mt-0.5">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {slide.videoUrl ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Video Attached
                        </span>
                      ) : (
                        <span className="text-xs text-(--admin-text-muted)">
                          -
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--admin-surface-2) text-(--admin-text-secondary) border border-(--admin-border)">
                        #{slide.order}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          slide.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }`}
                      >
                        {slide.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(slide)}
                          className="admin-action-btn"
                          title="Edit Slide"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(slide.id)}
                          className="admin-action-btn danger"
                          title="Delete Slide"
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

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[70%] bg-(--admin-surface) border border-(--admin-border-strong) rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-(--admin-border) bg-(--admin-surface-2)">
              <h3 className="text-base font-bold text-(--admin-text-primary) flex items-center gap-2">
                <ImageIcon size={18} className="text-(--admin-accent)" />
                {editingSlide ? "Edit Hero Slide" : "Add Hero Slide"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-(--admin-text-muted) hover:text-(--admin-text-primary) transition"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 overflow-y-auto space-y-4 flex-1"
            >
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUploadInput
                    label="Background Image"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.image?.message}
                    placeholder="/images/home/hero-bg-image.jpg"
                  />
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Tagline *
                  </label>
                  <input
                    {...register("tagline")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.tagline ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.tagline && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.tagline.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("order", { valueAsNumber: true })}
                    className="w-full bg-(--admin-surface-2) border border-(--admin-border) text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Title Line 1 *
                  </label>
                  <input
                    {...register("title")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.title ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Title Accent *
                  </label>
                  <input
                    {...register("titleAccent")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.titleAccent ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.description ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition resize-none`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Video URL (YouTube / MP4) *
                </label>
                <input
                  {...register("videoUrl")}
                  placeholder="https://www.youtube.com/embed/..."
                  className={`w-full bg-(--admin-surface-2) border ${errors.videoUrl ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.videoUrl && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.videoUrl.message}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-(--admin-text-secondary) cursor-pointer">
                  <input type="checkbox" {...register("showVideoButton")} />
                  Show video button
                </label>
                <label className="flex items-center gap-2 text-sm text-(--admin-text-secondary) cursor-pointer">
                  <input type="checkbox" {...register("isActive")} />
                  Active on homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-(--admin-border)">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="admin-btn-secondary px-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-btn-primary px-5"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingSlide
                      ? "Update Slide"
                      : "Add Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

