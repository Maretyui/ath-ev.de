# Progress Tracker - ATH Website

## Current Phase

**Phase 4 — Public Pages & Layout** — in progress.

## Current Goal

Implement public-facing pages: landing, berichte, termine, links, grundausbildung, verein, and the sticky navbar/footer layout.

## Completed

- ✅ Rewrote `project-overview.md` with diving club project definition, goals, features, and scope
- ✅ Rewrote `architecture-context.md` with Next.js + Prisma stack, API boundaries, storage model, and security model
- ✅ Rewrote `ui-context.md` with light/dark theme, color palette, typography, layout patterns for parent-friendly audience
- ✅ Rewrote `code-standards.md` with TypeScript, Next.js, Tailwind, Prisma, and API route standards
- ✅ Rewrote `ai-workflow-rules.md` with development workflow, scoping rules, and testing approach
- ✅ Created implementation plan with 7 phases and 23 todos

### Phase 1 — Design System & UI Setup

- ✅ Initialized shadcn/ui (`npx shadcn@latest init --defaults`) — detected Tailwind v4 automatically
- ✅ Added shadcn components: Button, Card, Dialog, Input, Select, Textarea, Table, Tabs, DropdownMenu, Sheet, Label, Badge
- ✅ Installed `lucide-react`
- ✅ `lib/utils.ts` created by shadcn with `cn()` helper (clsx + tailwind-merge)
- ✅ `app/globals.css` — replaced default palette with full ATH design system:
  - shadcn tokens mapped to ATH light/dark palette (--primary = brand blue, --foreground = body text, etc.)
  - ATH brand tokens added: `--brand-primary`, `--brand-secondary`, `--brand-tertiary`, `--state-error/success/warning`
  - Tailwind `@theme inline` maps both shadcn and ATH tokens to utility classes
- ✅ `hooks/useTheme.ts` — client-side hook: reads localStorage, applies `.dark` class to `<html>`, exposes `toggle()`
- ✅ `components/layout/theme-script.tsx` — blocking `<script>` injected in `<head>` to prevent flash-of-wrong-theme
- ✅ `app/layout.tsx` — updated metadata (German), `lang="de"`, injected ThemeScript
- ✅ `npm run build` passes with no errors

### Phase 2 — Prisma Schema & Database

- ✅ Installed `prisma` (dev) and `@prisma/client` (prod)
- ✅ Initialized Prisma v7 (`npx prisma init`) — generates `prisma/schema.prisma` + `prisma.config.ts` + `.env`
- ✅ Defined all 4 models in `prisma/schema.prisma`: User (Role enum), Member, Bericht, Termin — with correct relations, cascade deletes, and indexes
- ✅ `lib/prisma.ts` — singleton using `@prisma/adapter-pg` (Prisma v7 Driver Adapter pattern)
- ✅ `npx prisma generate` — Prisma Client generated to `lib/generated/prisma/`
- ✅ `npx prisma migrate dev --name init` — migration applied, all 4 tables created in `ath_db` on `192.168.178.43`
- ✅ `npm run build` passes with no type errors

### Phase 3 — Authentication API

- ✅ Installed `jsonwebtoken`, `bcryptjs`, `@types/jsonwebtoken`, `@types/bcryptjs`
- ✅ Added `JWT_SECRET`, `JWT_EXPIRY`, `REFRESH_EXPIRY` to `.env`
- ✅ `lib/types.ts` — `JwtPayload` and `AuthUser` interfaces
- ✅ `lib/validation.ts` — Zod schemas: `loginSchema`, `registerSchema`, `changePasswordSchema`
- ✅ `lib/auth.ts` — `createTokens`, `verifyToken`, `hashPassword`, `verifyPassword`
- ✅ `lib/abac.ts` — `hasRole`, `canViewMembers`, `canEditMembers`, `canPublishContent`, `canManageUsers`
- ✅ `app/api/auth/login/route.ts` — POST: validate, bcrypt verify, issue JWT + refresh cookie
- ✅ `app/api/auth/register/route.ts` — POST: validate, create user, issue tokens
- ✅ `app/api/auth/logout/route.ts` — POST: clear both cookies
- ✅ `app/api/auth/refresh/route.ts` — POST: validate refresh token, issue new JWT
- ✅ `app/api/auth/change-password/route.ts` — POST: JWT-gated, bcrypt verify + update
- ✅ `app/api/auth/me/route.ts` — GET: return user from JWT
- ✅ `npm run build` passes with no errors

