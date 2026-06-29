"use client";

import { AlertCircle, Link as LinkIcon, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

interface ImageUploadInputProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

export function ImageUploadInput({
  value,
  onChange,
  label = "Cover Image",
  error,
  placeholder = "/images/example.jpg",
}: ImageUploadInputProps) {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
          {label} *
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[11px] font-medium text-(--admin-accent) hover:underline flex items-center gap-1 cursor-pointer"
        >
          {isUrlMode ? (
            <>
              <Upload size={12} /> Upload File instead
            </>
          ) : (
            <>
              <LinkIcon size={12} /> Enter Image URL path
            </>
          )}
        </button>
      </div>

      {isUrlMode ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-(--admin-surface-2) border ${
            error ? "border-(--admin-danger)" : "border-(--admin-border)"
          } text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
        />
      ) : (
        <div className="space-y-2">
          {value ? (
            <div className="relative group rounded-xl overflow-hidden border border-(--admin-border-strong) bg-(--admin-surface-2) p-2 flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/20 shrink-0 relative border border-(--admin-border)">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-(--admin-text-primary) truncate">
                  {value.startsWith("data:") ? "Uploaded Image File" : value}
                </p>
                <p className="text-[11px] text-(--admin-text-muted) mt-0.5">
                  Click below to change or clear this image
                </p>
              </div>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                title="Remove Image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-(--admin-accent) bg-(--admin-accent-muted)"
                  : error
                    ? "border-(--admin-danger) bg-red-500/5 hover:bg-red-500/10"
                    : "border-(--admin-border-strong) bg-(--admin-surface-2) hover:border-(--admin-accent) hover:bg-(--admin-surface-hover)"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
              <div className="w-10 h-10 rounded-full bg-(--admin-accent-muted) text-(--admin-accent) flex items-center justify-center mx-auto mb-2">
                <Upload size={18} />
              </div>
              <p className="text-xs font-medium text-(--admin-text-primary)">
                <span className="text-(--admin-accent) font-semibold">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-[11px] text-(--admin-text-muted) mt-1">
                SVG, PNG, JPG, GIF or WEBP
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </span>
      )}
    </div>
  );
}

