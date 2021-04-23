import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../../shared/utilities/form/button";
import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { NotificationList } from "./component/notification-list";
import { NOTIFY_TYPES, useNotificationContext } from "./providers/notifications-provider";

export function NotificationPage() {
  const {
    notificationCount,
    generalNotifications,
    personalNotifications,
    generalTotal,
    personalTotal,
    loadNotifications,
  } = useNotificationContext();
  const [mode, setMode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query["mode"]) {
      setMode(router.query["mode"]);
    } else {
      router.replace({
        pathname: location.pathname,
        query: { ...router.query, mode: NOTIFY_TYPES[0].value },
      });
    }
  }, [router.query]);

  return (
    <>
      <div className="h-auto w-full lg:w-8/12 xl:w-10/12 ml-0 md:ml-0">
        <div className="w-full flex justify-between">
          <div className="notification w-full">
            {/* <ul className="hidden md:flex  justify-center md:justify-start mt-4 lg:mt-0">
                <li className="border-b-4 w-full pb-2">
                  <span className="uppercase text-base px-3 pb-2.5 border-b-4 border-primary rounded-sm">
                    Tất cả thông báo
                  </span>
                </li>
              </ul> */}
            <div className="pb-1">
              {NOTIFY_TYPES.map((type) => (
                <Link
                  key={type.value}
                  href={{
                    pathname: location.pathname,
                    query: { ...router.query, mode: type.value },
                  }}
                >
                  <a
                    className={`uppercase font-semibold whitespace-nowrap text-sm md:text-base lg:text-lg py-2 px-4 border-b-4 flex-grow text-center ${
                      mode == type.value
                        ? `text-primary border-primary hover:text-primary-dark`
                        : `text-gray-700 border-gray-200 hover:text-primary`
                    }`}
                  >
                    {type.label}
                  </a>
                </Link>
              ))}
            </div>
            {mode && (
              <>
                <ul className="notification-list w-full h-auto pt-0 md:pt-6">
                  <NotificationList
                    listNotification={
                      mode == "general" ? generalNotifications : personalNotifications
                    }
                  />
                </ul>
                {((mode == "general" && generalNotifications.length < generalTotal) ||
                  (mode == "personal" && personalNotifications.length < personalTotal)) && (
                  <Button
                    className="w-full h-14 text-lg text-primary hover:underline"
                    textPrimary
                    text="Tải thêm"
                    asyncLoading
                    onClick={loadNotifications}
                  />
                )}
              </>
            )}
            {/* <ul className="pavigation-pages flex mt-4 md:mt-7 lg:mt-5 justify-between w-full">
                <PaginationRound
                  limit={pagination.limit}
                  page={pagination.page}
                  total={pagination.total}
                  onPageChange={(page) => {
                    setPagination({ ...pagination, page });
                    scroll(0, 0);
                  }}
                />
              </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}
