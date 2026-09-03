import type { Metadata } from "next";

/** Canonical public origin (mirrors metadataBase in app/layout.tsx). */
export const SITE_URL = "https://f1odisha.com";

/** One source of truth for per-page SEO + social metadata. */
export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | F1 Odisha`,
      description,
      type: "website",
    },
  };
}
