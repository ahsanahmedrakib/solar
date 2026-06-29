"use client";

import { ImageUploadInput } from "@/components/Admin/ImageUploadInput";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertCircle,
  Briefcase,
  Edit2,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-1.jpg",
  },
  {
    id: 2,
    name: "Marvin McKinney",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-2.jpg",
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-3.jpg",
  },
];

const teamSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .min(3, "Must be at least 3 characters"),
  role: yup
    .string()
    .required("Role/Title is required")
    .min(3, "Must be at least 3 characters"),
  image: yup.string().required("Profile image is required"),
  bio: yup.string().optional().default(""),
});

interface TeamFormData {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(() => {
    if (typeof window === "undefined") return DEFAULT_TEAM;

    const stored = localStorage.getItem("admin_team");
    if (!stored) return DEFAULT_TEAM;

    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_TEAM;
    }
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("admin_team");
    if (!stored) {
      localStorage.setItem("admin_team", JSON.stringify(DEFAULT_TEAM));
    } else {
      try {
        JSON.parse(stored);
      } catch {
        localStorage.setItem("admin_team", JSON.stringify(DEFAULT_TEAM));
      }
    }

    Promise.resolve().then(() => setIsLoaded(true));
  }, []);

  const saveTeam = (updatedList: TeamMember[]) => {
    setTeam(updatedList);
    localStorage.setItem("admin_team", JSON.stringify(updatedList));
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamFormData>({
    resolver: yupResolver(teamSchema) as never,
    defaultValues: {
      name: "",
      role: "",
      image: "/images/about/team-image-1.jpg",
      bio: "",
    },
  });

  const handleAddClick = () => {
    setEditingMember(null);
    reset({
      name: "",
      role: "Solar Systems Specialist",
      image: "/images/about/team-image-1.jpg",
      bio: "",
    });
    setIsOpen(true);
  };

  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member);
    reset({
      name: member.name,
      role: member.role,
      image: member.image,
      bio: member.bio || "",
    });
    setIsOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      const filtered = team.filter((m) => m.id !== id);
      saveTeam(filtered);
    }
  };

  const onSubmit = async (data: TeamFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (editingMember) {
      const updatedList = team.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: data.name,
              role: data.role,
              image: data.image,
              bio: data.bio,
            }
          : m,
      );
      saveTeam(updatedList);
    } else {
      const newMember: TeamMember = {
        id: team.length > 0 ? Math.max(...team.map((m) => m.id)) + 1 : 1,
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio,
      };
      saveTeam([...team, newMember]);
    }
    setIsOpen(false);
  };

  const filteredTeam = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()),
  );

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-(--admin-text-secondary) font-medium">
          Loading Team Directory...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Expert Team</h2>
          <p className="admin-page-header-sub">
            Manage engineers and specialists displayed on the About Us page (
            {team.length} members)
          </p>
        </div>
        <div className="admin-page-header-actions">
          <button onClick={handleAddClick} className="admin-btn-primary">
            <Plus size={14} />
            Add Team Member
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="admin-table-search relative w-full md:w-80">
          <Search size={14} className="admin-table-search-icon" />
          <input
            placeholder="Search team members, roles..."
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
      </div>

      <div className="admin-table-card">
        {filteredTeam.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <Users size={26} />
            </div>
            <p className="admin-empty-title">No team members found</p>
            <p className="admin-empty-desc">
              Add engineers and specialists to showcase your team expertise on
              the About page.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Member Info</th>
                  <th>Role / Designation</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeam.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full bg-cover bg-center border border-(--admin-border-strong) shrink-0"
                          style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <div>
                          <p className="font-bold text-[14.5px] text-(--admin-text-primary)">
                            {member.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-sm text-(--admin-text-secondary) font-medium">
                        <Briefcase
                          size={14}
                          className="text-(--admin-accent)"
                        />
                        {member.role}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(member)}
                          className="admin-action-btn"
                          title="Edit Member"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(member.id)}
                          className="admin-action-btn danger"
                          title="Delete Member"
                        >
                          <Trash2 size={14} />
                        </button>
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
                <Users size={18} className="text-(--admin-accent)" />
                {editingMember ? "Edit Team Member" : "Add Team Member"}
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
                  placeholder="e.g. Sarah Connor"
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
                  Role / Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead Solar Architect"
                  {...register("role")}
                  className={`w-full bg-(--admin-surface-2) border ${errors.role ? "border-(--admin-danger)" : "border-(--admin-border)"} text-sm text-(--admin-text-primary) rounded-lg p-2.5 outline-none focus:border-(--admin-accent) transition`}
                />
                {errors.role && (
                  <span className="text-[11px] text-(--admin-danger) flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.role.message}
                  </span>
                )}
              </div>

              {/* Image Upload Component */}
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUploadInput
                    label="Profile Picture"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.image?.message}
                    placeholder="/images/about/team-image-1.jpg"
                  />
                )}
              />

              <div className="flex justify-end gap-3 pt-3 border-t border-(--admin-border)">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="admin-btn-outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary px-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

