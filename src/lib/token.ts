import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
  role: "superadmin" | "admin";
}

export function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`[token] Required env "${name}" is not set.`);
    }
    console.warn(`[token] Missing "${name}" — token operations will fail.`);
    return "";
  }
  return value;
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
  if (
    typeof decoded === "string" ||
    !decoded.userId ||
    !decoded.email ||
    !decoded.role
  ) {
    throw new Error("Invalid token payload");
  }
  return decoded as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, getEnv("JWT_REFRESH_SECRET"));
  if (
    typeof decoded === "string" ||
    !decoded.userId ||
    !decoded.email ||
    !decoded.role
  ) {
    throw new Error("Invalid token payload");
  }
  return decoded as TokenPayload;
}

export function getRequestTokenPayload(request: Request): TokenPayload | null {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  if (!token) return null;
  try {
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}
