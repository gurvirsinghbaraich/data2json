import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { stripHtml } from "string-strip-html";

type BlogCardProps = {
  post: {
    title: string;
    slug: string;
    excerpt: string;

    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="max-w-sm border-2 border-stone-800 shadow-md shadow-stone-800">
      <div className="w-full h-full">
        <Image
          width={384}
          height={216}
          alt={post.title}
          src={post.featuredImage.node.sourceUrl}
        />
      </div>

      <div className="bg-white p-[1.4rem] flex flex-col gap-3">
        <Link href={"/blog/" + post.slug}>
          <h3 className="text-2xl font-semibold line-clamp-2 hover:underline hover:underline-offset-2 hover:decoration-dotted">
            {post.title}
          </h3>
        </Link>

        <p className="line-clamp-5 text-balance text-stone-800">
          {stripHtml(post.excerpt).result}
        </p>
        <Link
          href={"/blog/" + post.slug}
          className="flex gap-1 items-center bg-stone-950 w-max text-white p-3 rounded cursor-pointer mt-3"
        >
          <FiExternalLink />
          <div>Read More</div>
        </Link>
      </div>
    </div>
  );
}
