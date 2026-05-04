# 05 Layout & Navigation

## Goal

Create the main layout shell with sticky navbar, footer, and theme toggle.

## Navbar Component (`components/layout/navbar.tsx`)

Fixed/sticky to top. Contains:

### Left Section
- ATH logo/text (32px, bold, brand primary color)
- Horizontal nav links: Berichte, Termine, Links, Intern
- Font: 14px, medium weight
- Spacing: 24px between items

### Center Section
- Dropdowns (right side of left section):
  - **Verein**: Geschichte, Vorstand, Satzung, Geschäftsordnung
  - **Ausbildung**: Grundausbildung Andreas, Grundausbildung Maik

### Right Section
- Theme toggle (sun/moon icon, 20x20)
- Login button (if no JWT) or User menu (if logged in)
  - User menu shows: Profile, Change Password, Logout
- Spacing: 16px between items

### Styling
- Height: 64px, padding: 16px 32px
- Background: `bg-base` (light/dark mode aware)
- Border bottom: 1px solid `border-default`
- Position: `fixed` / `sticky` with z-index: 50
- Responsive: hamburger menu on mobile (< 768px)

## Footer Component (`components/layout/footer.tsx`)

Fixed to bottom or at end of page. Contains:

### Columns
1. **Legal Links**: Impressum, Datenschutzerklärung, Kontakt (links only, no text)
2. **Next Events**: Shows next 4 upcoming Termine (title + date)
3. **Copyright**: © 2026 Maik Reinhardt (centered)

### Styling
- Padding: 32px
- Background: `bg-surface`
- Border top: 1px solid `border-default`
- Font: 12px, secondary text color
- Columns layout on large screens, stacked on mobile

## Root Layout (`app/layout.tsx`)

- Wraps all pages with navbar and footer
- Theme provider initialization
- Sets up Tailwind CSS with custom properties
- Applies `light` or `dark` class to `<html>` based on localStorage

## Theme Toggle Hook (`hooks/useTheme.ts`)

```typescript
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
    applyTheme(isDark ? 'dark' : 'light');
  }, []);
  
  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };
  
  return { theme, toggle };
}
```

## Mobile Responsiveness

- Navbar: hamburger menu (Sheet component) for mobile navigation
- Footer: single column on mobile, centered text
- All text sizes adapt: `text-base` on desktop, `text-sm` on mobile

## Check When Done

- ✅ Navbar is sticky at top, 64px height
- ✅ ATH logo visible on left
- ✅ Nav links are clickable and route correctly
- ✅ Dropdown menus work and show correct links
- ✅ Theme toggle switches between light/dark
- ✅ Theme preference stored in localStorage
- ✅ Footer shows next 4 upcoming Termine
- ✅ Copyright year is current
- ✅ All colors use CSS variables
- ✅ Mobile hamburger menu works
- ✅ `npm run build` passes
