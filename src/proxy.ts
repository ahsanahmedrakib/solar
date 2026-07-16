import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_GET_PREFIXES = [
  "/api/settings",
  "/api/plans",
  "/api/services",
  "/api/projects",
  "/api/blogs",
  "/api/hero-slides",
  "/api/team",
  "/api/image",
  "/api/db",
  "/api/env",
];

const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/auth/refresh",
  "/api/auth/logout",
  "/api/contact",
  "/api/comments",
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

  const token = getToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authorization header missing or invalid" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

