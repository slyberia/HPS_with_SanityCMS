# HPS Geospatial — Website & CMS

A luxury-premium marketing site for a geospatial services company, built with
**Next.js (App Router)**, **Sanity CMS** and **Supabase**, styled with
Tailwind CSS in a beige / purple / green / gold palette.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, TypeScript, React 19) |
| Styling | Tailwind CSS v4, Cormorant Garamond + Manrope |
| CMS | Sanity (project `bv8toflp`, dataset `production`), Studio embedded at `/studio` |
| Leads | Supabase (`leads` table, see `supabase/migrations/`) |

## Getting started

```bash
npm install
npm run dev
```

- Site: <http://localhost:3000>
- Sanity Studio: <http://localhost:3000/studio> (sign in with a Sanity account
  that is a member of the project)

No env vars are required for local development — Sanity defaults are baked in
(`src/sanity/env.ts`) and the contact form degrades gracefully without
Supabase. Copy `.env.example` to `.env.local` to override anything.

## Content model

| Type | Purpose |
| --- | --- |
| `siteSettings` | Title, tagline, contact details, headline statistics |
| `service` | Service pages (LiDAR, cadastral, GIS, UAV, hydrographic, digital twins) |
| `project` | Case studies with stats and related services |
| `post` | Insights / blog articles |
| `teamMember` | People, credentials, bios |

Every page renders **fallback content** (`src/lib/fallback-content.ts`) when a
type has no published documents, so the site never renders empty — edit in the
Studio and published changes appear within 60 s (ISR).

Placeholder imagery is generated topographic-contour SVG art
(`src/components/TopoArt.tsx`); upload real photography in the Studio to
replace it per document.

## Contact-form leads (Supabase)

1. Create/choose a Supabase project.
2. Run `supabase/migrations/0001_create_leads.sql` (SQL editor or `supabase db push`).
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the deployment env.

RLS is enabled with no anon policies — inserts happen server-side only.

## Deploying (Vercel)

1. Import the repo into Vercel — the defaults (`npm run build`) just work.
2. Set env vars from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`; add
   Supabase vars to activate the contact form).
3. In [Sanity project settings](https://www.sanity.io/manage/project/bv8toflp),
   add your production domain to **CORS origins** (with credentials) so the
   embedded Studio works at `https://your-domain/studio`.

## Useful commands

```bash
npm run dev         # local dev server
npm run build       # production build
npm run lint        # eslint
npx sanity schema deploy   # redeploy schema to Sanity (after schema edits)
```
