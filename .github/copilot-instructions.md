# Copilot Instructions for startup-site

## Project Overview

**NextDoor Inc.** is a Next.js 14 marketing/admin website for a pediatric digital therapy device company using AI to understand children's movement patterns. The site features public marketing pages, an admin dashboard, and a SQLite database managed via Prisma ORM.

## Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components as default)
- **Database**: SQLite (via better-sqlite3) + Prisma ORM with BetterSqlite3 adapter
- **UI**: React 18, Tailwind CSS, Framer Motion for animations
- **Admin**: Custom cookie-based authentication (HMAC-SHA256 signed tokens)
- **Deployment**: Vercel-ready, environment-based configuration

## Key Structural Patterns

### 1. **Route Organization**
- **Public Site**: `src/app/(site)/` → public pages (/, /ai, /product, /evidence, /company, /contact)
- **Admin Panel**: `src/app/admin/(panel)/` → protected dashboard (/story, /therapy-analytics)
- **Auth Gate**: `src/app/admin/(auth)/login/` → login page, redirects to panel on success
- **API Routes**: `src/app/api/` → RESTful endpoints, split by domain (stories, therapy-analytics, admin)

### 2. **Authentication System**
- **Not using NextAuth** — custom implementation in `src/lib/admin/auth.ts`
- Cookie-based: `COOKIE_NAME = "nd_admin"` with format `v1.{timestamp}.{signature}`
- Server-side validation via `middleware.ts` for `/admin/*` routes
- HMAC signed to prevent tampering; expires after 1 week
- Admin panel requires `ADMIN_COOKIE_SECRET` env var; login uses `ADMIN_PASSWORD`

### 3. **Component Structure**
- **Layout components** (`src/components/layout/`): Header, Footer, Container, Page wrapper
- **Motion/animation** (`src/components/motion/`): `FadeIn` wrapper with Framer Motion (lazy scroll trigger)
- **UI elements** (`src/components/ui/`): `ButtonLink`, `Card`, `Badge` — small, reusable, Tailwind-styled
- **Section components** (`src/components/sections/`): domain-specific (clinical, company, home, product)
- **Utility**: `cn.ts` for Tailwind className merging

### 4. **Database & Content**
- **Models**: `StoryItem` (company timeline) + `CompanyPageContent` (JSON-based page data)
- **Patterns**:
  - StoryItem has `order` field for manual reordering (admin UI uses drag-n-drop via `/api/admin/stories/reorder`)
  - CompanyPageContent uses `key` (unique) + `data` (JSON) + `status` (draft/published)
  - Seed data in `prisma/seed.ts` (run via `npm run postinstall`)
- **Migrations**: Under `prisma/migrations/` with timestamps
- **Env**: Database URL defaults to `file:./prisma/dev.db` if `DATABASE_URL` not set

### 5. **Content & Configuration**
- **Site config**: `src/content/site.ts` — exports `site` object with name, description, nav, hero copy (all Korean)
- **Why**: Single source of truth for page titles, navigation links, CTA text; easy to update branding

### 6. **Styling Approach**
- **Tailwind only** — no CSS modules or styled-components
- **Colors/theme**: Uses Tailwind defaults extended in `tailwind.config.js` (currently empty extend)
- **Layout classes**: e.g., `min-h-dvh` (dynamic viewport height), `flex`, `gap-*`, `p-*`
- **Common patterns**: rounded-2xl for buttons, border-white/10 for glass-morphism, backdrop-blur

## Critical Developer Workflows

### Build & Development
```bash
npm run dev         # Start dev server (localhost:3000)
npm run build       # Production build (validates TypeScript/ESLint)
npm start           # Serve built app
npm run lint        # Run ESLint
```

### Database Workflow
```bash
npx prisma migrate dev --name <migration_name>  # Create & apply migration
npx prisma db push                              # Sync schema without migration
npx prisma studio                               # GUI for database
npm run seed                                    # Run prisma/seed.ts
```

### API Development Pattern
1. Add route in `src/app/api/*/route.ts`
2. Import `prisma` from `@/lib/prisma`
3. Wrap responses in `NextResponse.json()`
4. Validate input with basic string/type checks (no external validation lib)
5. Use `try-catch` for error handling; return `{ error: "..." }` on failure

### Admin Page Development Pattern
1. Create "use client" component in `src/app/admin/(panel)/**/page.tsx`
2. Fetch from `/api/admin/*` endpoints using helper function `api<T>(url, init?)`
3. Manage state with `useState`; derive computed state with `useMemo`
4. No redirect guards—middleware handles auth; unauthenticated users get 401 from API

## Integration Points & External Dependencies

- **Prisma Adapter**: Uses `@prisma/adapter-better-sqlite3` (requires `better-sqlite3` native module)
- **Framer Motion**: Used for scroll-triggered animations; keep animations under 0.6s duration
- **Vercel**: Site ready for Vercel deployment; relies on `node` runtime
- **ESLint**: Extends `eslint-config-next` (core-web-vitals + TypeScript rules)

## Conventions & Gotchas

1. **TypeScript strict mode**: Enabled; avoid `any` types
2. **Path alias**: `@/*` maps to `src/*` — use this in all imports
3. **Korean content**: Site copy is in Korean; maintain lang="ko" in HTML
4. **No external state management**: useState + fetch for all data; no Redux/Zustand
5. **Images/Media**: Company images/videos stored in `public/company/videos/` and similar; use relative URLs
6. **Middleware limitations**: Middleware can't access response body; only checks cookies in middleware.ts
7. **Admin API protection**: All `/api/admin/*` routes **must** check auth in the route handler itself; middleware only gates access to `/admin/*` UI routes

## File Organization Quick Reference

- Pages/Routes: Mirror folder structure under `src/app/**`
- Reusable UI: `src/components/ui/` (single files, ~50 LOC)
- Sections: `src/components/sections/` (domain-specific layouts)
- API helpers: `src/lib/` (auth, database, utils)
- Configuration: `src/content/` (text, site metadata)
- Database: `prisma/schema.prisma`, migrations auto-tracked in `prisma/migrations/`

## When Adding Features

1. **New public page**: Create folder in `src/app/(site)/new-page/` → add components in `src/components/sections/`
2. **New admin feature**: Create folder in `src/app/admin/(panel)/feature/` + API routes in `src/app/api/admin/feature/`
3. **New data model**: Add to `prisma/schema.prisma` → run `npx prisma migrate dev` → update API routes
4. **New UI component**: Add to `src/components/ui/` as a small, focused component; compose in page/section components
