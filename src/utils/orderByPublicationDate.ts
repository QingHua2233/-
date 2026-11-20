import type { CollectionEntry } from "astro:content";

export function orderByPublicationDate(posts: CollectionEntry<"blog">[]) {
  return [...posts].sort((a, b) =>
    b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id)
  );
}
