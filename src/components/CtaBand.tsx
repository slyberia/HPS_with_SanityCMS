import Link from "next/link";

import { TopoArt } from "./TopoArt";

export function CtaBand({
  title = "Commission a survey with absolute confidence.",
  body = "Speak with a principal surveyor about your site, your risks, and the accuracy your project deserves.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-plum-deep">
      <TopoArt
        seed="cta-band"
        tone="plum"
        className="absolute inset-0 h-full w-full opacity-40"
      />
      <div className="container-luxe relative flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="kicker">Begin the conversation</p>
          <h2 className="text-balance font-display text-4xl font-medium leading-tight text-cream md:text-5xl">
            {title}
          </h2>
          <p className="text-cream/70">{body}</p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 border border-gold bg-gold px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-luxe text-ink transition-colors hover:bg-transparent hover:text-gold-pale"
        >
          Request a Survey
        </Link>
      </div>
    </section>
  );
}
