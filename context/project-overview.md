# Aquanautik Taucher Hamburg e.V. (ATH) Website - Project Overview

## Overview

Recreate the diving club Aquanautik Taucher Hamburg e.V.'s WordPress website into a modern, full-stack Next.js application. The site serves members, trainees, and prospective members, with a parent-friendly visual language and streamlined content management.

## Goals

1. **Replace WordPress** with maintainable, type-safe Next.js codebase
2. **Enable self-service publishing** for Berichte (reports) and Termine (events)
3. **Secure member data** with encrypted credentials and role-based access
4. **Improve UX** with modern design, light/dark theme, and responsive layout
5. **Support organizational roles** with granular permissions (ABAC)
6. **Centralize content** in PostgreSQL for easy backup and scaling

## Core User Flows

### Public Visitor
1. Visit landing page with hero image and welcome message
2. Browse published Berichte and Termine
3. Learn about trainers (Andreas, Maik) on Grundausbildung pages
4. View contact/legal info in footer

### Member (Logged In)
1. Sign in with email/password
2. View member contact table (NAME, STRASSE, PLZ, ORT, TELEFON, EMAIL, GEBURTSTAG, JUGEND)
3. Change password
4. View member count and youth member count in header

### Publisher/Manager (Logged In)
1. Upload/edit/delete Berichte with images and markdown-formatted content
2. Upload/edit/delete Termine with dates, times, locations
3. (Manager only) Edit member database (add/delete/modify members)
4. (Manager only) Manage users and roles

### Admin (Logged In)
1. Full system control: manage all content, users, and permissions

## Core Features

### Public Pages
- **Landing**: Welcome text (~1500 chars), hero image, organizational overview
- **Berichte**: Article list and detail pages with images, markdown formatting, publication metadata
- **Termine**: Event list and detail pages with date, time, location, optional description
- **Grundausbildung**: Two trainer profiles (Andreas, Maik) with photos, qualifications, descriptions
- **Verein**: Empty placeholder pages (expandable future)
- **Links**: Empty placeholder page
- **Static**: Impressum, Datenschutzerklärung, Kontakt (placeholders)

### Protected Pages
- **Intern/Login**: Email + password authentication
- **Member Table**: Searchable, filterable contact database with role-based editing
- **Dashboard** (publisher+): Manage Berichte and Termine
- **Password Change**: Secure update for authenticated users

### Navigation & Layout
- **Sticky Navbar**: ATH logo (top left), main tabs (Berichte, Termine, Links, Intern), dropdowns
- **Footer**: Legal links, next 4 upcoming Termine, copyright year + Maik Reinhardt
- **Theme**: Light/Dark mode with vibrant, parent-friendly colors

## User Roles & ABAC Permissions

| Role | View Members | Edit Members | Publish Content | Delete Content | Manage Users | Upload Files |
|------|-------------|-------------|-----------------|----------------|-------------|-------------|
| Unauthenticated | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| user | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| publisher | ✓ | ✗ | ✓ | ✓ | ✗ | ✓ |
| manager | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Content Requirements

- **Texts**: Provided by client (1500 char landing page, trainer descriptions, contact info)
- **Placeholders**: Use Lorem Ipsum for trainer bios and missing content
- **Images**: Use placeholder service for all imagery
- **Member Table Columns**: NAME, STRASSE, PLZ, ORT, TELEFON, EMAIL, GEBURTSTAG, JUGEND (Ja/empty)
- **Berichte Markdown**: Italic, bold, underline, h2/h3/h4
- **Termine Fields**: Date, Time, Location, Title, optional Description, optional Image

## Scope

### In Scope
- Public pages (landing, berichte, termine, links, grundausbildung, verein)
- Authentication with email/password and JWT
- Member table with CRUD operations and role-based access
- Berichte and Termine publishing pipeline
- Light/Dark theme with responsive design
- API security (JWT validation, CORS, rate limiting)
- Password change functionality
- Sticky navbar and footer with upcoming events

### Out of Scope
- Email notifications
- File uploads (use placeholder images)
- Real member/event data (use Lorem Ipsum)
- WordPress data migration
- Analytics or tracking
- Mobile app
- Payment/subscription features
- Multi-language support

## Success Criteria

1. Public pages are accessible without login
2. Member table is only visible to authenticated users
3. Publishers can upload/edit/delete Berichte and Termine
4. Managers can edit member table
5. Admin can manage all users and content
6. Passwords are encrypted with bcrypt
7. All API routes validate JWT tokens
8. Light/Dark theme works across all pages
9. Navbar is sticky and responsive
10. Footer shows next 4 upcoming Termine
