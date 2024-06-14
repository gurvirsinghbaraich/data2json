import BlogCard from "@/components/BlogCard";
import { graphqlClient } from "@/utils/graphql";

const GetAllPostsDocument = `
  query {
    posts(last: 9) {
      edges {
        node{
          title,
          slug,
          excerpt,

          featuredImage {
            node { 
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

type PostsDocument = {
  posts: {
    edges: {
      node: {
        title: string;
        slug: string;
        excerpt: string;

        featuredImage: {
          node: {
            sourceUrl: string;
          };
        };
      };
    }[];
  };
};

export default async function Blog() {
  const { posts }: PostsDocument = await graphqlClient().request(
    GetAllPostsDocument
  );

  return (
    <div className="w-full pt-16">
      <h2 className="text-white text-center text-7xl py-12 font-bold">Blog</h2>

      <div className="max-w-7xl mx-auto p-[1.4rem] py-12">
        {posts.edges.map((post) => {
          return <BlogCard post={post.node} key={post.node.slug} />;
        })}
      </div>
    </div>
  );
}
