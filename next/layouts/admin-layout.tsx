import { HeadAdmin } from "./admin-layout/head-admin";
import Sidebar from "./admin-layout/sidebar";

type DashboardProps = {
  [x: string]: any;
  title?: string;
};
export function AdminLayout({
  title = "Dashboard Kho Thuốc Sỉ",
  ...props
}: DashboardProps) {
  return (
    <>
      <HeadAdmin title={title}></HeadAdmin>
      <div className="flex w-full h-screen bg-gray-100">
        <div className="w-60 z-10 shadow-md bg-white">
          <Sidebar />
        </div>
        <div className="flex-grow px-6 py-5 h-screen v-scrollbar">
          {props.children}
        </div>
      </div>
    </>
  );
}
