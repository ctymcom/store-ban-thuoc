import { NumberPipe } from "../../../../lib/pipes/number";
import moment from "moment-timezone";
import Link from "next/link";

interface PropsType extends ReactProps {
  [x: string]: any;
  item?: any;
  key?: any;
}

export function OrderHistoryItem({ item, index }: PropsType) {
  let itemArray = item?.items;
  let statusOrder = item?.status;
  let showStatusOrder = "";
  switch (statusOrder) {
    case "0": {
      showStatusOrder = "Chờ xác nhận";
      break;
    }
    case "1": {
      showStatusOrder = "Đã duyệt";
      break;
    }
    case "2": {
      showStatusOrder = "Đang thực hiện";
      break;
    }
    case "3": {
      showStatusOrder = "Đang duyệt";
      break;
    }
    case "4": {
      showStatusOrder = "Hoàn thành";
      break;
    }
    case "5": {
      showStatusOrder = "Đóng";
      break;
    }
    default:
      break;
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
            <Link href="/profile/order-details">
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
            <span className="ml-2 font-bold">
              {itemArray.length > 0 && itemArray.map((item, index) => item.qty)} sản phẩm
            </span>
          </p>

          <p className="pt-1 md:pt-0">
            Tổng tiển:
            <span className="number-price text-primary ml-2 font-bold">
              {NumberPipe(item.amount)}
            </span>
          </p>

          <p className="pt-1 md:pt-0">
            Trạng thái đơn hàng:
            <span className="ml-2 font-bold">{showStatusOrder}</span>
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
