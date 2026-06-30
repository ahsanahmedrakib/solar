"use client";

import { ImageUploadInput } from "@/components/Admin/ImageUploadInput";
import { RichTextEditor } from "@/components/Admin/RichTextEditor";
import type { Service } from "@/data/services";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icons from "lucide-react";
import {
  Activity,
  AlertCircle,
  Battery,
  Edit2,
  Globe,
  Leaf,
  Plus,
  Search,
  Shield,
  Sun,
  Trash2,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

// Available Lucide Icons for selection
const AVAILABLE_ICONS = [
  { name: "Zap", label: "Energy (Zap)", icon: Zap },
  { name: "Sun", label: "Solar (Sun)", icon: Sun },
  { name: "Battery", label: "Storage (Battery)", icon: Battery },
  { name: "Wrench", label: "Maintenance (Wrench)", icon: Wrench },
  { name: "Shield", label: "Security/Warranty (Shield)", icon: Shield },
  { name: "Globe", label: "Global (Globe)", icon: Globe },
  { name: "Leaf", label: "Eco (Leaf)", icon: Leaf },
  { name: "Activity", label: "Monitoring (Activity)", icon: Activity },
];

// Validation Schema
const serviceSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  slug: yup
    .string()
    .required("Slug is required")
    .matches(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  serviceDetails: yup
    .string()
    .required("serviceDetails is required")
    .min(10, "serviceDetails must be at least 10 characters")
    .max(4000, "serviceDetails must not exceed 4000 characters"),
  image: yup.string().required("Image is required"),
  alt: yup
    .string()
    .required("Alt text is required")
    .min(5, "Alt text must be descriptive"),
  iconName: yup.string().required("Please select an icon"),
});

type ServiceFormData = yup.InferType<typeof serviceSchema>;

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success) {
          setServices(json.data);
        }
      } catch (error) {
        console.error("Failed to load services", error);
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  // Form Setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      serviceDetails: "",
      image: "",
      alt: "",
      iconName: "",
    },
  });

  // Auto-generate slug from title
  const formTitle = useWatch({ control, name: "title" }) as string;
  const selectedIcon = useWatch({ control, name: "iconName" }) as string;

  useEffect(() => {
    if (formTitle && !editingService) {
      const generatedSlug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [formTitle, setValue, editingService]);

  const handleAddClick = () => {
    setEditingService(null);
    reset({
      title: "",
      slug: "",
      description: "",
      serviceDetails: "",
      image: "",
      alt: "",
      iconName: "",
    });
    setIsOpen(true);
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    reset({
      title: service.title,
      slug: service.slug,
      description: service.description,
      serviceDetails: service.serviceDetails,
      image: service.image,
      alt: service.alt,
      iconName: service.iconName,
    });
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const res = await fetch(`/api/services?id=${id}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) => prev.filter((s) => s.id !== id));
          toast.success("Service deleted successfully!");
        } else {
          toast.error("Failed to delete service: " + json.error);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to delete service", error);
        toast.error("Failed to delete service: " + message);
      }
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (editingService) {
        const res = await fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingService.id, ...data }),
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) =>
            prev.map((s) =>
              s.id === editingService.id ? { ...s, ...data } : s,
            ),
          );
          toast.success("Service updated successfully!");
        } else {
          toast.error("Failed to update service: " + json.error);
        }
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) => [...prev, json.data]);
          toast.success("Service added successfully!");
        } else {
          toast.error("Failed to add service: " + json.error);
        }
      }
      setIsOpen(false);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Failed to save service", error);
      toast.error("Failed to save service: " + message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-(--admin-text-secondary) font-medium">
          Loading Services...
        </p>
      </div>
    );
  }

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  // Dynamic Icon Renderer
  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    const lucideIcons = Icons as unknown as Record<
      string,
      React.ComponentType<React.SVGProps<SVGSVGElement>>
    >;
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? (
      <IconComponent className={className} />
    ) : (
      <Icons.HelpCircle className={className} />
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Services</h2>
          <p className="admin-page-header-sub">
            Configure & manage client-facing solar services ({services.length}{" "}
            services)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button onClick={handleAddClick} className="admin-btn-primary">
            <Plus size={14} />
            Add Service
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="admin-table-search relative w-full sm:w-80">
          <Search size={14} className="admin-table-search-icon" />
          <input
            placeholder="Search services by title or description..."
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

      {/* Services Table Card */}
      <div className="admin-table-card">
        {filteredServices.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <Wrench size={26} />
            </div>
            <p className="admin-empty-title">No services found</p>
            <p className="admin-empty-desc">
              Try adjusting your search query or add a new service
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Slug</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-14 h-10 rounded-md bg-cover bg-center border border-(--admin-border) shrink-0"
                          style={{
                            backgroundImage: `url(${service.image})`,
                          }}
                        />
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(245,158,11,0.08)] text-(--admin-accent) border border-[rgba(245,158,11,0.15)] shrink-0">
                            {renderIcon(service.iconName, "w-4 h-4")}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[14.5px] text-(--admin-text-primary)">
                              {service.title}
                            </p>
                            <p className="text-[12px] text-(--admin-text-secondary) line-clamp-2 max-w-lg mt-0.5">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-[12px] text-(--admin-text-secondary) bg-(--admin-surface-2) px-2 py-1 rounded">
                        {service.slug}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(service)}
                          className="admin-action-btn"
                          title="Edit Service"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(service.id)}
                          className="admin-action-btn danger"
                          title="Delete Service"
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

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[70%] bg-(--admin-surface) border border-(--admin-border-strong) rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-(--admin-border) bg-(--admin-surface-2)">
              <h3 className="text-base font-bold text-(--admin-text-primary) flex items-center gap-2">
                <Wrench size={18} className="text-(--admin-accent)" />
                {editingService ? "Edit Service" : "Add Service"}
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
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Service Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Off-Grid Solar Setup"
                  {...register("title")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.title ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.title && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Slug (URL Segment) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. off-grid-solar-setup"
                  {...register("slug")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.slug ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm font-mono text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.slug && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.slug.message}
                  </span>
                )}
              </div>

              {/* Icon Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Dashboard & Card Icon *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_ICONS.map((ico) => {
                    const isSelected = selectedIcon === ico.name;
                    const IconComponent = ico.icon;
                    return (
                      <button
                        key={ico.name}
                        type="button"
                        onClick={() =>
                          setValue("iconName", ico.name, {
                            shouldValidate: true,
                          })
                        }
                        className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition text-center gap-1 ${
                          isSelected
                            ? "bg-(--admin-accent-muted) border-(--admin-accent) text-(--admin-accent)"
                            : "bg-(--admin-surface-2) border-(--admin-border) text-(--admin-text-secondary) hover:text-(--admin-text-primary)"
                        }`}
                      >
                        <IconComponent size={18} />
                        <span className="text-[10px] font-medium block truncate max-w-full">
                          {ico.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.iconName && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.iconName.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <ImageUploadInput
                      label="Service Image"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.image?.message}
                      placeholder="/images/services/service-item-image-1.jpg"
                    />
                  )}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Accessibility Alt Text *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Battery storage system inside a home garage"
                    {...register("alt")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.alt ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.alt && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.alt.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Service Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide details about what this service offers..."
                  {...register("description")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.description ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition resize-none`}
                />
                {errors.description && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.description.message}
                  </span>
                )}
              </div>

              <Controller
                name="serviceDetails"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    label="Service Details (Rich Content)"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.serviceDetails?.message}
                  />
                )}
              />

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
                      <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                      Saving...
                    </div>
                  ) : (
                    "Save Service"
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
