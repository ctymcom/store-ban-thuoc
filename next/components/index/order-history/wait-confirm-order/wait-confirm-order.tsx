import { DashboardLayout } from '../../../../layouts/dashboard-layout';
import { WaitConfirmOrder } from './component/wait-confirm-order';

export function WaitConfirmOrderPage () {
    return  <>
            <DashboardLayout>
                <WaitConfirmOrder/>
            </DashboardLayout>
    </>;
}