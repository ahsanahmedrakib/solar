"use client";

import {
  expandServices,
  parsePalashApplication,
  serviceLabel,
  spaceLabel,
  type PalashApplication,
} from "@/data/palash";
import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { queryKeys, useQueryContact } from "@/lib/queries";
import { useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  BatteryCharging,
  Building2,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminPalashApplicationsPage() {
  const {
    data: queries = [],
    isLoading,
    isFetching,
    refetch,
  } = useQueryContact();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<
    "all" | "new" | "replied" | "archived"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<PalashApplication | null>(null);

  const applications = (queries ?? [])
    .map(parsePalashApplication)
    .filter((app): app is PalashApplication => app !== null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const handleStatusChange = async (
    id: string,
    newStatus: "new" | "replied" | "archived",
  ) => {
    try {
      const res = await apiClient("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.contact });
        if (selected && selected.id === id) {
          setSelected({ ...selected, status: newStatus });
        }
        toast.success(`Status updated to ${newStatus.toUpperCase()}`);
      } else {
        toast.error("Failed to update status: " + json.error);
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this application?")) {
      try {
        const res = await apiClient(`/api/contact?id=${id}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (json.success) {
          queryClient.invalidateQueries({ queryKey: queryKeys.contact });
          if (selected && selected.id === id) {
            setSelected(null);
          }
          toast.success("Application deleted");
        } else {
          toast.error("Failed to delete application: " + json.error);
        }
      } catch (error) {
        console.error("Failed to delete application", error);
        toast.error("Failed to delete application.");
      }
    }
  };

  const filtered = applications.filter((app) => {
    const matchesTab = activeTab === "all" ? true : app.status === activeTab;
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      app.fullName.toLowerCase().includes(q) ||
      app.businessName.toLowerCase().includes(q) ||
      app.mobile.toLowerCase().includes(q) ||
      app.district.toLowerCase().includes(q) ||
      app.thana.toLowerCase().includes(q) ||
      app.services.some((s) => serviceLabel(s).toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  const totalCount = applications.length;
  const newCount = applications.filter((app) => app.status === "new").length;
  const repliedCount = applications.filter(
    (app) => app.status === "replied",
  ).length;
  const archivedCount = applications.filter(
    (app) => app.status === "archived",
  ).length;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

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
          Loading Palash applications...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title flex items-center gap-2.5">
            <BatteryCharging className="text-warning" size={24} />
            Palash Partner Applications
          </h2>
          <p className="admin-page-header-sub">
            Review dealership &amp; partner applications submitted from the
            Palash Charging Station page.
          </p>
        </div>
        <div className="admin-page-header-actions flex items-center gap-3">
          <button
            onClick={() => {
              refetch();
              toast.success("Applications refreshed");
            }}
            className="admin-btn-secondary flex items-center gap-2 text-xs px-4 py-2"
            disabled={isFetching}
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab("all")}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-admin-surface-2 border-warning"
              : "bg-admin-surface border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Total Applications
            </span>
            <BatteryCharging size={18} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-white">{totalCount}</div>
          <p className="text-xs text-gray-400 mt-1">All partner applications</p>
        </div>

        <div
          onClick={() => setActiveTab("new")}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            activeTab === "new"
              ? "bg-admin-surface-2 border-blue-500"
              : "bg-admin-surface border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              New / Unreviewed
            </span>
            <Clock size={18} className="text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{newCount}</div>
          <p className="text-xs text-gray-400 mt-1">
            Awaiting review or action
          </p>
        </div>

        <div
          onClick={() => setActiveTab("replied")}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            activeTab === "replied"
              ? "bg-admin-surface-2 border-emerald-500"
              : "bg-admin-surface border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Replied
            </span>
            <CheckCircle size={18} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {repliedCount}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Contacted / responded partners
          </p>
        </div>

        <div
          onClick={() => setActiveTab("archived")}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            activeTab === "archived"
              ? "bg-admin-surface-2 border-gray-500"
              : "bg-admin-surface border-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Archived
            </span>
            <Archive size={18} className="text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-300">
            {archivedCount}
          </div>
          <p className="text-xs text-gray-400 mt-1">Closed or saved records</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-admin-surface p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-1.5 bg-admin-bg p-1.5 rounded-lg border border-white/5">
          {(["all", "new", "replied", "archived"] as const)?.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? "bg-warning text-admin-bg shadow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search name, phone, district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-bg border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-warning transition-colors"
          />
        </div>
      </div>

      {/* Main Content Table */}
      <div className="bg-admin-surface rounded-xl border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-3">
            <BatteryCharging
              size={40}
              className="mx-auto text-gray-600 opacity-50"
            />
            <p className="text-base font-semibold text-gray-300">
              No Palash applications found
            </p>
            <p className="text-xs max-w-sm mx-auto">
              There are no partner applications matching your current filter
              criteria or search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-admin-surface-2/50 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Applicant</th>
                  <th className="py-3.5 px-5">Location</th>
                  <th className="py-3.5 px-5">Dealership Interest</th>
                  <th className="py-3.5 px-5">Date Received</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-warning/10 text-warning flex items-center justify-center font-bold text-xs shrink-0">
                          {app.fullName.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div>{app.fullName}</div>
                          <div className="text-[11px] font-normal text-gray-400">
                            {app.mobile || "No phone"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white truncate max-w-40">
                        {app.district}
                      </div>
                      <div className="text-gray-400 text-[11px] truncate max-w-40">
                        {app.thana}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {app.services.length > 0 ? (
                          expandServices(app.services).map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-500/10 text-accent-400 border border-accent-500/20 whitespace-nowrap"
                            >
                              {serviceLabel(s)}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-gray-400">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      {app.status === "new" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          New
                        </span>
                      )}
                      {app.status === "replied" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                          <CheckCircle size={11} />
                          Replied
                        </span>
                      )}
                      {app.status === "archived" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20 inline-flex items-center gap-1">
                          <Archive size={11} />
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelected(app)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-warning hover:text-admin-bg text-gray-300 transition-colors"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 size={15} />
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-admin-surface border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-admin-surface-2/50">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-warning/10 text-warning border border-warning/20">
                    Application #{selected.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    Received {formatDate(selected.createdAt)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">
                  {selected.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Contact Card */}
              <div className="bg-admin-bg p-4 rounded-xl border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-warning shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Mobile
                    </div>
                    {selected.mobile ? (
                      <a
                        href={`tel:${selected.mobile}`}
                        className="font-bold text-blue-400 hover:underline mt-0.5 block truncate"
                      >
                        {selected.mobile}
                      </a>
                    ) : (
                      <div className="font-bold text-white mt-0.5">N/A</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-warning shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      WhatsApp
                    </div>
                    {selected.whatsapp ? (
                      <a
                        href={`https://wa.me/${selected.whatsapp.replace(
                          /[^0-9]/g,
                          "",
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-400 hover:underline mt-0.5 block truncate"
                      >
                        {selected.whatsapp}
                      </a>
                    ) : (
                      <div className="font-bold text-white mt-0.5">N/A</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-warning shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Email
                    </div>
                    {selected.email ? (
                      <a
                        href={`mailto:${selected.email}`}
                        className="font-bold text-blue-400 hover:underline mt-0.5 block truncate"
                      >
                        {selected.email}
                      </a>
                    ) : (
                      <div className="font-bold text-white mt-0.5">N/A</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal & Business */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} className="text-warning" />
                  Personal & Business Information
                </h4>
                <div className="bg-admin-bg p-4 rounded-xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Full Name
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {selected.fullName}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Business / Shop Name
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {selected.businessName || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} className="text-warning" />
                  Location Details
                </h4>
                <div className="bg-admin-bg p-4 rounded-xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      District
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {selected.district || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Thana / Upazila
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {selected.thana || "N/A"}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Full Shop / Garage Address
                    </div>
                    <div className="font-bold text-white mt-0.5 leading-relaxed whitespace-pre-wrap">
                      {selected.address || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dealership Interest */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <BatteryCharging size={14} className="text-warning" />
                  Dealership Interest
                </h4>
                <div className="bg-admin-bg p-4 rounded-xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Interested Services
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selected.services.length > 0 ? (
                        expandServices(selected.services).map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-500/10 text-accent-400 border border-accent-500/20"
                          >
                            {serviceLabel(s)}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase font-semibold">
                        Existing Business
                      </div>
                      <div className="font-bold text-white mt-0.5">
                        {selected.hasBusiness === "yes"
                          ? "Yes, existing business"
                          : "No, new investor"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase font-semibold">
                        Years of Experience
                      </div>
                      <div className="font-bold text-white mt-0.5">
                        {selected.experienceYears || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facility & Capacity */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <Archive size={14} className="text-warning" />
                  Facility & Capacity
                </h4>
                <div className="bg-admin-bg p-4 rounded-xl border border-white/5 space-y-4 text-xs">
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Space / Garage Availability
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {spaceLabel(selected.space)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Additional Comments
                    </div>
                    <div className="font-bold text-white mt-0.5 leading-relaxed whitespace-pre-wrap">
                      {selected.comments || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              {selected.notes && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle size={14} />
                    Admin Notes & Reply Log
                  </h4>
                  <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/15 text-xs text-emerald-200 leading-relaxed whitespace-pre-wrap">
                    {selected.notes}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-admin-surface-2/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  Status:
                </span>
                <select
                  value={selected.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selected.id,
                      e.target.value as PalashApplication["status"],
                    )
                  }
                  className="bg-admin-bg border border-white/10 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-warning"
                >
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

