# Development Workflow - ATH Website

## Approach

Build this project incrementally using a spec-driven workflow. Context files define what to build, how to build it, and what the current state of progress is. Always implement against these specs — do not infer or invent behavior from scratch.

## Scoping Rules

- **Work on one feature unit at a time** — auth, then pages, then dashboard
- **Prefer small, verifiable increments** over large speculative changes
- **Do not combine unrelated system boundaries** in a single implementation step
- **Verify each feature end-to-end** before moving to the next

## When to Split Work

Split an implementation step if it combines:
- Database schema changes and API route changes (schema first, then routes)
- UI changes and API route changes (routes first, then UI)
- Authentication logic and authorization logic (auth first, then ABAC)
- Multiple different page implementations (one page at a time)

If a change cannot be verified end-to-end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- **Do not invent product behavior** not defined in the context files
- **If a requirement is ambiguous**, resolve it in the relevant context file before implementing
- **If a requirement is missing**, ask the user before continuing
- **Update `progress-tracker.md`** with open questions and decisions

## Protected Foundation Components

Do not modify generated third-party foundation components unless explicitly instructed:
- `components/ui/*` (shadcn/ui components — only add new ones via CLI)
- Third-party library internals (Prisma, Next.js internals, etc.)

Project-specific styling and feature logic must be implemented in app-level components instead of modifying foundations.

## Keeping Docs In Sync

Update the relevant context file immediately when implementation changes:
- **architecture-context.md** — if system boundaries or storage model changes
- **ui-context.md** — if theme, colors, or layout patterns change
- **code-standards.md** — if coding conventions or best practices change
- **project-overview.md** — if feature scope or user flows change
- **progress-tracker.md** — after every meaningful implementation step

Progress state must reflect the actual state of the implementation, not the intended state.

## Before Moving to the Next Unit

Verify:
1. ✅ The current unit works end-to-end within its defined scope
2. ✅ No invariant defined in `architecture-context.md` was violated
3. ✅ `progress-tracker.md` reflects the completed work
4. ✅ Context files are updated if implementation changed docs
5. ✅ All new code follows `code-standards.md`

## Testing

- **Manual testing** for each feature unit before moving on
- **Integration tests** for auth flows and database operations
- **UI tests** for forms and member table interactions
- **No automated testing framework yet** — focus on manual verification

## Deployment Ready Checklist

Before declaring the project complete:
- [ ] All public pages are accessible and styled
- [ ] Authentication works (login, logout, password change)
- [ ] Member table is visible to authenticated users only
- [ ] Publishers can upload/edit/delete Berichte and Termine
- [ ] Managers can edit member table
- [ ] Admin can manage users
- [ ] All API routes validate JWT tokens
- [ ] Light/Dark theme toggle works across all pages
- [ ] Navbar is sticky and responsive
- [ ] Footer shows next 4 upcoming Termine
- [ ] No console errors or warnings
- [ ] No hardcoded test data in production code
- [ ] Database migrations are clean and reversible
