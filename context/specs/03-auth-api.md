# 03 Authentication API Routes

## Goal

Implement JWT-based authentication with email/password login, secure token management, and encrypted password storage.

## Routes

### POST /api/auth/login
- Input: `{ email: string, password: string }`
- Validates email format
- Finds user by email in database
- Verifies bcrypt password hash
- On success: issues JWT (15 min expiry) + Refresh token (7 day expiry)
- Returns: `{ success: true, user: { id, email, role } }`
- Stores Refresh token in HTTP-only cookie `refreshToken`
- Stores JWT in HTTP-only cookie `authToken`
- On failure (invalid email/password): returns `{ success: false, error: "Invalid credentials" }` with 401

### POST /api/auth/register
- Input: `{ email: string, password: string }`
- Validates email format and password strength (min 8 chars, 1 uppercase, 1 number)
- Checks if user already exists
- Hashes password with bcrypt (cost: 12)
- Creates user with role `user` by default
- Issues JWT and Refresh tokens (same as login)
- Returns: `{ success: true, user: { id, email, role } }`
- On failure: returns appropriate error with 400

### POST /api/auth/logout
- Clears `authToken` and `refreshToken` cookies
- Returns: `{ success: true }`

### POST /api/auth/refresh
- Validates Refresh token from cookie
- If valid: issues new JWT (15 min)
- Returns: `{ success: true, user: { id, email, role } }`
- On failure: returns 401, user must re-login

### POST /api/auth/change-password
- Requires valid JWT in cookie
- Input: `{ currentPassword: string, newPassword: string }`
- Validates current password
- Hashes new password with bcrypt
- Updates user record
- Returns: `{ success: true }`

## Security

- All passwords hashed with bcrypt (cost: 12)
- JWT signed with `JWT_SECRET` environment variable
- Tokens stored in HTTP-only cookies (not accessible via JavaScript)
- Input validation using Zod schemas
- Rate limiting on login/register endpoints (optional, future enhancement)

## Middleware

Create `lib/auth.ts`:
- `verifyToken(token: string)` — validates JWT signature and expiry
- `createTokens(userId, email, role)` — creates JWT and Refresh token
- `hashPassword(password)` — bcrypt hash
- `verifyPassword(password, hash)` — bcrypt comparison

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Secret for signing JWTs (min 32 chars)
- `JWT_EXPIRY` — JWT expiry time (default: 900 = 15 min)
- `REFRESH_EXPIRY` — Refresh token expiry time (default: 604800 = 7 days)

## Check When Done

- ✅ Login/register routes validate input
- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens issued and stored in HTTP-only cookies
- ✅ Refresh token mechanism works
- ✅ Password change requires current password verification
- ✅ All routes return consistent JSON responses
- ✅ No plain-text passwords in logs or responses
- ✅ `npm run build` passes
