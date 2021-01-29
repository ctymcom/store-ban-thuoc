import { OrderHistoryDetail } from "./order-history-detail";
import { ProfileUser } from "./profile-user";
import Link from 'next/link';

export function OrderHistory () {
    return  <>
        <div className="container-1 min-h-full">
            <div className="grid grid-rows-1">
                <div className="breadbcrum__order">
                    <ul className="breadbcrum__order-list flex h-10 items-center mt-8 uppercase ">
                        <Link href="/">
                            <a className="breadbcrum__order-link hover:text-success">Trang chủ /</a>
                        </Link>
                        <Link href="/profile/order-history">
                            <a className="breadbcrum__order-link text-success">Đơn hàng</a>
                        </Link>
                    </ul>
                </div>
                <div className="oder-account w-full flex justify-between mt-10 mb-28 gap-7">
                    <div className="account__user w-1/5">
                        <ProfileUser activeIndex={0}/>
                    </div>
                    <div className="oder-history w-4/5">
                        <OrderHistoryDetail/>
                    </div>
                </div>  
            </div>
        </div>
    </>;
}