import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { NotificationList } from "./component/notification-list";
import { useNotificationContext } from "./providers/notifications-provider";

export function NotificationPage() {
  const { listNotification, pagination, setPagination } = useNotificationContext();

  return (
    <>
      <div className="h-auto w-full lg:w-8/12 xl:w-10/12 ml-0 md:ml-0">
        <div className="">
          <div className="w-full flex justify-between">
            <div className="notification w-full">
              <ul className="hidden md:flex  justify-center md:justify-start mt-4 lg:mt-0">
                <li className="border-b-4 w-full pb-2">
                  <span className="uppercase text-base px-3 pb-2.5 border-b-4 border-primary rounded-sm">
                    Tất cả thông báo
                  </span>
                </li>
              </ul>
              <ul className="notification-list w-full h-auto pt-0 md:pt-6">
                <NotificationList listNotification={listNotification} />
              </ul>
              <ul className="pavigation-pages flex mt-4 md:mt-7 lg:mt-5 justify-between w-full">
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
