import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CmsImage } from "@/components/CmsImage";
import { CtaBand } from "@/components/CtaBand";
import { RichText } from "@/components/RichText";
import { fallbackProjects } from "@/lib/fallback-content";
import type { Project } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { projectBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

async function getProject(slug: string) {
  const fallback = fallbackProjects.find((p) => p.slug === slug) ?? null;
  return sanityFetch<Project | null>(projectBySlugQuery, { slug }, fallback);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const meta = [
    project.client && { label: "Client", value: project.client },
    project.location && { label: "Location", value: project.location },
    project.completedAt && {
      label: "Completed",
      value: new Date(project.completedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <article>
        <section className="container-luxe py-20 md:py-28">
          <div className="max-w-3xl space-y-6">
            <p className="kicker">
              <Link href="/projects" className="hover:text-plum">
                Projects
              </Link>{" "}
              / Case study
            </p>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] text-ink md:text-6xl">
              {project.title}
            </h1>
            <p className="text-lg leading-relaxed text-ink/70">
              {project.summary}
            </p>
            <div className="rule-gold w-24" />
          </div>
        </section>

        <section className="container-luxe pb-16">
          <CmsImage
            image={project.coverImage}
            alt={project.title}
            seed={project.slug}
            tone="plum"
            className="aspect-[21/9]"
            sizes="100vw"
          />
        </section>

        <section className="container-luxe grid gap-16 pb-24 md:grid-cols-[2fr_1fr] md:pb-32">
          <div>
            {project.body && project.body.length > 0 ? (
              <RichText value={project.body} />
            ) : (
              <p className="leading-relaxed text-ink/75">
                A detailed case study for this programme is available on
                request, subject to client confidentiality.
              </p>
            )}
          </div>

          <aside className="h-fit space-y-8 border border-sand bg-cream p-8">
            {meta.length > 0 && (
              <dl className="space-y-5">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[0.6rem] font-semibold uppercase tracking-luxe text-ink/50">
                      {m.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg text-ink">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {project.stats && project.stats.length > 0 && (
              <div>
                <h2 className="kicker">By the numbers</h2>
                <dl className="mt-4 space-y-4">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-b border-sand/70 pb-3 last:border-0"
                    >
                      <dd className="font-display text-2xl text-estate">
                        {stat.value}
                      </dd>
                      <dt className="text-[0.6rem] font-semibold uppercase tracking-luxe text-ink/50">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <h2 className="kicker">Services applied</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {project.services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-plum underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>
      </article>
      <CtaBand />
    </>
  );
}
