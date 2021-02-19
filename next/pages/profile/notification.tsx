import { NotificationPage } from "../../components/index/notification/notification-page";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";

export default function Notification() {
    return <>
    <ProfileUserLayout breadcrumbs="notification">
        <NotificationPage />
    </ProfileUserLayout>
        
    </>
}
Notification.Layout = DefaultLayout;