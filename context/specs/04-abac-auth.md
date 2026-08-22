# 04 ABAC Authorization & Middleware

## Goal

Implement Attribute-Based Access Control (ABAC) to enforce role-based permissions across all protected routes.

## Permission Matrix

| Action | User | Publisher | Manager | Admin |
|--------|------|-----------|---------|-------|
| View Members | ✓ | ✓ | ✓ | ✓ |
| Edit Members | ✗ | ✗ | ✓ | ✓ |
| Delete Members | ✗ | ✗ | ✓ | ✓ |
| Add Members | ✗ | ✗ | ✓ | ✓ |
| Publish Berichte | ✗ | ✓ | ✓ | ✓ |
| Edit Own Berichte | ✗ | ✓ | ✓ | ✓ |
| Delete Own Berichte | ✗ | ✓ | ✓ | ✓ |
| Publish Termine | ✗ | ✓ | ✓ | ✓ |
| Edit Own Termine | ✗ | ✓ | ✓ | ✓ |
| Delete Own Termine | ✗ | ✓ | ✓ | ✓ |
| Manage Users | ✗ | ✗ | ✗ | ✓ |
| View Intern Area | ✓ | ✓ | ✓ | ✓ |

## Implementation

Create `lib/abac.ts` with permission checking functions:

```typescript
export type Role = 'user' | 'publisher' | 'manager' | 'admin';

export const canViewMembers = (role: Role): boolean => role !== 'guest';
export const canEditMembers = (role: Role): boolean => ['manager', 'admin'].includes(role);
export const canPublishContent = (role: Role): boolean => ['publisher', 'manager', 'admin'].includes(role);
export const canManageUsers = (role: Role): boolean => role === 'admin';

// For resource-level checks (e.g., can edit own bericht)
export const canEditResource = (userId: string, resourceOwnerId: string, role: Role): boolean => {
  return userId === resourceOwnerId || role === 'admin';
};
```

## Middleware

Create `proxy.ts` at project root to verify JWT on all protected routes:

```typescript
// Checks for valid JWT in cookies
// If invalid/missing and route is protected → redirect to /intern
// If valid → attach user to request context
// Public routes: /, /berichte, /termine, /links, /grundausbildung, /verein, /intern/login
```

Protected routes:
- `/api/members/*` (all CRUD operations)
- `/api/berichte/*` (all CRUD operations)
- `/api/termine/*` (all CRUD operations)
- `/api/users/*` (admin only)
- `/intern/*` (except /intern/login, /intern/register)

## Route Protection Example

```typescript
// POST /api/members (manager+ only)
export async function POST(request: Request) {
  const user = await getAuthUser(request);
  
  if (!canEditMembers(user.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  const data = await request.json();
  // ... create member
}
```

## Check When Done

- ✅ `lib/abac.ts` defines all permission checks
- ✅ `proxy.ts` verifies JWT on protected routes
- ✅ Public routes are accessible without JWT
- ✅ API routes enforce role checks before mutations
- ✅ Unauthenticated requests to protected routes receive 401
- ✅ Requests with insufficient role receive 403
- ✅ `npm run build` passes
