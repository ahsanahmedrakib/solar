# Ahead Solar BD — Corporate Website

A full-stack, CMS-driven corporate website for **Ahead Solar**, a leading solar energy company in Bangladesh. Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and a custom file-based JSON backend — no external database required.

**Live Site:** [https://aheadsolarbd.com](https://aheadsolarbd.com)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Panel](#admin-panel)
- [API Routes](#api-routes)
- [Design System](#design-system)
- [Performance & SEO](#performance--seo)
- [Security](#security)

---

## About the Project

Ahead Solar BD is a complete corporate website with a built-in content management system (CMS) that allows administrators to manage all site content — services, projects, team members, hero slides, reviews, settings, and more — through a dark-themed admin dashboard. The site supports bilingual content (English and Bangla) for certain forms and features a custom file-based storage engine with JSON persistence.

---

## Key Features

### Public Website
- **Hero Slider** — Swiper-based hero carousel with Ken Burns zoom animation, word-by-word title reveal, and staggered text transitions
- **Services Pages** — Detailed service listings with rich text (Tiptap editor) descriptions, image galleries, and individual detail pages
- **Projects Portfolio** — Filterable project gallery with category tags, featured badges, multi-image sliders, and detail pages
- **About Page** — Company overview with team section and social links
- **Contact Page** — Validated contact form with rate limiting and server-side validation
- **Palash Charging Station** — Dedicated sub-brand page with custom color theme (red + dark green) overriding the main cyan brand
- **Floating Chat Widget** — Animated chat widget with staggered button entrance and idle bob animation
- **Scroll Reveal Animations** — Multiple reveal variants (fade, zoom, slide-left, slide-right, scale) driven by Intersection Observer

### Admin Dashboard (CMS)
- **Authentication** — JWT-based login with access + refresh tokens, bcrypt password hashing, httpOnly cookies
- **Hero Slider Management** — Create, edit, delete hero slides with image/video upload
- **Services Management** — Full CRUD with Tiptap rich text editor and image gallery management
- **Projects Management** — CRUD with category assignment, featured toggle, multi-image support
- **Team Management** — Add/edit team members with social links
- **Reviews Management** — Customer review CRUD
- **Contact Submissions** — View and manage contact form entries
- **Palash Applications** — View dealership/charging station applications
- **Site Settings** — Dynamic site configuration (company info, social links, meta tags, SEO settings)
- **User Management** — Admin user CRUD with role assignment
- **Analytics Dashboard** — Overview statistics
- **Image & Video Upload** — File-based media management with auto-cleanup of replaced files

### SEO & Performance
- Dynamic `generateMetadata()` per page
- JSON-LD structured data (Organization, WebSite, Service, BreadcrumbList)
- Auto-generated `sitemap.xml` with dynamic URLs
- `robots.txt` with admin/login disallow rules
- Canonical URLs, Open Graph, and Twitter Card meta tags
- React Query caching (5-min stale time for public, 0 for admin)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.9 (App Router) |
| **UI Library** | React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 (design tokens via `@theme`) |
| **State Management** | TanStack React Query v5 |
| **Forms** | React Hook Form + Yup validation |
| **Rich Text Editor** | Tiptap v3 (with Image & Link extensions) |
| **Carousel** | Swiper v14 |
| **Icons** | Lucide React |
| **Auth** | JWT (jsonwebtoken) + bcryptjs |
| **Notifications** | React Toastify |
| **CSS Utilities** | clsx + tailwind-merge |
| **Package Manager** | pnpm |

---

## Project Structure

```
solar/
├── public/
│   ├── images/           # Static images (team, services, projects, etc.)
│   ├── videos/           # Video assets
│   ├── logo.svg          # Site logo
│   ├── bct-logo.svg      # BCT logo
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (main)/       # Public site routes
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── about/            # About page
│   │   │   ├── contact/          # Contact page
│   │   │   ├── services/         # Services listing + detail pages
│   │   │   ├── projects/         # Projects listing + detail pages
│   │   │   ├── solutions/        # Solutions pages
│   │   │   ├── login/            # Admin login
│   │   │   └── palash-charging-station/  # Palash sub-brand page
│   │   ├── admin/        # Admin dashboard (CMS)
│   │   │   ├── page.tsx          # Analytics dashboard
│   │   │   ├── hero-slider/      # Hero slide management
│   │   │   ├── services/         # Service CRUD
│   │   │   ├── projects/         # Project CRUD
│   │   │   ├── team/             # Team management
│   │   │   ├── reviews/          # Review management
│   │   │   ├── contact/          # Contact submissions
│   │   │   ├── palash-applications/  # Palash applications
│   │   │   ├── settings/         # Site settings
│   │   │   ├── users/            # User management
│   │   │   └── analytics/        # Analytics page
│   │   ├── api/          # API routes (file-based JSON backend)
│   │   │   ├── auth/             # Login, refresh, logout
│   │   │   ├── contact/          # Contact form submission
│   │   │   ├── services/         # Services CRUD API
│   │   │   ├── projects/         # Projects CRUD API
│   │   │   ├── hero-slides/      # Hero slides API
│   │   │   ├── team/             # Team API
│   │   │   ├── reviews/          # Reviews API
│   │   │   ├── settings/         # Settings API
│   │   │   ├── users/            # Users API
│   │   │   ├── image/            # Image serving
│   │   │   ├── db/               # Database operations
│   │   │   ├── env/              # Environment info
│   │   │   └── palash-applications/  # Palash applications API
│   │   ├── layout.tsx     # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx       # Root page (home)
│   │   ├── globals.css    # Design token system + global styles
│   │   ├── robots.ts      # Robots.txt generator
│   │   └── sitemap.ts     # Sitemap.xml generator
│   ├── components/
│   │   ├── Home/          # Home page components (Hero, Services, Projects, etc.)
│   │   ├── About/         # About page components
│   │   ├── Services/      # Service listing & detail components
│   │   ├── Projects/      # Project listing & detail components
│   │   ├── Contact/       # Contact form components
│   │   ├── Palash/        # Palash sub-brand components
│   │   ├── Solutions/     # Solutions page components
│   │   ├── Admin/         # Admin dashboard components
│   │   ├── Auth/          # Authentication components
│   │   ├── Common/        # Shared components (Navbar, Footer, Providers, etc.)
│   │   ├── Login/         # Login page components
│   │   ├── SEO/           # JSON-LD structured data
│   │   ├── ui/            # Reusable UI primitives (shadcn-style)
│   │   └── NotFound.tsx   # 404 page component
│   ├── data/
│   │   ├── api/           # File-based JSON database storage
│   │   ├── services.ts    # Default service data
│   │   ├── projects.ts    # Default project data
│   │   ├── team.ts        # Default team data
│   │   ├── settings.ts    # Default settings data
│   │   ├── hero-slides.ts # Default hero slide data
│   │   ├── reviews.ts     # Default review data
│   │   ├── contact.ts     # Contact form data types
│   │   ├── palash.ts      # Palash application data
│   │   └── users.ts       # Default user data
│   ├── hooks/
│   │   └── useScrollAnimation.ts  # Intersection Observer scroll reveal hook
│   ├── lib/
│   │   ├── apiClient.ts      # HTTP client with auth + auto-refresh
│   │   ├── auth.ts           # JWT auth utilities
│   │   ├── cache.ts          # React Query client config
│   │   ├── config.ts         # Site constants (URL, social links, etc.)
│   │   ├── const.tsx         # Shared constants
│   │   ├── env.ts            # Environment variable helpers
│   │   ├── fileStore.ts      # File-based JSON storage engine
│   │   ├── iconRenderer.tsx  # Dynamic Lucide icon renderer
│   │   ├── imageHelper.ts    # Image upload/serve utilities
│   │   ├── queries.ts        # React Query hook factories
│   │   ├── rateLimit.ts      # In-memory rate limiter
│   │   ├── site.ts           # Site info helpers
│   │   ├── token.ts          # Token management
│   │   ├── utils.ts          # General utilities
│   │   ├── videoHelper.ts    # Video upload utilities
│   │   └── videoUrl.ts       # Video URL helpers
│   ├── types/
│   │   └── services.ts       # TypeScript interfaces
│   └── proxy.ts              # API proxy middleware
├── .env                      # Environment variables (secrets)
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.mjs        # PostCSS config for Tailwind
├── eslint.config.mjs         # ESLint config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd solar

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env   # or create .env manually
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# JWT Secrets (required)
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-jwt-refresh-secret-here

# Default superadmin credentials (used when no users exist)
DEFAULT_SUPERADMIN_EMAIL=admin@aheadsolarbd.com
DEFAULT_SUPERADMIN_PASSWORD=Admin@123

# Optional
NODE_ENV=production
SITE_URL=https://aheadsolarbd.com
```

---

## Admin Panel

Access the admin dashboard at `/login`.

**Default Credentials:**
- **Email:** `admin@aheadsolarbd.com`
- **Password:** `Admin@123`

### Features
- Dark-themed responsive dashboard
- Real-time content management
- Image/video upload with preview
- Rich text editing (Tiptap)
- Role-based access (superadmin, admin, editor)
- Rate limiting on login (10 attempts/15 min per IP+email)

---

## API Routes

All API routes are under `/api/`. The proxy middleware (`src/proxy.ts`) handles authentication:

| Route | Method | Auth Required | Description |
|-------|--------|---------------|-------------|
| `/api/auth/login` | POST | No | User login |
| `/api/auth/refresh` | POST | No | Refresh access token |
| `/api/auth/logout` | POST | No | Logout |
| `/api/settings` | GET | No | Public site settings |
| `/api/services` | GET | No | Public services list |
| `/api/projects` | GET | No | Public projects list |
| `/api/hero-slides` | GET | No | Public hero slides |
| `/api/team` | GET | No | Public team members |
| `/api/reviews` | GET | No | Public reviews |
| `/api/contact` | POST | No | Submit contact form |
| `/api/palash-applications` | POST | No | Submit Palash application |
| `/api/image/[...path]` | GET | No | Serve uploaded images |
| `/api/services` | POST/PUT/DELETE | Yes | Manage services |
| `/api/projects` | POST/PUT/DELETE | Yes | Manage projects |
| `/api/hero-slides` | POST/PUT/DELETE | Yes | Manage hero slides |
| `/api/team` | POST/PUT/DELETE | Yes | Manage team |
| `/api/reviews` | POST/PUT/DELETE | Yes | Manage reviews |
| `/api/users` | GET/POST/PUT/DELETE | Yes | Manage users |
| `/api/settings` | POST/PUT | Yes | Update settings |

### Data Storage

The backend uses a **file-based JSON database** stored in `src/data/api/`. The `fileStore.ts` module provides:
- Read/write/delete operations with write-lock serialization
- Automatic fallback to hardcoded default data when no JSON file exists
- No external database dependency

---

## Design System

The project uses **Tailwind CSS v4** with a custom `@theme` design token system (no `tailwind.config.js`):

### Brand Colors
- **Primary (Cyan):** `#28CBC6` — Main brand color from AHEAD logo
- **Accent (Gold):** `#F7B308` — Supporting accent from logo sun element
- **Forest (Deep Cyan):** `#0c3d3b` — Dark sections and headings
- **Secondary:** `#eef2f1` — Light section backgrounds

### Typography
- **Headings:** Rajdhani (Google Fonts)
- **Body:** Rubik (Google Fonts)
- **Monospace:** Geist Mono (Google Fonts)

### Custom CSS Classes
- `.btn-brand` / `.btn-brand-outline` — CTA buttons with hover animation
- `.reveal` — Scroll reveal animation system (6 variants)
- `.marquee` — Infinite scrolling ticker
- `.card-shine` — Card hover shine effect
- `.nav-link-sweep` — Navigation underline sweep animation
- `.hero-anime-item` — Hero text staggered entrance
- `.palash-page` — Color theme override for Palash sub-brand

---

## Performance & SEO

- **Dynamic Metadata:** Every page uses `generateMetadata()` for unique titles, descriptions, and OG images
- **JSON-LD:** Structured data for Organization, WebSite, Service, and BreadcrumbList schemas
- **Sitemap:** Auto-generated `sitemap.xml` with dynamic service/project URLs
- **Robots.txt:** Disallows `/admin` and `/login` from crawlers
- **Caching:** Public API responses use `stale-while-revalidate=600` (10 min); React Query caches for 5 minutes
- **Compression:** Enabled via Next.js `compress: true`
- **Dynamic Imports:** Heavy components loaded with `next/dynamic` for code splitting
- **Reduced Motion:** Respects `prefers-reduced-motion` media query

---

## Security

- **JWT Authentication** with access (15 min) + refresh (7 day) tokens
- **bcrypt** password hashing with 12 salt rounds
- **httpOnly cookies** for token storage
- **Rate Limiting:** Login (10/15min), Contact (5/15min), Palash (5/15min)
- **Input Validation** on all API routes
- **Image ID Sanitization** to prevent path traversal
- **`X-Content-Type-Options: nosniff`** on image responses
- **`poweredByHeader: false`** to hide Next.js fingerprint
- **CSP sandbox** on image serving endpoint

---

## License

This project is proprietary. All rights reserved.
