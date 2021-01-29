import { HeadSEO } from "./components/head-seo";
import Sidebar from "./components/sidebar";

type DashboardProps = {
  [x: string]: any;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  activeMenu?: string;
  activeSubmenu?: string;
};
export type BreadcrumbItem = {
  title: string;
  path: string;
};
export function DashboardLayoutAdmin({
  title = " Dashboard Kho thuốc sỉ",
  breadcrumbs,
  activeMenu,
  activeSubmenu,
  ...props
}: DashboardProps) {
  return (
    <>
      <HeadSEO title={title}></HeadSEO>
      <div className="flex items-start w-full min-h-screen ">
        <Sidebar />
        <div className="flex-1 p-6 pb-20">{props.children}</div>
      </div>
    </>
  );
}
