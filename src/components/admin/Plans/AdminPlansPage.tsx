"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertCircle,
  CreditCard,
  Edit2,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface Plan {
  id: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    id: 1,
    name: "Basic Solar Plan",
    description:
      "Perfect entry-level solar solution to start reducing your electricity bills immediately.",
    monthlyPrice: 299.0,
    annualPrice: 249.0,
    features: [
      "High-Efficiency Solar Panels",
      "Real-Time Performance Monitoring",
      "Hybrid Inverter Support",
      "Basic Installation & Setup",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Standard Solar Plan",
    description:
      "Balanced solution with enhanced performance and better energy storage options.",
    monthlyPrice: 499.0,
    annualPrice: 419.0,
    features: [
      "High-Efficiency Solar Panels",
      "Real-Time Performance Monitoring",
      "Hybrid Inverter + Battery Support",
      "Advanced Monitoring Dashboard",
      "Priority Installation",
    ],
    isPopular: true,
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Premium Solar Plan",
    description:
      "Complete energy independence with top-tier equipment and full smart home integration.",
    monthlyPrice: 699.0,
    annualPrice: 589.0,
    features: [
      "Premium High-Efficiency Panels",
      "Real-Time Performance Monitoring",
      "Full Hybrid Battery System",
      "Smart Home Integration",
      "Premium Installation & Support",
      "Extended 25-Year Warranty",
    ],
    isPopular: false,
  },
];

const planSchema = yup.object({
  name: yup
    .string()
    .required("Plan name is required")
    .min(3, "Must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Must be at least 10 characters"),
  monthlyPrice: yup
    .number()
    .typeError("Must be a valid number")
    .required("Monthly price is required")
    .min(0, "Cannot be negative"),
  annualPrice: yup
    .number()
    .typeError("Must be a valid number")
    .required("Annual price is required")
    .min(0, "Cannot be negative"),
  featuresString: yup
    .string()
    .required("At least one feature is required")
    .matches(
      /^[^,\n]+(,\s*[^,\n]+)*$/,
      "Features must be comma-separated strings",
    ),
  isPopular: yup.boolean().defined().default(false),
  badge: yup.string().optional().default(""),
});

