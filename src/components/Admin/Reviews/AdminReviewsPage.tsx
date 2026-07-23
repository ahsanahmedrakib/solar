"use client";

import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { queryKeys, useQueryReviews } from "@/lib/queries";
import { useQueryClient } from "@tanstack/react-query";
import {
  MessageSquareText,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminReviewsPage() {
  const {
    data: reviews = [],
    isLoading,
    isFetching,
    refetch,
  } = useQueryReviews();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      r.role.toLowerCase().includes(term) ||
      r.quote.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const res = await apiClient(`/api/reviews?id=${id}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (json.success) {
          queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
          toast.success("Review deleted successfully");
        } else {
          toast.error("Failed to delete: " + json.error);
        }
      } catch (error) {
        console.error("Failed to delete review", error);
        toast.error("Failed to delete review.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
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
          Loading reviews...
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
            <MessageSquareText className="text-warning" size={24} />
            Reviews & Testimonials
          </h2>
          <p className="admin-page-header-sub">
            View and manage customer reviews submitted from the testimonials
            section.
          </p>
        </div>
        <div className="admin-page-header-actions flex items-center gap-3">
          <button
            onClick={() => {
              refetch();
              toast.success("Reviews refreshed");
            }}
            className="admin-btn-secondary flex items-center gap-2 text-xs px-4 py-2"
            disabled={isFetching}
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border bg-admin-surface border-white/5">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Total Reviews
            </span>
            <MessageSquareText size={18} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-white">{reviews.length}</div>
        </div>
        <div className="p-5 rounded-xl border bg-admin-surface border-white/5">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Average Rating
            </span>
            <Star size={18} className="text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {reviews.length > 0
              ? (
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                ).toFixed(1)
              : "0.0"}
            /5
          </div>
        </div>
        <div className="p-5 rounded-xl border bg-admin-surface border-white/5">
          <div className="flex justify-between items-center text-gray-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              5-Star Reviews
            </span>
            <Star size={18} className="text-emerald-400" fill="currentColor" />
          </div>
          <div className="text-2xl font-bold text-white">
            {reviews.filter((r) => r.rating === 5).length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-bg border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-warning transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-admin- rounded-xl border border-white/5 overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-3">
            <MessageSquareText
              size={40}
              className="mx-auto text-gray-600 opacity-50"
            />
            <p className="text-base font-semibold text-gray-300">
              No reviews found
            </p>
            <p className="text-xs max-w-sm mx-auto">
              {searchTerm
                ? "No reviews match your search query."
                : "No customer reviews have been submitted yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-admin-surface-2/50 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Customer</th>
                  <th className="py-3.5 px-5">Review</th>
                  <th className="py-3.5 px-5">Rating</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-warning/10 text-warning flex items-center justify-center font-bold text-xs shrink-0">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div>{review.name}</div>
                          <div className="text-[11px] font-normal text-gray-400">
                            {review.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 max-w-xs sm:max-w-sm">
                      <div className="text-gray-300 line-clamp-2 leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            fill={i < review.rating ? "currentColor" : "none"}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-gray-400">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 size={15} />
                      </button>
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