### Phase 4a — ABAC Proxy (spec 04-abac-auth.md)

- ✅ `lib/abac.ts` extended with `canEditResource(userId, resourceOwnerId, role)` — resource-level ownership check
- ✅ `proxy.ts` created at project root — JWT verification for all protected routes:
  - API routes (`/api/members/*`, `/api/berichte/*`, `/api/termine/*`, `/api/users/*`) → 401 JSON on missing/invalid token
  - Page routes (`/intern/*` excluding `/intern`, `/intern/login`, `/intern/register`) → redirect to `/intern`
  - Auth cookies are named `authToken` (access) and `refreshToken` (refresh)
- ✅ `npm run build` passes — proxy recognized as `ƒ Proxy (Middleware)` in build output

- ✅ Implemented `components/layout/navbar.tsx`, `components/layout/footer.tsx`, and `app/layout.tsx` with sticky navbar/footer, theme toggle, and responsive mobile navigation.
- ✅ Implemented `app/page.tsx` landing page with hero, welcome section, feature cards, and CTA.
- ✅ Implemented public Berichte pages and safe markdown rendering (`/berichte`, `/berichte/[id]`).
- ✅ Implemented Berichte API routes for list and detail retrieval.
- ✅ `npm run build` passes after the latest public Berichte implementation

### Phase 5 — Member Management (Intern Pages)

- ✅ Added member validation schema to `lib/validation.ts` (name, street, PLZ, city, phone, email, birthday, youth status)
- ✅ Created `app/api/members/route.ts` — GET (list with filters), POST (create member with ABAC)
- ✅ Created `app/api/members/[id]/route.ts` — GET, PUT (update), DELETE with ownership checks
- ✅ Created `app/intern/login/page.tsx` — login form with email/password validation
- ✅ Created `app/intern/members/page.tsx` — members table with sorting, filtering, add/edit/delete operations
- ✅ Created `app/intern/change-password/page.tsx` — change password form with validation
- ✅ Created `components/members/member-form.tsx` — reusable form for adding/editing members
- ✅ Created `components/members/delete-dialog.tsx` — confirmation dialog for member deletion
- ✅ Created `app/intern/page.tsx` — landing page with quick links to login
- ✅ `npm run build` passes with no errors

### Phase 6 — Publisher Dashboard (spec 11-publisher-dashboard.md)

- ✅ Added `berichtSchema` to `lib/validation.ts` (Zod v4: uses `.issues` not `.errors`)
- ✅ `app/api/berichte/route.ts` — added POST handler (publisher+ ABAC) + `publisherId` filter on GET
- ✅ `app/api/berichte/[id]/route.ts` — added PUT + DELETE handlers with ownership check
- ✅ `app/api/termine/route.ts` — added `createdById` filter on GET
- ✅ `components/dashboard/bericht-form.tsx` — Dialog form for create/edit Berichte
- ✅ `components/dashboard/termin-form.tsx` — Dialog form for create/edit Termine
- ✅ `app/intern/dashboard/page.tsx` — two-tab dashboard (Berichte | Termine) with access guard, CRUD actions, delete confirmation
- ✅ `npm run build` passes with no errors

### Phase 7 — API Input Validation & Error Handling (spec 13-validation-errors.md)

