import { client } from "./client";

/**
 * Fetch from Sanity with a graceful fallback.
 *
 * Returns `fallback` when the dataset is unreachable, unconfigured, or the
 * query legitimately matches nothing — so pages always render meaningful
 * content, even on a fresh clone with an empty CMS.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    if (data == null) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch (error) {
    console.error("[sanity] fetch failed, serving fallback content:", error);
    return fallback;
  }
}
