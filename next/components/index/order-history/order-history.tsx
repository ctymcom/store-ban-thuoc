import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { OrderHistoryList } from "./component/order-history-list";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOrdeHistoryContext } from "./providers/order-history-provider";
import { Spinner } from "../../shared/utilities/spinner";
import { OrderHistoryStatus } from "./component/order-history-status";

export function OrderHistoryPage() {
  const handlerScrollIntoViewMobile = (index) => {
    let ele = document.getElementsByClassName("scrollNavMobile")[index];
    ele.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };
  const handlerScrollIntoViewPC = (index) => {
    let ele = document.getElementsByClassName("scrollNavPC")[index];
    ele.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

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
