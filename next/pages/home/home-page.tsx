import { Header } from "../../layouts/components/header";
import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Home } from "./component/home";

export function HomePage() {
    return <>
        <DashboardLayout>
            <Home />
        </DashboardLayout>
    </>
}