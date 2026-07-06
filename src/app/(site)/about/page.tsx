import type { Metadata } from "next";

import { TeamCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { TopoArt } from "@/components/TopoArt";
import { fallbackSettings, fallbackTeam } from "@/lib/fallback-content";
import type { SiteSettings, TeamMember } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery, teamQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description:
    "The people and principles behind HPS Geospatial — accredited surveyors with an uncompromising standard of measurement.",
};

const PRINCIPLES = [
  {
    title: "Accuracy is non-negotiable",
    body: "Every deliverable states its datum, its method and its uncertainty. If a number cannot be defended, it does not leave the office.",
  },
  {
    title: "Discretion as standard",
    body: "We work on private estates, sensitive infrastructure and contested boundaries. Confidentiality is built into every engagement.",
  },
  {
    title: "Built for the long term",
    body: "Surveys outlive projects. Our archives, control networks and records are maintained so clients can rely on them decades later.",
  },
];

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    sanityFetch<SiteSettings>(settingsQuery, {}, fallbackSettings),
    sanityFetch<TeamMember[]>(teamQuery, {}, fallbackTeam),
  ]);

  return (
    <>
      <section className="container-luxe grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="space-y-6">
          <p className="kicker">About {settings.title}</p>
          <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] text-ink md:text-6xl">
            Measurement, practised as a craft
          </h1>
          <p className="text-lg leading-relaxed text-ink/70">
            {settings.title} was founded on a simple conviction: that the land
            deserves to be measured with the same care with which it is owned,
            built upon and passed down. Two decades on, that conviction guides
            every point we capture.
          </p>
          <div className="rule-gold w-24" />
        </div>
        <TopoArt seed="about-hero" tone="sand" className="aspect-[4/3] w-full" />
      </section>

      <section className="bg-estate">
        <div className="container-luxe space-y-12 py-24 md:py-28">
          <SectionHeading
            kicker="Our principles"
            title="What we hold ourselves to"
            light
          />
          <div className="grid gap-10 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="space-y-3 border-t border-gold/40 pt-6">
                <span className="font-display text-xl text-gold-pale">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-medium text-cream">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe space-y-12 py-24 md:py-32">
        <SectionHeading
          kicker="Our people"
          title="Led by accredited specialists"
          intro="Every practice area is led by a licensed or chartered professional who signs their own work."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <TeamCard key={member._id} member={member} index={i} />
          ))}
        </div>
      </section>

      <CtaBand title="Meet the team behind the measurements." />
    </>
  );
}
