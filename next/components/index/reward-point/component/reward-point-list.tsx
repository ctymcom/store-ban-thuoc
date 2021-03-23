import { UserPointLog } from "../../../../lib/repo/user-point-log.repo";
import { NotFound } from "../../../shared/utilities/not-found";
import { Spinner } from "../../../shared/utilities/spinner";
import { HiOutlineGift } from "react-icons/hi";
import { RewardPointItem } from "./reward-point-item";
interface PropsType extends ReactProps {
  listRewardPoint: UserPointLog[];
}

export function RewardPointList({ listRewardPoint }: PropsType) {
  return (
    <>
      {!listRewardPoint ? (
        <Spinner />
      ) : (
        <>
          {listRewardPoint.length > 0 ? (
            listRewardPoint.map((item, index) => (
              <RewardPointItem rewardPoint={item} key={item.id} />
            ))
          ) : (
            <>
              <NotFound
                icon={<HiOutlineGift />}
                text="Không tìm thấy điểm thưởng nào"
                className="text-gray-600"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
