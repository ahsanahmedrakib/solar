import { NextResponse } from "next/server";

const required = [
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "DEFAULT_SUPERADMIN_EMAIL",
  "DEFAULT_SUPERADMIN_PASSWORD",
] as const;

const optional = ["NODE_ENV"] as const;

export async function GET() {
  try {
    const requiredStatus = required.map((key) => ({
      key,
      set: !!process.env[key],
    }));

    const optionalStatus = optional.map((key) => ({
      key,
      set: !!process.env[key],
    }));

    const missingRequired = requiredStatus.filter((v) => !v.set).map((v) => v.key);
    const missingOptional = optionalStatus.filter((v) => !v.set).map((v) => v.key);

    return NextResponse.json({
      success: missingRequired.length === 0,
      data: {
        required: requiredStatus,
        optional: optionalStatus,
        missingRequired,
        missingOptional,
        allSet: missingRequired.length === 0 && missingOptional.length === 0,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
