import { OrderDetailsHeader } from "./components/order-details-header";
import { OrderDetailsTimeline } from "./components/order-details-timeline";
import { OrderDetailsInfo } from "./components/order-details-info";
import { OrderDetailsProducts } from "./components/order-details-products";
import { PayMoney } from "../cart/components/pay-money";
import { NumberPipe } from "../../../lib/pipes/number";
import { useOrderDetailsContext } from "./providers/order-details-provider";
import { Spinner } from "../../shared/utilities/spinner";
import { Button } from "../../shared/utilities/form/button";
import { RateOrderDialog } from "../../shared/order/rate-order-dialog";
import { useState } from "react";

export function OrderDetailsPage() {
  const { order, completeOrder } = useOrderDetailsContext();
  const [openRateOrderDialog, setOpenRateOrderDialog] = useState(false);

  let datetime = new Date(order?.updatedAt);
  datetime.toDateString();

  const listMoneyCheckout = [
    {
      title: "Tổng tiền hàng",
      money: order?.subtotal ? order.subtotal : 0,
    },
    {
      title: "Voucher giảm giá",
      money: order?.discount ? order.discount : 0,
    },
  ];

  if (!order) return <Spinner />;

  return (
    <>
      <RateOrderDialog
        isOpen={openRateOrderDialog}
        onClose={setOpenRateOrderDialog}
        title="Đánh giá đơn hàng"
        width="550px"
        orderId={order.id}
      />
      <OrderDetailsHeader code={order.orderNumber} status={order.statusText} />
      {order.timeline && <OrderDetailsTimeline order={order} />}
      <div className="flex flex-col-reverse sm:flex-row mt-4">
        <div className="mr-4 mt-2 sm:mt-0">
          <OrderDetailsInfo
            name={order.contactName}
            phone={order.phone}
            address={order.fullAddress}
            deliveryMethod={order.deliveryMethod}
            deliveryMethodText={order.deliveryMethodText}
            paymentMethod={order.paymentMethod}
            paymentMethodText={order.paymentMethodText}
          />
        </div>
        {order.status == 7 && (
          <Button
            accent
            text="Xác nhận đơn hàng"
            className="px-10 h-12 rounded-sm ml-0 sm:ml-auto whitespace-nowrap"
            asyncLoading
            onClick={async () => {
              await completeOrder(order.id).then((res) => {
                if (res) setOpenRateOrderDialog(true);
              });
            }}
          />
        )}
      </div>
      <OrderDetailsProducts products={order.items} />
      <div className="flex justify-end w-full mt-8">
        <div className="min-w-full sm:min-w-xs ">
          <PayMoney listMoney={listMoneyCheckout} order={order} />
          <div className="flex justify-between mt-5 md:mt-0 py-2 md:pt-2 border-t-4 border-b-4 md:border-b-0 border-gray-200">
            <p className="text-md lg:text-lg uppercase md:normal-case font-extralight">
              Thành tiền
            </p>
            <p className="font-bold text-primary text-lg">{NumberPipe(order.amount, true)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
