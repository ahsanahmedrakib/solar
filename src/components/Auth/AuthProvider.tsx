"use client";

import { LoadingScreen } from "@/components/Common/LoadingScreen";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  transitioning: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const initialisedRef = useRef(false);
  const pathname = usePathname();

  const refreshUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setUser(json.data);
        } else {
          setUser(null);
        }
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const refreshRes = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });
          if (refreshRes.ok) {
            const refreshJson = await refreshRes.json();
            localStorage.setItem("accessToken", refreshJson.data.accessToken);
            const retryRes = await fetch("/api/auth/me", {
              headers: {
                Authorization: `Bearer ${refreshJson.data.accessToken}`,
              },
            });
            if (retryRes.ok) {
              const retryJson = await retryRes.json();
              if (retryJson.success) setUser(retryJson.data);
              else setUser(null);
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (transitioning) {
      setTransitioning(false);
    }
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/login")) {
      setLoading(false);
      return;
    }
    if (initialisedRef.current) return;
    initialisedRef.current = true;

    const timer = window.setTimeout(() => {
      void refreshUser();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [refreshUser, pathname]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.error || "Login failed");
    }
    localStorage.setItem("accessToken", json.data.accessToken);
    localStorage.setItem("refreshToken", json.data.refreshToken);
    setUser(json.data.user);
    setTransitioning(true);
  };

  const logout = async () => {
    setTransitioning(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const isAdmin = pathname?.startsWith("/admin");

  return (
    <AuthContext.Provider value={{ user, loading, transitioning, login, logout, refreshUser }}>
      {transitioning && <LoadingScreen variant={isAdmin ? "admin" : "main"} />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
