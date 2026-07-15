import { generateAccessToken, verifyRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: "Refresh token is required" },
        { status: 400 },
      );
    }

    const payload = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    const response = NextResponse.json({
      success: true,
      data: { accessToken },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid or expired refresh token" },
      { status: 401 },
    );
  }
}
