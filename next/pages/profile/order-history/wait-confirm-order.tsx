import { WaitConfirmOrderPage } from "../../../components/index/order-history/wait-confirm-order/wait-confirm-order";
import { DefaultLayout } from "../../../layouts/default-layout";
import { ProfileUserLayout } from "../../../layouts/profile-user-layout";
export default function WaitConfirmOrder() {
    return <>
        <ProfileUserLayout breadcrumbs="order">
            <WaitConfirmOrderPage />
        </ProfileUserLayout>
    </>
}
WaitConfirmOrder.Layout = DefaultLayout;