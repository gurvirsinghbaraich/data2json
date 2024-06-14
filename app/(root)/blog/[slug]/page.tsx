import { getBlogPosts } from "@/lib/getBlogPosts";
import { graphqlClient } from "@/utils/graphql";
import { Metadata } from "next";
import Image from "next/image";
import { stripHtml } from "string-strip-html";

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

const GetPostDocument = `
  query GetPost($slug: String!) {
    postBy(slug: $slug) {
      title,
      excerpt,
      featuredImage {
        node {
          sourceUrl
        }
      },
      content
    }
  }
`;

type PostDocument = {
  postBy: {
    title: string;
    excerpt: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
    content: string;
  };
};

export async function generateStaticParams() {
  const { posts }: PostsDocument = await getBlogPosts();

  return posts.edges.map((post) => ({
    slug: post.node.slug,
  }));
}

export const generateMetadata: (context: {
  params: { slug: string };
}) => Promise<Metadata> = async function ({ params }) {
  const { postBy }: PostDocument = await graphqlClient().request(
    GetPostDocument,
    {
      slug: params.slug,
    }
  );

  return {
    title: `${postBy.title} - Data2Json`,
    description: stripHtml(postBy.excerpt).result,

    openGraph: {
      title: `${postBy.title} - Data2Json`,
      images: postBy.featuredImage.node.sourceUrl,
      description: stripHtml(postBy.excerpt).result,
    },
  };
};

export default async function PostDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { postBy }: PostDocument = await graphqlClient().request(
    GetPostDocument,
    {
      slug: params.slug,
    }
  );

  return (
    <div className="max-w-7xl mx-auto prose prose-invert p-[1.4rem] sm:prose-xl md:prose-2xl py-32">
      <h1 className="line-clamp-3">{postBy.title}</h1>
      <Image
        src={postBy.featuredImage.node.sourceUrl}
        alt={postBy.title}
        width={960}
        height={540}
        className="w-full lg:aspect-[16/4] object-contain bg-black"
      />

      <div dangerouslySetInnerHTML={{ __html: postBy.content }}></div>
    </div>
  );
}
