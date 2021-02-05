import { CanceledOrderPage } from "../../../components/index/order-history/canceled-order/canceled-order";
import { DefaultLayout } from "../../../layouts/default-layout";

export default function CanceledOrder () {
    return <>
        <CanceledOrderPage/>
    </>;
}
CanceledOrder.Layout = DefaultLayout;