# CLAUDE.md

## Project Overview

Let It Map — a location-sharing web app built with Next.js 16 (App Router).

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript 5
- **DB:** Drizzle ORM + Neon PostgreSQL
- **Auth:** NextAuth.js v5 (Google, GitHub OAuth)
- **Styling:** Tailwind CSS v4 (no config file — self-configuring)
- **Icons:** Lucide React

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npx drizzle-kit push` — Push schema changes to DB
- `npx drizzle-kit generate` — Generate migrations

## Project Structure

```
src/
├── app/              # Routes (App Router, route groups like (main))
├── components/       # Shared UI components (layout/, ui/)
├── features/         # Feature modules (auth/, post/)
│   └── [feature]/
│       ├── components/   # Feature-specific components
│       ├── server/       # Server actions & queries
│       └── types.ts      # Feature-specific types
├── lib/              # Shared config (auth/, db/)
└── types/            # Shared types
```

## Conventions

- **Language:** All code, UI strings, and comments must be in English.
- **Path alias:** Use `@/` for imports (maps to `src/`).
- **Server vs Client:** Components are Server Components by default. Add `"use client"` only when interactivity is needed.
- **File/folder placement:** Always follow `docs/folder-structure-spec.md` when creating files or directories.
- **Data fetching:** Server queries (`features/*/server/queries.ts`) are plain async functions (no `"use server"`) called directly from Server Components.
- **Mutations:** Server Actions (`features/*/server/actions.ts`) use `"use server"` and are called from Client Components.
- **Form state:** Use React 19 `useActionState` hook to connect forms to Server Actions — provides `[state, formAction, isPending]`.
- **Styling:** Tailwind utility classes. Custom design tokens defined in `globals.css` (Burnt Sienna accent, Forest Teal secondary, warm stone palette).
- **DB schema:** Defined in `src/lib/db/schema.ts`. UUIDs for primary keys, snake_case column names, cascade deletes on foreign keys.
- **Types:** Feature-specific types in `features/*/types.ts`, shared types in `types/common.ts`.
- **File naming:** PascalCase for components (`PostCard.tsx`), camelCase for utilities/actions (`queries.ts`, `actions.ts`).
