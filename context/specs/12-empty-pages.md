# 12 Empty Placeholder Pages

## Goal

Create empty placeholder pages for Links and Verein pages that can be expanded later.

## Routes & Pages

### `/links` — Links Page
- Simple page with:
  - Title: "Links" (32px, bold)
  - Description: "Diese Seite wird in Kürze aktualisiert." (16px, secondary text)
  - Maybe: placeholder grid for future link cards
- No content required
- Appears in navbar

### `/verein` — Verein Landing (parent page, no direct nav)
- Can redirect to `/verein/geschichte` or show overview
- Simple title: "Verein" + description

### `/verein/geschichte` — Verein History
- Title: "Geschichte"
- Placeholder content: Lorem Ipsum
- Empty structure for future text

### `/verein/vorstand` — Verein Leadership
- Title: "Vorstand"
- Placeholder content: Lorem Ipsum
- Empty table structure for board members

### `/verein/satzung` — Statutes
- Title: "Satzung"
- Placeholder content or link to download PDF (not implemented yet)

### `/verein/geschaeftsordnung` — Business Regulations
- Title: "Geschäftsordnung"
- Placeholder content or link to download PDF (not implemented yet)

## Styling

All placeholder pages use standard layout:
- Page title (32px, bold, centered or left-aligned)
- Description text (16px, `text-secondary`, centered or left-aligned)
- Centered in container, max-width 900px
- Padding: 48px top/bottom, 32px left/right

## Check When Done

- ✅ All pages render without errors
- ✅ Pages are accessible from navbar dropdowns
- ✅ Placeholder text displays
- ✅ Links work correctly
- ✅ Light/dark mode works
- ✅ `npm run build` passes
