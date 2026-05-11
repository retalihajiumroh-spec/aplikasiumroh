# SA'YA Umroh OS

Operating system for SA'YA Umroh travel management (Retali).

Routes live under root `app/`. Shared UI/logic from the community stack remains under `src/features`, `src/components`, and `src/lib` (imported via `@/*` path fallback).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Highlights

- Owner dashboard — `/dashboard/owner`
- Dashboard overview hub — `/dashboard`
- Community engine (bundled app shell) — `/dashboard/community` (via `src/app`)

Optional Supabase (community/login flows):

1. Copy `.env.example` to `.env.local` when provided by your branch.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint (Next)
- `npm run typecheck` — TypeScript noEmit

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion, Recharts
- Supabase client helpers (`src/lib/supabase`)
