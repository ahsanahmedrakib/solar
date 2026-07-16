import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "./env";
import { db } from "./db";
import { users } from "./schema";
import { count, eq } from "drizzle-orm";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`[auth] Required env "${name}" is not set.`);
    }
    console.warn(`[auth] Missing "${name}" — auth operations will fail.`);
    return "";
  }
  return value;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: "superadmin" | "admin";
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, getEnv("JWT_SECRET"), { expiresIn: "15m" });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, getEnv("JWT_REFRESH_SECRET"), { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, getEnv("JWT_SECRET"));
  if (typeof decoded === "string" || !decoded.userId || !decoded.email || !decoded.role) {
    throw new Error("Invalid token payload");
  }
  return decoded as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, getEnv("JWT_REFRESH_SECRET"));
  if (typeof decoded === "string" || !decoded.userId || !decoded.email || !decoded.role) {
    throw new Error("Invalid refresh token payload");
  }
  return decoded as TokenPayload;
}

let superadminSeeded = false;

export async function ensureSuperadminExists() {
  if (superadminSeeded) return;

  const result = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.role, "superadmin"));
  const adminCount = result[0]?.count ?? 0;

  if (adminCount === 0) {
    const email = getEnv("DEFAULT_SUPERADMIN_EMAIL");
    const password = getEnv("DEFAULT_SUPERADMIN_PASSWORD");
    const hashed = await hashPassword(password);
    try {
      await db.insert(users).values({
        id: "sa-" + crypto.randomUUID().slice(0, 8),
        name: "Super Admin",
        email,
        password: hashed,
        role: "superadmin",
      });
    } catch {
      // Another request may have inserted first — ignore duplicate
    }
  }

  superadminSeeded = true;
}
