export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export function toPublicUser(user: User): UserPublic {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
