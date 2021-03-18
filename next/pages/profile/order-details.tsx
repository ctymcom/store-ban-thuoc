import { OrderDetailsPage } from "../../components/index/order-details/order-details-page";
import { OrderDetailsProvider } from "../../components/index/order-details/providers/order-details-provider";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";

export default function OrderDetails() {
  return (
    <>
      <ProfileUserLayout breadcrumb="order-details">
        <OrderDetailsProvider>
          <OrderDetailsPage />
        </OrderDetailsProvider>
      </ProfileUserLayout>
    </>
  );
}

OrderDetails.Layout = DefaultLayout;
