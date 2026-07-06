import Link from "next/link";

import { PostCard, ProjectCard, ServiceCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { TopoArt } from "@/components/TopoArt";
import {
  fallbackPosts,
  fallbackProjects,
  fallbackServices,
  fallbackSettings,
} from "@/lib/fallback-content";
import type { Post, Project, Service, SiteSettings } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postsQuery,
  projectsQuery,
  servicesQuery,
  settingsQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, projects, posts] = await Promise.all([
    sanityFetch<SiteSettings>(settingsQuery, {}, fallbackSettings),
    sanityFetch<Service[]>(servicesQuery, {}, fallbackServices),
    sanityFetch<Project[]>(projectsQuery, {}, fallbackProjects),
    sanityFetch<Post[]>(postsQuery, {}, fallbackPosts),
  ]);

  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const heroProjects = featured.length > 0 ? featured : projects.slice(0, 2);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <TopoArt
            seed="hps-hero"
            tone="gold"
            className="h-full w-full opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/60 to-transparent" />
        </div>
        <div className="container-luxe relative py-24 md:py-36">
          <div className="max-w-3xl space-y-8 animate-rise">
            <p className="kicker">Geospatial intelligence, impeccably measured</p>
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
              {settings.tagline ?? "Precision in every dimension."}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink/70">
              {settings.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="border border-plum bg-plum px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-luxe text-cream transition-colors hover:bg-plum-deep"
              >
                Request a Survey
              </Link>
              <Link
                href="/services"
                className="border border-ink/25 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-luxe text-ink transition-colors hover:border-gold hover:text-gold"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials band ─────────────────────────────────── */}
      {settings.stats && settings.stats.length > 0 && (
        <section className="bg-estate">
          <div className="container-luxe grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
            {settings.stats.map((stat) => (
              <div key={stat.label} className="space-y-1 text-center">
                <p className="font-display text-4xl font-medium text-gold-pale md:text-5xl">
                  {stat.value}
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-luxe text-cream/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="container-luxe space-y-12 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Our services"
            title="Disciplines mastered over decades"
            intro="Six practices, one uncompromising standard of measurement."
          />
          <Link
            href="/services"
            className="text-[0.7rem] font-semibold uppercase tracking-luxe text-plum hover:text-gold"
          >
            All services →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, i) => (
            <ServiceCard key={service._id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Featured projects ────────────────────────────────── */}
      <section className="bg-cream">
        <div className="container-luxe space-y-12 py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="Selected work"
              title="Projects of consequence"
              intro="Programmes where precision carried legal, financial and civic weight."
            />
            <Link
              href="/projects"
              className="text-[0.7rem] font-semibold uppercase tracking-luxe text-plum hover:text-gold"
            >
              All projects →
            </Link>
          </div>
          <div className="space-y-8">
            {heroProjects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-plum-deep">
        <TopoArt
          seed="philosophy"
          tone="plum"
          className="absolute inset-0 h-full w-full opacity-30"
        />
        <div className="container-luxe relative py-24 text-center md:py-28">
          <p className="kicker">Our philosophy</p>
          <blockquote className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-medium italic leading-snug text-cream md:text-4xl">
            “A measurement is a promise. We make ours to the centimetre, and we
            keep them for generations.”
          </blockquote>
          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-luxe text-gold-pale">
            Eleanor Vance · Principal Surveyor
          </p>
        </div>
      </section>

      {/* ── Insights ─────────────────────────────────────────── */}
      <section className="container-luxe space-y-12 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Insights"
            title="Notes from the field"
            intro="Perspective on measurement, mapping and the decisions they carry."
          />
          <Link
            href="/insights"
            className="text-[0.7rem] font-semibold uppercase tracking-luxe text-plum hover:text-gold"
          >
            All insights →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
