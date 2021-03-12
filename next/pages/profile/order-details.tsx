import { OrderDetailsPage } from "../../components/index/order-details/order-details-page";
import {
  OrderDetailsProvider,
  useOrderDetailsContext,
} from "../../components/index/order-details/providers/order-details-provider";
import {
  OrderProvider,
  useOrderContext,
} from "../../components/index/order-history/providers/order-history-provider";
import { NotFound } from "../../components/shared/utilities/not-found";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";

export default function OrderDetails() {
  const { listOrder } = useOrderContext();
  console.log(listOrder);

  return listOrder ? (
    <>
      <ProfileUserLayout breadcrumb={"order-details"}>
        <OrderProvider>
          {listOrder?.length > 0 &&
            listOrder.map((item, index) => (
              <>
                <OrderDetailsProvider orderId={item.id} key={index}>
                  <OrderDetailsPage />
                </OrderDetailsProvider>
              </>
            ))}
        </OrderProvider>
      </ProfileUserLayout>
    </>
  ) : (
    <NotFound text="Không tìm thấy chi tiết đơn hàng này" className="text-gray-700" />
  );
}

OrderDetails.Layout = DefaultLayout;
