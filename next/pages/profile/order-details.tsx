import { OrderDetailsPage } from "../../components/index/order-details/order-details-page";
import { DefaultLayout } from "../../layouts/default-layout";
export default function OrderDetails() {
    return <>
        <OrderDetailsPage />
    </>
}
OrderDetails.Layout = DefaultLayout;