import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { RewardPointList } from "./component/reward-point-list";
import { RewardPointNav } from "./component/reward-point-nav";

export function RewardPointPage () {
    return  <>
            <div className="h-auto w-full lg:w-9/12 ml-0 lg:ml-4 px-5 md:px-0">
                <div className="">
                    <div className="w-full flex justify-between mt-0 md:mt-3 mb-0">
                        <div className="w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start mb-0 md:mb-10 mt-0 md:mt-4 lg:mt-0">
                                <img className="object-contain mr-0 md:mr-7 w-2/4 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5" src="/assets/img/reward-point.png" alt=""/>
                                <div className="text-center mt-2 md:mt-5 lg:mt-4 xl:mt-6">
                                    <p className="text-md md:text-xl lg:text-xl  xl:text-3xl lg:font-extralight text-gray-700 md:mb-1.5 lg:mb-2 xl:mb-3 md:text-left">Số Điểm Bạn Đang Có</p>
                                    <p className="text-xl md:text-4xl lg:text-4xl xl:text-5xl lg:font-extralight text-yellow-400">165.520 Điểm</p>
                                </div>
                            </div>
                            <ul className="hidden md:flex border-b-4 pb-1 pl-0">
                                <RewardPointNav/>
                            </ul>
                            <ul className="w-full">
                                <RewardPointList/>
                            </ul>
                            <ul className="pavigation-pages flex mt-5 md:mt-7 justify-between w-full">
                                <PaginationRound className="w-full"
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