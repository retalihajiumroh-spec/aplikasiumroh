-- Payment entries (finance) — linked to auth user who recorded the payment
-- Proof files: store filenames/metadata only; upload binary via Storage in production.

create table if not exists public.payment_entries (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references auth.users (id) on delete cascade,
  package_id text not null,
  package_label text not null,
  jamaah_id text not null,
  jamaah_name text not null,
  amount_idr bigint not null check (amount_idr > 0),
  payment_type text not null,
  status text not null check (status in ('approved', 'pending', 'rejected')),
  proof_filenames jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists payment_entries_created_by_idx on public.payment_entries (created_by);
create index if not exists payment_entries_created_at_idx on public.payment_entries (created_at desc);

alter table public.payment_entries enable row level security;

create policy "payment_entries_select_own"
  on public.payment_entries for select
  using (auth.uid() = created_by);

create policy "payment_entries_insert_own"
  on public.payment_entries for insert
  with check (auth.uid() = created_by);

create policy "payment_entries_update_own"
  on public.payment_entries for update
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

create policy "payment_entries_delete_own"
  on public.payment_entries for delete
  using (auth.uid() = created_by);
