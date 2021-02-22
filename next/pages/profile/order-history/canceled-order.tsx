import { CanceledOrderPage } from "../../../components/index/order-history/canceled-order/canceled-order";
import { DefaultLayout } from "../../../layouts/default-layout";
import { ProfileUserLayout } from "../../../layouts/profile-user-layout";

export default function CanceledOrder () {
    return <>
        <ProfileUserLayout breadcrumbs="order">
            <CanceledOrderPage/>
        </ProfileUserLayout>
    </>;
}
CanceledOrder.Layout = DefaultLayout;