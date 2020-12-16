import { NavBar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { Routes } from './routes';

export function DashboardLayout({ children }) {
    
    return <>
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar title="Submit QR"  routes={Routes}></Sidebar>
        <div className="flex flex-col flex-1">
            <NavBar></NavBar>
            <main className="h-full pb-16 overflow-y-auto">
                <div className="container p-6 mx-auto grid">
                    {children}
                </div>
            </main>
        </div>
    </div>
    </>
}