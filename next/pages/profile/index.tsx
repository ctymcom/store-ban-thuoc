import { ProfileUserPage } from "../../components/index/profile-user/profile-user";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";

export default function ProfileUser() {
    return <>
        <ProfileUserLayout breadcrumbs="account-user">
            <ProfileUserPage />
        </ProfileUserLayout>
    </>
}
ProfileUser.Layout = DefaultLayout;