import { DeliveredOrderPage } from "../../../components/index/order-history/delivered-order/delivered-order";
import { DefaultLayout } from "../../../layouts/default-layout";
export default function DeliveredOrder () {
    return <>
        <DeliveredOrderPage/>
    </>;
}
DeliveredOrder.Layout = DefaultLayout;