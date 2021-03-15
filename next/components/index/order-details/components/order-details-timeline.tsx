import format from "date-fns/format";
import { Order } from "../../../../lib/repo/order.repo";
interface PropsType extends ReactProps {
  order?: Order;
  listOrderStatus?: any[];
}
export function OrderDetailsTimeline({ order, listOrderStatus }: PropsType) {
  console.log(order);
  let datetime = new Date(order?.createdAt);
  datetime.toDateString();

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
    <div className="py-4">
      <div className="text-gray-700 font-normal lg:font-semibold mb-2">Tình trạng đơn hàng</div>

      <div className="flex lg:flex-row justify-start items-start h-auto relative mb-4 timeline-mobile lg:timeline">
        <span
          className={
            "inline-block w-3.5 lg:w-2 h-2.5 lg:h-2 rounded-full  mt-1 lg:mt-2 z-10 " +
            (order.status == 5 ? "bg-primary" : "bg-gray-400")
          }
        ></span>
        <div className="flex flex-col lg:flex-row pl-3 items-start text-left h-full">
          <span className="text-gray-500 text-sm lg:text-base font-normal lg:font-semibold tabular-nums w-36">
            {format(datetime, "HH:mm dd-MM-yyyy")}
          </span>
          <span className="text-gray-800 text-sm lg:text-base lg:pl-3">[{order?.fullAddress}]</span>
          <span className="text-gray-800 text-sm lg:text-base lg:pl-3">
            {showStatusOrder(order?.status)}
          </span>
        </div>
      </div>

      <style jsx>{`
        .timeline:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 0.25rem;
          top: 0.75rem;
          height: 2rem;
          border-left: 1px dashed;
        }
        .timeline-mobile:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 0.25rem;
          top: 0.75rem;
          height: 3.2rem;
          border-left: 1px dashed;
        }
      `}</style>
    </div>
  ) : null;
}
