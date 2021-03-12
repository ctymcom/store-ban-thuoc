import { useEffect, useState } from "react";
import { OrderDetailsPage } from "../../components/index/order-details/order-details-page";
import { OrderDetailsProvider } from "../../components/index/order-details/providers/order-details-provider";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";
import { Order } from "../../lib/repo/order.repo";

// interface PropsType extends ReactProps {
//   order?: Order;
// }

export default function OrderDetails(props) {
  // console.log(props.order);

  return (
    <>
      <ProfileUserLayout breadcrumb={"order-details"}>
        <OrderDetailsProvider orderId="6047273607f03e21d6555bef">
          <OrderDetailsPage />
        </OrderDetailsProvider>
      </ProfileUserLayout>
    </>
  );
}

OrderDetails.Layout = DefaultLayout;
