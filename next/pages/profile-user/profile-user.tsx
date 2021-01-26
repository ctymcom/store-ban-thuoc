import { DashboardLayout } from "../../layouts/dashboard-layout";
import { ProfileAccount } from './component/profile-user';

export function ProfileUserPage () {
    return  <>
            <DashboardLayout>
                <ProfileAccount/>
            </DashboardLayout>
    </>;
}