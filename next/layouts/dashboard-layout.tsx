import { Appbar } from './components/appbar';
import Sidebar from './components/sidebar';
export function DashboardLayout(props) {
    return <>   
        <Appbar />
        <div className="flex pt-14 w-full">
            <Sidebar />
            <div className="flex-1 p-6">
                {props.children}
            </div>
        </div>

    </>
}