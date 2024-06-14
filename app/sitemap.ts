import { getBlogPosts } from "@/lib/getBlogPosts";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getBlogPosts();

  return [
    {
      url: "/",
      priority: 1,
    },

    ...posts.edges.map((post) => ({
      url: "/blog/" + post.node.slug,
      priority: 0.9,
    })),

    {
      url: "/blog",
      priority: 0.8,
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
