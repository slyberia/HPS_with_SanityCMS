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

---

# Deployment

The site is a standard Node.js Next.js app with no host-specific code, so it
runs anywhere Node 20+ or a container runs. Guides below for
[Vercel](#deploying-to-vercel), [GCP](#deploying-to-gcp-cloud-run) and
[AWS](#deploying-to-aws).

## Before deploying (any platform)

1. **Environment variables** — from `.env.example`:

   | Variable | Required | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata/OG tags, e.g. `https://hpsgeospatial.com` |
   | `SUPABASE_URL` | For contact form | Project URL from Supabase dashboard |
   | `SUPABASE_SERVICE_ROLE_KEY` | For contact form | Server-only secret — never expose client-side |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Defaults to `bv8toflp` |
   | `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |

   Without the Supabase vars the site still deploys; the contact form asks
   visitors to email directly instead of storing the lead.

2. **Sanity CORS** — after you know your production domain, add it (with
   credentials allowed) in
   [Sanity → project settings → API → CORS origins](https://www.sanity.io/manage/project/bv8toflp),
   e.g. `https://hpsgeospatial.com`. Required for the embedded Studio at
   `/studio` to sign in; the public site itself works without it.

3. **Verify locally** — `npm run build` should complete green before you ship.

How the pieces behave in production, whatever the host:

- **Rendering** — listing pages are static with 60-second ISR
  (`revalidate = 60`); slug pages render on demand and cache the same way.
  Published CMS edits appear within a minute without a redeploy.
- **Contact form** — a server action, so the platform must run a Node server
  (all three guides below do). Static-only hosting (S3/Cloud Storage alone)
  will not work.
- **Images** — CMS photos are served from `cdn.sanity.io` and resized by
  `next/image` on the Node server; no extra service needed.

## Deploying to Vercel

Zero-config path; Vercel builds Next.js natively.

1. Push the repo to GitHub and import it at
   [vercel.com/new](https://vercel.com/new). Framework preset auto-detects as
   Next.js — keep the default build command (`next build`) and output.
2. Add the environment variables (table above) under
   **Project → Settings → Environment Variables**, for the Production
   environment (and Preview if you want branch deploys to store leads).
3. Deploy. Every push to the default branch redeploys production; pushes to
   other branches create preview URLs.
4. Add your custom domain under **Settings → Domains** and set
   `NEXT_PUBLIC_SITE_URL` to it.
5. Add the domain (and optionally `https://*.vercel.app` for previews) to
   Sanity CORS origins so `/studio` works.

Notes:

- ISR is fully managed and shared across regions — no extra configuration.
- The `Dockerfile` and `output: "standalone"` in this repo are ignored by
  Vercel; they exist for the container platforms below.

## Deploying to GCP (Cloud Run)

The repo ships a production `Dockerfile` (multi-stage, non-root, listens on
`$PORT`) and `output: "standalone"`, so Cloud Run works out of the box.

1. One-time setup:

   ```bash
   gcloud auth login
   gcloud config set project YOUR_GCP_PROJECT
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com \
     artifactregistry.googleapis.com
   ```

2. Store the Supabase secret in Secret Manager (recommended over plain env):

   ```bash
   gcloud services enable secretmanager.googleapis.com
   printf '%s' 'YOUR_SERVICE_ROLE_KEY' | \
     gcloud secrets create supabase-service-role-key --data-file=-
   ```

3. Build and deploy straight from source (Cloud Build uses the Dockerfile):

   ```bash
   gcloud run deploy hps-website \
     --source . \
     --region europe-west1 \
     --allow-unauthenticated \
     --set-env-vars NEXT_PUBLIC_SITE_URL=https://hpsgeospatial.com,SUPABASE_URL=https://YOUR-REF.supabase.co \
     --set-secrets SUPABASE_SERVICE_ROLE_KEY=supabase-service-role-key:latest
   ```

4. Map your domain: **Cloud Run → Manage custom domains** (or put a global
   external load balancer in front). Then add the domain to Sanity CORS.

5. Redeploys: re-run the command in step 3, or connect the repo under
   **Cloud Build → Triggers** for deploy-on-push.

Notes:

- **ISR cache is per-instance** on Cloud Run (ephemeral filesystem). The site
  is designed for this — a cold instance simply refetches from Sanity's CDN —
  but pages regenerate more often than on Vercel. `--min-instances 1` avoids
  cold starts; add Cloud CDN via a load balancer if you want edge caching.
- Suggested sizing: the defaults (1 vCPU / 512 MiB) are fine; bump memory to
  1 GiB if image-heavy pages appear slow.
- **Alternative:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
  detects Next.js and manages the build + Cloud Run service for you with
  GitHub-integrated deploys — the closest GCP equivalent to the Vercel
  experience. Set the same env vars in its console; no Dockerfile needed.

## Deploying to AWS

Two good paths, depending on how much infrastructure you want to own.

### Option A — AWS Amplify Hosting (managed, recommended)

Amplify Hosting supports Next.js App Router SSR natively (WEB_COMPUTE
platform) and deploys from your Git repo.

1. Console → **Amplify → Create new app → GitHub**, pick the repo and branch.
   Amplify auto-detects Next.js; keep the default build settings
   (`npm ci && npm run build`).
2. Add the environment variables (table above) under
   **App settings → Environment variables**. Because Amplify injects env vars
   at build time, redeploy after changing them.
3. Deploy. Amplify builds on every push to the connected branch.
4. Add your domain under **App settings → Domain management** (Route 53
   domains connect in one click; external DNS via CNAME). Set
   `NEXT_PUBLIC_SITE_URL` accordingly and add the domain to Sanity CORS.

Notes:

- Amplify fronts the app with CloudFront automatically; ISR works, with
  revalidation handled by the Amplify compute layer.
- If the build picks the wrong platform, ensure the app's platform is
  `WEB_COMPUTE` (Amplify Hosting docs: "SSR apps").

### Option B — App Runner / ECS Fargate (containers)

Use the repo's `Dockerfile` when you want the site inside an existing AWS
network or CI pipeline.

1. Build and push the image:

   ```bash
   aws ecr create-repository --repository-name hps-website
   aws ecr get-login-password | docker login --username AWS \
     --password-stdin YOUR_ACCOUNT.dkr.ecr.YOUR_REGION.amazonaws.com
   docker build -t YOUR_ACCOUNT.dkr.ecr.YOUR_REGION.amazonaws.com/hps-website:latest .
   docker push YOUR_ACCOUNT.dkr.ecr.YOUR_REGION.amazonaws.com/hps-website:latest
   ```

2. **App Runner** (simplest): Console → App Runner → create service from the
   ECR image. Port `8080`; set env vars (store
   `SUPABASE_SERVICE_ROLE_KEY` in Secrets Manager and reference it). App
   Runner gives you TLS, autoscaling and a default domain; add a custom
   domain in the service settings.

   **ECS Fargate** (more control): run the same image as a Fargate service
   behind an Application Load Balancer; inject secrets from Secrets Manager
   in the task definition; front with CloudFront for edge caching.

3. Add the final domain to Sanity CORS origins.

Notes:

- As on Cloud Run, ISR cache is per-container — acceptable here by design;
  add CloudFront in front if you want shared edge caching.
- Health check path: `/` returns 200.

---

## Useful commands

```bash
npm run dev         # local dev server
npm run build       # production build
npm run lint        # eslint
docker build -t hps-website .        # container image (GCP/AWS paths)
npx sanity schema deploy             # redeploy schema to Sanity (after schema edits)
```
