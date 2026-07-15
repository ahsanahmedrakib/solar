import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Db } from "mongodb";
import "./env";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.warn(`[auth] Missing "${name}" — auth operations will fail.`);
    return "";
  }
  return value;
}

const JWT_SECRET = getEnv("JWT_SECRET");
const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");

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
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
}

export async function ensureSuperadminExists(db: Db) {
  const count = await db.collection("users").countDocuments({ role: "superadmin" });
  if (count === 0) {
    const email = getEnv("DEFAULT_SUPERADMIN_EMAIL");
    const password = getEnv("DEFAULT_SUPERADMIN_PASSWORD");
    const hashed = await hashPassword(password);
    const superadmin = {
      id: "sa-" + Date.now().toString(36),
      name: "Super Admin",
      email,
      password: hashed,
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.collection("users").insertOne(superadmin);
  }
}
