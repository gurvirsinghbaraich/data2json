import BlogCard from "@/components/BlogCard";
import { PostsDocument, getBlogPosts } from "@/lib/getBlogPosts";

export default async function Blog() {
  const { posts }: PostsDocument = await getBlogPosts();

  return (
    <div className="w-full pt-16">
      <h2 className="text-white text-center text-7xl py-12 font-bold">Blog</h2>

      <div className="max-w-7xl mx-auto p-[1.4rem] py-12 grid grid-cols-3 gap-6">
        {posts.edges.map((post) => {
          return (
            <div key={post.node.slug} className="max-w-7xl">
              <BlogCard post={post.node} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
