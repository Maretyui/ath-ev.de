# 08 Termine (Events) Pages

## Goal

Create event listing and detail pages with date/time/location information and optional descriptions.

## Routes & Pages

### `/termine` — Event List
- Grid or list layout showing all published Termine
- Sorted by date ASC (upcoming first, then past)
- Each card displays:
  - Thumbnail image (400x300px, cover) optional
  - Title (2 lines max, truncated)
  - Date (MM.DD.YYYY format, bold)
  - Time (HH:MM format)
  - Location (city/venue name, 1 line)
- Filter/Sort options (optional):
  - Upcoming vs Past events
  - By location or category
- Responsive: 3 columns desktop, 1-2 mobile
- Click card → navigate to `/termine/[id]`

### `/termine/[id]` — Event Detail
- Full-width content section (max 900px)
- Header:
  - Large image (100% width, max-height 500px) if present
  - Title (40px, bold)
  - Meta: Date (large), Time, Location (each on own line, 18px)
  - Horizontal divider
- Body:
  - Description (optional, markdown format similar to Berichte):
    - **bold**, *italic*, underline, headings
    - Links, lists
  - Font: 16px, line-height 1.6, `text-primary`
  - Images inline: max-width 100%, height auto
- Footer: Related events (2-3 next upcoming events)

## API Routes

### GET /api/termine
- Returns all published Termine (paginated, 12 per page)
- Sorted by date ASC
- Query params: `page`, `limit`, `upcoming` (boolean)
- Response: `{ success: true, data: [], total: number }`

### GET /api/termine/[id]
- Returns single event by ID
- Response: `{ success: true, data: { ... } }`

### GET /api/termine/upcoming
- Returns next 4 upcoming Termine (for footer)
- No pagination
- Response: `{ success: true, data: [] }`

### POST /api/termine (publisher+ only)
- Input: `{ title, date, time, location, description, image }`
- Creates new Termin
- Returns: `{ success: true, data: { id, ... } }`

### PUT /api/termine/[id] (publisher/owner or admin only)
- Updates event (all fields)
- Only event creator or admin can update
- Returns: `{ success: true, data: { ... } }`

### DELETE /api/termine/[id] (publisher/owner or admin only)
- Deletes event
- Only event creator or admin can delete
- Returns: `{ success: true }`

## Data Format

- **date**: ISO 8601 (YYYY-MM-DD)
- **time**: 24-hour format (HH:MM)
- **location**: free text (e.g., "Hamburg, Elbe")
- **description**: optional markdown content
- **image**: optional URL

## Markdown Processing

Same as Berichte:
- Use markdown library (markdown-it or remark + rehype)
- Support: bold, italic, underline, headings, links, lists, code
- Sanitize HTML to prevent XSS

## Footer Integration

Footer component queries `/api/termine/upcoming` and displays next 4 events with links to detail pages.

## Check When Done

- ✅ `/termine` shows list of all events
- ✅ Events sorted by date (upcoming first)
- ✅ Card layout responsive on mobile/desktop
- ✅ Clicking event navigates to `/termine/[id]`
- ✅ Event detail page displays date, time, location, description
- ✅ Markdown formatting (if description present) renders correctly
- ✅ Images display correctly
- ✅ Publisher can create/edit/delete own events
- ✅ Footer shows next 4 upcoming Termine
- ✅ API routes enforce permission checks
- ✅ No XSS vulnerabilities in markdown rendering
- ✅ `npm run build` passes
