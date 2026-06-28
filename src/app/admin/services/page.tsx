"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Icons from "lucide-react";
import { 
  Search, Plus, Edit2, Trash2, Eye, X, Check, AlertCircle, Wrench, Shield, Zap, Sun, Battery, Globe, Leaf, Activity
} from "lucide-react";

// Define the Service Interface
interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  iconName: string;
  slug: string;
}

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

// Initial mock data mirroring the client-facing services list
const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    title: "Solar Battery Storage",
    description: "Reliable energy storage solutions that store excess solar power for use during peak hours or blackouts.",
    image: "/images/services/service-item-image-1.jpg",
    alt: "Solar Battery Storage field",
    iconName: "Battery",
    slug: "solar-battery-storage",
  },
  {
    id: 2,
    title: "Residential Solar Solutions",
    description: "Custom designed solar systems for homes that help reduce electricity bills and support clean energy goals.",
    image: "/images/services/service-item-image-2.jpg",
    alt: "Engineers working on home solar design",
    iconName: "Sun",
    slug: "residential-solar-solutions",
  },
  {
    id: 3,
    title: "Solar System Maintenance",
    description: "Regular inspection, cleaning, and performance checks to ensure your solar panels are producing at maximum efficiency.",
    image: "/images/services/service-item-image-3.jpg",
    alt: "Engineer maintaining panels",
    iconName: "Wrench",
    slug: "solar-system-maintenance",
  },
  {
    id: 4,
    title: "Rooftop Solar Solutions",
    description: "Space efficient rooftop systems designed to maximize energy generation on residential and commercial roofs.",
    image: "/images/services/service-item-image-4.jpg",
    alt: "A smiling couple standing in front of their house with rooftop solar panels",
    iconName: "Zap",
    slug: "rooftop-solar-solutions",
  },
  {
    id: 5,
    title: "Solar Panel Installation",
    description: "Professional design, permitting, and high-quality installation services for reliable green energy production.",
    image: "/images/services/service-item-image-5.jpg",
    alt: "Two technicians installing and checking solar panels on a sunny day",
    iconName: "Shield",
    slug: "solar-panel-installation",
  },
  {
    id: 6,
    title: "Hybrid Solar Systems",
    description: "A smart combination of grid-tied solar panels and battery storage to ensure continuous power supply.",
    image: "/images/services/service-item-image-6.jpg",
    alt: "Engineers inspecting a massive commercial hybrid solar system farm",
    iconName: "Globe",
    slug: "hybrid-solar-systems",
  },
];

// Validation Schema using Yup
const serviceSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  slug: yup.string()
    .required("Slug is required")
    .matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens (e.g., solar-battery-storage)"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  image: yup.string().required("Image path is required").matches(/^\/.*$/, "Image path must start with a leading slash / (e.g., /images/services/service-1.jpg)"),
  alt: yup.string().required("Alt text is required").min(5, "Alt text must be descriptive"),
  iconName: yup.string().required("Please select an icon"),
});

