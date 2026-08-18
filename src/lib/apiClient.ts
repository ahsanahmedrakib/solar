"use client";

let refreshPromise: Promise<string | null> | null = null;

function getStoredToken(): string | null {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken =
    typeof window !== "undefined"
      ? localStorage.getItem("refreshToken")
      : null;
  if (!refreshToken) return null;
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success || !json.data?.accessToken) return null;
    localStorage.setItem("accessToken", json.data.accessToken);
    return json.data.accessToken;
  } catch {
    return null;
  }
}

function refreshOrSingle(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

function clearAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function redirectToLogin() {
  if (window.location.pathname.startsWith("/admin")) {
    window.location.href = "/login";
  }
}

export async function apiClient(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const doFetch = (token: string | null): Promise<Response> => {
    const headers: Record<string, string> = {
      ...(init?.headers as Record<string, string>),
    };
    if (!(init?.body instanceof FormData)) {
      headers["Content-Type"] ??= "application/json";
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(input, { ...init, headers });
  };

  let response = await doFetch(getStoredToken());

  if (response.status === 401 && typeof window !== "undefined") {
    const url = String(input);
    const isAuthRoute = url.includes("/api/auth/");
    if (!isAuthRoute) {
      const newToken = await refreshOrSingle();
      if (newToken) {
        response = await doFetch(newToken);
      } else {
        clearAuth();
        redirectToLogin();
      }
    }
  }

  return response;
}
