import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
  title, tagline, description, email, phone, address, social, stats
}`;

const serviceCard = `_id, title, "slug": slug.current, summary, features, image`;

export const servicesQuery = groq`*[_type == "service" && defined(slug.current)]
  | order(order asc){ ${serviceCard} }`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  ${serviceCard}, body
}`;

const projectCard = `_id, title, "slug": slug.current, client, location,
  summary, coverImage, featured, stats, completedAt`;

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)]
  | order(coalesce(completedAt, "1970-01-01") desc){ ${projectCard} }`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ${projectCard}, body,
  services[]->{ title, "slug": slug.current }
}`;

const postCard = `_id, title, "slug": slug.current, excerpt, coverImage,
  publishedAt, tags, author->{ name, role }`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc){ ${postCard} }`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ${postCard}, body
}`;

export const teamQuery = groq`*[_type == "teamMember" && defined(slug.current)]
  | order(order asc){
    _id, name, "slug": slug.current, role, bio, photo, credentials, linkedin
  }`;
