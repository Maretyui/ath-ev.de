# 01 Design System & UI Setup

## Goal

Install and configure the design system foundation: Tailwind CSS, shadcn/ui components, Lucide icons, and CSS custom properties for light/dark theming.

## Tasks

1. Install `shadcn/ui` CLI if not already present.

2. Add these shadcn/ui components via CLI:
   - Button
   - Card
   - Dialog
   - Input
   - Select
   - Textarea
   - Table
   - Tabs
   - DropdownMenu
   - Sheet (for mobile nav)
   - Label
   - Badge

3. Install `lucide-react` for icons.

4. Create `lib/utils.ts` with a reusable `cn()` helper for merging Tailwind classes.

5. Update `globals.css` with CSS custom properties for light/dark themes:
   - Light mode: `--bg-base-light`, `--text-primary-light`, etc.
   - Dark mode: `--bg-base-dark`, `--text-primary-dark`, etc.
   - Neutral: `--font-geist-sans`, `--font-geist-mono`
   - Map to Tailwind via `@theme inline`

6. Add theme toggle mechanism:
   - Store preference in `localStorage`
   - Apply `light` or `dark` class to `<html>` element
   - Create `hooks/useTheme.ts` for client-side theme switching

7. Ensure all components use CSS variables, no hardcoded colors.

## Check When Done

- ✅ All shadcn/ui components install without errors
- ✅ `cn()` helper works for merging Tailwind classes
- ✅ CSS variables defined for both light and dark modes
- ✅ `globals.css` correctly imports Tailwind and custom fonts
- ✅ Theme toggle stores preference in localStorage
- ✅ No hardcoded hex values in component CSS
- ✅ `npm run build` passes
