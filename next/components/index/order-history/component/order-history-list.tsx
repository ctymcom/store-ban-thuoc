import { useEffect, useState } from "react";
import { OrderHistoryItem } from "./order-history-item";
import { Order } from "../../../../lib/repo/order.repo";
import { Spinner } from "../../../shared/utilities/spinner";
import { NotFound } from "../../../shared/utilities/not-found";
import { BiListPlus } from "react-icons/bi";
interface PropsType extends ReactProps {
  listOrder: Order[];
  status: any;
}

export function OrderHisttoryList({ listOrder, status }: PropsType) {
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    if (status) {
      setListOrders(
        listOrder?.filter(
          (x) =>
            (x.status == "0"
              ? "Release+Later"
              : x.status == "1"
              ? "Approved"
              : x.status == "2"
              ? "Issuing"
              : x.status == "3"
              ? "Approving"
              : x.status == "4"
              ? "Completed"
              : "Closed") == status
        )
      );
    } else {
      setListOrders(listOrder);
    }
  }, [status, listOrder]);

  // console.log(listOrder);
  // console.log(status);

  return (
    <>
      {!listOrders ? (
        <Spinner />
      ) : (
        <>
          {listOrders.length > 0 ? (
            listOrders.map((order, index) => <OrderHistoryItem item={order} key={index} />)
          ) : (
            <>
              <NotFound
                icon={
                  <BiListPlus className=" border-2 border-gray-800 rounded text-md sm:text-lg md:text-2xl mr-2" />
                }
                text="Không tìm thấy đơn hàng nào"
                className="text-gray-800"
              />
              ;
            </>
          )}
        </>
      )}
    </>
  );
}
