const required = [
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "DEFAULT_SUPERADMIN_EMAIL",
  "DEFAULT_SUPERADMIN_PASSWORD",
] as const;

const optional = ["NODE_ENV"] as const;

function checkEnv() {
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.warn(
      `\n[env] ⚠ Missing required environment variables:\n  → ${missing.join("\n  → ")}\n` +
        "  API routes will fail without these. Set them in your .env file or hosting panel.\n",
    );
  }

  for (const key of optional) {
    if (!process.env[key]) {
      console.warn(
        `[env] Optional variable "${key}" is not set. Using defaults.`,
      );
    }
  }

  if (!process.env.MONGODB_URI) {
    console.warn(
      '[env] MONGODB_URI is missing. Falling back to "mongodb://127.0.0.1:27017/solar".',
    );
  }
}

checkEnv();

