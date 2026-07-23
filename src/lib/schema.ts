import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  serviceDetails: text("service_details").notNull(),
  image: text("image").notNull(),
  alt: text("alt").notNull(),
  iconName: text("icon_name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  client: text("client").notNull(),
  location: text("location").notNull(),
  projectDetails: text("project_details").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  tags: text("tags").array().notNull().default([]),
  date: text("date").notNull(),
  blogDetails: text("blog_details").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  parentId: integer("parent_id"),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  website: text("website").default(""),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
});

export const team = pgTable("team", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  image: text("image").notNull(),
  bio: text("bio"),
  socialLinks: jsonb("social_links").$type<{
    facebook?: string;
    instagram?: string;
    x?: string;
    linkedin?: string;
  }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  tagline: text("tagline").notNull(),
  title: text("title").notNull(),
  titleAccent: text("title_accent").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  videoUrl: text("video_url").notNull(),
  showVideoButton: boolean("show_video_button").notNull().default(true),
  isActive: boolean("is_active").notNull().default(true),
  order: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  settingsId: varchar("settings_id", { length: 50 }).notNull().unique(),
  sections: jsonb("sections").$type<unknown[]>().notNull().default([]),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactQueries = pgTable("contact_queries", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  notes: text("notes"),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  data: text("data").notNull(),
  contentType: varchar("content_type", { length: 100 }).notNull(),
  folderName: text("folder_name").notNull(),
  resourceId: text("resource_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

