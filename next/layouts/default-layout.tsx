import { Footer } from "./default-layout/footer";
import { HeadSEO } from "./default-layout/head-seo";
import { Header } from "./default-layout/header/header";
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
export function DefaultLayout({
  title = "Kho Thuốc Sỉ",
  breadcrumbs,
  activeMenu,
  activeSubmenu,
  ...props
}: DashboardProps) {
  return (
    <>
      <HeadSEO title={title}></HeadSEO>
      <Header breadcrumbs={breadcrumbs} />
        <div className="w-full min-h-screen">
          {props.children}
        </div>
      <Footer/>
    </>
  );
}
