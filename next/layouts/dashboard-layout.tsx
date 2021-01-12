import { Appbar } from './components/appbar';
import { HeadSEO } from './components/head-seo';
// import Sidebar from './components/sidebar';
import dynamic from 'next/dynamic';
const Sidebar = dynamic<any>(() => import('./components/sidebar'))
export function DashboardLayout(props) {
    return <>
        <HeadSEO title={'Smart Loyalty Dashboard'}></HeadSEO>
        <Appbar />
        <div className="flex pt-14 w-full">
            <Sidebar />
            <div className="flex-1 p-6">
                {props.children}
            </div>
        </div>

    </>
}