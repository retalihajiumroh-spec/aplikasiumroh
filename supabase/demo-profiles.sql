-- Demo RBAC: setelah `003_expand_profile_roles.sql` (atau constraint role sudah mendukung nilai baru),
-- buat user di Authentication (email/password sama seperti lib/demo/demo-accounts.ts),
-- lalu jalankan per blok ini di SQL Editor Supabase (sesuaikan email jika berbeda).

UPDATE public.profiles SET role = 'owner', full_name = COALESCE(full_name, 'Demo Owner')
WHERE id IN (SELECT id FROM auth.users WHERE email = 'demo-owner@sayaumroh.local');

UPDATE public.profiles SET role = 'admin_head_office', full_name = COALESCE(full_name, 'Demo Admin HO')
WHERE id IN (SELECT id FROM auth.users WHERE email = 'demo-admin-ho@sayaumroh.local');

UPDATE public.profiles SET role = 'cabang', full_name = COALESCE(full_name, 'Demo Cabang Jakarta')
WHERE id IN (SELECT id FROM auth.users WHERE email = 'demo-cabang@sayaumroh.local');

UPDATE public.profiles SET role = 'mitra', full_name = COALESCE(full_name, 'Demo Mitra')
WHERE id IN (SELECT id FROM auth.users WHERE email = 'demo-mitra@sayaumroh.local');

UPDATE public.profiles SET role = 'jamaah_free', full_name = COALESCE(full_name, 'Demo Jamaah Free')
WHERE id IN (SELECT id FROM auth.users WHERE email = 'demo-jamaah-free@sayaumroh.local');

UPDATE public.profiles SET role = 'jamaah_pro', full_name = COALESCE(full_name, 'Demo Jamaah Pro')
WHERE id IN (SELECT id FROM auth.users WHERE email = 'demo-jamaah-pro@sayaumroh.local');