type ServiceFormData = yup.InferType<typeof serviceSchema>;

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Load services from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("admin_services");
    if (stored) {
      setServices(JSON.parse(stored));
    } else {
      setServices(DEFAULT_SERVICES);
      localStorage.setItem("admin_services", JSON.stringify(DEFAULT_SERVICES));
    }
    setIsLoaded(true);
  }, []);

  // Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ServiceFormData>({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      image: "/images/services/service-item-image-1.jpg",
      alt: "",
      iconName: "Battery"
    }
  });

  // Automatically generate slug from Title
  const formTitle = watch("title");
  useEffect(() => {
    if (formTitle && !editingService) {
      const generatedSlug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/-+/g, "-"); // Collapse multiple dashes
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [formTitle, setValue, editingService]);

  // Save changes to localStorage helper
  const saveServices = (updatedList: Service[]) => {
    setServices(updatedList);
    localStorage.setItem("admin_services", JSON.stringify(updatedList));
  };

  // Open Add Modal
  const handleAddClick = () => {
    setEditingService(null);
    reset({
      title: "",
      slug: "",
      description: "",
      image: "/images/services/service-item-image-1.jpg",
      alt: "",
      iconName: "Battery"
    });
    setIsOpen(true);
  };

  // Open Edit Modal
  const handleEditClick = (service: Service) => {
    setEditingService(service);
    reset({
      title: service.title,
      slug: service.slug,
      description: service.description,
      image: service.image,
      alt: service.alt,
      iconName: service.iconName
    });
    setIsOpen(true);
  };

  // Delete Action
  const handleDeleteClick = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const filtered = services.filter((s) => s.id !== id);
      saveServices(filtered);
    }
  };

  // Handle Form Submit
  const onSubmit = async (data: ServiceFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: Connect with API (e.g. axios.post('/api/services', data))
    if (editingService) {
      // Edit mode
      const updatedList = services.map((s) =>
        s.id === editingService.id ? { ...s, ...data } : s
      );
      saveServices(updatedList);
    } else {
      // Add mode
      const newService: Service = {
        id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
        ...data,
      };
      saveServices([...services, newService]);
    }
    setIsOpen(false);
  };

  // Filtered Services List
  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  // Dynamic Lucide Icon Render Helper
  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[var(--admin-text-secondary)] font-medium">Loading Services catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Services</h2>
          <p className="admin-page-header-sub">
            Configure & manage client-facing solar services ({services.length} services)
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
                  <th className="w-16 text-center">Icon</th>
                  <th>Service Detail</th>
                  <th>Slug</th>
                  <th>Image Path</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td className="text-center">
                      <div className="mx-auto w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(245,158,11,0.08)] text-[var(--admin-accent)] border border-[rgba(245,158,11,0.15)]">
                        {renderIcon(service.iconName, "w-5 h-5")}
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-semibold text-[14.5px] text-[var(--admin-text-primary)]">{service.title}</p>
                        <p className="text-[12px] text-[var(--admin-text-secondary)] line-clamp-2 max-w-lg mt-0.5">
                          {service.description}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-[12px] text-[var(--admin-text-secondary)] bg-[var(--admin-surface-2)] px-2 py-1 rounded">
                        {service.slug}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-[12px] text-[var(--admin-text-muted)]">
                        {service.image}
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

      {/* CRUD Edit/Add Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-[var(--admin-surface)] border border-[var(--admin-border-strong)] rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--admin-border)] bg-[var(--admin-surface-2)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)] flex items-center gap-2">
                <Wrench size={18} className="text-[var(--admin-accent)]" />
                {editingService ? "Edit Service" : "Add Service"}
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* Service Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                  Service Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Off-Grid Solar Setup"
                  {...register("title")}
                  className={`w-full bg-[var(--admin-surface-2)] border ${errors.title ? 'border-[var(--admin-danger)]' : 'border-[var(--admin-border)]'} text-sm text-[var(--admin-text-primary)] rounded-lg p-2.5 outline-none focus:border-[var(--admin-accent)] transition`}
                />
                {errors.title && (
                  <span className="text-[11px] text-[var(--admin-danger)] flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.title.message}
                  </span>
                )}
              </div>

              {/* Service Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                  Slug (URL Segment) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. off-grid-solar-setup"
                  {...register("slug")}
                  className={`w-full bg-[var(--admin-surface-2)] border ${errors.slug ? 'border-[var(--admin-danger)]' : 'border-[var(--admin-border)]'} text-sm font-mono text-[var(--admin-text-primary)] rounded-lg p-2.5 outline-none focus:border-[var(--admin-accent)] transition`}
                />
                {errors.slug && (
                  <span className="text-[11px] text-[var(--admin-danger)] flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.slug.message}
                  </span>
                )}
                {!editingService && (
                  <span className="text-[10px] text-[var(--admin-text-muted)] italic">
                    Automatically syncs with title. Feel free to customize.
                  </span>
                )}
              </div>

              {/* Icon Choice & Preview */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                  Dashboard & Card Icon *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_ICONS.map((ico) => {
                    const isSelected = watch("iconName") === ico.name;
                    const IconComponent = ico.icon;
                    return (
                      <button
                        key={ico.name}
                        type="button"
                        onClick={() => setValue("iconName", ico.name, { shouldValidate: true })}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition text-center gap-1 ${
                          isSelected
                            ? "bg-[var(--admin-accent-muted)] border-[var(--admin-accent)] text-[var(--admin-accent)]"
                            : "bg-[var(--admin-surface-2)] border-[var(--admin-border)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
                        }`}
                      >
                        <IconComponent size={18} />
                        <span className="text-[10px] font-medium block truncate max-w-full">{ico.name}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.iconName && (
                  <span className="text-[11px] text-[var(--admin-danger)] flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.iconName.message}
                  </span>
                )}
              </div>

              {/* Image Path */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                    Image File Path *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /images/services/service-1.jpg"
                    {...register("image")}
                    className={`w-full bg-[var(--admin-surface-2)] border ${errors.image ? 'border-[var(--admin-danger)]' : 'border-[var(--admin-border)]'} text-sm text-[var(--admin-text-primary)] rounded-lg p-2.5 outline-none focus:border-[var(--admin-accent)] transition`}
                  />
                  {errors.image && (
                    <span className="text-[11px] text-[var(--admin-danger)] flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.image.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                    Accessibility Alt Text *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Battery storage system inside a home garage"
                    {...register("alt")}
                    className={`w-full bg-[var(--admin-surface-2)] border ${errors.alt ? 'border-[var(--admin-danger)]' : 'border-[var(--admin-border)]'} text-sm text-[var(--admin-text-primary)] rounded-lg p-2.5 outline-none focus:border-[var(--admin-accent)] transition`}
                  />
                  {errors.alt && (
                    <span className="text-[11px] text-[var(--admin-danger)] flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.alt.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Service Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                  Service Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide details about what this service offers and how it helps clients..."
                  {...register("description")}
                  className={`w-full bg-[var(--admin-surface-2)] border ${errors.description ? 'border-[var(--admin-danger)]' : 'border-[var(--admin-border)]'} text-sm text-[var(--admin-text-primary)] rounded-lg p-2.5 outline-none focus:border-[var(--admin-accent)] transition resize-none`}
                />
                {errors.description && (
                  <span className="text-[11px] text-[var(--admin-danger)] flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.description.message}
                  </span>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--admin-border)]">
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