- ✅ Created `handleError()` utility in `lib/api.ts` — unified error handler for Zod validation and other errors
- ✅ Added `profileSchema` to `lib/validation.ts` for username validation on profile updates
- ✅ Refactored all 14 API routes to use single outer try/catch with Zod `.parse()` instead of `.safeParse()`
  - Auth routes: login, register, change-password, me, profile, refresh, logout
  - Termine routes: GET/POST list, GET/PUT/DELETE detail (added full Zod validation, removed manual checks)
  - Members routes: GET/POST list, GET/PUT/DELETE detail
  - Berichte routes: GET/POST list, GET/PUT/DELETE detail
- ✅ All validation errors return 400 with structured `{ success: false, error, details }` response
- ✅ Removed nested JSON try/catch blocks — single catch handler processes all errors
- ✅ All HTTP status codes correct: 201 for creation, 400/401/403/404 for errors, 500 for server errors
- ✅ No sensitive error details leaked
- ✅ `npm run build` passes with no errors

### Phase 8 — Member Management Bug Fix

- ✅ Fixed member form state reset issue — form now properly resets when opening/closing dialog or switching between members
- ✅ Added field-specific validation error display — errors from API are now shown below each field with red border highlight
- ✅ Added `useEffect` hook to reset form state when dialog opens/closes or `member.id` changes
- ✅ Improved error handling to parse and display validation details from API responses
- ✅ Form clears field errors when user starts typing (better UX)
- ✅ `npm run build` passes with no errors

## In Progress

- None

## Next Up

**Phase 4: Public Pages & Layout** (continued)
1. ✅ Create `app/(public)/berichte/page.tsx` + `[id]/page.tsx`
2. ✅ Create `app/(public)/termine/page.tsx` + `[id]/page.tsx`
3. ✅ Create `app/grundausbildung/andreas/page.tsx` + `app/grundausbildung/maik/page.tsx`
4. Create placeholder pages: links, grundausbildung, verein, impressum, datenschutz, kontakt

## Open Questions

- Should berichte and termine be sortable/filterable on the public pages? → TBD

## Architecture Decisions

- **Authentication**: JWT with HTTP-only cookies (stateless, scalable)
- **Passwords**: Bcrypt with cost 12 (secure standard)
- **Authorization**: ABAC (Attribute-Based Access Control) with 4 roles
- **Theme**: Light/Dark mode — `.dark` class toggled on `<html>`, stored in localStorage, blocking script prevents flash
- **Styling**: CSS custom properties with shadcn token conventions (see `code-standards.md` for class name mapping)
- **shadcn/ui**: Tailwind v4 mode — no `tailwind.config.js`, uses `@theme inline` in `globals.css`
- **Database**: PostgreSQL with Prisma ORM (type-safe, migrations)
- **Public Pages**: No authentication required (good for SEO)
- **Protected Pages**: JWT validation via middleware, role checks in handlers

## Session Notes

- Next.js version: 16.2.4 (uses `proxy.ts` instead of `middleware.ts`)
- React: 19.2.4
- Tailwind: v4 (no config file, PostCSS plugin only)
- shadcn/ui init auto-detected Tailwind v4 and wrote correct `globals.css` structure
- Tailwind class naming: uses shadcn conventions (`bg-background`, `text-foreground`, etc.) — `code-standards.md` updated to reflect this
- **Database connection:** host `192.168.178.43:5432`, db `ath_db`, user `ath_user` — full `DATABASE_URL` in `.env` (not committed)
- **Prisma v7 breaking changes:**
  - `prisma.config.ts` replaces datasource URL in `schema.prisma`
  - `PrismaClient` requires either `adapter` (Driver Adapter) or `accelerateUrl` — no more `DATABASE_URL` auto-read
  - Client generates to `lib/generated/prisma/` — import from `./generated/prisma/client`
  - Use `@prisma/adapter-pg` + `pg` for direct PostgreSQL connections
