import Link from "next/link";
import { ProfileUser } from "../order-history/component/profile-user";
import { NotificationList } from "./component/notification-list";
import { NotificationNav } from "./component/notification-nav";
export function NotificationPage () {
    return  <>
            <div className="main-container h-auto px-4">
                <div className="grid grid-rows-1">
                    <div className="breadbcrum__notification">
                        <ul className="breadbcrum__notification-list flex h-10 items-center mt-8 uppercase">
                            <Link href="/">
                                <a className="breadbcrum__notification-link hover:text-primary mr-1"> Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <Link href="/profile/reward-point">
                                <a className="breadbcrum__notification-link text-primary ml-1"> Thông báo</a>
                            </Link>
                        </ul>
                    </div>
                    <div className="oder-account w-full flex justify-between my-28">
                        <div className="account__user w-1/4">
                            <ProfileUser activeIndex={2}/>
                        </div>
                        <div className="notification w-3/4">
                            <NotificationNav/>
                            <ul className="notification-list">
                                <NotificationList/>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}