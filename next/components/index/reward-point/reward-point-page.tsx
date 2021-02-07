import Link from "next/link";
import { ProfileUser } from "../order-history/component/profile-user";
import { RewardPointList } from "./component/reward-point-list";
import { RewardPointNav } from "./component/reward-point-nav";
import { RewardPointUser } from "./component/reward-point-user";
export function RewardPointPage () {
    return  <>
            <div className="main-container h-auto px-4">
                <div className="grid grid-rows-1">
                    <div className="breadbcrum__reward-point">
                        <ul className="breadbcrum__reward-point-list flex h-10 items-center mt-8 uppercase">
                            <Link href="/">
                                <a className="breadbcrum__reward-point-link hover:text-primary mr-1"> Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <Link href="/profile/reward-point">
                                <a className="breadbcrum__reward-point-link text-primary ml-1"> Điểm tích luỹ</a>
                            </Link>
                        </ul>
                    </div>
                    <div className="oder-account w-full flex justify-between mt-10 my-28">
                        <div className="account__user w-1/4">
                            <ProfileUser activeIndex={3}/>
                        </div>
                        <div className="reward-point w-3/4">
                            <RewardPointUser/>
                            <ul className="reward-point__list flex border-b-4 pb-1 mb-4">
                                <RewardPointNav/>
                            </ul>
                
                            <ul className="reward-point__list">
                                <RewardPointList/>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}