import Link from "next/link";
import { ProfileUser } from "../order-history/component/profile-user";
import { FormProfile } from './component/form-profile';
import { user } from './component/data-profile';
export function ProfileUserPage() {
    return <>
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
                <div className="oder-account w-full flex justify-between mt-10 my-28">
                    <div className="account__user w-1/4">
                        <ProfileUser activeIndex={1} />
                    </div>
                    <div className="oder-history w-3/5">
                        <FormProfile user={user}/>
                    </div>
                </div>
            </div>
        </div>
    </>;
}