import { NumberPipe } from "../../../../lib/pipes/number";
import moment from "moment-timezone";
import Link from "next/link";
import { Order } from "../../../../lib/repo/order.repo";
import { NotFound } from "../../../shared/utilities/not-found";
import { BiListPlus } from "react-icons/bi";

interface PropsType extends ReactProps {
  order: Order;
  index?: string;
  listOrderStatus?: any;
}

export function OrderHistoryItem({ order, index, listOrderStatus }: PropsType) {
  function showStatusOrder(status) {
    let label = "";
    listOrderStatus?.forEach(function (value) {
      if (value?.code === status) {
        label = value?.name;
      }
      if (status === 0) {
        label = "Không xác định";
      }
    });
    return label;
  }

  return order ? (
    <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700 border-b py-4 md:py-3">
      <div className="flex-grow w-full sm:w-auto">
        <div className="mb-1">
          Mã đơn hàng:
          <Link href={{ pathname: "/profile/order-details", query: { id: order.id } }}>
            <a className="ml-2 font-bold hover:underline hover:text-primary">
              {order?.orderNumber}
            </a>
          </Link>
        </div>

        <p className="pt-1 md:pt-0">
          Thời gian giao hàng dự kiến:
          <span className="ml-1 md:ml-2 font-bold">
            {moment(order.createdAt).format("DD/MM")} đến{" "}
            {moment(order.updatedAt).format("DD/MM/YYYY")}
          </span>
        </p>

        <div className="pt-1 md:pt-0">
          <p>
            Tổng sản phẩm:
            <span className="ml-2 font-bold">{order?.itemCount}</span>
          </p>

          <div className="pt-1 md:pt-0">
            Tổng tiển:
            <span className="number-price text-primary ml-2 font-bold">
              {NumberPipe(order.amount, true)}
            </span>
          </div>

          <div className="pt-1 md:pt-0">
            Trạng thái đơn hàng:
            <span className="ml-2 font-semibold">{showStatusOrder(order?.status)}</span>
          </div>
        </div>

        <div className="flex-grow-0 w-full sm:w-auto flex mt-2 md:mt-0">
          <Link href={{ pathname: "/profile/order-details", query: { id: order.id } }}>
            <a className="btn-primary hover:underline">Xem chi tiết</a>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <NotFound text="Không tìm thấy đơn hàng nào sddas" icon={<BiListPlus />} />
  );
}
