"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Wordmark } from "./Logo";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/80 bg-parchment/90 backdrop-blur-md">
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link href="/" aria-label="HPS Geospatial — home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.72rem] font-semibold uppercase tracking-luxe transition-colors ${
                  active ? "text-plum" : "text-ink/70 hover:text-plum"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="border border-gold bg-transparent px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-luxe text-gold transition-colors hover:bg-gold hover:text-cream"
          >
            Request a Survey
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-sand bg-cream md:hidden"
          aria-label="Mobile"
        >
          <div className="container-luxe flex flex-col py-4">
            {[...NAV, { href: "/contact", label: "Request a Survey" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-sand/60 py-4 text-[0.78rem] font-semibold uppercase tracking-luxe text-ink/80 last:border-0 hover:text-plum"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
