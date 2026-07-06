import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import {
  fallbackServices,
  fallbackSettings,
} from "@/lib/fallback-content";
import type { Service, SiteSettings } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesQuery, settingsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a survey or speak with a principal surveyor about your project.",
};

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    sanityFetch<SiteSettings>(settingsQuery, {}, fallbackSettings),
    sanityFetch<Service[]>(servicesQuery, {}, fallbackServices),
  ]);

  return (
    <section className="container-luxe grid gap-16 py-20 md:grid-cols-[1fr_1.4fr] md:py-28">
      <div className="space-y-10">
        <SectionHeading
          kicker="Contact"
          title="Begin with a conversation"
          intro="Every engagement starts with a principal surveyor understanding your site and the decision your survey must support."
        />
        <dl className="space-y-6">
          {settings.email && (
            <div>
              <dt className="kicker">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${settings.email}`}
                  className="font-display text-xl text-plum hover:text-gold"
                >
                  {settings.email}
                </a>
              </dd>
            </div>
          )}
          {settings.phone && (
            <div>
              <dt className="kicker">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
                  className="font-display text-xl text-plum hover:text-gold"
                >
                  {settings.phone}
                </a>
              </dd>
            </div>
          )}
          {settings.address && (
            <div>
              <dt className="kicker">Office</dt>
              <dd className="mt-1 whitespace-pre-line font-display text-lg leading-snug text-ink/80">
                {settings.address}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="border border-sand bg-parchment p-8 md:p-12">
        <ContactForm services={services.map((s) => s.title)} />
      </div>
    </section>
  );
}
