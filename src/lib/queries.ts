"use client";

import type { Blog } from "@/data/blogs";
import type { ContactQuery } from "@/data/contact";
import type { HeroSlide } from "@/data/hero-slides";
import type { Project } from "@/data/projects";
import type { Review } from "@/data/reviews";
import type { Service } from "@/data/services";
import type { Section } from "@/data/settings";
import type { TeamMember } from "@/data/team";
import { apiClient } from "@/lib/apiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const FIVE_MINUTES = 5 * 60 * 1000;

export interface CommentItem {
  id: number;
  name: string;
  email: string;
  website: string;
  comment: string;
  date: string;
  blogTitle: string;
  blogSlug: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin";
  createdAt: string;
  updatedAt: string;
}

async function apiFetchJson<T>(url: string, fallback: T): Promise<T> {
  const res = await apiClient(url);
  const json = await res.json();
  if (json.success && Array.isArray(json.data)) return json.data as T;
  return fallback;
}

export const queryKeys = {
  settings: ["settings"] as const,
  services: ["services"] as const,
  blogs: ["blogs"] as const,
  heroSlides: ["hero-slides"] as const,
  team: ["team"] as const,
  projects: ["projects"] as const,
  contact: ["contact"] as const,
  reviews: ["reviews"] as const,
  users: ["users"] as const,
};

export function useQuerySettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => apiFetchJson<Section[] | null>("/api/settings", null),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryServices() {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: () => apiFetchJson<Service[]>("/api/services", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryBlogs() {
  return useQuery({
    queryKey: queryKeys.blogs,
    queryFn: () => apiFetchJson<Blog[]>("/api/blogs", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryHeroSlides() {
  return useQuery({
    queryKey: queryKeys.heroSlides,
    queryFn: () => apiFetchJson<HeroSlide[]>("/api/hero-slides", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryTeam() {
  return useQuery({
    queryKey: queryKeys.team,
    queryFn: () => apiFetchJson<TeamMember[]>("/api/team", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => apiFetchJson<Project[]>("/api/projects", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryContact() {
  return useQuery({
    queryKey: queryKeys.contact,
    queryFn: () => apiFetchJson<ContactQuery[]>("/api/contact", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryReviews() {
  return useQuery({
    queryKey: queryKeys.reviews,
    queryFn: () => apiFetchJson<Review[]>("/api/reviews", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useQueryUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => apiFetchJson<UserData[]>("/api/users", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: true,
  });
}

export function useInvalidateAll() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: queryKeys.settings });
    qc.invalidateQueries({ queryKey: queryKeys.services });
    qc.invalidateQueries({ queryKey: queryKeys.blogs });
    qc.invalidateQueries({ queryKey: queryKeys.heroSlides });
    qc.invalidateQueries({ queryKey: queryKeys.team });
    qc.invalidateQueries({ queryKey: queryKeys.projects });
    qc.invalidateQueries({ queryKey: queryKeys.contact });
    qc.invalidateQueries({ queryKey: queryKeys.reviews });
    qc.invalidateQueries({ queryKey: queryKeys.users });
  };
}

