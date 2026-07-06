import Link from "next/link";

import { TopoArt } from "@/components/TopoArt";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-parchment px-6 text-center">
      <TopoArt
        seed="lost"
        tone="gold"
        className="absolute inset-0 h-full w-full opacity-30"
      />
      <div className="relative space-y-6">
        <p className="kicker">Off the map</p>
        <h1 className="font-display text-6xl font-medium text-ink md:text-8xl">
          404
        </h1>
        <p className="mx-auto max-w-md text-ink/65">
          These coordinates don&rsquo;t correspond to any charted page. Let us
          guide you back to surveyed ground.
        </p>
        <Link
          href="/"
          className="inline-block border border-plum bg-plum px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-luxe text-cream transition-colors hover:bg-plum-deep"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
