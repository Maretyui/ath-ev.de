# 10 Member Management (Intern Pages)

## Goal

Create the member management dashboard accessible only to authenticated users, with CRUD operations restricted by role.

## Routes & Pages

### `/intern/login` — Login Page
- Email + password form
- Input validation: email format, password required
- Submit → POST /api/auth/login
- On success: redirect to `/intern/members`
- On failure: show error message (invalid credentials)
- Styling: centered form, 400px max-width, similar to design-system
- CTA: "Jetzt einloggen" button
- Footer link: "Passwort vergessen?" (placeholder for now)

### `/intern/members` — Member Table (authenticated only)
- Header:
  - Title: "Mitglieder" (32px)
  - Stats: "Total: X | Jugendliche: Y" (18px, secondary text)
- Member Table:
  - Columns: NAME, STRASSE, PLZ, ORT, TELEFON, EMAIL, GEBURTSTAG, JUGEND
  - Sortable by column click
  - Filterable by name/email (search box)
  - Responsive: horizontal scroll on mobile
  - Alternating row colors for readability
  - Row hover: subtle background color
- Permissions:
  - All authenticated users: can VIEW
  - Manager+: can EDIT (inline or modal form)
  - Manager+: can ADD (button + modal form)
  - Manager+: can DELETE (with confirmation dialog)
- Edit Form (manager+ only):
  - Modal dialog with form fields for all columns
  - DATE picker for GEBURTSTAG
  - Checkbox for JUGEND (checked = Ja, unchecked = empty)
  - Submit → PUT /api/members/[id]
  - Cancel button
- Add Form (manager+ only):
  - Same as edit form, but creates new member
  - Submit → POST /api/members
  - All fields required except GEBURTSTAG and JUGEND

### `/intern/change-password` — Password Change Page (authenticated only)
- Form with fields:
  - Current Password (hidden input)
  - New Password (hidden input)
  - Confirm New Password (hidden input)
- Validation:
  - Current password must match user's actual password
  - New password must be 8+ chars, 1 uppercase, 1 number
  - Confirm must match new password
- Submit → POST /api/auth/change-password
- On success: show success message, clear form
- On failure: show error message

## API Routes

### GET /api/members (authenticated only)
- Returns all members
- Query params: `search`, `sort`, `order`
- Response: `{ success: true, data: [], total: number }`

### GET /api/members/[id]
- Returns single member by ID
- Response: `{ success: true, data: { ... } }`

### POST /api/members (manager+ only)
- Input: `{ name, street, plz, ort, telefon, email, geburtstag, jugend }`
- Validation: name and email required, others optional
- Creates new member
- Returns: `{ success: true, data: { id, ... } }`

### PUT /api/members/[id] (manager+ only)
- Updates member fields
- Returns: `{ success: true, data: { ... } }`

### DELETE /api/members/[id] (manager+ only)
- Deletes member
- Returns: `{ success: true }`

## Authentication Check

All routes require valid JWT in cookie. If missing/invalid, redirect to `/intern/login`.

## Check When Done

- ✅ `/intern/login` form works, submits to API
- ✅ Valid credentials redirect to `/intern/members`
- ✅ Invalid credentials show error message
- ✅ `/intern/members` accessible only when authenticated
- ✅ Member table displays all columns correctly
- ✅ Unauthenticated access redirects to `/intern/login`
- ✅ Manager can CRUD members
- ✅ Regular user can VIEW only (no edit buttons visible)
- ✅ Admin can CRUD members
- ✅ Table stats (total, jugendliche count) correct
- ✅ Member count and jugendliche count in header accurate
- ✅ `/intern/change-password` works for authenticated users
- ✅ API routes enforce permission checks
- ✅ `npm run build` passes
