import type { Metadata } from "next";

import { ServiceCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { fallbackServices } from "@/lib/fallback-content";
import type { Service } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Survey-grade LiDAR, cadastral surveying, GIS, UAV, hydrographic and reality-capture services.",
};

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(
    servicesQuery,
    {},
    fallbackServices,
  );

  return (
    <>
      <section className="container-luxe py-20 md:py-28">
        <SectionHeading
          kicker="Our services"
          title="Every discipline, delivered to survey grade"
          intro="From aerial LiDAR to boundary law, each practice is led by an accredited specialist and delivered to a single, documented standard of accuracy."
        />
      </section>
      <section className="container-luxe grid gap-8 pb-24 md:grid-cols-2 lg:grid-cols-3 md:pb-32">
        {services.map((service, i) => (
          <ServiceCard key={service._id} service={service} index={i} />
        ))}
      </section>
      <CtaBand />
    </>
  );
}
