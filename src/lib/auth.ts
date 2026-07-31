import crypto from "crypto";
import "./env";
import { db } from "./db";
import { users } from "./schema";
import { count, eq } from "drizzle-orm";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  getEnv,
  getRequestTokenPayload,
  hashPassword,
  verifyAccessToken,
  verifyRefreshToken,
  type TokenPayload,
} from "./token";

export {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  getRequestTokenPayload,
  hashPassword,
  verifyAccessToken,
  verifyRefreshToken,
  type TokenPayload,
};

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
