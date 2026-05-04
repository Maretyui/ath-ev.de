# 14 Static Pages (Impressum, Datenschutzerklärung, Kontakt)

## Goal

Create three static placeholder pages for legal information and contact.

## Routes & Pages

### `/impressum` — Impressum (Legal Notice)
- Title: "Impressum"
- Placeholder content with typical sections:
  - Angaben gemäß § 5 TMG
  - Adresse
  - Kontakt
  - Responsible for content
  - Liability notice
- Font: 14px
- Link in footer

### `/datenschutzerklärung` — Privacy Policy
- Title: "Datenschutzerklärung"
- Placeholder content with typical sections:
  - Datenschutz auf einen Blick
  - General information about data collection
  - User rights
  - Cookie policy (simple)
- Font: 14px
- Link in footer

### `/kontakt` — Contact Page
- Title: "Kontakt"
- Contact information:
  - Address
  - Phone number
  - Email address
- Contact form (simple):
  - Name (text input)
  - Email (email input)
  - Message (textarea)
  - Submit button
  - On submit: store in database or email (optional for now)
- Font: 16px for form, 14px for info

## Styling

- Max-width container: 900px
- Padding: 48px top/bottom, 32px left/right
- Text alignment: left
- Headings: 32px (H1), 24px (H2)
- Paragraphs: 14px, line-height 1.6
- Spacing between sections: 24px
- All colors use CSS variables (light/dark mode)

## Content

- Use Lorem Ipsum placeholder text for legal pages
- Real contact info can be added later
- Contact form is optional (can submit to /dev/null for now)

## Check When Done

- ✅ `/impressum` accessible and renders correctly
- ✅ `/datenschutzerklärung` accessible and renders correctly
- ✅ `/kontakt` accessible with form
- ✅ Links in footer work correctly
- ✅ Light/dark mode works on all pages
- ✅ Pages are responsive on mobile/tablet/desktop
- ✅ No console errors
- ✅ `npm run build` passes
