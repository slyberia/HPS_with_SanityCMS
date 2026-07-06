import type { PortableTextBlock } from "sanity";

/** Sanity image reference as returned by GROQ projections. */
export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
};

export type Stat = { value: string; label: string };

export type SiteSettings = {
  title: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  social?: { linkedin?: string; instagram?: string; x?: string };
  stats?: Stat[];
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  features?: string[];
  image?: SanityImage;
  body?: PortableTextBlock[];
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  location?: string;
  summary: string;
  coverImage?: SanityImage;
  featured?: boolean;
  stats?: Stat[];
  completedAt?: string;
  body?: PortableTextBlock[];
  services?: { title: string; slug: string }[];
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImage;
  publishedAt: string;
  tags?: string[];
  author?: { name: string; role?: string };
  body?: PortableTextBlock[];
};

export type TeamMember = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  photo?: SanityImage;
  credentials?: string[];
  linkedin?: string;
};
