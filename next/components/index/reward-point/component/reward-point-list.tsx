import { UserPointLog } from "../../../../lib/repo/user-point-log.repo";
import { NotFound } from "../../../shared/utilities/not-found";
import { Spinner } from "../../../shared/utilities/spinner";
import { BiDonateHeart } from "react-icons/bi";
import moment from "moment-timezone";

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
          {listRewardPoint?.length > 0 ? (
            listRewardPoint.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row items-start md:justify-between py-4 md:py-8 border-b-2 border-gray-200 text-sm md:text-base"
              >
                <p className="w-full md:w-1/5 pl-0 md:pl-3 mb-1 md:mb-0 order-last md:order-none">
                  <span className="mr-3 inline md:hidden text-gray-900 uppercase md:normal-case font-extralight md:font-normal">
                    Điểm tích luỹ:
                  </span>{" "}
                  <span className={`font-bold ${item?.value > 0 ? " text-primary" : ""} `}>
                    {item?.value > 0 ? "+ " + item?.value : "- " + item?.value}
                  </span>
                </p>
                <p className="w-full md:w-1/5 text-gray-400 md:text-gray-800 font-extralight md:font-normal md:order-none">
                  {item.updatedAt
                    ? moment(item.updatedAt).format("H:M:S - DD/MM/YYYY")
                    : moment(item.createdAt).format("H:M:S - DD/MM/YYYY")}
                </p>
                <p className="w-full md:w-2/4 text-gray-800 my-2 md:my-0 leading-6">{item.note}</p>
              </li>
            ))
          ) : (
            <>
              <NotFound
                icon={<BiDonateHeart />}
                text="Không tìm thấy thông báo nào"
                className="text-gray-800"
              />
            </>
          )}
        </>
      )}
      {/* <li className="flex flex-col md:flex-row items-start md:justify-between py-4 md:py-8 border-b-2 border-gray-200 text-sm md:text-base">
        <p className="text-red-600 w-full md:w-1/5 pl-0 md:pl-3 mb-1 md:mb-0 order-last md:order-none">
          <span className="mr-3 inline md:hidden text-gray-900 uppercase md:normal-case font-extralight md:font-normal">
            Điểm tích luỹ:
          </span>{" "}
          <span className="font-bold">- 652</span>
        </p>
        <p className="w-full md:w-1/5 text-gray-400 md:text-gray-800 font-extralight md:font-normal md:order-none">
          16:30 - 01/12/2021
        </p>
        <p className="w-full md:w-2/4 text-gray-800 my-2 md:my-0 leading-6">
          Thử thách Cào là trúng: Tặng bạn 1.000 điểm dùng để giảm giá than toán khi mua hàng trên
          thuocsi
        </p>
      </li>

      <li className="flex flex-col md:flex-row items-start md:justify-between py-4 md:py-8 border-b-2 border-gray-200 text-sm md:text-base">
        <p className="text-primary w-full md:w-1/5 pl-0 md:pl-3 mb-1 md:mb-0 order-last md:order-none">
          <span className="mr-3 inline md:hidden text-gray-900 uppercase md:normal-case font-extralight md:font-normal">
            Điểm tích luỹ:
          </span>{" "}
          <span className="font-bold">+ 1000</span>
        </p>
        <p className="w-full md:w-1/5 text-gray-400 md:text-gray-800 font-extralight md:font-normal">
          16:30 - 01/12/2021
        </p>
        <p className="w-full md:w-2/4 text-gray-800 my-2 md:my-0 leading-6">
          Nhận được 1000 điểm khi mua hàng. Cám ơn bạn!
        </p>
      </li> */}
    </>
  );
}
