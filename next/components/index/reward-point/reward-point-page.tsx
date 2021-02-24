import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { RewardPointList } from "./component/reward-point-list";
import { RewardPointNav } from "./component/reward-point-nav";

export function RewardPointPage () {
    return  <>
            <div className="h-auto w-full lg:w-9/12 ml-0 lg:ml-4 px-5 md:px-0">
                <div className="">
                    <div className="w-full flex justify-between mt-0 my-28">
                        <div className="w-full md:w-full">
                            <div className="flex items-center justify-center md:justify-start mb-6 md:mb-10 mt-6 md:mt-4 lg:mt-0">
                                <img className="object-contain mr-6 md:mr-7 w-1/3 md:w-1/4" src="/assets/img/reward-point.png" alt=""/>
                                <div className="">
                                    <p className="text-md xs:text-2xl md:text-lg font-normal text-gray-700 mt-5">Số Điểm Bạn Đang Có</p>
                                    <p className="text-xl xs:text-3xl md:text-4xl font-medium text-yellow-400">165.520 Điểm</p>
                                </div>
                            </div>
                            <ul className="hidden md:flex border-b-4 pb-1 pl-2">
                                <RewardPointNav/>
                            </ul>
                            <ul className="">
                                <RewardPointList/>
                            </ul>
                            <ul className="pavigation-pages flex mt-4 justify-between w-full">
                                <PaginationRound
                                    limit={8}
                                    page={1}
                                    total={143}
                                    onPageChange={(page) => {}}
                                />
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}