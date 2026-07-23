"use client";

import { DEFAULT_REVIEWS } from "@/data/reviews";
import { apiClient } from "@/lib/apiClient";
import { queryKeys, useQueryReviews } from "@/lib/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";

const reviewSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  role: yup
    .string()
    .required("Role is required")
    .min(2, "Role must be at least 2 characters"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  quote: yup
    .string()
    .required("Review message is required")
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be at most 500 characters"),
});

type ReviewFormData = yup.InferType<typeof reviewSchema>;

export default function Testimonials() {
  const { data: rawReviews = [], isFetching: loading } = useQueryReviews();
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const reviews = rawReviews.length > 0 ? rawReviews : DEFAULT_REVIEWS;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      name: "",
      role: "",
      rating: 5,
      quote: "",
    },
  });

  const currentRating = useWatch({ name: "rating", control });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const res = await apiClient("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
        toast.success("Review submitted successfully!");
        setShowModal(false);
        reset();
      } else {
        toast.error("Failed to save review: " + json.error);
      }
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:py-24 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: INTRODUCTION & TRUST ACCENT BOX */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tagline Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <span className="w-1.5 h-1.5 bg-accent-600 rounded-full"></span>
              Our Testimonials
            </div>

            {/* Main Headline Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
              Customers sharing their journey to solar
            </h2>

            {/* Write A Review Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowModal(true)}
                className="cursor-pointer inline-flex items-center gap-2 bg-accent-600 hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm"
              >
                Write A Review
                <ArrowUpRight />
              </button>
            </div>

            {/* Overall Rating & Avatars Stack Overlay Badge */}
            <div className="bg-white rounded-xl p-5 border border-green-300 shadow-sm max-w-sm mt-8 space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-16 rounded bg-gray-200" />
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-8 h-8 rounded bg-gray-200" />
                      ))}
                    </div>
                  </div>
                  <div className="h-3 w-48 rounded bg-gray-200" />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold text-[#051720]">
                      {averageRating + "/" + 5}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const fill = Math.max(
                          0,
                          Math.min(1, Number(averageRating) - i),
                        );

                        return (
                          <div key={i} className="relative w-8 h-8">
                            {/* Empty star */}
                            <svg
                              className="absolute inset-0 w-8 h-8 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>

                            {/* Filled star */}
                            <div
                              className="absolute inset-0 overflow-hidden"
                              style={{ width: `${fill * 100}%` }}
                            >
                              <svg
                                className="w-8 h-8 text-accent-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <p className="text-xs font-bold text-gray-500 leading-tight">
                      1K+ Customer Trust Our Service
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: SWIPER SLIDER */}
          <div className="lg:col-span-7 w-full">
            {loading ? (
              <div className="flex gap-6 overflow-hidden">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="shrink-0 w-72.5 sm:w-85 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm animate-pulse"
                  >
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-4 h-4 rounded bg-gray-200" />
                      ))}
                    </div>
                    <div className="space-y-2 mb-8">
                      <div className="h-4 w-full rounded bg-gray-200" />
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="h-4 w-5/6 rounded bg-gray-200" />
                    </div>
                    <div className="pt-4 border-t border-gray-100/80">
                      <div className="h-4 w-32 rounded bg-gray-200 mb-2" />
                      <div className="h-3 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                // navigation
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1.3 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2.3 },
                }}
                className="testimonial-swiper pb-12"
              >
                {reviews?.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="bg-white rounded-xl py-2 px-4 border border-green-400 shadow-sm flex flex-col justify-between space-y-8 transition-all duration-300 hover:shadow-md h-80">
                      <div className="space-y-4">
                        {/* Card Micro-Star Ratings Row */}
                        <div className="flex text-accent-600">
                          {[...Array(item.rating)]?.map((_, idx) => (
                            <svg
                              key={idx}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="w-8 h-8 mr-0.5"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        {/* Clean Quoted Text Representation */}
                        <p
                          className="text-sm sm:text-base font-bold text-gray-500 leading-snug tracking-tight"
                          title={item.quote}
                        >
                          &ldquo;
                          {item?.quote?.length > 231
                            ? item?.quote?.slice(0, 230) + "..."
                            : item?.quote}
                          &rdquo;
                        </p>
                      </div>

                      {/* Card Author Signature Block Area */}
                      <div className="pt-4 border-t border-gray-100/80">
                        <h4 className="text-base font-bold text-[#051720] tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              reset();
            }}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                reset();
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <h3 className="text-xl sm:text-2xl font-bold text-[#051720] mb-1">
              Write A Review
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Share your experience with our solar solutions.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#051720] text-xs font-bold tracking-wide">
                  Your Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full bg-gray-50 px-4 py-3 rounded-xl border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } outline-none placeholder-gray-400 text-sm focus:ring-2 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-accent-600"
                  } transition-all`}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs font-medium px-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#051720] text-xs font-bold tracking-wide">
                  Your Role*
                </label>
                <input
                  type="text"
                  placeholder="e.g. Home Owner, Business Owner"
                  className={`w-full bg-gray-50 px-4 py-3 rounded-xl border ${
                    errors.role ? "border-red-500" : "border-gray-200"
                  } outline-none placeholder-gray-400 text-sm focus:ring-2 ${
                    errors.role ? "focus:ring-red-500" : "focus:ring-accent-600"
                  } transition-all`}
                  {...register("role")}
                />
                {errors.role && (
                  <span className="text-red-500 text-xs font-medium px-1">
                    {errors.role.message}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#051720] text-xs font-bold tracking-wide">
                  Rating*
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setValue("rating", star, { shouldValidate: true })
                      }
                      className="cursor-pointer transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={star <= currentRating ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={star <= currentRating ? 0 : 1.5}
                        className={`w-7 h-7 ${
                          star <= currentRating
                            ? "text-accent-600"
                            : "text-gray-300"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <span className="text-red-500 text-xs font-medium px-1">
                    {errors.rating.message}
                  </span>
                )}
              </div>

              {/* Review */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#051720] text-xs font-bold tracking-wide">
                  Your Review*
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your experience..."
                  className={`w-full bg-gray-50 px-4 py-3 rounded-xl border ${
                    errors.quote ? "border-red-500" : "border-gray-200"
                  } outline-none placeholder-gray-400 text-sm resize-none focus:ring-2 ${
                    errors.quote
                      ? "focus:ring-red-500"
                      : "focus:ring-accent-600"
                  } transition-all`}
                  {...register("quote")}
                />
                {errors.quote && (
                  <span className="text-red-500 text-xs font-medium px-1">
                    {errors.quote.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-600 hover:bg-[#399d3e] disabled:bg-gray-400 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

