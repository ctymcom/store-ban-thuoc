import { DeliveredOrderPage } from "../../../components/index/order-history/delivered-order/delivered-order";
import { DefaultLayout } from "../../../layouts/default-layout";
import { ProfileUserLayout } from "../../../layouts/profile-user-layout";
export default function DeliveredOrder () {
    return <>
        <ProfileUserLayout breadcrumbs="order">
            <DeliveredOrderPage/>
        </ProfileUserLayout>  
    </>;
}
DeliveredOrder.Layout = DefaultLayout;