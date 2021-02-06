import { ProfileUserPage } from "../../components/index/profile-user/profile-user";
import { DefaultLayout } from '../../layouts/default-layout';

export default function ProfileUser() {
    return <>
        <ProfileUserPage />
    </>
}
ProfileUser.Layout = DefaultLayout;