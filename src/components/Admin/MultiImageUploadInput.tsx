"use client";

import { AlertCircle, Link as LinkIcon, Plus, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

interface MultiImageUploadInputProps {
  value: string[];
  onChange: (val: string[]) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  maxImages?: number;
}

export function MultiImageUploadInput({
  value = [],
  onChange,
  label = "Gallery Images",
  error,
  placeholder = "/images/example.jpg",
  maxImages = 10,
}: MultiImageUploadInputProps) {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const filesArr = Array.from(files);
    const remainingSlots = maxImages - value.length;
    if (filesArr.length > remainingSlots) {
      toast.error(`You can only add ${remainingSlots} more image(s).`);
      return;
    }

    const validFiles = filesArr.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`"${file.name}" is not a valid image file.`);
        return false;
      }
      return true;
    });

    const readFileAsDataUrl = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) =>
          e.target?.result
            ? resolve(e.target.result as string)
            : reject(new Error("Failed to read file"));
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

    const processFiles = async () => {
      try {
        const results = await Promise.all(validFiles.map(readFileAsDataUrl));
        onChange([...value, ...results]);
      } catch {
        toast.error("Failed to read one or more image files.");
      }
    };

    processFiles();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (value.length >= maxImages) {
      toast.error(`You can only add up to ${maxImages} images.`);
      return;
    }
    onChange([...value, trimmed]);
    setUrlInput("");
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
          {label} {value.length > 0 && `(${value.length}/${maxImages})`}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[11px] font-medium text-(--admin-accent) hover:underline flex items-center gap-1 cursor-pointer"
        >
          {isUrlMode ? (
            <>
              <Upload size={12} /> Upload Files instead
            </>
          ) : (
            <>
              <LinkIcon size={12} /> Add by URL path
            </>
          )}
        </button>
      </div>

      {isUrlMode ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder={placeholder}
            className="w-full bg-(--admin-surface-2) border border-(--admin-border) text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="admin-btn-primary shrink-0 px-4 flex items-center gap-1.5"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {value.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {value.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-(--admin-border-strong) bg-(--admin-surface-2)"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-16 sm:h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 p-1 rounded-md bg-black/60 hover:bg-red-500 text-white transition cursor-pointer opacity-80 hover:opacity-100"
                    title="Remove image"
                  >
                    <X size={12} />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold uppercase tracking-wide bg-(--admin-accent) text-white px-1.5 py-0.5 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
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
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            <div className="w-9 h-9 rounded-full bg-(--admin-accent-muted) text-(--admin-accent) flex items-center justify-center mx-auto mb-1.5">
              <Upload size={16} />
            </div>
            <p className="text-xs font-medium text-(--admin-text-primary)">
              <span className="text-(--admin-accent) font-semibold">
                Click to upload
              </span>{" "}
              or drag & drop multiple images
            </p>
            <p className="text-[11px] text-(--admin-text-muted) mt-0.5">
              SVG, PNG, JPG, GIF or WEBP — up to {maxImages} images
            </p>
          </div>
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
