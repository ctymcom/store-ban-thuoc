import { title } from "process";
import { ProfileUserPage } from "../../components/index/profile-user/profile-user";
import { ProfileUserProvider } from "../../components/index/profile-user/providers/profile-user-provider";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";
import { AuthProvider } from "../../lib/providers/auth-provider";

export default function ProfileUser() {
    return <>
        <ProfileUserLayout breadcrumb='account-user'>
                <ProfileUserPage />
        </ProfileUserLayout>
    </>
}
ProfileUser.Layout = DefaultLayout;