# UI Context - ATH Website

## Design System

**Target Audience**: Parents of children considering diving lessons  
**Vibe**: Welcoming, professional, colorful, trustworthy  
**Mode**: Light mode + Dark mode toggle in navbar

## Color Palette

### Light Mode
| Role | CSS Variable | Hex | Usage |
|------|--------------|-----|-------|
| Background | `--bg-base-light` | `#f5f5f7` | Page background |
| Surface | `--bg-surface-light` | `#ffffff` | Cards, containers |
| Text Primary | `--text-primary-light` | `#1a1a1a` | Body text |
| Text Secondary | `--text-secondary-light` | `#555555` | Metadata, secondary info |
| Border | `--border-light` | `#e0e0e0` | Component borders |
| Brand Primary | `--brand-primary` | `#0088cc` | Links, CTAs, highlights |
| Brand Secondary | `--brand-secondary` | `#ff6b35` | Accents, hover states |
| Brand Tertiary | `--brand-tertiary` | `#00c9a7` | Success states |
| Error | `--state-error` | `#d32f2f` | Error messages |
| Success | `--state-success` | `#388e3c` | Success messages |
| Warning | `--state-warning` | `#f57c00` | Warnings |

### Dark Mode
| Role | CSS Variable | Hex | Usage |
|------|--------------|-----|-------|
| Background | `--bg-base-dark` | `#0f0f0f` | Page background |
| Surface | `--bg-surface-dark` | `#1a1a1a` | Cards, containers |
| Text Primary | `--text-primary-dark` | `#f5f5f7` | Body text |
| Text Secondary | `--text-secondary-dark` | `#aaaaaa` | Metadata, secondary info |
| Border | `--border-dark` | `#2a2a2a` | Component borders |
| Brand Primary | `--brand-primary` | `#00c9ff` | Links, CTAs, highlights |
| Brand Secondary | `--brand-secondary` | `#ff8c42` | Accents, hover states |
| Brand Tertiary | `--brand-tertiary` | `#00e5b8` | Success states |
| Error | `--state-error` | `#ff5252` | Error messages |
| Success | `--state-success` | `#4caf50` | Success messages |
| Warning | `--state-warning` | `#ffa726` | Warnings |

### Implementation
- Define colors in `globals.css` as CSS custom properties
- Map to Tailwind tokens via `@theme inline`
- Components use semantic names: `bg-base`, `text-primary`, `border-default`, `text-brand`
- No hardcoded hex values or raw Tailwind classes

## Typography

| Role | Font | Weight | Size | CSS Variable |
|------|------|--------|------|--------------|
| Headings (H1/H2) | Geist Sans | 700 | 32px / 24px | `--font-geist-sans` |
| Headings (H3/H4) | Geist Sans | 600 | 20px / 16px | `--font-geist-sans` |
| Body Text | Geist Sans | 400 | 16px | `--font-geist-sans` |
| Metadata | Geist Sans | 400 | 14px | `--font-geist-sans` |
| Code / Mono | Geist Mono | 400 | 14px | `--font-geist-mono` |

- Loaded via `next/font/google`
- Applied as CSS variables on `<html>` element
- Base `body` uses Geist Sans with `antialiased`

## Spacing Scale

| Value | Pixels | Tailwind Class |
|-------|--------|-----------------|
| xs | 4px | `gap-1` |
| sm | 8px | `gap-2` |
| md | 16px | `gap-4` |
| lg | 24px | `gap-6` |
| xl | 32px | `gap-8` |
| 2xl | 48px | `gap-12` |

## Border Radius

| Context | Class | Pixels |
|---------|-------|--------|
| Inline / small UI | `rounded-md` | 6px |
| Cards / panels | `rounded-lg` | 8px |
| Modal / overlay | `rounded-xl` | 12px |

## Component Library

- **shadcn/ui** for base components (Button, Input, Select, Dialog, etc.)
- Add new components via `shadcn` CLI, do not modify foundation components
- Project-specific styling applied via wrapper components in `components/`

## Layout Patterns

### Navbar
- Fixed/sticky to top
- Light/dark background + 1px bottom border
- Left: ATH logo/text + main nav links (Berichte, Termine, Links, Intern)
- Right: Dropdowns (Verein, Ausbildung) + theme toggle + login/user menu
- Height: 64px, padding: 16px

### Footer
- Bottom of every page
- Columns: Legal Links | Upcoming Events (max 4) | Copyright
- Background: subtle contrast to page background
- Border: 1px top border
- Padding: 32px

### Hero Section (Landing)
- Full-width image background
- 60vh height
- Overlay gradient (dark semi-transparent)
- Center-aligned headline and CTA button

### Content Section
- Max-width container (1200px)
- Symmetric padding (32px left/right)
- Cards/panels with rounded corners and subtle shadow
- Spacing between sections: 48px

### Member Table
- Full-width container
- Horizontal scroll on mobile
- Alternating row colors for readability
- Hover state on rows (if interactive)
- Sort indicators on headers

### Markdown Content (Berichte)
- Preserve markdown formatting: **bold**, *italic*, <u>underline</u>
- Headings (h2, h3, h4) with appropriate sizes
- Images: max-width: 100%, height: auto

## Theme Toggle

- Button in navbar (sun/moon icon)
- Stores preference in localStorage
- Applies `light` or `dark` class to `<html>`
- All CSS variables respond to `:root[data-theme="dark"]` or `:root[data-theme="light"]`

## Icons

- **Lucide React** for all icons
- Sizes:
  - Inline: `h-4 w-4`
  - Buttons: `h-5 w-5`
  - Feature/section headers: `h-8 w-8`
- Stroke-based icons only (no filled variants)

## Breakpoints

Standard Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Accessibility

- Contrast ratios meet WCAG AA standard
- Semantic HTML (use `<button>`, `<nav>`, `<section>` correctly)
- ARIA labels where interactive elements lack text
- Focus states visible on keyboard navigation
- Color alone does not convey information (use icons/text too)
