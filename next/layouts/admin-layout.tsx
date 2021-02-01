import { HeadAdmin } from "./admin-layout/head-admin";
import Sidebar from "./admin-layout/sidebar";

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
export function AdminLayout({
  title = "Dashboard Kho thuốc sỉ",
  breadcrumbs,
  activeMenu,
  activeSubmenu,
  ...props
}: DashboardProps) {
  return (
    <>
      <HeadAdmin title={title}></HeadAdmin>
      <div className="flex items-start w-full min-h-screen ">
        <Sidebar />
        <div className="flex-1 p-6 pb-20">{props.children}</div>
      </div>
    </>
  );
}
