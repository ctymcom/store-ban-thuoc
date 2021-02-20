import { OrderHistoryPage } from "../../../components/index/order-history/order-history";
import { DefaultLayout } from "../../../layouts/default-layout";
import { ProfileUserLayout } from "../../../layouts/profile-user-layout";
export default function OrderHistory() {
    return <>
        <ProfileUserLayout breadcrumbs="order">
            <OrderHistoryPage />
        </ProfileUserLayout>
        
    </>
}
OrderHistory.Layout = DefaultLayout;