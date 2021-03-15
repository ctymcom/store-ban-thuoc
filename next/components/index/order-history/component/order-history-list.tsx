import { useEffect, useState } from "react";
import { OrderHistoryItem } from "./order-history-item";
import { Order } from "../../../../lib/repo/order.repo";
import { Spinner } from "../../../shared/utilities/spinner";
import { NotFound } from "../../../shared/utilities/not-found";
import { BiListPlus } from "react-icons/bi";
import { OrderStatus } from "../../../../lib/repo/order-status.repo";
interface PropsType extends ReactProps {
  listOrder?: Order[];
  listOrderStatus?: any[];
  status?: any;
}

export function OrderHisttoryList({ listOrder, listOrderStatus, status }: PropsType) {
  const [listOrders, setListOrders] = useState([]);
  console.log(listOrder);
  console.log(listOrderStatus);

  useEffect(() => {
    if (status) {
      setListOrders(listOrder?.filter((x) => x.status === 1));
    } else {
      setListOrders(listOrder);
    }
  }, [status, listOrder]);

  return (
    <>
      {!listOrders ? (
        <Spinner />
      ) : (
        <>
          {listOrders.length > 0 ? (
            listOrders.map((order, index) => (
              <OrderHistoryItem order={order} key={index} listOrderStatus={listOrderStatus} />
            ))
          ) : (
            <>
              <NotFound
                icon={
                  <BiListPlus className=" border-2 border-gray-800 rounded text-md sm:text-lg md:text-2xl mr-2" />
                }
                text="Không tìm thấy đơn hàng nào"
                className="text-gray-800"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
