# Architecture Context - ATH Website

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Next.js 15+ (App Router) + TypeScript | Full-stack app with server/client boundaries |
| UI | Tailwind CSS + shadcn/ui | Component styling and composition |
| Auth | JWT with HTTP-only cookies | Stateless authentication and session management |
| Database | Prisma ORM + PostgreSQL | Users, roles, members, berichte, termine |
| Real-time | (none needed - static site for now) | Future enhancement for collaboration |
| Image Storage | Placeholder service (picsum.photos) | All imagery during development |

## System Boundaries

```
app/
├── api/              # Authenticated request handlers
│   ├── auth/         # login, logout, register, change-password
│   ├── members/      # CRUD for member table (role-protected)
│   ├── berichte/     # CRUD for articles (publisher+ roles)
│   └── termine/      # CRUD for events (publisher+ roles)
├── (public)/         # Public pages with navbar/footer
│   ├── page.tsx      # Landing
│   ├── berichte/     # Articles list & detail
│   ├── termine/      # Events list & detail
│   ├── links/        # Empty placeholder
│   ├── grundausbildung/  # Trainer profiles
│   ├── verein/       # Verein subpages
│   └── intern/       # Login page & member area
├── components/       # Reusable UI
│   ├── navbar.tsx    # Sticky top navigation
│   ├── footer.tsx    # Bottom footer with upcoming events
│   └── ui/           # shadcn/ui components
├── lib/              # Shared infrastructure
│   ├── prisma.ts     # Prisma client
│   ├── auth.ts       # JWT verification, token creation
│   ├── abac.ts       # Attribute-based access control helpers
│   └── types.ts      # Type definitions (roles, permissions)
└── middleware.ts     # JWT validation for protected routes

prisma/
├── schema.prisma     # Data model (User, Member, Berichte, Termine)
└── migrations/       # Database schema versions

public/
└── images/           # Static images & placeholders
```

## Storage Model

**PostgreSQL (Prisma)**:
- `User`: id, email, password (bcrypt), role, createdAt
- `Member`: id, name, street, plz, ort, telefon, email, geburtstag, jugend, createdBy, updatedAt
- `Bericht`: id, title, content (markdown), image (URL), publisherId, publishedAt, updatedAt
- `Termin`: id, title, date, time, location, description, image (URL), createdAt
- `Role`: defines ABAC permissions (admin, manager, publisher, user)

**Static Assets**:
- Images stored via placeholder service (picsum.photos) — URLs only in database

## Auth and Access Model

### Authentication
- Users login with **email + password** (no social auth)
- Passwords stored with **bcrypt** (cost: 12)
- JWT token issued on successful login → stored in **HTTP-only cookie**
- Token contains: userId, email, role, expiresAt
- Token verified on every protected route via middleware

### Authorization (ABAC)
- Every API route checks JWT token and validates user role
- Permissions matrix in `lib/abac.ts` defines what each role can do
- Examples:
  - `canViewMembers`: user, publisher, manager, admin
  - `canEditMembers`: manager, admin
  - `canPublishContent`: publisher, manager, admin
  - `canDeleteContent`: publisher, manager, admin
  - `canManageUsers`: admin only

## API Routes - Security

All routes (except login/register) require:
1. Valid JWT in HTTP-only cookie
2. Role check via ABAC helper
3. Input validation (zod schemas)
4. Ownership/permission check before mutation

Example:
```typescript
// POST /api/berichte (publisher+ only)
const user = await verifyAuth(request);
if (!hasPermission(user.role, 'publishContent')) {
  return Response.json({ error: 'Forbidden' }, { status: 403 });
}
// ... validate input, create record
```

## Page Layout

### Public Pages
- Navbar (sticky) → Page Content → Footer
- No authentication required
- Server-side rendered

### Protected Pages
- Navbar → Login (redirect if no JWT) → Member Area / Dashboard → Footer
- Client-side redirects unauthenticated users to login
- JWT verified server-side before any data returned

## Invariants

1. **No unauthenticated access to member data** — member table requires login
2. **JWT validation on every API call** — no exceptions
3. **Role-based permissions enforce ABAC** — not just login checks
4. **Passwords never stored in plain text** — bcrypt only
5. **All user mutations logged** — who changed what, when
6. **Public pages work without login** — SEO and accessibility
7. **HTTP-only cookies prevent XSS** — no JavaScript can access tokens
8. **Database queries validated** — no SQL injection risks (Prisma protects)
9. **CORS disabled for same-origin** — API only serves own domain
10. **Rate limiting on auth endpoints** — prevent brute force (future enhancement)
