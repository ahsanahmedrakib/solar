import { verifyAccessToken } from "@/lib/token";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_GET_PREFIXES = [
  "/api/settings",
  "/api/services",
  "/api/projects",
  "/api/hero-slides",
  "/api/team",
  "/api/reviews",
  "/api/image",
  "/api/db",
  "/api/env",
];

const PUBLIC_POST_PATHS = [
  "/api/contact",
  "/api/reviews",
  "/api/palash-applications",
];

const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/auth/refresh",
  "/api/auth/logout",
];

function getToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader?.slice(7);
  }
  return request.cookies.get("accessToken")?.value ?? null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  if (
    method === "GET" &&
    PUBLIC_GET_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    )
  ) {
    return NextResponse.next();
  }

  if (method === "POST" && PUBLIC_POST_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = getToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authorization header missing or invalid" },
      { status: 401 },
    );
  }

  try {
    verifyAccessToken(token);
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

