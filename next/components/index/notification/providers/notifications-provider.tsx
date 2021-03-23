import { createContext, useContext, useEffect, useState } from "react";
import { Notification, NotificationService } from "../../../../lib/repo/notifications.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Pagination } from "../../../../lib/repo/crud.repo";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

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
    limit: 4,
    page: 1,
    total: 0,
  });

  useEffect(() => {
    if (user) {
      loadListNotification();
    }
  }, [user, pagination.page]);

  const loadListNotification = () => {
    setListNotification(null);
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

      // setListNotification(
      //   (res.data = [
      //     {
      //       id: "1",
      //       createdAt: new Date(2021, 2, 23, 11).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "01",
      //       title: "abc",
      //       content: "Khảo sát ý kiến khán giả",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "2",
      //       createdAt: new Date(2021, 2, 23, 10).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "02",
      //       title: "def",
      //       content: "Chương trình khuyến mãi",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "3",
      //       createdAt: new Date(2021, 2, 23, 9).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "4",
      //       createdAt: new Date(2021, 2, 23, 8).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "5",
      //       createdAt: new Date(2021, 2, 23, 7).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "6",
      //       createdAt: new Date(2021, 2, 22, 7).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "7",
      //       createdAt: new Date(2021, 2, 22, 8).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "8",
      //       createdAt: new Date(2021, 2, 22, 9).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "9",
      //       createdAt: new Date(2021, 2, 21, 12).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //     {
      //       id: "10",
      //       createdAt: new Date(2021, 2, 21, 16).toISOString(),
      //       updatedAt: new Date(2021, 2, 22, 9).toISOString(),
      //       userId: "012",
      //       code: "03",
      //       title: "abcdef",
      //       content: "Chương trình chăm sóc khách hàng",
      //       link: "https://arito-store.mcom.app/home",
      //     },
      //   ])
      // );
      setPagination({ ...pagination, total: res.pagination.total });
    });
  };

  return (
    <NotificationContext.Provider value={{ listNotification, pagination, setPagination }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => useContext(NotificationContext);
