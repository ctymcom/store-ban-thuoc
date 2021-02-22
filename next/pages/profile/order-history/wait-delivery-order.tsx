import { WaitDeliveryOrderPage } from "../../../components/index/order-history/wait-delivery-order/wait-delivery-order";
import { DefaultLayout } from "../../../layouts/default-layout";
import { ProfileUserLayout } from "../../../layouts/profile-user-layout";

export default function WaitDeliveryOrder () {
    return <>
        <ProfileUserLayout breadcrumbs="order">
            <WaitDeliveryOrderPage/>
        </ProfileUserLayout>
        
    </>;
}
WaitDeliveryOrder.Layout = DefaultLayout;