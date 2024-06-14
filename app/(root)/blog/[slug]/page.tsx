import { graphqlClient } from "@/utils/graphql";
import Image from "next/image";

const GetPostDocument = `
  query GetPost($slug: String!) {
    postBy(slug: $slug) {
      title,
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
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
    content: string;
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