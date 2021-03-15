import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { Spinner } from "../../shared/utilities/spinner";
import { OrderHistoryList } from "./component/order-history-list";
import { OrderHistoryStatus } from "./component/order-history-status";
import { useOrdeHistoryContext } from "./providers/order-history-provider";

export function OrderHistoryPage() {

  const { orders, pagination, setPagination, status, statuses } = useOrdeHistoryContext();

  return (
    <>
      {!statuses ? (
        <Spinner />
      ) : (
        <>
          <OrderHistoryStatus statuses={statuses} status={status} />
          <div className="w-full">
            <OrderHistoryList orders={orders} />
          </div>
          <div className="pavigation-pages flex mt-4 md:mt-7 justify-between w-full">
            <PaginationRound
              limit={pagination.limit}
              page={pagination.page}
              total={pagination.total}
              onPageChange={(page) => {
                setPagination({ ...pagination, page });
                scroll(0, 0);
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
