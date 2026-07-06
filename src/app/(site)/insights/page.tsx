import type { Metadata } from "next";

import { PostCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { fallbackPosts } from "@/lib/fallback-content";
import type { Post } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Essays and field notes on surveying, LiDAR, GIS and the decisions built on spatial data.",
};

export default async function InsightsPage() {
  const posts = await sanityFetch<Post[]>(postsQuery, {}, fallbackPosts);

  return (
    <>
      <section className="container-luxe py-20 md:py-28">
        <SectionHeading
          kicker="Insights"
          title="Notes from the field"
          intro="Perspective from our surveyors on measurement, mapping, and the legal and commercial decisions that rest on them."
        />
      </section>
      <section className="container-luxe grid gap-8 pb-24 md:grid-cols-2 lg:grid-cols-3 md:pb-32">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </section>
      <CtaBand />
    </>
  );
}
