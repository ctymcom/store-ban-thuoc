import { NotificationPage } from "../../components/index/notification/notification-page";
import { NotificationProvider } from "../../components/index/notification/providers/notifications-provider";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";

export default function Notification() {
  return (
    <>
      <ProfileUserLayout breadcrumb="notification">
        <NotificationProvider>
          <NotificationPage />
        </NotificationProvider>
      </ProfileUserLayout>
    </>
  );
}
Notification.Layout = DefaultLayout;
