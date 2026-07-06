import type { Metadata } from "next";

import { ProjectCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { fallbackProjects } from "@/lib/fallback-content";
import type { Project } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { projectsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected geospatial programmes — coastal mapping, rail digital twins, estate masterplans and more.",
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>(
    projectsQuery,
    {},
    fallbackProjects,
  );

  return (
    <>
      <section className="container-luxe py-20 md:py-28">
        <SectionHeading
          kicker="Selected work"
          title="Programmes where precision carried weight"
          intro="A representative selection of commissions. Many of our engagements are confidential; references are available on request."
        />
      </section>
      <section className="container-luxe space-y-8 pb-24 md:pb-32">
        {projects.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </section>
      <CtaBand />
    </>
  );
}
