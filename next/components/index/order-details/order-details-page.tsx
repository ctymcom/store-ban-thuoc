import { OrderDetailsHeader } from "./components/order-details-header";
import { OrderDetailsTimeline } from "./components/order-details-timeline";
import { OrderDetailsInfo } from "./components/order-details-info";
import { OrderDetailsProducts } from "./components/order-details-products";
import { PayMoney } from "../cart/components/pay-money";
import { NumberPipe } from "../../../lib/pipes/number";
import { useOrderDetailsContext } from "./providers/order-details-provider";
import { Spinner } from "../../shared/utilities/spinner";

export function OrderDetailsPage() {
  const { order } = useOrderDetailsContext();

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

  return order ? (
    <>
      <OrderDetailsHeader code={order.orderNumber} status={order.statusText} />
      {order.timeline && <OrderDetailsTimeline order={order} />}
      <div className="mt-4">
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
  ) : (
    <Spinner />
  );
}
