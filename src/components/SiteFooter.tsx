import Link from "next/link";

import type { SiteSettings } from "@/lib/types";
import { Wordmark } from "./Logo";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/80">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-20">
        <div className="space-y-5">
          <Wordmark light />
          {settings.tagline && (
            <p className="max-w-xs font-display text-lg italic text-gold-pale/90">
              {settings.tagline}
            </p>
          )}
        </div>

        <nav aria-label="Footer — company" className="space-y-4">
          <h3 className="kicker">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link className="transition-colors hover:text-gold-pale" href="/about">About</Link></li>
            <li><Link className="transition-colors hover:text-gold-pale" href="/projects">Projects</Link></li>
            <li><Link className="transition-colors hover:text-gold-pale" href="/insights">Insights</Link></li>
            <li><Link className="transition-colors hover:text-gold-pale" href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer — services" className="space-y-4">
          <h3 className="kicker">Services</h3>
          <ul className="space-y-3 text-sm">
            <li><Link className="transition-colors hover:text-gold-pale" href="/services/lidar-aerial-mapping">LiDAR &amp; Aerial</Link></li>
            <li><Link className="transition-colors hover:text-gold-pale" href="/services/cadastral-boundary-surveying">Cadastral</Link></li>
            <li><Link className="transition-colors hover:text-gold-pale" href="/services/gis-spatial-analytics">GIS &amp; Analytics</Link></li>
            <li><Link className="transition-colors hover:text-gold-pale" href="/services">All services →</Link></li>
          </ul>
        </nav>

        <div className="space-y-4">
          <h3 className="kicker">Enquiries</h3>
          <ul className="space-y-3 text-sm">
            {settings.email && (
              <li>
                <a className="transition-colors hover:text-gold-pale" href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li>
                <a className="transition-colors hover:text-gold-pale" href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="whitespace-pre-line text-cream/60">
                {settings.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-luxe flex flex-col gap-2 py-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} {settings.title}. All rights reserved.</p>
          <p className="tracking-luxe uppercase">Measured. Mapped. Mastered.</p>
        </div>
      </div>
    </footer>
  );
}
