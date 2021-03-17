import { NumberPipe } from "../../../lib/pipes/number";
import { useAuth } from "../../../lib/providers/auth-provider";
import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { RewardPointList } from "./component/reward-point-list";
import { useRewardPointContext } from "./providers/reward-point-provider";

export function RewardPointPage() {
  const menuNav = [{ label: "Điểm tích luỹ" }, { label: "Thời gian" }, { label: "Nội dung" }];
  const { listRewardPoint, pagination, setPagination } = useRewardPointContext();
  const { user } = useAuth();

  return (
    <>
      <div className="h-auto w-full lg:w-9/12 ml-0 lg:ml-4 px-5 md:px-0">
        <div className="">
          <div className="w-full flex justify-between">
            <div className="w-full">
              <div className="flex items-start justify-center md:justify-start mb-0 md:mb-10 mt-0 md:mt-4 lg:mt-0">
                <img
                  className="object-contain mr-0 md:mr-7 w-1/3 xs:w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/4 xl:w-1/5"
                  src="/assets/img/reward-point.png"
                  alt="reward-point"
                />
                <div className="text-left mt-3 md:mt-5 lg:mt-4 xl:mt-5 ml-1.5 md:ml-0 xs:ml-3">
                  <p className="text-16 sm:text-18 md:text-20 xl:text-24 text-gray-700 sm:mb-1.5 md:mb-2 lg:mb-2 xl:mb-3.5">
                    Số Điểm Bạn Đang Có
                  </p>
                  <p className="text-24 sm:text-28 md:text-32 xl:text-40 text-yellow-400">
                    {user.point ? NumberPipe(user.point) : 0} Điểm
                  </p>
                </div>
              </div>
              <ul className="hidden md:flex border-b-4 pb-1 pl-0">
                {menuNav?.length > 0 &&
                  menuNav.map((item, index) => (
                    <li className="w-1/4 text-left" key={index}>
                      <span className="capitalize text-xl tracking-wider text-gray-800">
                        {item.label}
                      </span>
                    </li>
                  ))}
              </ul>
              <ul className="w-full">
                <RewardPointList listRewardPoint={listRewardPoint} />
              </ul>
              <ul className="pavigation-pages flex mt-4 md:mt-7 justify-between w-full">
                <PaginationRound
                  limit={pagination.limit}
                  page={pagination.page}
                  total={pagination.total}
                  onPageChange={(page) => {
                    setPagination({ ...pagination, page });
                    scroll(0, 0);
                  }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
