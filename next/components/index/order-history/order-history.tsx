import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { OrderHisttoryList } from "./component/order-history-list";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOrderContext } from "./providers/order-history-provider";
import { useOrderStatusContext } from "./providers/order-status-provider";

export function OrderHistoryPage() {
  const router = useRouter();
  const { status } = router.query;

  const handlerScrollIntoViewMobile = (index) => {
    let ele = document.getElementsByClassName("scrollNavMobile")[index];
    ele.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };
  const handlerScrollIntoViewPC = (index) => {
    let ele = document.getElementsByClassName("scrollNavPC")[index];
    ele.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const { listOrder, pagination, setPagination } = useOrderContext();
  const { listOrderStatus } = useOrderStatusContext();

  return (
    <>
      <div className="w-full lg:w-9/12 px-3 md:px-0">
        <div className="">
          <div className="w-full flex justify-between mt-0 md:mt-5 lg:mt-0 mb-0 gap-7">
            <div className="w-full">
              <ul className="flex md:hidden justify-between border-b-0 md:border-b-4 pb-2 mt-3 md:mt-0 h-auto overflow-x-scroll md:overflow-hidden">
                <li>
                  <Link
                    href={{
                      pathname: "/profile/order-history",
                    }}
                  >
                    <a
                      className={`normal-case lg:uppercase font-extralight md:font-semibold whitespace-nowrap text-base px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary
                                                  ${
                                                    !status
                                                      ? " text-primary border-primary animate-slide-up"
                                                      : ""
                                                  }`}
                    >
                      Tất cả đơn hàng
                    </a>
                  </Link>
                </li>
                {listOrderStatus
                  ? listOrderStatus.length > 0 &&
                    listOrderStatus.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={{
                            pathname: "/profile/order-history",
                            query: item.name2 ? { status: item.name2 } : {},
                          }}
                          scroll={false}
                        >
                          <a
                            className={`scrollNavMobile normal-case lg:uppercase font-extralight md:font-semibold whitespace-nowrap text-base px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary
                                                  ${
                                                    (status ? status == item.name2 : !item.name2)
                                                      ? " text-primary border-primary animate-slide-up"
                                                      : ""
                                                  }`}
                            onClick={() => handlerScrollIntoViewMobile(index)}
                          >
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
              <ul className="hidden md:flex justify-between lg:border-b-0 xl:border-b-4 pb-2 mt-3 md:mt-0 h-auto lg:overflow-x-scroll xl:overflow-hidden">
                <li>
                  <Link
                    href={{
                      pathname: "/profile/order-history",
                    }}
                  >
                    <a
                      className={`normal-case lg:uppercase font-extralight md:font-semibold whitespace-nowrap text-base px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary
                                                  ${
                                                    !status
                                                      ? " text-primary border-primary animate-slide-up"
                                                      : ""
                                                  }`}
                    >
                      Tất cả đơn hàng
                    </a>
                  </Link>
                </li>
                {listOrderStatus
                  ? listOrderStatus.length > 0 &&
                    listOrderStatus.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={{
                            pathname: "/profile/order-history",
                            query: item.name2 ? { status: item.name2 } : {},
                          }}
                          scroll={false}
                        >
                          <a
                            className={`scrollNavPC normal-case lg:uppercase font-extralight md:font-semibold whitespace-nowrap text-base px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary
                                                  ${
                                                    (status ? status == item.name2 : !item.name2)
                                                      ? " text-primary border-primary animate-slide-up"
                                                      : ""
                                                  }`}
                            onClick={() => handlerScrollIntoViewPC(index)}
                          >
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
              <div className="w-full">
                <OrderHisttoryList listOrder={listOrder} status={status} />
              </div>

              <ul className="pavigation-pages flex mt-4 md:mt-7 justify-between w-full">
                <PaginationRound
                  limit={pagination.limit}
                  page={pagination.page}
                  total={pagination.total}
                  onPageChange={(page) => {
                    setPagination({ ...pagination, page });
                    scroll(0, 0);
                  }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
