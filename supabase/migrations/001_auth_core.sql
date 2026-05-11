-- SA'YA Umroh OS — Supabase schema: profiles, jamaah, mitra, cabang + RLS
-- Run in Supabase SQL editor or via CLI: supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users, role from signup metadata)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('jamaah', 'mitra', 'cabang', 'owner')),
  full_name text,
  phone text,
  branch_name text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

-- ---------------------------------------------------------------------------
-- Domain tables (owned by auth user)
-- ---------------------------------------------------------------------------
create table if not exists public.jamaah (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  display_name text not null,
  email text,
  phone text,
  package_name text,
  payment_status text not null default 'unpaid',
  documents jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jamaah_user_id_idx on public.jamaah (user_id);

create table if not exists public.mitra (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  company_name text not null,
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now(),
  constraint mitra_user_id_key unique (user_id)
);

create table if not exists public.cabang (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  branch_display_name text not null,
  city text,
  office_phone text,
  created_at timestamptz not null default now(),
  constraint cabang_user_id_key unique (user_id)
);

-- ---------------------------------------------------------------------------
-- Trigger: new auth user → profile + domain row
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r text;
  fn text;
  ph text;
  bn text;
  cn text;
begin
  r := coalesce(new.raw_user_meta_data->>'role', 'jamaah');
  fn := coalesce(new.raw_user_meta_data->>'full_name', '');
  ph := coalesce(new.raw_user_meta_data->>'phone', '');
  bn := nullif(trim(coalesce(new.raw_user_meta_data->>'branch_name', '')), '');
  cn := nullif(trim(coalesce(new.raw_user_meta_data->>'company_name', '')), '');

  insert into public.profiles (id, role, full_name, phone, branch_name, company_name)
  values (new.id, r, fn, ph, bn, cn);

  if r = 'jamaah' then
    insert into public.jamaah (user_id, display_name, email, phone)
    values (new.id, fn, new.email, ph);
  elsif r = 'mitra' then
    insert into public.mitra (user_id, company_name, contact_email, contact_phone)
    values (new.id, coalesce(cn, fn, 'Mitra'), new.email, ph);
  elsif r = 'cabang' then
    insert into public.cabang (user_id, branch_display_name, city, office_phone)
    values (new.id, coalesce(bn, fn, 'Cabang'), '', ph);
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.jamaah enable row level security;
alter table public.mitra enable row level security;
alter table public.cabang enable row level security;

-- profiles: own row
create policy profiles_select_self on public.profiles
  for select using (auth.uid() = id);
create policy profiles_update_self on public.profiles
  for update using (auth.uid() = id);

-- jamaah
create policy jamaah_select_own on public.jamaah
  for select using (auth.uid() = user_id);
create policy jamaah_insert_own on public.jamaah
  for insert with check (auth.uid() = user_id);
create policy jamaah_update_own on public.jamaah
  for update using (auth.uid() = user_id);
create policy jamaah_delete_own on public.jamaah
  for delete using (auth.uid() = user_id);

-- mitra
create policy mitra_select_own on public.mitra
  for select using (auth.uid() = user_id);
create policy mitra_insert_own on public.mitra
  for insert with check (auth.uid() = user_id);
create policy mitra_update_own on public.mitra
  for update using (auth.uid() = user_id);
create policy mitra_delete_own on public.mitra
  for delete using (auth.uid() = user_id);
-- cabang
create policy cabang_select_own on public.cabang
  for select using (auth.uid() = user_id);
create policy cabang_insert_own on public.cabang
  for insert with check (auth.uid() = user_id);
create policy cabang_update_own on public.cabang
  for update using (auth.uid() = user_id);
create policy cabang_delete_own on public.cabang
  for delete using (auth.uid() = user_id);
-- Note: cross-role “owner sees all” policies are omitted here to avoid RLS recursion.
-- Use the service role in trusted server code for admin-wide reads.
