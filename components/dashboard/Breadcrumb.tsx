"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const createUrls = (): { name: string; url: string }[] => {
    const urls: { name: string; url: string }[] = [];
    const breadcrumbs = pathname.split("/");

    breadcrumbs.forEach((breadcrumb, idx) => {
      urls.push({
        name: breadcrumb.replace(/-/gm, " "),
        url: breadcrumbs.slice(0, idx + 1).join("/"),
      });
    });

    return urls;
  };

  return (
    <div className="w-full bg-stone-950 max-h-[91px] h-[91px] border-b border-stone-700 p-[1.4rem]">
      <h1 className="text-[22.4px] truncate text-white flex space-x-[0.7rem] items-center h-full">
        {createUrls().map((breadcrumb, idx) => {
          return (
            <div className="flex space-x-[0.7rem] items-center" key={idx}>
              {idx === 0 ? null : (
                <span className="text-stone-700 text-[32px] font-light">/</span>
              )}

              <Link className="underline capitalize" href={breadcrumb.url}>
                {breadcrumb.name}
              </Link>
            </div>
          );
        })}
      </h1>
    </div>
  );
}
