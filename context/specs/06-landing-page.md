# 06 Landing Page

## Goal

Create the landing page with hero section, welcome message, and call-to-action.

## Page Structure

### Hero Section (60vh height)
- Full-width background image (diving-related placeholder)
- Dark overlay (rgba(0,0,0, 0.4))
- Centered headline: "Willkommen bei ATH" (40px, bold, white text)
- Subheading: Tagline about diving instruction (20px, secondary text)
- CTA Button: "Mehr erfahren" or "Jetzt anmelden" (brand primary color)

### Welcome Message Section
- Max-width container (1200px)
- Padding: 48px (top/bottom), 32px (left/right)
- Headline: "Über uns" (32px, bold)
- Content: ~1500 character welcome text (from user)
- Text color: `text-primary`
- Line height: 1.6
- Font size: 16px

### Feature Sections (optional, if needed)
- Grundausbildung overview
- Member testimonial (Lorem Ipsum placeholder)
- Upcoming events preview (link to /termine)

### Call-to-Action Section (before footer)
- Background: `bg-surface` or subtle gradient
- Centered text: "Möchten Sie ein Mitglied werden?"
- Button: "Kontakt aufnehmen" → links to /verein/kontakt

## Styling

- Responsive: full-width on all devices
- Images: use placeholder service (picsum.photos)
- Spacing between sections: 48px (consistent)
- Button styling: see `components/ui/Button`

## Content

- Hero image: 1920x1080 placeholder or diving-related stock image
- Welcome text: provided by user (1500 chars)
- All other text: Lorem Ipsum placeholders

## Check When Done

- ✅ Landing page is accessible at `/`
- ✅ Hero section displays full-width with image
- ✅ Welcome message section renders correctly
- ✅ CTA buttons are clickable and link to correct pages
- ✅ Responsive on mobile/tablet/desktop
- ✅ All colors use CSS variables (light/dark mode works)
- ✅ No hardcoded text (except welcome from user)
- ✅ `npm run build` passes
