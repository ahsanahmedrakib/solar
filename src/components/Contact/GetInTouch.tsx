"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// Form Validation Schema using Yup
const contactSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^[+]?[0-9\s\-()]{7,20}$/, "Invalid phone number"),
    emailAddress: yup
        .string()   
        .required("Email address is required")
        .email("Invalid email address"),
    message: yup.string().required("Message is required")
        .max(2000, "Message must be at most 2000 characters")
});

type ContactFormData = yup.InferType<typeof contactSchema>;

export default function GetInTouch() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: yupResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailAddress: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            const payload = {
                name: `${data.firstName} ${data.lastName}`.trim(),
                email: data.emailAddress,
                phone: data.phoneNumber,
                subject: "Inquiry from website contact form",
                message: data.message,
            };
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (json.success) {
                toast.success("Message submitted successfully!");
                setIsSubmitted(true);
                reset();
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 5000);
            } else {
                toast.error("Failed to submit form: " + json.error);
            }
        } catch (error) {
            console.error("Error submitting contact form", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6">
                {/* LEFT SIDEBAR: Contact Info */}
                <div className="w-full md:w-[40%] bg-[#021622] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                    <div>
                        {/* Solar Panel Image Container */}
                        <div
                            className="w-full h-56 rounded-xl overflow-hidden bg-cover bg-center mb-8 border border-white/10"
                            style={{
                                backgroundImage: "url('/images/contact/contact-us-img.jpg')",
                            }} // Replace with your image path
                        />

                        <h3 className="text-white text-xl font-bold tracking-wide mb-6">
                            Contact Information
                        </h3>

                        {/* Horizontal Separator */}
                        <hr className="border-gray-800 mb-8" />

                        {/* Info List */}
                        <div className="flex flex-col gap-6">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 shrink-0 rounded-full bg-[#39a838] flex items-center justify-center text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.622k"
                                        />{" "}
                                        {/* Fallback standard SVG path for phone */}
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h9"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-medium">
                                        Phone Number
                                    </p>
                                    <p className="text-white text-base font-semibold mt-0.5">
                                        +1 (123) 456-789
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 shrink-0 rounded-full bg-[#39a838] flex items-center justify-center text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-medium">
                                        Email Address
                                    </p>
                                    <p className="text-white text-base font-semibold mt-0.5 break-all">
                                        info@domainname.com
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 shrink-0 rounded-full bg-[#39a838] flex items-center justify-center text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25A7.5 7.5 0 1119.5 10.5z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-medium">
                                        Our Location
                                    </p>
                                    <p className="text-white text-base font-semibold mt-0.5">
                                        2118 Thornridge Cir. Syracuse, 356
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT CARD: Input Form */}
                <div className="w-full md:w-[60%] bg-[#f4f7f9] rounded-2xl p-8 sm:p-10 flex flex-col shadow-sm">
                    <h2 className="text-[#011c2b] text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl">
                        Whether you have questions about our services, want a free
                        consultation, or need support for your existing system, our team is
                        ready to assist.
                    </p>

                    {isSubmitted && (
                        <div className="bg-[#e8f5e9] text-brand-900 p-4 rounded-xl text-sm font-medium border border-[#c8e6c9] mb-6 flex items-center gap-2 transition-all">
                            <svg className="w-5 h-5 shrink-0 text-[#4caf50]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        {/* Row 1: Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    className={`w-full bg-white px-4 py-3 rounded-xl border ${errors.firstName ? "border-red-500" : "border-transparent"
                                        } outline-none placeholder-gray-400 text-sm focus:ring-2 ${errors.firstName ? "focus:ring-red-500" : "focus:ring-[#39a838]"
                                        } transition-all`}
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <span className="text-red-500 text-xs font-medium px-1">
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                                    Last Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className={`w-full bg-white px-4 py-3 rounded-xl border ${errors.lastName ? "border-red-500" : "border-transparent"
                                        } outline-none placeholder-gray-400 text-sm focus:ring-2 ${errors.lastName ? "focus:ring-red-500" : "focus:ring-[#39a838]"
                                        } transition-all`}
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-xs font-medium px-1">
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Contact Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter Phone Number"
                                    className={`w-full bg-white px-4 py-3 rounded-xl border ${errors.phoneNumber ? "border-red-500" : "border-transparent"
                                        } outline-none placeholder-gray-400 text-sm focus:ring-2 ${errors.phoneNumber ? "focus:ring-red-500" : "focus:ring-[#39a838]"
                                        } transition-all`}
                                    {...register("phoneNumber")}
                                />
                                {errors.phoneNumber && (
                                    <span className="text-red-500 text-xs font-medium px-1">
                                        {errors.phoneNumber.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Email Address"
                                    className={`w-full bg-white px-4 py-3 rounded-xl border ${errors.emailAddress ? "border-red-500" : "border-transparent"
                                        } outline-none placeholder-gray-400 text-sm focus:ring-2 ${errors.emailAddress ? "focus:ring-red-500" : "focus:ring-[#39a838]"
                                        } transition-all`}
                                    {...register("emailAddress")}
                                />
                                {errors.emailAddress && (
                                    <span className="text-red-500 text-xs font-medium px-1">
                                        {errors.emailAddress.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 3: Message Textarea */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                                Message
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Any Message..."
                                className={`w-full bg-white px-4 py-3 rounded-xl border ${errors.message ? "border-red-500" : "border-transparent"
                                    } outline-none placeholder-gray-400 text-sm resize-none focus:ring-2 ${errors.message ? "focus:ring-red-500" : "focus:ring-[#39a838]"
                                    } transition-all`}
                                {...register("message")}
                            />
                            {errors.message && (
                                <span className="text-red-500 text-xs font-medium px-1">
                                    {errors.message.message}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#4caf50] hover:bg-[#43a047] disabled:bg-gray-400 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Message"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}