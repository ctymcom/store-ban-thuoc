import { Notification } from "../../../../lib/repo/notifications.repo";
import { Spinner } from "../../../shared/utilities/spinner";
import { HiOutlineBell } from "react-icons/hi";
import { NotFound } from "../../../shared/utilities/not-found";
import parseISO from "date-fns/parseISO";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import viLocale from "date-fns/locale/vi";

interface PropsType extends ReactProps {
  listNotification: Notification[];
}

export function NotificationList({ listNotification }: PropsType) {
  return (
    <>
      {!listNotification ? (
        <Spinner />
      ) : (
        <>
          {listNotification.length > 0 ? (
            listNotification.map((notification, index) => (
              <li className="w-full py-4 px-5 md:px-3 border-b-2 border-gray-300" key={index}>
                <p className="text-gray-400">
                  {formatDistanceToNow(parseISO(notification.createdAt), {
                    addSuffix: true,
                    locale: viLocale,
                  })}
                </p>
                <div className="h-auto mt-2 text-sm md:text-base">
                  <div className="w-full">
                    <p className="text-gray-800 leading-6 lg:leading-7">
                      Đơn hàng
                      <span className="font-bold mx-2">{notification.code}.</span>
                      {notification.content}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              <NotFound
                icon={<HiOutlineBell />}
                text="Không tìm thấy thông báo nào"
                className="text-gray-600"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
