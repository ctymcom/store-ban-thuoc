import { DashboardLayout } from "../../../layouts/dashboard-layout";
import { OrderHistory } from './component/order-history';
export function OrderHistoryPage() {
    return <>
        <DashboardLayout>
            <OrderHistory/>
        </DashboardLayout>
    </>   
}