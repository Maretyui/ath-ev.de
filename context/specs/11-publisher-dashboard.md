# 11 Publisher Dashboard

## Goal

Create a content management dashboard for publishers to upload, edit, and delete Berichte and Termine.

## Routes & Pages

### `/intern/dashboard` — Publisher Dashboard (publisher+ only)

Dashboard layout with two tabs:

#### Tab 1: Berichte Management
- **Upload Section**:
  - Form with fields:
    - Title (text input, required)
    - Content (textarea with markdown support, required)
    - Image (file input or URL paste, optional)
  - Submit → POST /api/berichte
  - On success: clear form, add to list
  - On failure: show error message

- **Articles List**:
  - Table of user's published articles:
    - Title (clickable → navigate to article detail)
    - Publication date
    - Status (published)
    - Actions: Edit, Delete
  - Edit → opens modal with form (same as upload)
  - Delete → confirmation dialog, then DELETE /api/berichte/[id]
  - Sorting: by date DESC (newest first)
  - Pagination or infinite scroll

#### Tab 2: Termine Management
- **Upload Section**:
  - Form with fields:
    - Title (text input, required)
    - Date (date picker, required)
    - Time (time picker, required)
    - Location (text input, required)
    - Description (textarea with markdown, optional)
    - Image (file input or URL paste, optional)
  - Submit → POST /api/termine
  - On success: clear form, add to list
  - On failure: show error message

- **Events List**:
  - Table of user's published events:
    - Title (clickable → navigate to event detail)
    - Date
    - Time
    - Location
    - Actions: Edit, Delete
  - Edit → opens modal with form
  - Delete → confirmation dialog, then DELETE /api/termine/[id]
  - Sorting: by date ASC (upcoming first)

## UI Components

- **Tab Navigation**: Use shadcn/ui Tabs component
- **Modal Form**: Use shadcn/ui Dialog component
- **File Upload**: Use HTML file input or external uploader
- **Date/Time Picker**: shadcn/ui date picker
- **Markdown Editor**: Simple textarea or Monaco editor (optional)

## Access Control

- Publishers can see and manage only their own content
- Managers and admins can see/manage all content
- Only content owners or admins can delete

## Check When Done

- ✅ `/intern/dashboard` accessible to publisher+ only
- ✅ Regular users see 403 error
- ✅ Upload form validates input
- ✅ Berichte tab shows user's articles
- ✅ Termine tab shows user's events
- ✅ Edit functionality works
- ✅ Delete with confirmation works
- ✅ Form clears on successful submit
- ✅ Error messages display on failure
- ✅ API routes enforce permission checks (owner/admin only)
- ✅ Pagination works if implemented
- ✅ `npm run build` passes
