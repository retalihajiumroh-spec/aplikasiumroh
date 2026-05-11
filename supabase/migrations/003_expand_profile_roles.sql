-- Extend profiles.role for RBAC portals (admin HO, jamaah tiers).

alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.profiles add constraint profiles_role_check check (
  role in (
    'owner',
    'admin_head_office',
    'cabang',
    'mitra',
    'jamaah',
    'jamaah_free',
    'jamaah_pro'
  )
);

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
  r := coalesce(new.raw_user_meta_data->>'role', 'jamaah_free');
  fn := coalesce(new.raw_user_meta_data->>'full_name', '');
  ph := coalesce(new.raw_user_meta_data->>'phone', '');
  bn := nullif(trim(coalesce(new.raw_user_meta_data->>'branch_name', '')), '');
  cn := nullif(trim(coalesce(new.raw_user_meta_data->>'company_name', '')), '');

  insert into public.profiles (id, role, full_name, phone, branch_name, company_name)
  values (new.id, r, fn, ph, bn, cn);

  if r in ('jamaah', 'jamaah_free', 'jamaah_pro') then
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
