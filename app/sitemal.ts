import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "/",
      priority: 1,
    },

    {
      url: "/login",
      priority: 0.5,
    },

    {
      url: "/sign-up",
      priority: 0.5,
    },
  ];
}
