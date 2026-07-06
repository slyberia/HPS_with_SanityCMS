import Image from "next/image";

import type { SanityImage } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { TopoArt } from "./TopoArt";

/**
 * Renders a Sanity image when present; otherwise falls back to generated
 * topographic contour art so layouts never depend on stock photography.
 */
export function CmsImage({
  image,
  alt,
  seed,
  tone = "plum",
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: {
  image?: SanityImage;
  alt: string;
  seed: string;
  tone?: "plum" | "estate" | "gold" | "sand";
  sizes?: string;
  className?: string;
}) {
  if (image?.asset?._ref) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={urlFor(image).width(1600).url()}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <TopoArt seed={seed} tone={tone} className="h-full w-full" />
    </div>
  );
}
