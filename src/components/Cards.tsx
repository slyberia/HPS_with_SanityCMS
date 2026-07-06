import Link from "next/link";

import type { Post, Project, Service, TeamMember } from "@/lib/types";
import { CmsImage } from "./CmsImage";
import { TopoArt } from "./TopoArt";

const TONE_CYCLE = ["plum", "estate", "sand", "gold"] as const;
export const toneFor = (i: number) => TONE_CYCLE[i % TONE_CYCLE.length];

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col border border-sand bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_48px_-24px_rgba(34,26,48,0.35)]"
    >
      <CmsImage
        image={service.image}
        alt={service.title}
        seed={service.slug}
        tone={toneFor(index)}
        className="aspect-[16/9]"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-7">
        <span className="text-xs font-semibold tracking-luxe text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-2xl font-medium text-ink group-hover:text-plum">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/65">{service.summary}</p>
        <span className="mt-auto pt-3 text-[0.7rem] font-semibold uppercase tracking-luxe text-plum">
          Explore <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid overflow-hidden border border-sand bg-cream transition-all duration-300 hover:border-gold/60 hover:shadow-[0_24px_48px_-24px_rgba(34,26,48,0.35)] md:grid-cols-2"
    >
      <CmsImage
        image={project.coverImage}
        alt={project.title}
        seed={project.slug}
        tone={toneFor(index + 1)}
        className="aspect-[4/3] md:aspect-auto md:min-h-72"
      />
      <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
        <p className="kicker">
          {[project.client, project.location].filter(Boolean).join(" · ")}
        </p>
        <h3 className="text-balance font-display text-3xl font-medium leading-tight text-ink group-hover:text-plum">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/65">{project.summary}</p>
        {project.stats && project.stats.length > 0 && (
          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-sand pt-4">
            {project.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.6rem] font-semibold uppercase tracking-luxe text-ink/50">
                  {stat.label}
                </dt>
                <dd className="font-display text-xl text-estate">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Link>
  );
}

export function PostCard({ post, index }: { post: Post; index: number }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex flex-col border border-sand bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_48px_-24px_rgba(34,26,48,0.35)]"
    >
      <CmsImage
        image={post.coverImage}
        alt={post.title}
        seed={post.slug}
        tone={toneFor(index + 2)}
        className="aspect-[16/9]"
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-7">
        <p className="text-[0.65rem] font-semibold uppercase tracking-luxe text-ink/50">
          {date}
          {post.author?.name ? ` · ${post.author.name}` : ""}
        </p>
        <h3 className="text-balance font-display text-2xl font-medium leading-snug text-ink group-hover:text-plum">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
        <span className="mt-auto pt-3 text-[0.7rem] font-semibold uppercase tracking-luxe text-plum">
          Read <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

export function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <article className="border border-sand bg-cream">
      <div className="aspect-[4/5] overflow-hidden">
        {member.photo?.asset?._ref ? (
          <CmsImage
            image={member.photo}
            alt={member.name}
            seed={member.slug}
            className="h-full w-full"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        ) : (
          <TopoArt
            seed={member.slug}
            tone={toneFor(index)}
            className="h-full w-full"
          />
        )}
      </div>
      <div className="space-y-2 p-6">
        <h3 className="font-display text-xl font-medium text-ink">
          {member.name}
        </h3>
        <p className="text-[0.65rem] font-semibold uppercase tracking-luxe text-gold">
          {member.role}
        </p>
        {member.bio && (
          <p className="pt-1 text-sm leading-relaxed text-ink/65">
            {member.bio}
          </p>
        )}
        {member.credentials && member.credentials.length > 0 && (
          <p className="pt-1 text-xs italic text-estate">
            {member.credentials.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
}
