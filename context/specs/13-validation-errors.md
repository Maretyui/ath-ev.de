# 13 API Input Validation & Error Handling

## Goal

Implement robust input validation and consistent error handling across all API routes.

## Validation Library

Use Zod for type-safe input validation:
- Define schemas for all request bodies
- Validate before processing
- Return 400 with descriptive error messages on invalid input

## Common Validation Schemas

### Email Validation
```typescript
const emailSchema = z.string().email('Invalid email format');
```

### Password Validation
```typescript
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[0-9]/, 'Password must contain number');
```

### Member Schema
```typescript
const memberSchema = z.object({
  name: z.string().min(1, 'Name required'),
  street: z.string().optional(),
  plz: z.string().optional(),
  ort: z.string().optional(),
  telefon: z.string().optional(),
  email: z.string().email().optional(),
  geburtstag: z.string().datetime().optional(),
  jugend: z.boolean().optional(),
});
```

### Bericht Schema
```typescript
const berichtSchema = z.object({
  title: z.string().min(1, 'Title required').max(200),
  content: z.string().min(1, 'Content required'),
  image: z.string().url().optional(),
});
```

### Termin Schema
```typescript
const terminSchema = z.object({
  title: z.string().min(1, 'Title required').max(200),
  date: z.string().datetime('Invalid date format'),
  time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  location: z.string().min(1, 'Location required'),
  description: z.string().optional(),
  image: z.string().url().optional(),
});
```

## Error Response Format

All API errors return consistent JSON:
```typescript
{
  success: false,
  error: "User-friendly error message",
  details?: { field: "error message" } // for validation errors
}
```

HTTP Status Codes:
- `200` — OK
- `201` — Created
- `400` — Bad Request (validation error)
- `401` — Unauthorized (missing/invalid JWT)
- `403` — Forbidden (insufficient permissions)
- `404` — Not Found
- `500` — Server Error

## Route Handler Pattern

```typescript
export async function POST(request: Request) {
  try {
    // 1. Verify auth
    const user = await getAuthUser(request);
    if (!user) return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // 2. Check permissions
    if (!canPublishContent(user.role)) {
      return Response.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    // 3. Parse and validate input
    const body = await request.json();
    const data = berichtSchema.parse(body);

    // 4. Process logic
    const bericht = await prisma.bericht.create({
      data: { ...data, publisherId: user.id },
    });

    // 5. Return success
    return Response.json({ success: true, data: bericht }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({
        success: false,
        error: 'Validation error',
        details: error.flatten().fieldErrors,
      }, { status: 400 });
    }
    return Response.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
```

## Check When Done

- ✅ All API routes use Zod schemas for validation
- ✅ Invalid input returns 400 with descriptive error
- ✅ All error responses follow consistent format
- ✅ HTTP status codes are correct (401, 403, etc.)
- ✅ No sensitive error details leaked (e.g., database errors)
- ✅ Validation schemas prevent SQL injection
- ✅ Email format validated properly
- ✅ Password strength enforced
- ✅ Date/time formats validated
- ✅ `npm run build` passes
