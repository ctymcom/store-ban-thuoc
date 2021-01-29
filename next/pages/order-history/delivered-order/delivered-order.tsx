import { DashboardLayout } from "../../../layouts/dashboard-layout";
import { DeliveredOrder } from './component/delivered-order';

export function DeliveredOrderPage () {
    return  <>
            <DashboardLayout>
                <DeliveredOrder/>
            </DashboardLayout>
    </>;
}