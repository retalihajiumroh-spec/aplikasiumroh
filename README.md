# Retali Umroh

Aplikasi awal umroh modern menggunakan Next.js 14 App Router, Tailwind CSS, dan Supabase.

## Fitur awal

- Landing page premium
- Login user berbasis Supabase Auth
- Dashboard jamaah
- Paket umroh
- Artikel dan ebook
- Responsive mobile
- Dark mode

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env.local`.
2. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Jalankan:

```bash
npm run dev
```

## Script

- `npm run dev` - menjalankan development server
- `npm run build` - build production
- `npm run start` - menjalankan hasil build
- `npm run lint` - lint Next.js
- `npm run typecheck` - TypeScript check
