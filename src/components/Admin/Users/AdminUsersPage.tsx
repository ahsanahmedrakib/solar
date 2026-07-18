"use client";

import { useAuth } from "@/components/Auth/AuthProvider";
import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";
import { queryKeys, useQueryUsers } from "@/lib/queries";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertCircle,
  Edit2,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const userSchema = yup.object({
  name: yup.string().required("Name is required").min(2),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().notRequired().default(""),
  role: yup.string().oneOf(["superadmin", "admin"]).default("admin"),
});

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: "superadmin" | "admin";
}

export default function AdminUsersPage() {
  const { user: currentUser, refreshUser } = useAuth();
  const { data: users = [], isLoading } = useQueryUsers();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: "superadmin" | "admin";
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUpdatingSelf, setIsUpdatingSelf] = useState(false);

  const isSuperadmin = currentUser?.role === "superadmin";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(userSchema) as any,
    defaultValues: { name: "", email: "", password: "", role: "admin" },
  });

  const handleAddClick = () => {
    setEditingUser(null);
    setIsUpdatingSelf(false);
    reset({ name: "", email: "", password: "", role: "admin" });
    setIsOpen(true);
  };

  const handleEditClick = (u: {
    id: string;
    name: string;
    email: string;
    role: "superadmin" | "admin";
  }) => {
    setEditingUser(u);
    const isSelf = u.id === currentUser?.id;
    setIsUpdatingSelf(isSelf);
    reset({
      name: u.name,
      email: isSelf ? u.email : u.email,
      password: "",
      role: u.role,
    });
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await apiClient(`/api/users?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.users });
        toast.success("User deleted");
      } else {
        toast.error(json.error || "Failed to delete user");
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (raw: any) => {
    const data = raw as UserFormData;

    try {
      const body: Record<string, unknown> = { name: data.name };

      if (editingUser) {
        body.id = editingUser.id;
        if (data.email !== editingUser.email && isSuperadmin) {
          body.email = data.email;
        }
        if (data.password) body.password = data.password;
        if (data.role && isSuperadmin) body.role = data.role;

        const res = await apiClient("/api/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("User updated");
          queryClient.invalidateQueries({ queryKey: queryKeys.users });
          if (editingUser.id === currentUser?.id) refreshUser();
          setIsOpen(false);
        } else {
          toast.error(json.error || "Failed to update user");
        }
      } else {
        body.email = data.email;
        body.password = data.password;
        body.role = data.role;

        const res = await apiClient("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.success) {
          toast.success("User created");
          queryClient.invalidateQueries({ queryKey: queryKeys.users });
          setIsOpen(false);
        } else {
          toast.error(json.error || "Failed to create user");
        }
      }
    } catch {
      toast.error("Failed to save user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <Image
          src={DEFAULT_ADMIN_LOGO}
          alt="Loading"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-auto animate-pulse opacity-70"
          priority
        />
        <p className="mt-4 text-(--admin-text-secondary) font-medium">
          Loading users...
        </p>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Users</h2>
          <p className="admin-page-header-sub">
            Manage admin panel users ({users?.length} total)
          </p>
        </div>
        <div className="admin-page-header-actions">
          {isSuperadmin && (
            <button onClick={handleAddClick} className="admin-btn-primary">
              <Plus size={14} />
              Add User
            </button>
          )}
        </div>
      </div>

      <div className="admin-table-search relative w-full sm:w-80">
        <Search size={14} className="admin-table-search-icon" />
        <input
          placeholder="Search users by name or email..."
          className="admin-table-search-input w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "var(--admin-surface-2)",
            border: "1px solid var(--admin-border)",
            color: "var(--admin-text-primary)",
            borderRadius: 8,
            padding: "8px 12px 8px 34px",
            fontSize: 13,
            outline: "none",
          }}
        />
      </div>

      <div className="admin-table-card">
        {filteredUsers?.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <UserCog size={26} />
            </div>
            <p className="admin-empty-title">No users found</p>
            <p className="admin-empty-desc">
              {search
                ? "Try a different search term."
                : "Create your first user to grant admin access."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-(--admin-accent)/10 text-(--admin-accent) flex items-center justify-center text-xs font-bold uppercase">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-(--admin-text-primary)">
                            {u.name}
                            {u.id === currentUser?.id && (
                              <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                You
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-(--admin-text-secondary)">
                      {u.email}
                    </td>
                    <td>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${
                          u.role === "superadmin"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {u.role === "superadmin" ? (
                          <ShieldAlert size={11} />
                        ) : (
                          <Shield size={11} />
                        )}
                        {u.role}
                      </span>
                    </td>
                    <td className="text-xs text-(--admin-text-muted)">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(u)}
                          className="admin-action-btn"
                          title="Edit User"
                        >
                          <Edit2 size={14} />
                        </button>
                        {isSuperadmin && u.role === "admin" && (
                          <button
                            onClick={() => handleDeleteClick(u.id)}
                            className="admin-action-btn danger"
                            title="Delete User"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-(--admin-surface) border border-(--admin-border-strong) rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-(--admin-border) bg-(--admin-surface-2)">
              <h3 className="text-base font-bold text-(--admin-text-primary) flex items-center gap-2">
                <UserCog size={18} className="text-(--admin-accent)" />
                {editingUser ? "Edit User" : "Add User"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-(--admin-text-muted) hover:text-(--admin-text-primary) transition"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 overflow-y-auto space-y-4 flex-1"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.name ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.name && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  disabled={!!editingUser && !isSuperadmin}
                  {...register("email")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.email ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition disabled:opacity-50`}
                />
                {errors.email && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                  Password {editingUser ? "(leave empty to keep current)" : "*"}
                </label>
                <input
                  type="password"
                  placeholder={
                    editingUser ? "New password" : "Min 6 characters"
                  }
                  {...register("password")}
                  className="w-full bg-(--admin-surface-2) border border-(--admin-border) text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition"
                />
              </div>

              {isSuperadmin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--admin-text-secondary) uppercase tracking-wider">
                    Role
                  </label>
                  <select
                    {...register("role")}
                    disabled={!!editingUser}
                    className="w-full bg-(--admin-surface-2) border border-(--admin-border) text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition disabled:opacity-50"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-(--admin-border)">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="admin-btn-outline px-5"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-btn-primary px-5"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingUser
                      ? "Update User"
                      : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
