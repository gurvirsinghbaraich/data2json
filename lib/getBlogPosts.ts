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

export type PostsDocument = {
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

export async function getBlogPosts(): Promise<PostsDocument> {
  return await graphqlClient().request(GetAllPostsDocument);
}
