import crypto from "crypto";
import { readDataFile, withWriteLock, writeDataFile } from "./fileStore";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
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

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
  createdAt: string;
  updatedAt: string;
}

const USERS_FILE = "usersData";

export function getUsers(): StoredUser[] {
  return readDataFile<StoredUser[]>(USERS_FILE, []);
}

export function saveUsers(users: StoredUser[]): void {
  writeDataFile(USERS_FILE, users);
}

export async function ensureSuperadminExists() {
  return withWriteLock(async () => {
    const users = getUsers();
    if (users.some((u) => u.role === "superadmin")) return;

    const email = process.env.DEFAULT_SUPERADMIN_EMAIL;
    const password = process.env.DEFAULT_SUPERADMIN_PASSWORD;
    if (!email || !password) return;

    const now = new Date().toISOString();
    const superadmin: StoredUser = {
      id: "sa-" + crypto.randomUUID().slice(0, 8),
      name: "Super Admin",
      email,
      password: await hashPassword(password),
      role: "superadmin",
      createdAt: now,
      updatedAt: now,
    };

    if (!users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      saveUsers([...users, superadmin]);
    }
  });
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const normalized = String(email ?? "").trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function findUserById(id: string): StoredUser | undefined {
  return getUsers().find((u) => u.id === id);
}