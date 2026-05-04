# Code Standards - ATH Website

## General Principles

- Keep modules small and single-purpose
- Fix root causes — do not layer workarounds
- Do not mix unrelated concerns in one component or file
- Respect the system boundaries defined in `architecture-context.md`
- Use semantic HTML and accessible patterns

## TypeScript

- **Strict mode required** throughout the project
- **Avoid `any`** — use explicit types or interfaces
- **Validate all external input** at system boundaries before trusting
- **Use `interface` for object contracts**
- **Use `type` for unions, intersections, and primitives**

## Next.js & React

- **Default to React Server Components** (RSC)
- **Add `"use client"` only for:**
  - Client-side hooks (useState, useEffect, useContext)
  - Real-time state and interactivity
  - Event handlers
- **Keep route handlers focused** on single responsibility
- **Long-running work belongs in background jobs**, not request handlers
- **Organize routes clearly:**
  - `app/api/auth/` for authentication
  - `app/api/members/` for member CRUD
  - `app/api/berichte/` for article CRUD
  - `app/api/termine/` for event CRUD

## Styling

- **Use CSS custom properties** defined in `globals.css` only
- **Never use raw Tailwind classes** like `zinc-500` or hardcoded hex values
- **Reference tokens through semantic Tailwind utility names** (all backed by CSS variables):

  | Purpose | Tailwind class | CSS variable |
  |---------|---------------|--------------|
  | Page background | `bg-background` | `--background` |
  | Card / surface | `bg-card` | `--card` |
  | Body text | `text-foreground` | `--foreground` |
  | Secondary text | `text-muted-foreground` | `--muted-foreground` |
  | Default border | `border-border` | `--border` |
  | Brand / links / CTAs | `text-primary`, `bg-primary` | `--primary` |
  | Brand secondary accent | `bg-brand-secondary`, `text-brand-secondary` | `--brand-secondary` |
  | Brand tertiary (success) | `text-brand-tertiary` | `--brand-tertiary` |
  | Error state | `text-state-error`, `bg-state-error` | `--state-error` |
  | Success state | `text-state-success` | `--state-success` |
  | Warning state | `text-state-warning` | `--state-warning` |

- **Maintain border radius scale:**
  - `rounded-md` for small UI elements (6px)
  - `rounded-lg` for cards/panels (8px)
  - `rounded-xl` for modals/overlays (12px)
- **Responsive design:** use Tailwind breakpoints (`sm:`, `md:`, `lg:`, etc.)

## Components

- **Keep components small and reusable**
- **Props must have explicit types** (no `any`)
- **Use shadcn/ui components** as building blocks, add custom styling via wrapper components
- **Do not modify shadcn/ui components** — create wrappers instead
- **Component file structure:**
  - `components/ui/` — shadcn/ui foundation components only
  - `components/` — project-specific components
  - `components/layout/` — navbar, footer, page templates
  - `components/forms/` — form components with validation

## API Routes

- **Validate and parse all input** before any logic runs
- **Enforce authentication checks** before any mutation
- **Check authorization (role/permission)** after authentication
- **Return consistent response shapes:**
  ```typescript
  // Success
  { success: true, data: { ...} }
  // Error
  { success: false, error: string }
  ```
- **Use proper HTTP status codes:**
  - `200` — OK
  - `201` — Created
  - `400` — Bad Request
  - `401` — Unauthorized (missing/invalid JWT)
  - `403` — Forbidden (authenticated but lacks permission)
  - `404` — Not Found
  - `500` — Server Error

## Database & Prisma

- **Use Prisma ORM** for all database access
- **Define schema in `prisma/schema.prisma`** with clear relationships
- **Run migrations** before each schema change: `npx prisma migrate dev`
- **Use transactions** for multi-step operations:
  ```typescript
  await prisma.$transaction([
    prisma.user.update(...),
    prisma.member.create(...),
  ])
  ```
- **Avoid N+1 queries** — use `include` or `select` for related data

## Authentication & Authorization

- **JWT tokens contain:** userId, email, role, expiresAt (15 min)
- **Refresh tokens stored** in HTTP-only cookies (7 days)
- **Passwords hashed with bcrypt** (cost: 12)
- **All mutations verify JWT** via middleware before route handler executes
- **ABAC checks performed** in route handlers after auth verification

## File Organization

```
app/
├── api/
│   ├── auth/              # login, logout, register, change-password
│   ├── members/           # member CRUD (role-protected)
│   ├── berichte/          # article CRUD (publisher+ only)
│   ├── termine/           # event CRUD (publisher+ only)
│   └── middleware.ts      # JWT validation wrapper
├── (public)/
│   ├── page.tsx           # landing page
│   ├── berichte/          # articles list & detail
│   ├── termine/           # events list & detail
│   ├── links/             # placeholder
│   ├── grundausbildung/   # trainer pages
│   ├── verein/            # verein placeholder pages
│   └── intern/            # member area (login required)
├── layout.tsx             # root layout with navbar/footer
└── globals.css            # CSS custom properties & tailwind config

components/
├── layout/
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── page-container.tsx
├── forms/
│   ├── login-form.tsx
│   └── member-form.tsx
├── tables/
│   └── member-table.tsx
├── ui/                    # shadcn/ui only — do not modify
├── berichte/
│   └── article-card.tsx
└── termine/
   └── event-card.tsx

lib/
├── prisma.ts              # Prisma client singleton
├── auth.ts                # JWT creation, verification
├── abac.ts                # ABAC helper functions
├── types.ts               # TypeScript type definitions
└── validation.ts          # Zod schemas for input validation

prisma/
├── schema.prisma
└── migrations/

public/
└── images/               # Static assets (placeholders during dev)
```

## Comments

- **Only comment when clarifying non-obvious logic**
- **Avoid comments that repeat the code**
- **Keep comments brief and up-to-date**

Example (bad):
```typescript
// increment i
i++
```

Example (good):
```typescript
// Batch process in chunks of 50 to avoid memory overhead
for (let i = 0; i < items.length; i += 50) {
  // ...
}
```
