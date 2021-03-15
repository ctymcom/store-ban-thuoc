import format from "date-fns/format";
import { Order } from "../../../../lib/repo/order.repo";
interface PropsType extends ReactProps {
  order: Order;
}
export function OrderDetailsTimeline({ order }: PropsType) {
  return (
    <div className="py-4">
      <div className="text-gray-700 font-normal lg:font-semibold mb-2">Tình trạng đơn hàng</div>
      {order.length > 0 &&
        order.map((item, index) => (
          <div
            className="flex lg:flex-row justify-start items-start h-auto relative mb-4 timeline-mobile lg:timeline"
            key={index}
          >
            <span
              className={
                "inline-block w-3.5 lg:w-2 h-2.5 lg:h-2 rounded-full  mt-1 lg:mt-2 z-10 " +
                (index == 0 ? "bg-primary" : "bg-gray-400")
              }
            ></span>
            <div className="flex flex-col lg:flex-row pl-3 items-start text-left h-full">
              <span className="text-gray-500 text-sm lg:text-base font-normal lg:font-semibold tabular-nums w-36">
                {format(item.createdAt, "HH:mm dd-MM-yyyy")}
              </span>
              <span className="text-gray-800 text-sm lg:text-base lg:pl-3">
                [{item.fullAddress}]
              </span>
              <span className="text-gray-800 text-sm lg:text-base lg:pl-3">{item.status}</span>
            </div>
          </div>
        ))}
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
  );
}
