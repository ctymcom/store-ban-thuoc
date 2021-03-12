import { RewardPointProvider } from "../../components/index/reward-point/providers/reward-point-provider";
import { RewardPointPage } from "../../components/index/reward-point/reward-point-page";
import { DefaultLayout } from "../../layouts/default-layout";
import { ProfileUserLayout } from "../../layouts/profile-user-layout";
export default function RewardPoint() {
  return (
    <>
      <ProfileUserLayout breadcrumb="reward-point">
        <RewardPointProvider>
          <RewardPointPage />
        </RewardPointProvider>
      </ProfileUserLayout>
    </>
  );
}
RewardPoint.Layout = DefaultLayout;
