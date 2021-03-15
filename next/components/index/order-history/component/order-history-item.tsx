import { NumberPipe } from "../../../../lib/pipes/number";
import moment from "moment-timezone";
import Link from "next/link";

interface PropsType extends ReactProps {
  [x: string]: any;
  item?: any;
  key?: any;
  listOrderStatus?: any[];
}

export function OrderHistoryItem({ item, index, listOrderStatus }: PropsType) {
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

  return (
    <>
      <div
        className="flex flex-col md:flex-row justify-between items-center border-b-2 py-5 md:py-3"
        key={index}
      >
        <div className="w-full md:w-3/5 text-sm">
          <p className="">
            {" "}
            Mã đơn hàng:
            <span className="ml-1.5 font-bold">#{item.orderNumber}</span>
            <Link href={{ pathname: "/profile/order-details", query: "id=" + item.id }}>
              <a className="text-primary ml-1">Xem chi tiết đơn hàng</a>
            </Link>
          </p>

          <p className="pt-1 md:pt-0">
            Thời gian giao hàng dự kiến:
            <span className="ml-1 md:ml-2 font-bold">
              {moment(item.createdAt).format("DD/MM")} đến{" "}
              {moment(item.updatedAt).format("DD/MM/YYYY")}
            </span>
          </p>

          <p className="pt-1 md:pt-0">
            Tổng sản phẩm:
            <span className="ml-2 font-bold">{item?.itemCount}</span>
          </p>

          <p className="pt-1 md:pt-0">
            Tổng tiển:
            <span className="number-price text-primary ml-2 font-bold">
              {NumberPipe(item.amount)}
            </span>
          </p>

          <p className="pt-1 md:pt-0">
            Trạng thái đơn hàng:
            <span className="ml-2 font-bold">{showStatusOrder(item?.status)}</span>
          </p>
        </div>
        <button
          className={` bg-primary hidden md:block text-white px-12 py-1.5 rounded-md whitespace-nowrap text-sm md:text-base mt-4 md:mt-0`}
        >
          Mua lại
        </button>
      </div>
    </>
  );
}
