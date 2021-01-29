import { DashboardLayout } from "../../../layouts/dashboard-layout";
import { WaitDeliveryOrder } from './component/wait-delivery-order';

export function WaitDeliveryOrderPage () {
    return  <>
            <DashboardLayout>
                <WaitDeliveryOrder/>
            </DashboardLayout>
    </>;
}