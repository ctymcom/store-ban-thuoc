import { useRouter } from "next/router";
import { OrderDetailsPage } from "../../components/index/order-details/order-details-page";
import {
  OrderDetailsProvider,
  useOrderDetailsContext,
} from "../../components/index/order-details/providers/order-details-provider";
import {
  OrderProvider,
  useOrderContext,
} from "../../components/index/order-history/providers/order-history-provider";

import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";

export default function OrderDetails() {
  const router = useRouter();

  const { id } = router.query;
  // console.log("query : " + id);

  return (
    <>
      <ProfileUserLayout breadcrumb={"order-details"}>
        <OrderProvider>
          <OrderDetailsProvider orderId={id}>
            <OrderDetailsPage />
          </OrderDetailsProvider>
        </OrderProvider>
      </ProfileUserLayout>
    </>
  );
}

OrderDetails.Layout = DefaultLayout;
