/**
 * Sanity environment configuration.
 *
 * The project ID and dataset are not secrets (the dataset is public), so we
 * fall back to the HPS project defaults when env vars are absent — this keeps
 * fresh clones and preview deploys working with zero configuration.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bv8toflp";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01";
