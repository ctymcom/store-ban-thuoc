import { DashboardLayout } from "../../../layouts/dashboard-layout";
import { CanceledOrder } from './component/canceled-order';

export function CanceledOrderPage () {
    return  <>
            <DashboardLayout>
                <CanceledOrder/>
            </DashboardLayout>
    </>;
}