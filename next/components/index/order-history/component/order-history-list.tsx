import { HiOutlineClipboardList } from "react-icons/hi";
import { Order } from "../../../../lib/repo/order.repo";
import { NotFound } from "../../../shared/utilities/not-found";
import { Spinner } from "../../../shared/utilities/spinner";
import { OrderHistoryItem } from "./order-history-item";
interface PropsType extends ReactProps {
  orders?: Order[];
}

export function OrderHistoryList({ orders }: PropsType) {
  return (
    <>
      {!orders ? (
        <Spinner />
      ) : (
        <div className="animate-emerge-up">
          {orders.length > 0 ? (
            <>
              {orders.map((order) => (
                <OrderHistoryItem order={order} key={order.id} />
              ))}
            </>
          ) : (
            <>
              <NotFound icon={<HiOutlineClipboardList />} text="Không tìm thấy đơn hàng nào" />
            </>
          )}
        </div>
      )}
    </>
  );
}
