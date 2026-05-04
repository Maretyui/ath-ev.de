# 07 Berichte (Articles) Pages

## Goal

Create article listing and detail pages with markdown formatting, publication metadata, and image support.

## Routes & Pages

### `/berichte` — Article List
- Grid or list layout showing all published Berichte
- Each card displays:
  - Thumbnail image (400x300px, cover)
  - Title (2 lines max, truncated)
  - Publication date (14px, secondary text)
  - Author/Publisher name (14px, secondary text)
  - 100-character excerpt from content
- Sorting: by publishedAt DESC (newest first)
- Pagination: 12 articles per page (optional, can be infinite scroll)
- Responsive: 3 columns on desktop, 1-2 on mobile
- Click card → navigate to `/berichte/[id]`

### `/berichte/[id]` — Article Detail
- Full-width content section (max 900px)
- Header:
  - Large image (100% width, max-height 500px)
  - Title (40px, bold)
  - Meta: publication date + author name (14px, secondary)
  - Horizontal divider
- Body:
  - Markdown content (parsed to HTML):
    - **bold** (`<strong>`)
    - *italic* (`<em>`)
    - <u>underline</u> (`<u>`)
    - # H1, ## H2, ### H3, #### H4
    - Links, lists, code blocks
  - Font: 16px, line-height 1.6, `text-primary`
  - Images inline: max-width 100%, height auto
- Footer: Related articles (2-3 most recent others)

## API Routes

### GET /api/berichte
- Returns all published Berichte (paginated, 12 per page)
- Query params: `page`, `limit`
- Response: `{ success: true, data: [], total: number }`

### GET /api/berichte/[id]
- Returns single article by ID
- Response: `{ success: true, data: { ... } }`

### POST /api/berichte (publisher+ only)
- Input: `{ title, content, image }`
- Creates new Bericht with publisherId = authenticated user ID
- Sets publishedAt to current timestamp
- Returns: `{ success: true, data: { id, ... } }`

### PUT /api/berichte/[id] (publisher/owner or admin only)
- Updates article (title, content, image)
- Only article author or admin can update
- Returns: `{ success: true, data: { ... } }`

### DELETE /api/berichte/[id] (publisher/owner or admin only)
- Deletes article
- Only article author or admin can delete
- Returns: `{ success: true }`

## Markdown Processing

Use a markdown library (e.g., `markdown-it` or `remark` + `rehype`):
- Parse markdown to HTML
- Sanitize HTML (prevent XSS)
- Support: bold, italic, underline, headings, links, lists, code
- Do NOT support: HTML injection, script tags, iframes

## Image Handling

- `image` field stores full URL (from uploader)
- Display as-is, no processing needed
- Use placeholder service for test data (picsum.photos)

## Check When Done

- ✅ `/berichte` shows list of all articles
- ✅ Articles sorted by publication date (newest first)
- ✅ Card layout responsive on mobile/desktop
- ✅ Clicking article navigates to `/berichte/[id]`
- ✅ Article detail page displays full content with metadata
- ✅ Markdown formatting (bold, italic, underline, headings) renders correctly
- ✅ Images display correctly
- ✅ Publisher can create/edit/delete own articles
- ✅ API routes enforce permission checks
- ✅ No XSS vulnerabilities in markdown rendering
- ✅ `npm run build` passes
