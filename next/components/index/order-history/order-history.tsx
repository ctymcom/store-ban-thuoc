import { DefaultLayout } from "../../../layouts/default-layout";
import { OrderHistory } from './component/order-history';
export function OrderHistoryPage() {
    return <>
        <DefaultLayout>
            <OrderHistory/>
        </DefaultLayout>
    </>   
}