"use client";

import {
  Archive,
  CheckCircle,
  Clock,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Send,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { ContactQuery } from "@/data/contact";

export default function AdminContactQueriesPage() {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "all" | "new" | "replied" | "archived"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [replyText, setReplyText] = useState("");

  const loadQueries = async () => {
    try {
      const res = await fetch("/api/contact");
      const json = await res.json();
      if (json.success) {
        setQueries(json.data);
      } else {
        toast.error("Failed to load contact queries: " + json.error);
      }
    } catch (e) {
      console.error("Failed to load contact queries", e);
      toast.error("Failed to load contact queries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadQueries();
    })();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: "new" | "replied" | "archived",
  ) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setQueries((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        if (selectedQuery && selectedQuery.id === id) {
          setSelectedQuery({ ...selectedQuery, status: newStatus });
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
    if (confirm("Are you sure you want to delete this contact query?")) {
      try {
        const res = await fetch(`/api/contact?id=${id}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (json.success) {
          setQueries((prev) => prev.filter((q) => q.id !== id));
          if (selectedQuery && selectedQuery.id === id) {
            setSelectedQuery(null);
          }
          toast.success("Contact query deleted");
        } else {
          toast.error("Failed to delete contact query: " + json.error);
        }
      } catch (error) {
        console.error("Failed to delete contact query", error);
        toast.error("Failed to delete contact query.");
      }
    }
  };

  const handleSendReplyNote = async () => {
    if (!selectedQuery || !replyText.trim()) return;
    const newNotes = (selectedQuery.notes ? selectedQuery.notes + "\n\n" : "") +
      `[Replied on ${new Date().toLocaleDateString()}]: ` +
      replyText;

    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedQuery.id, status: "replied", notes: newNotes }),
      });
      const json = await res.json();
      if (json.success) {
        setQueries((prev) =>
          prev.map((q) =>
            q.id === selectedQuery.id
              ? { ...q, status: "replied", notes: newNotes }
              : q
          )
        );
        setSelectedQuery({
          ...selectedQuery,
          status: "replied",
          notes: newNotes,
        });
        setReplyText("");
        toast.success("Reply recorded & query marked as Replied");
      } else {
        toast.error("Failed to save reply: " + json.error);
      }
    } catch (error) {
      console.error("Failed to add note", error);
      toast.error("Failed to save reply.");
    }
  };

  // Filter logic
  const filteredQueries = queries.filter((q) => {
    const matchesTab = activeTab === "all" ? true : q.status === activeTab;
    const matchesSearch =
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Stats
  const totalCount = queries.length;
  const newCount = queries.filter((q) => q.status === "new").length;
  const repliedCount = queries.filter((q) => q.status === "replied").length;
  const archivedCount = queries.filter((q) => q.status === "archived").length;

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-(--admin-text-secondary) font-medium">
          Loading contact queries...
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
            <Mail className="text-warning" size={24} />
            Contact Queries & Messages
          </h2>
          <p className="admin-page-header-sub">
            Review, reply to, and manage customer inquiries submitted from the
            main site contact form.
          </p>
        </div>
        <div className="admin-page-header-actions flex items-center gap-3">
          <button
            onClick={async () => {
              setLoading(true);
              await loadQueries();
              toast.success("Contact queries refreshed");
            }}
            className="admin-btn-secondary flex items-center gap-2 text-xs px-4 py-2"
          >
            <RefreshCw size={14} />
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
              Total Inquiries
            </span>
            <MessageSquare size={18} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-white">{totalCount}</div>
          <p className="text-xs text-gray-400 mt-1">All customer queries</p>
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
              New / Unread
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
            Responded customer queries
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
          <p className="text-xs text-gray-400 mt-1">Closed or saved queries</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-admin-surface p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-1.5 bg-admin-bg p-1.5 rounded-lg border border-white/5">
          {(["all", "new", "replied", "archived"] as const).map((tab) => (
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
            placeholder="Search name, email, query..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-bg border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-warning transition-colors"
          />
        </div>
      </div>

      {/* Main Content Table */}
      <div className="bg-admin- rounded-xl border border-white/5 overflow-hidden">
        {filteredQueries.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-3">
            <Mail size={40} className="mx-auto text-gray-600 opacity-50" />
            <p className="text-base font-semibold text-gray-300">
              No contact queries found
            </p>
            <p className="text-xs max-w-sm mx-auto">
              There are no messages matching your current filter criteria or
              search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-admin-surface-2/50 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Contact Info</th>
                  <th className="py-3.5 px-5">Subject & Preview</th>
                  <th className="py-3.5 px-5">Date Received</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {filteredQueries.map((query) => (
                  <tr
                    key={query.id}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-warning/10 text-warning flex items-center justify-center font-bold text-xs shrink-0">
                          {query.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div>{query.name}</div>
                          <div className="text-[11px] font-normal text-gray-400">
                            {query.email}
                          </div>
                          {query.phone && (
                            <div className="text-[10px] text-gray-500">
                              {query.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 max-w-xs sm:max-w-sm">
                      <div className="font-semibold text-white truncate">
                        {query.subject}
                      </div>
                      <div className="text-gray-400 truncate mt-0.5">
                        {query.message}
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-gray-400">
                      {formatDate(query.createdAt)}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      {query.status === "new" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          New
                        </span>
                      )}
                      {query.status === "replied" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                          <CheckCircle size={11} />
                          Replied
                        </span>
                      )}
                      {query.status === "archived" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20 inline-flex items-center gap-1">
                          <Archive size={11} />
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedQuery(query)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-warning hover:text-admin-bg text-gray-300 transition-colors"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        {query.status !== "replied" && (
                          <button
                            onClick={() =>
                              handleStatusChange(query.id, "replied")
                            }
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                            title="Mark as Replied"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                        {query.status !== "archived" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(query.id, "archived")
                            }
                            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                            title="Archive Query"
                          >
                            <Archive size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(query.id, "new")}
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                            title="Move to New"
                          >
                            <RefreshCw size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(query.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Query"
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

      {/* Detailed Modal View */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-admin- border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-admin-surface-2/50">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-warning/10 text-warning border border-warning/20">
                    Query #{selectedQuery.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    Received {formatDate(selectedQuery.createdAt)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">
                  {selectedQuery.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuery(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Customer Contact Card */}
              <div className="bg-admin-bg p-4 rounded-xl border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-warning shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Sender Name
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {selectedQuery.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-warning shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${selectedQuery.email}`}
                      className="font-bold text-blue-400 hover:underline mt-0.5 block truncate"
                    >
                      {selectedQuery.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-warning shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase font-semibold">
                      Phone Number
                    </div>
                    <div className="font-bold text-white mt-0.5">
                      {selectedQuery.phone || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Message */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={14} className="text-warning" />
                  Customer Message
                </h4>
                <div className="bg-admin-bg p-4 rounded-xl border border-white/5 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedQuery.message}
                </div>
              </div>

              {/* Internal Notes / Reply Log */}
              {selectedQuery.notes && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle size={14} />
                    Admin Notes & Reply Log
                  </h4>
                  <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/15 text-xs text-emerald-200 leading-relaxed whitespace-pre-wrap">
                    {selectedQuery.notes}
                  </div>
                </div>
              )}

              {/* Record Reply / Add Note */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <Send size={14} className="text-warning" />
                  Record Admin Reply or Internal Note
                </h4>
                <textarea
                  rows={3}
                  placeholder="Type reply notes sent to customer or internal resolution action..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-admin-bg border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-warning transition-colors resize-none"
                />
                <button
                  onClick={handleSendReplyNote}
                  disabled={!replyText.trim()}
                  className="bg-warning hover:bg-[#fbbf24] disabled:opacity-50 disabled:cursor-not-allowed text-admin-bg font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors"
                >
                  <Send size={14} />
                  Save Reply & Mark Replied
                </button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-admin-surface-2/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  Status:
                </span>
                <select
                  value={selectedQuery.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedQuery.id,
                      e.target.value as ContactQuery['status'],
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
                  onClick={() => handleDelete(selectedQuery.id)}
                  className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedQuery(null)}
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
