"use client";

import Reveal from "@/components/Common/Reveal";
import { apiClient } from "@/lib/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useController, useForm, type Resolver } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

interface ApplicationFormData {
  fullName: string;
  businessName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  district: string;
  thana: string;
  address: string;
  services: string[];
  hasBusiness: string;
  experienceYears: string;
  space: string;
  comments: string;
}

const servicesOptions = [
  {
    value: "charging",
    label: "Charging Station Network Partner",
    bangla: "চার্জিং স্টেশন নেটওয়ার্ক পার্টনার",
  },
  {
    value: "battery",
    label: "Lithium Battery Dealership (Rent & Sales)",
    bangla: "লিথিয়াম ব্যাটারি ডিলারশিপ (ভাড়া ও বিক্রয়)",
  },
  {
    value: "both",
    label: "Both",
    bangla: "উভয়ই",
  },
];

const PHONE_REGEX = /^[+]?[0-9\s\-()]{7,20}$/;
const EMPTY_OR_PHONE_REGEX = /^$|^[+]?[0-9\s\-()]{7,20}$/;
const EMPTY_OR_EMAIL_REGEX = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const applicationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  businessName: yup.string(),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(PHONE_REGEX, "Invalid mobile number"),
  whatsapp: yup
    .string()
    .matches(EMPTY_OR_PHONE_REGEX, "Invalid WhatsApp number"),
  email: yup.string().matches(EMPTY_OR_EMAIL_REGEX, "Invalid email address"),
  district: yup.string().required("District is required"),
  thana: yup.string().required("Thana / Upazila is required"),
  address: yup
    .string()
    .required("Full address is required")
    .min(5, "Please provide a complete address"),
  services: yup
    .array()
    .of(yup.string())
    .default([])
    .min(1, "Please select at least one option"),
  hasBusiness: yup
    .string()
    .required("Please select an option")
    .oneOf(["yes", "no"]),
  experienceYears: yup.string(),
  space: yup
    .string()
    .required("Please select an option")
    .oneOf(["own", "rented", "looking"]),
  comments: yup.string().max(2000, "Comments must be at most 2000 characters"),
});

const resolver: Resolver<ApplicationFormData> = yupResolver(
  applicationSchema,
) as unknown as Resolver<ApplicationFormData>;

const inputClass = (hasError: boolean) =>
  `w-full bg-white px-4 py-3 rounded-[14px] border ${
    hasError ? "border-red-500" : "border-transparent"
  } outline-none placeholder-gray-400 text-base focus:ring-2 ${
    hasError ? "focus:ring-red-500" : "focus:ring-accent-500"
  } transition-all`;

const errorText = (message?: string) =>
  message ? (
    <span className="text-red-500 text-sm font-medium px-1">{message}</span>
  ) : null;

function SectionHeading({
  step,
  title,
  bangla,
}: {
  step: string;
  title: string;
  bangla: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 shrink-0 rounded-full bg-forest-500 text-white font-heading font-bold text-base flex items-center justify-center">
        {step}
      </span>
      <div>
        <h3 className="font-heading text-xl font-bold text-forest-500 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-[#888888] font-medium">{bangla}</p>
      </div>
    </div>
  );
}

