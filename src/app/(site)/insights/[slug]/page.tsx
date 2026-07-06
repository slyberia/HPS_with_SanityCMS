import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CmsImage } from "@/components/CmsImage";
import { CtaBand } from "@/components/CtaBand";
import { RichText } from "@/components/RichText";
import { fallbackPosts } from "@/lib/fallback-content";
import type { Post } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

async function getPost(slug: string) {
  const fallback = fallbackPosts.find((p) => p.slug === slug) ?? null;
  return sanityFetch<Post | null>(postBySlugQuery, { slug }, fallback);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Insight" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article>
        <section className="container-luxe py-20 md:py-28">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="kicker">
              <Link href="/insights" className="hover:text-plum">
                Insights
              </Link>
              {post.tags && post.tags.length > 0 && ` / ${post.tags[0]}`}
            </p>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] text-ink md:text-6xl">
              {post.title}
            </h1>
            <p className="text-[0.7rem] font-semibold uppercase tracking-luxe text-ink/50">
              {date}
              {post.author?.name && ` · ${post.author.name}`}
              {post.author?.role && `, ${post.author.role}`}
            </p>
          </div>
        </section>

        <section className="container-luxe pb-16">
          <CmsImage
            image={post.coverImage}
            alt={post.title}
            seed={post.slug}
            tone="estate"
            className="mx-auto aspect-[21/9] max-w-5xl"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </section>

        <section className="container-luxe pb-24 md:pb-32">
          <div className="mx-auto max-w-3xl">
            <p className="border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-plum">
              {post.excerpt}
            </p>
            <div className="mt-10">
              {post.body && post.body.length > 0 ? (
                <RichText value={post.body} />
              ) : (
                <p className="leading-relaxed text-ink/75">
                  The full essay is being prepared for publication. In the
                  meantime, our team is glad to discuss the topic directly.
                </p>
              )}
            </div>
          </div>
        </section>
      </article>
      <CtaBand />
    </>
  );
}
