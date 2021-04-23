import { Notification } from "../../../../lib/repo/notifications.repo";
import { Spinner } from "../../../shared/utilities/spinner";
import { HiOutlineBell } from "react-icons/hi";
import { NotFound } from "../../../shared/utilities/not-found";
import parseISO from "date-fns/parseISO";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import viLocale from "date-fns/locale/vi";
import Link from "next/link";

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
              <Link key={index} href={notification.link || "/"}>
                <a className="block w-full p-3 border-b border-gray-200 group">
                  <div className="text-sm text-gray-400 group-hover:text-gray-600">
                    {formatDistanceToNow(parseISO(notification.createdAt), {
                      addSuffix: true,
                      locale: viLocale,
                    })}
                  </div>
                  <div className="text-gray-700 font-semibold group-hover:text-primary">
                    {notification.title}
                  </div>
                  <p className="text-sm text-gray-500 group-hover:text-gray-700">
                    {notification.content}
                  </p>
                </a>
              </Link>
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
