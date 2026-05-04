# 02 Prisma Schema & Database

## Goal

Set up Prisma ORM with PostgreSQL, define all data models, and run the initial migration.

## Models

Create or update `prisma/schema.prisma` with these models:

### User
- id: String (primary key, UUID)
- email: String (unique, indexed)
- password: String (bcrypt hashed)
- role: Enum (admin, manager, publisher, user)
- createdAt: DateTime
- updatedAt: DateTime
- members: Member[] (relation, cascade delete)
- berichte: Bericht[] (relation - as publisher)
- termine: Termin[] (relation - as creator)

### Member
- id: String (primary key, UUID)
- name: String
- street: String
- plz: String
- ort: String
- telefon: String
- email: String
- geburtstag: DateTime (optional)
- jugend: Boolean (Ja = true, empty = false)
- createdBy: String (User ID, indexed)
- createdByUser: User (relation)
- createdAt: DateTime
- updatedAt: DateTime
- Unique: none (allows duplicate names, multiple members per contact)
- Index: createdBy, createdAt

### Bericht
- id: String (primary key, UUID)
- title: String
- content: String (markdown format)
- image: String (URL)
- publisherId: String (User ID, indexed)
- publisher: User (relation)
- publishedAt: DateTime
- updatedAt: DateTime
- Index: publishedAt DESC (for sorting)

### Termin
- id: String (primary key, UUID)
- title: String
- date: DateTime (event date)
- time: String (e.g., "19:00")
- location: String
- description: String (optional, markdown)
- image: String (optional, URL)
- createdAt: DateTime
- updatedAt: DateTime
- Index: date ASC (for sorting upcoming events)

## Prisma Client

Create `lib/prisma.ts` as a cached singleton:
- Detect `DATABASE_URL` environment variable
- Handle both direct PostgreSQL and Prisma Accelerate
- Cache on `global` in development for hot module reloads

## Migration

Run `npx prisma migrate dev --name init` to:
- Create initial migration
- Generate Prisma Client
- Seed database if needed (optional for now)

## Check When Done

- ✅ Schema has all 4 models with correct relations and indexes
- ✅ `lib/prisma.ts` exports cached Prisma instance
- ✅ Migration runs successfully with `npx prisma migrate dev`
- ✅ Prisma Studio works: `npx prisma studio`
- ✅ `npm run build` passes
- ✅ No relation errors in schema
