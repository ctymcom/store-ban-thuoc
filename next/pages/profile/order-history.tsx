import { OrderHistoryPage } from "../../components/index/order-history/order-history";
import { OrderProvider } from "../../components/index/order-history/providers/order-history-provider";
import { OrderStatusProvider } from "../../components/index/order-history/providers/order-status-provider";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";
export default function OrderHistory() {
  return (
    <>
      <ProfileUserLayout breadcrumb="order">
        <OrderProvider>
          <OrderStatusProvider>
            <OrderHistoryPage />
          </OrderStatusProvider>
        </OrderProvider>
      </ProfileUserLayout>
    </>
  );
}
OrderHistory.Layout = DefaultLayout;
