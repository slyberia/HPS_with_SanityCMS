-- Contact-form lead capture for the HPS Geospatial website.
--
-- Apply with:  supabase db push   (or run in the Supabase SQL editor)
--
-- Row-level security is enabled with NO anon policies: the website inserts
-- leads server-side using the service-role key, and only authenticated
-- dashboard users / service role can read them.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  phone text,
  service text,
  message text not null,
  source text not null default 'website'
);

alter table public.leads enable row level security;

comment on table public.leads is
  'Enquiries submitted through the website contact form.';