export default function DealershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBusiness, setHasBusiness] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver,
    defaultValues: {
      fullName: "",
      businessName: "",
      mobile: "",
      whatsapp: "",
      email: "",
      district: "",
      thana: "",
      address: "",
      services: [],
      hasBusiness: "",
      experienceYears: "",
      space: "",
      comments: "",
    },
  });

  const {
    field: servicesField,
    fieldState: { error: servicesError },
  } = useController({
    name: "services",
    control,
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true);
      const res = await apiClient("/api/palash-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Application submitted successfully!");
        setIsSubmitted(true);
        reset();
        setHasBusiness("");
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Failed to submit application: " + json.error);
      }
    } catch (error) {
      console.error("Error submitting application", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <Reveal variant="fade-up">
            <span className="section-eyebrow">Become a Partner</span>
          </Reveal>
          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-forest-500 tracking-tight leading-[1.1]">
              Dealership & Partner{" "}
              <span className="text-forest-500">Application Form</span>
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-base sm:text-lg font-normal leading-relaxed">
              পলাশ চার্জিং স্টেশন - ডিলারশিপ ও পার্টনার আবেদন ফরম
            </p>
          </Reveal>
        </div>
        <div className="max-w-5xl mx-auto bg-secondary rounded-2xl p-4 shadow-sm my-3">
          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-base sm:text-lg font-normal leading-relaxed">
              Welcome! Fill out this form to register your interest in joining
              the Palash Charging Station network or becoming an official dealer
              for our premium easy-bike lithium-ion battery rental services. Our
              team will review your application and contact you shortly. <br />{" "}
              <br />
              পলাশ চার্জিং স্টেশন নেটওয়ার্কে যুক্ত হতে অথবা আমাদের প্রিমিয়াম
              ইজি-বাইক লিথিয়াম ব্যাটারির ডিলারশিপ নিতে নিচের ফরমটি পূরন করুন।
              আমাদের প্রতিনিধি খুব দ্রুতই আপনার সাথে যোগাযোগ করবেন।
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade-up" delay={150}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-5xl mx-auto bg-secondary rounded-2xl p-6 sm:p-10 shadow-sm"
          >
            {isSubmitted && (
              <div className="bg-accent-500/15 text-forest-500 p-4 rounded-lg text-base font-medium border border-accent-500/40 mb-8 flex items-center gap-2 transition-all">
                <svg
                  className="w-5 h-5 shrink-0 text-accent-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Thank you! Your application has been submitted successfully.
                  Our team will review it and contact you shortly.
                </span>
              </div>
            )}

            {/* Section 1 */}
            <div className="mb-10">
              <SectionHeading
                step="1"
                title="Personal & Business Information"
                bangla="ব্যক্তিগত ও ব্যবসায়িক তথ্য"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Full Name / আপনার সম্পূর্ণ নাম*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={inputClass(!!errors.fullName)}
                    {...register("fullName")}
                  />
                  {errorText(errors.fullName?.message)}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Business / Shop Name / ব্যবসা বা দোকানের নাম
                  </label>
                  <input
                    type="text"
                    placeholder="Enter shop or garage name"
                    className={inputClass(!!errors.businessName)}
                    {...register("businessName")}
                  />
                  {errorText(errors.businessName?.message)}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Mobile Number / মোবাইল নম্বর*
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    className={inputClass(!!errors.mobile)}
                    {...register("mobile")}
                  />
                  {errorText(errors.mobile?.message)}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    WhatsApp Number / হোয়াটসঅ্যাপ নম্বর
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter WhatsApp number"
                    className={inputClass(!!errors.whatsapp)}
                    {...register("whatsapp")}
                  />
                  {errorText(errors.whatsapp?.message)}
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Email Address (Optional) / ইমেইল ঠিকানা (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className={inputClass(!!errors.email)}
                    {...register("email")}
                  />
                  {errorText(errors.email?.message)}
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <SectionHeading
                step="2"
                title="Location Details"
                bangla="অবস্থান তথ্য"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    District / জেলা*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter district"
                    className={inputClass(!!errors.district)}
                    {...register("district")}
                  />
                  {errorText(errors.district?.message)}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Thana / Upazila / থানা / উপজেলা*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter thana or upazila"
                    className={inputClass(!!errors.thana)}
                    {...register("thana")}
                  />
                  {errorText(errors.thana?.message)}
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Full Shop / Garage Address / শপ / গ্যারেজের সম্পূর্ণ ঠিকানা*
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter your full shop or garage address"
                    className={`${inputClass(!!errors.address)} resize-none`}
                    {...register("address")}
                  />
                  {errorText(errors.address?.message)}
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <SectionHeading
                step="3"
                title="Dealership Interest"
                bangla="ডিলারশিপ আগ্রহ"
              />
              <div className="mt-6 space-y-6">
                <div className="flex flex-col gap-3">
                  <p className="text-forest-500 text-sm font-bold tracking-wide">
                    Which service are you interested in? / আপনি কোন ধরনের
                    ডিলারশিপ নিতে আগ্রহী?*
                  </p>
                  {servicesOptions.map((option) => {
                    const isChecked = servicesField.value.includes(
                      option.value,
                    );
                    const isBoth = servicesField.value.includes("both");
                    const isDisabled = option.value !== "both" && isBoth;
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 cursor-pointer group ${
                          isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={(e) => {
                            const value = e.target.value;
                            let next: string[];
                            if (value === "both") {
                              next = e.target.checked ? ["both"] : [];
                            } else {
                              next = e.target.checked
                                ? [
                                    ...servicesField.value.filter(
                                      (v) => v !== "both",
                                    ),
                                    value,
                                  ]
                                : servicesField.value.filter(
                                    (v) => v !== value && v !== "both",
                                  );
                            }
                            servicesField.onChange(next);
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-forest-500 focus:ring-accent-500 cursor-pointer"
                        />
                        <span className="text-base text-[#888888] font-medium group-hover:text-forest-500 transition-colors">
                          {option.label} -{" "}
                          <span className="font-semibold">{option.bangla}</span>
                        </span>
                      </label>
                    );
                  })}
                  {errorText(servicesError?.message)}
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-forest-500 text-sm font-bold tracking-wide">
                    Do you currently have a business related to easy-bikes or
                    batteries? / ইজি-বাইক বা ব্যাটারি সংক্রান্ত বর্তমানে আপনার
                    কোনো ব্যবসা আছে কি?*
                  </p>
                  <div className="flex flex-col sm:flex-row sm:gap-8 gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="yes"
                        className="w-4 h-4 border-gray-300 text-forest-500 focus:ring-accent-500 cursor-pointer"
                        {...register("hasBusiness", {
                          onChange: (e) => setHasBusiness(e.target.value),
                        })}
                      />
                      <span className="text-base text-[#888888] font-medium group-hover:text-forest-500 transition-colors">
                        Yes / হ্যাঁ
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="no"
                        className="w-4 h-4 border-gray-300 text-forest-500 focus:ring-accent-500 cursor-pointer"
                        {...register("hasBusiness", {
                          onChange: (e) => setHasBusiness(e.target.value),
                        })}
                      />
                      <span className="text-base text-[#888888] font-medium group-hover:text-forest-500 transition-colors">
                        No, I am a new investor / না, আমি নতুন ব্যবসা শুরু করতে
                        চাই
                      </span>
                    </label>
                  </div>
                  {errorText(errors.hasBusiness?.message)}
                </div>

                {hasBusiness === "yes" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-forest-500 text-sm font-bold tracking-wide">
                      Years of Experience / এই ব্যবসায় কত বছরের অভিজ্ঞতা আছে?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3 years"
                      className={inputClass(!!errors.experienceYears)}
                      {...register("experienceYears")}
                    />
                    {errorText(errors.experienceYears?.message)}
                  </div>
                )}
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <SectionHeading
                step="4"
                title="Facility & Capacity"
                bangla="সুবিধা ও সক্ষমতা"
              />
              <div className="mt-6 space-y-6">
                <div className="flex flex-col gap-3">
                  <p className="text-forest-500 text-sm font-bold tracking-wide">
                    Do you have an existing space / garage for the charging
                    station or battery stock? / চার্জিং স্টেশন বা ব্যাটারি
                    মজুতের জন্য আপনার কি জায়গা / গ্যারেজ আছে?*
                  </p>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="own"
                        className="w-4 h-4 border-gray-300 text-forest-500 focus:ring-accent-500 cursor-pointer"
                        {...register("space")}
                      />
                      <span className="text-base text-[#888888] font-medium group-hover:text-forest-500 transition-colors">
                        Yes, I have my own space / হ্যাঁ, আমার নিজস্ব জায়গা আছে
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="rented"
                        className="w-4 h-4 border-gray-300 text-forest-500 focus:ring-accent-500 cursor-pointer"
                        {...register("space")}
                      />
                      <span className="text-base text-[#888888] font-medium group-hover:text-forest-500 transition-colors">
                        Yes, I have a rented space / হ্যাঁ, ভাড়া করা জায়গা আছে
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="looking"
                        className="w-4 h-4 border-gray-300 text-forest-500 focus:ring-accent-500 cursor-pointer"
                        {...register("space")}
                      />
                      <span className="text-base text-[#888888] font-medium group-hover:text-forest-500 transition-colors">
                        No, I am looking for a space / না, আমি জায়গা খুঁজছি
                      </span>
                    </label>
                  </div>
                  {errorText(errors.space?.message)}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-forest-500 text-sm font-bold tracking-wide">
                    Additional Questions or Comments / আরও কোনো প্রশ্ন বা
                    মন্তব্য
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write any additional information..."
                    className={`${inputClass(!!errors.comments)} resize-none`}
                    {...register("comments")}
                  />
                  {errorText(errors.comments?.message)}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <p className="text-sm text-[#888888] font-medium">
                * Required fields / * বাধ্যতামূলক ক্ষেত্র
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-forest-500 text-white disabled:bg-gray-400 text-base font-semibold px-8 py-3.5 rounded-full shadow-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Submitting... / জমা হচ্ছে..."
                  : "Apply Now / আবেদন করুন"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
