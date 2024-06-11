import Link from "next/link";

type BreadcrumbProps = {
  currentUrl: string;
};

export default function Breadcrumb(props: BreadcrumbProps) {
  const createUrls = (): { name: string; url: string }[] => {
    const urls: { name: string; url: string }[] = [];
    const breadcrumbs = props.currentUrl.split("/");

    breadcrumbs.forEach((breadcrumb, idx) => {
      urls.push({
        name: breadcrumb,
        url: breadcrumbs.slice(0, idx + 1).join("/"),
      });
    });

    return urls;
  };

  return (
    <div className="w-full bg-stone-950 max-h-[91px] h-[91px] border-b border-stone-700 p-[1.4rem]">
      <h1 className="text-[22.4px] text-white flex space-x-[0.7rem] items-center h-full">
        {createUrls().map((breadcrumb, idx) => {
          return (
            <>
              {idx === 0 ? null : (
                <span className="text-stone-700 text-[32px] font-light">/</span>
              )}

              <Link className="underline capitalize" href={breadcrumb.url}>
                {breadcrumb.name}
              </Link>
            </>
          );
        })}
      </h1>
    </div>
  );
}
