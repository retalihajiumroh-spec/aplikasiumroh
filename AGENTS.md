# AGENTS.md

## Cursor Cloud specific instructions

**SA'YA Umroh OS** — a Next.js 15 (App Router) Umroh travel management dashboard. TypeScript, Tailwind CSS v4, Framer Motion, Recharts.

### Quick reference (see `package.json` scripts & `README.md` for full details)

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (localhost:3000) |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Build | `npm run build` |

### Key caveats

- **Supabase is optional.** The app detects `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. When unset, it falls back to a "demo mode" with a hardcoded `Admin Demo` user and localStorage-based payment storage. Copy `.env.example` to `.env.local` to use Supabase auth.
- **No test framework** is configured (no Jest, Vitest, Playwright, etc.). There are no automated tests.
- **Pre-existing lint/TS errors.** `npm run lint` reports a few `react/no-unescaped-entities` errors and unused-var warnings. `npm run typecheck` reports a handful of module-resolution and import errors. These are in the existing codebase and do not block the dev server.
- **tsconfig paths:** `@/*` resolves to `./src/*` first, then `./*`. Components under both `src/` and root `components/`/`lib/` are importable via `@/`.
