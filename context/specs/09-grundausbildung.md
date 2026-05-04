# 09 Grundausbildung Pages

## Goal

Create trainer profile pages (Andreas & Maik) with photos, qualifications, and descriptions.

## Routes & Pages

### `/grundausbildung/andreas` — Andreas Profile
### `/grundausbildung/maik` — Maik Profile

Each page contains:

- **Header Section**:
  - Large image of trainer (400x500px, cover, positioned left on desktop)
  - Text section on right (desktop) or below (mobile):
    - Trainer name as H1 (32px)
    - Title/role (18px, secondary text)

- **Qualifications Section**:
  - Subheading: "Qualifikationen" (24px)
  - Bulleted list of certifications/qualifications:
    - CMAS/DTSA***
    - ÜL/Trainer C (VDST)
    - NAS II
    - etc. (from provided content)
  - Font: 16px, list styling

- **Description Section**:
  - Subheading: "Über [Name]" (24px)
  - Multi-paragraph description (from provided content)
  - Font: 16px, line-height 1.6, `text-primary`
  - May include:
    - Professional background
    - Teaching philosophy
    - Motto/quote

- **CTA Button** (optional):
  - "Kontakt" → links to contact form
  - Or "Buchung" if training sessions available

## Styling

- Responsive: image left/text right on desktop (2-column)
- On mobile: image full-width, text below
- Image rounded: `rounded-lg` (8px)
- Padding: 48px top/bottom, 32px left/right
- Max-width container: 1200px
- Spacing between sections: 48px

## Content

- **Andreas**: Photo + bio + qualifications (from provided content)
- **Maik**: Photo + bio + qualifications (from provided content)
- Use placeholder images if real photos not available (picsum.photos)

## Check When Done

- ✅ `/grundausbildung/andreas` displays correctly
- ✅ `/grundausbildung/maik` displays correctly
- ✅ Trainer images display properly (rounded corners)
- ✅ Qualifications list formats correctly
- ✅ Description text renders with proper spacing
- ✅ Responsive layout on mobile/tablet/desktop
- ✅ All colors use CSS variables (light/dark mode works)
- ✅ Links/CTAs are clickable
- ✅ `npm run build` passes