interface PlanFormData {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  featuresString: string;
  isPopular: boolean;
  badge: string;
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(() => {
    
    if (typeof window === "undefined") return DEFAULT_PLANS;
    const stored = localStorage.getItem("admin_plans");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Failed to parse saved plans:", error);
        return DEFAULT_PLANS;
      }
    }
    localStorage.setItem("admin_plans", JSON.stringify(DEFAULT_PLANS));
    return DEFAULT_PLANS;
  });
  

  // const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Load plans from localStorage on client side only
  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  const savePlans = (updatedList: Plan[]) => {
    setPlans(updatedList);
    localStorage.setItem("admin_plans", JSON.stringify(updatedList));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormData>({
    resolver: yupResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      monthlyPrice: 299,
      annualPrice: 249,
      featuresString: "",
      isPopular: false,
      badge: "",
    },
  });

  const handleAddClick = () => {
    setEditingPlan(null);
    reset({
      name: "",
      description: "",
      monthlyPrice: 299,
      annualPrice: 249,
      featuresString:
        "High-Efficiency Solar Panels, Real-Time Performance Monitoring, Priority Support",
      isPopular: false,
      badge: "",
    });
    setIsOpen(true);
  };

  const handleEditClick = (plan: Plan) => {
    setEditingPlan(plan);
    reset({
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      annualPrice: plan.annualPrice,
      featuresString: plan.features.join(", "),
      isPopular: !!plan.isPopular,
      badge: plan.badge || "",
    });
    setIsOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("Are you sure you want to delete this pricing plan?")) {
      const filtered = plans.filter((p) => p.id !== id);
      savePlans(filtered);
    }
  };

  const onSubmit = async (data: PlanFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const parsedFeatures = data.featuresString
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingPlan) {
      const updatedList = plans.map((p) =>
        p.id === editingPlan.id
          ? {
              ...p,
              name: data.name,
              description: data.description,
              monthlyPrice: data.monthlyPrice,
              annualPrice: data.annualPrice,
              features: parsedFeatures,
              isPopular: data.isPopular,
              badge: data.badge || undefined,
            }
          : p,
      );
      savePlans(updatedList);
    } else {
      const newPlan: Plan = {
        id: plans.length > 0 ? Math.max(...plans.map((p) => p.id)) + 1 : 1,
        name: data.name,
        description: data.description,
        monthlyPrice: data.monthlyPrice,
        annualPrice: data.annualPrice,
        features: parsedFeatures,
        isPopular: data.isPopular,
        badge: data.badge || undefined,
      };
      savePlans([...plans, newPlan]);
    }
    setIsOpen(false);
  };

  const filteredPlans = plans.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  // if (!isLoaded) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[400px]">
  //       <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  //       <p className="mt-4 text-(--admin-text-secondary) font-medium">
  //         Loading Solar Plans...
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Pricing Plans</h2>
          <p className="admin-page-header-sub">
            Manage solar installation and subscription packages displayed on
            Homepage ({plans.length} active)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button onClick={handleAddClick} className="admin-btn-primary">
            <Plus size={14} />
            Add New Plan
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="admin-table-search relative w-full md:w-80">
          <Search size={14} className="admin-table-search-icon" />
          <input
            placeholder="Search pricing plans..."
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
        {filteredPlans.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <CreditCard size={26} />
            </div>
            <p className="admin-empty-title">No plans found</p>
            <p className="admin-empty-desc">
              Create your first pricing plan to showcase solar packages to your
              clients.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Plan Details</th>
                  <th>Monthly Price</th>
                  <th>Annual Price</th>
                  <th>Features Included</th>
                  <th className="text-center">Popular Badge</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td>
                      <div>
                        <p className="font-bold text-[14.5px] text-(--admin-text-primary) flex items-center gap-2">
                          {plan.name}
                          {plan.badge && (
                            <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                              {plan.badge}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-(--admin-text-muted) mt-0.5 line-clamp-1 max-w-sm">
                          {plan.description}
                        </p>
                      </div>
                    </td>
                    <td className="font-semibold text-emerald-400 font-mono">
                      ${plan.monthlyPrice.toFixed(2)}/mo
                    </td>
                    <td className="font-semibold text-amber-400 font-mono">
                      ${plan.annualPrice.toFixed(2)}/yr
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {plan.features.slice(0, 2).map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-(--admin-surface-2) text-(--admin-text-secondary) px-2 py-0.5 rounded border border-(--admin-border)"
                          >
                            {feat}
                          </span>
                        ))}
                        {plan.features.length > 2 && (
                          <span className="text-[11px] text-(--admin-text-muted) font-bold self-center">
                            +{plan.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      {plan.isPopular ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Star size={11} fill="currentColor" /> Featured
                        </span>
                      ) : (
                        <span className="text-xs text-(--admin-text-muted)">
                          -
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(plan)}
                          className="admin-action-btn"
                          title="Edit Plan"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(plan.id)}
                          className="admin-action-btn danger"
                          title="Delete Plan"
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
          <div className="w-full max-w-lg bg-(--admin-surface) border border-(--admin-border-strong) rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-(--admin-border) bg-(--admin-surface-2)">
              <h3 className="text-base font-bold text-(--admin-text-primary) flex items-center gap-2">
                <CreditCard size={18} className="text-(--admin-accent)" />
                {editingPlan ? "Edit Pricing Plan" : "Add Pricing Plan"}
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
                  Plan Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Solar Plan"
                  {...register("name")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.name ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.name && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of plan benefits and package scope..."
                  {...register("description")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.description ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.description && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.description.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Monthly Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="299.00"
                    {...register("monthlyPrice")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.monthlyPrice ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm font-mono text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.monthlyPrice && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.monthlyPrice.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Annual Price ($/mo eq.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="249.00"
                    {...register("annualPrice")}
                    className={`w-full bg-(--admin-surface-2) border ${errors.annualPrice ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm font-mono text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                  />
                  {errors.annualPrice && (
                    <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.annualPrice.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Features List (Comma-separated) *
                </label>
                <input
                  type="text"
                  placeholder="High-Efficiency Panels, 25-Year Warranty, Smart Inverter"
                  {...register("featuresString")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.featuresString ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.featuresString && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.featuresString.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Most Popular"
                    {...register("badge")}
                    className="w-full bg-(--admin-surface-2) border border-(--admin-border) text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition"
                  />
                </div>

                <div className="flex items-center gap-3 bg-(--admin-surface-2) border border-(--admin-border) rounded-lg p-2.5 mt-auto h-11">
                  <input
                    type="checkbox"
                    id="isPopular"
                    {...register("isPopular")}
                    className="w-4 h-4 text-(--admin-accent) focus:ring-(--admin-accent) border-(--admin-border) rounded accent-(--admin-accent) cursor-pointer"
                  />
                  <label
                    htmlFor="isPopular"
                    className="text-xs font-semibold text-(--admin-text-primary) cursor-pointer select-none"
                  >
                    Highlight / Featured
                  </label>
                </div>
              </div>

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
                  {isSubmitting ? "Saving..." : "Save Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
