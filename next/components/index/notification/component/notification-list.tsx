import { Notification } from "../../../../lib/repo/notifications.repo";
import { Spinner } from "../../../shared/utilities/spinner";
import { IoNotificationsOutline } from "react-icons/io5";
import { NotFound } from "../../../shared/utilities/not-found";

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
                <p className="text-gray-400">{notification.createdAt}</p>
                <div className="h-auto mt-2 text-sm md:text-base">
                  <div className="w-full">
                    <p className="text-gray-800 leading-6 lg:leading-7">
                      Đơn hàng
                      <span className="font-bold">{notification.code}</span>
                      {notification.content}. Đơn hàng sẽ được giao trước
                      <span className="font-bold">{notification.updatedAt}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              <NotFound
                icon={<IoNotificationsOutline />}
                text="Không tìm thấy thông báo nào"
                className="text-gray-800"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
