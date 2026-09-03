import type { MetadataRoute } from "next";

import { getEventSlugs } from "@/lib/data/events";
import { SITE_URL } from "@/lib/metadata";

const STATIC_ROUTES = [
  "",
  "/about",
  "/events",
  "/schedule",
  "/membership",
  "/docs",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const events: MetadataRoute.Sitemap = getEventSlugs().map((slug) => ({
    url: `${SITE_URL}/events/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...events];
}
