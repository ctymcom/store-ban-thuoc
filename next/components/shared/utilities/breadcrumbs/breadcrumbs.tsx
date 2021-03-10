import Link from "next/link";

interface PropsType extends ReactProps {
  breadcrumbs: {
    href?: string;
    label: string;
  }[];
}

export default function BreadCrumbs({ breadcrumbs, ...props }: PropsType) {
  return (
    <div className={`uppercase text-sm lg:text-base font-semibold ${props.className || ""}`}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {breadcrumb.href ? (
            <>
              <Link href={breadcrumb.href}>
                <a className="text-gray-600 hover:text-primary hover:underline">
                  <span>{breadcrumb.label}</span>
                </a>
              </Link>
              <span className="px-1">/</span>
            </>
          ) : (
            <a className="text-primary">
              <span>{breadcrumb.label}</span>
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
