import { RewardPointPage } from "../../components/index/reward-point/reward-point-page";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";
export default function RewardPoint() {
    return <>
        <ProfileUserLayout breadcrumbs="reward-point">
            <RewardPointPage />
        </ProfileUserLayout>
    </>
}
RewardPoint.Layout = DefaultLayout;