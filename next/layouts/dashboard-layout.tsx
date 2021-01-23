import { Appbar } from "./components/appbar";
import { Footer } from "./components/footer";
import { HeadSEO } from "./components/head-seo";
import { Header } from "./components/header";
// import Sidebar from './components/sidebar';
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
export function DashboardLayout({
  title = "Kho Thuốc Sỉ",
  breadcrumbs,
  activeMenu,
  activeSubmenu,
  ...props
}: DashboardProps) {
  return (
    <>
      <HeadSEO title={title}></HeadSEO>
      <Header />
      <div className="w-full min-h-screen">
        {props.children}
      </div>
      <Footer />
    </>
  );
}
