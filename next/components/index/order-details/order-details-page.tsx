import { OrderDetailsHeader } from "./components/order-details-header";
import { OrderDetailsTimeline } from "./components/order-details-timeline";
import { OrderDetailsInfo } from "./components/order-details-info";
import { OrderDetailsProducts } from "./components/order-details-products";
import { PayMoney } from "../cart/components/pay-money";
import { NumberPipe } from "../../../lib/pipes/number";
import { useOrderDetailsContext } from "./providers/order-details-provider";
import format from "date-fns/format";
import { Spinner } from "../../shared/utilities/spinner";
import { useOrderContext } from "../order-history/providers/order-history-provider";

export function OrderDetailsPage() {
  const { order } = useOrderDetailsContext();
  const { listOrderStatus } = useOrderContext();

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
      <div className="h-auto w-full lg:w-full ml-0 lg:ml-4 px-3 lg:px-0">
        <div className="">
          <div className="w-full flex justify-between">
            <div className="w-full">
              <OrderDetailsHeader
                id={order.orderNumber}
                status={order?.status}
                listOrderStatus={listOrderStatus}
              />
              <OrderDetailsTimeline order={order} />
              <OrderDetailsInfo
                name={order.contactName}
                phone={order.phone ? order.phone : "phone: null"}
                address={order.fullAddress}
                deliveryType={order.deliveryMethod}
                deliveryExpectedDate={`Thời gian giao dự kiến: ${format(
                  datetime,
                  "hh:mm, dd/mm/yyyy"
                )}`}
                paymentType={order.paymentMethod}
                paymentStatus="Thanh toán thành công"
              />
              <OrderDetailsProducts products={order.items} />
              <div className="flex justify-end w-full mt-7 lg:mt-3">
                <div className="min-w-full sm:min-w-xs ">
                  <PayMoney listMoney={listMoneyCheckout} order={order} />
                  <div className="flex justify-between mt-5 md:mt-0 py-2 md:pt-2 border-t-4 border-b-4 md:border-b-0 border-gray-200">
                    <p className="text-md lg:text-lg uppercase md:normal-case font-extralight">
                      Thành tiền
                    </p>
                    <p className="font-bold text-primary text-lg">
                      {NumberPipe(order.amount, true)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}
