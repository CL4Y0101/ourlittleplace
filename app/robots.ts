import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // The prototype contains placeholder content and is not ready for indexing.
  return { rules: { userAgent: "*", disallow: "/" } };
}
