import { WaitDeliveryOrderPage } from "../../../components/index/order-history/wait-delivery-order/wait-delivery-order";
import { DefaultLayout } from "../../../layouts/default-layout";

export default function WaitDeliveryOrder () {
    return <>
        <WaitDeliveryOrderPage/>
    </>;
}
WaitDeliveryOrder.Layout = DefaultLayout;