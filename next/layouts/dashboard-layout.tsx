import { Appbar } from './components/appbar';
import { Footer } from './components/footer';
import { HeadSEO } from './components/head-seo';
// import Sidebar from './components/sidebar';
import dynamic from 'next/dynamic';
const Sidebar = dynamic<any>(() => import('./components/sidebar'))
type DashboardProps = {
    [x: string] : any,
    title?: string,
    breadcrumbs?: BreadcrumbItem[],
    activeMenu?: string,
    activeSubmenu?: string
}
export type BreadcrumbItem = {
    title: string,
    path: string
}
export function DashboardLayout({ title = 'Smart Loyalty Dashboard',breadcrumbs, activeMenu, activeSubmenu, ...props}: DashboardProps) {
    return <>
        <HeadSEO title={title}></HeadSEO>
        <Appbar breadcrumbs={breadcrumbs}/>
        <div className="flex pt-14 w-full">
            <Sidebar activeMenu={activeMenu} activeSubmenu={activeSubmenu}/>
            <div className="flex-1 p-6">
                {props.children}
            </div>
        </div>
        <Footer />
    </>
}