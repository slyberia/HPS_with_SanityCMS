import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CmsImage } from "@/components/CmsImage";
import { CtaBand } from "@/components/CtaBand";
import { RichText } from "@/components/RichText";
import { fallbackServices } from "@/lib/fallback-content";
import type { Service } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { serviceBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

async function getService(slug: string) {
  const fallback = fallbackServices.find((s) => s.slug === slug) ?? null;
  return sanityFetch<Service | null>(serviceBySlugQuery, { slug }, fallback);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service" };
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      <article>
        <section className="container-luxe grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="space-y-6">
            <p className="kicker">
              <Link href="/services" className="hover:text-plum">
                Services
              </Link>{" "}
              / {service.title}
            </p>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] text-ink md:text-6xl">
              {service.title}
            </h1>
            <p className="text-lg leading-relaxed text-ink/70">
              {service.summary}
            </p>
            <div className="rule-gold w-24" />
          </div>
          <CmsImage
            image={service.image}
            alt={service.title}
            seed={service.slug}
            tone="estate"
            className="aspect-[4/3]"
          />
        </section>

        <section className="container-luxe grid gap-16 pb-24 md:grid-cols-[2fr_1fr] md:pb-32">
          <div>
            {service.body && service.body.length > 0 ? (
              <RichText value={service.body} />
            ) : (
              <p className="leading-relaxed text-ink/75">
                Speak with our team to learn how this practice is tailored to
                your site conditions, regulatory context and accuracy
                requirements.
              </p>
            )}
          </div>
          {service.features && service.features.length > 0 && (
            <aside className="h-fit border border-sand bg-cream p-8">
              <h2 className="kicker">Key capabilities</h2>
              <ul className="mt-6 space-y-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-b border-sand/70 pb-4 text-sm leading-relaxed text-ink/75 last:border-0 last:pb-0"
                  >
                    <span className="mr-2 text-gold" aria-hidden>
                      ◆
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </section>
      </article>
      <CtaBand
        title={`Discuss ${service.title.toLowerCase()} for your project.`}
      />
    </>
  );
}
