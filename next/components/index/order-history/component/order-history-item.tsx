import { NumberPipe } from "../../../../lib/pipes/number";
import moment from "moment-timezone";
import Link from "next/link";
import { Order } from "../../../../lib/repo/order.repo";
import { useCart } from "../../../../lib/providers/cart-provider";
import { Button } from "../../../shared/utilities/form/button";
import { useRouter } from "next/router";
import { RateOrderDialog } from "../../../shared/order/rate-order-dialog";
import { useState } from "react";
import { useOrdeHistoryContext } from "../providers/order-history-provider";

interface PropsType extends ReactProps {
  order: Order;
}
export function OrderHistoryItem({ order }: PropsType) {
  const [openRateOrderDialog, setOpenRateOrderDialog] = useState(true);

  const { completeOrder } = useOrdeHistoryContext();
  const { reOrder } = useCart();
  const router = useRouter();
  return (
    <>
      {order.status == 7 && (
        <RateOrderDialog
          isOpen={openRateOrderDialog}
          onClose={setOpenRateOrderDialog}
          title="Đánh giá đơn hàng"
          width="550px"
          orderId={order.id}
        />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700 border-b py-4 md:py-3">
        <div className="flex-grow w-full sm:w-auto">
          <div className="mb-1">
            Mã đơn hàng:
            <Link href={{ pathname: "/profile/order-details", query: { id: order.id } }}>
              <a className="ml-2 font-bold hover:underline hover:text-primary">
                {order.orderNumber}
              </a>
            </Link>
          </div>

          {/* <p className="pt-1 md:pt-0">
            Thời gian giao hàng dự kiến:
            <span className="ml-1 md:ml-2 font-bold">
              {moment(order.createdAt).format("DD/MM")} đến{" "}
              {moment(item.updatedAt).format("DD/MM/YYYY")}
            </span>
          </p> */}

          <div className="pt-1 md:pt-0">
            Tổng sản phẩm:
            <span className="ml-2 font-semibold">{NumberPipe(order.itemCount)} sản phẩm</span>
          </div>

          <div className="pt-1 md:pt-0">
            Tổng tiển:
            <span className="number-price text-primary ml-2 font-bold">
              {NumberPipe(order.amount, true)}
            </span>
          </div>

          <div className="pt-1 md:pt-0">
            Trạng thái đơn hàng:
            <span className="ml-2 font-semibold">{order.statusText}</span>
          </div>
        </div>

        <div className="flex-grow-0 flex-shrink-0 flex-wrap w-full sm:w-auto flex">
          {order.status == 7 && (
            <Button
              accent
              text="Xác nhận đơn"
              className="rounded-sm whitespace-nowrap mt-2 md:mt-0"
              asyncLoading
              onClick={async () => {
                await completeOrder(order.id).then((res) => {
                  if (res) setOpenRateOrderDialog(true);
                });
              }}
            />
          )}
          <Link href={{ pathname: "/profile/order-details", query: { id: order.id } }}>
            <a className="btn-primary hover:underline ml-2 whitespace-nowrap mt-2 md:mt-0">
              Xem chi tiết
            </a>
          </Link>
          <Button
            className="btn-outline hover:underline ml-2 whitespace-nowrap mt-2 md:mt-0"
            asyncLoading
            onClick={async () => {
              await reOrder([
                ...order.items.map((item) => ({ productId: item.productId, qty: item.qty })),
              ]);
              router.push("/cart");
            }}
            text="Mua lại"
          />
        </div>
      </div>
    </>
  );
}
