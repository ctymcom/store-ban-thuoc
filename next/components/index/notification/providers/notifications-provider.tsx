import { createContext, useContext, useEffect, useState } from "react";
import { Notification, NotificationService } from "../../../../lib/repo/notifications.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";

export const NotificationContext = createContext<
  Partial<{
    generalNotifications: Notification[];
    personalNotifications: Notification[];
    notificationCount: number;
    generalTotal: number;
    personalTotal: number;
    loadNotifications: () => any;
  }>
>({});

export function NotificationProvider({ children }: any) {
  const [generalNotifications, setGeneralNotifications] = useState<Notification[]>([]);
  const [personalNotifications, setPersonalNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [generalTotal, setGeneralTotal] = useState(0);
  const [personalTotal, setPersonalTotal] = useState(0);
  const { user } = useAuth();
  const limit = 10;

  useEffect(() => {
    if (user) {
      loadNotifications();
      setNotificationCount(user.unseenNotify);
    }
  }, [user]);

  // useEffect(() => {
  //   setNotificationCount(generalNotifications.length + personalNotifications.length);
  // }, [generalNotifications.length, personalNotifications.length]);

  const loadNotifications = async () => {
    let tasks: any[] = [];
    tasks.push(
      NotificationService.getAll({
        apiName: "getAllNotification0",
        query: {
          limit,
          offset: generalNotifications.length,
          order: { createdAt: -1 },
        },
      }).then((res) => {
        setGeneralNotifications([...generalNotifications, ...res.data]);
        setGeneralTotal(res.total);
      })
    );

    tasks.push(
      NotificationService.getAll({
        query: {
          limit,
          offset: personalNotifications.length,
          order: { createdAt: -1 },
          filter: { userId: user.id },
        },
      }).then((res) => {
        setPersonalNotifications([...personalNotifications, ...res.data]);
        setPersonalTotal(res.total);
      })
    );
    await Promise.all(tasks);
  };

  return (
    <NotificationContext.Provider
      value={{
        generalNotifications,
        personalNotifications,
        notificationCount,
        generalTotal,
        personalTotal,
        loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => useContext(NotificationContext);

export const NOTIFY_TYPES = [
  { value: "general", label: "Thông báo chung" },
  { value: "personal", label: "Thông báo cá nhân" },
];
