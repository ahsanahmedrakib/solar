"use client";

import type { ContactQuery } from "@/data/contact";
import type { HeroSite, HeroSlide } from "@/data/hero-slides";
import type { Project } from "@/data/projects";
import type { Review } from "@/data/reviews";
import type { Service } from "@/data/services";
import type { Section } from "@/data/settings";
import type { TeamMember } from "@/data/team";
import { apiClient } from "@/lib/apiClient";
import {
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

const FIVE_MINUTES = 5 * 60 * 1000;

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
  heroSlides: ["hero-slides"] as const,
  team: ["team"] as const,
  projects: ["projects"] as const,
  contact: ["contact"] as const,
  reviews: ["reviews"] as const,
  users: ["users"] as const,
};

export const adminQueryKeys = {
  settings: ["admin", "settings"] as const,
  services: ["admin", "services"] as const,
  heroSlides: ["admin", "hero-slides"] as const,
  team: ["admin", "team"] as const,
  projects: ["admin", "projects"] as const,
  contact: ["admin", "contact"] as const,
  reviews: ["admin", "reviews"] as const,
  users: ["admin", "users"] as const,
};

const ADMIN_QUERY_OPTIONS = {
  staleTime: 0,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
} as const;

export function invalidateContentCache(
  queryClient: QueryClient,
  key: string,
): void {
  queryClient.invalidateQueries({ queryKey: [key] });
  queryClient.invalidateQueries({ queryKey: ["admin", key] });
}

export function useQuerySettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => apiFetchJson<Section[] | null>("/api/settings", null),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryServices() {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: () => apiFetchJson<Service[]>("/api/services", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryHeroSlides(site?: HeroSite) {
  return useQuery({
    queryKey: site ? [...queryKeys.heroSlides, site] : queryKeys.heroSlides,
    queryFn: () =>
      apiFetchJson<HeroSlide[]>(
        site ? `/api/hero-slides?site=${site}` : "/api/hero-slides",
        [],
      ),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryTeam() {
  return useQuery({
    queryKey: queryKeys.team,
    queryFn: () => apiFetchJson<TeamMember[]>("/api/team", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => apiFetchJson<Project[]>("/api/projects", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryContact() {
  return useQuery({
    queryKey: queryKeys.contact,
    queryFn: () => apiFetchJson<ContactQuery[]>("/api/contact", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryReviews() {
  return useQuery({
    queryKey: queryKeys.reviews,
    queryFn: () => apiFetchJson<Review[]>("/api/reviews", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useQueryUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => apiFetchJson<UserData[]>("/api/users", []),
    staleTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useAdminQuerySettings() {
  return useQuery({
    queryKey: adminQueryKeys.settings,
    queryFn: () => apiFetchJson<Section[] | null>("/api/settings", null),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryServices() {
  return useQuery({
    queryKey: adminQueryKeys.services,
    queryFn: () => apiFetchJson<Service[]>("/api/services", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryHeroSlides() {
  return useQuery({
    queryKey: adminQueryKeys.heroSlides,
    queryFn: () => apiFetchJson<HeroSlide[]>("/api/hero-slides", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryTeam() {
  return useQuery({
    queryKey: adminQueryKeys.team,
    queryFn: () => apiFetchJson<TeamMember[]>("/api/team", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryProjects() {
  return useQuery({
    queryKey: adminQueryKeys.projects,
    queryFn: () => apiFetchJson<Project[]>("/api/projects", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryContact() {
  return useQuery({
    queryKey: adminQueryKeys.contact,
    queryFn: () => apiFetchJson<ContactQuery[]>("/api/contact", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryReviews() {
  return useQuery({
    queryKey: adminQueryKeys.reviews,
    queryFn: () => apiFetchJson<Review[]>("/api/reviews", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useAdminQueryUsers() {
  return useQuery({
    queryKey: adminQueryKeys.users,
    queryFn: () => apiFetchJson<UserData[]>("/api/users", []),
    ...ADMIN_QUERY_OPTIONS,
  });
}

export function useInvalidateAll() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: queryKeys.settings });
    qc.invalidateQueries({ queryKey: queryKeys.services });
    qc.invalidateQueries({ queryKey: queryKeys.heroSlides });
    qc.invalidateQueries({ queryKey: queryKeys.team });
    qc.invalidateQueries({ queryKey: queryKeys.projects });
    qc.invalidateQueries({ queryKey: queryKeys.contact });
    qc.invalidateQueries({ queryKey: queryKeys.reviews });
    qc.invalidateQueries({ queryKey: queryKeys.users });
  };
}
