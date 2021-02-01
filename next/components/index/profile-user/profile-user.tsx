import { DefaultLayout } from "../../../layouts/default-layout";
import { ProfileAccount } from './component/profile-user';

export function ProfileUserPage () {
    return  <>
            <DefaultLayout>
                <ProfileAccount/>
            </DefaultLayout>
    </>;
}