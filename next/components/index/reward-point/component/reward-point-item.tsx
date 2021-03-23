import moment from "moment";

interface PropsType extends ReactProps {
  rewardPoint: any;
  key?: string;
}

export function RewardPointItem({ rewardPoint, key, ...props }: PropsType) {
  return (
    <>
      <li
        key={key}
        className="flex flex-col md:flex-row items-start md:justify-between py-4 md:py-8 border-b-2 border-gray-200 text-sm md:text-base"
      >
        <p className="w-full md:w-1/5 pl-0 md:pl-3 mb-1 md:mb-0 order-last md:order-none">
          <span className="mr-3 inline md:hidden text-gray-900 uppercase md:normal-case font-extralight md:font-normal">
            Điểm tích luỹ:
          </span>
          <span
            className={`font-bold ${rewardPoint?.value > 0 ? " text-primary" : "text-red-600"} `}
          >
            {rewardPoint?.value > 0 ? "+ " + rewardPoint?.value : "" + rewardPoint?.value}
          </span>
        </p>
        <p className="w-full md:w-1/5 text-gray-400 md:text-gray-800 font-extralight md:font-normal md:order-none">
          {moment(rewardPoint.createdAt).format("H:M - DD/MM/YYYY")}
        </p>
        <p className="w-full md:w-2/4 text-gray-800 my-2 md:my-0 leading-6">{rewardPoint.note}</p>
      </li>
    </>
  );
}
