import { createContext, Fragment, useContext, useEffect, useState } from "react";
import { Notification, NotificationService } from "../../../../lib/repo/notifications.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Pagination } from "../../../../lib/repo/crud.repo";

export const NotificationContext = createContext<
  Partial<{
    listNotification: Notification[];
    setListNotification: Function;
    pagination: Pagination;
    setPagination: Function;
  }>
>({});

export function NotificationProvider({ children }: any) {
  const [listNotification, setListNotification] = useState<Notification[]>(null);
  const { user } = useAuth();
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
  });

  useEffect(() => {
    if (user) {
      loadListNotification();
    }
  }, [user, pagination.page]);

  const loadListNotification = () => {
    NotificationService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        order: { createdAt: -1 },
        filter: { userId: user.id },
      },
      fragment: NotificationService.shortFragment,
    }).then((res) => {
      setListNotification(res.data);
      setPagination({ ...pagination, total: res.pagination.total });
    });
  };

  // console.log(pagination.total);

  return (
    <NotificationContext.Provider
      value={{ setListNotification, listNotification, pagination, setPagination }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => useContext(NotificationContext);
