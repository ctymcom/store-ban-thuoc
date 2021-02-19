import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { RewardPointList } from "./component/reward-point-list";
import { RewardPointNav } from "./component/reward-point-nav";
import { RewardPointUser } from "./component/reward-point-user";
export function RewardPointPage () {
    return  <>
            <div className="h-auto w-9/12 ml-4">
                <div className="grid grid-rows-1">
                    <div className="oder-account w-full flex justify-between mt-0 my-28">
                        <div className="reward-point w-full">
                            <RewardPointUser/>
                            <ul className="reward-point__list flex border-b-4 pb-1 mb-4">
                                <RewardPointNav/>
                            </ul>
                            <ul className="reward-point__list">
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