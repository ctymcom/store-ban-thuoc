import { OrderDetailsPage } from "../../components/index/order-details/order-details-page";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";
export default function OrderDetails() {
    return <>
        <ProfileUserLayout>
            <OrderDetailsPage />
        </ProfileUserLayout>
    </>
}
OrderDetails.Layout = DefaultLayout;