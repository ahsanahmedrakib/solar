"use client";

import React, { useState } from "react";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your form processing logic here
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Row 1: Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  required
                  className="w-full bg-white px-4 py-3 rounded-xl border-none outline-none placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#39a838] transition-all"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  className="w-full bg-white px-4 py-3 rounded-xl border-none outline-none placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#39a838] transition-all"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
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
                  required
                  className="w-full bg-white px-4 py-3 rounded-xl border-none outline-none placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#39a838] transition-all"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                  Email Address*
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  required
                  className="w-full bg-white px-4 py-3 rounded-xl border-none outline-none placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#39a838] transition-all"
                  value={formData.emailAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, emailAddress: e.target.value })
                  }
                />
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
                className="w-full bg-white px-4 py-3 rounded-xl border-none outline-none placeholder-gray-400 text-sm resize-none focus:ring-2 focus:ring-[#39a838] transition-all"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <button
                type="submit"
                className="bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
              >
                Submit Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
