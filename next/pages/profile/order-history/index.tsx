import { OrderHistoryPage } from "../../../components/index/order-history/order-history";
import { DefaultLayout } from "../../../layouts/default-layout";
export default function OrderHistory() {
    return <>
        <OrderHistoryPage />
    </>
}
OrderHistory.Layout = DefaultLayout;