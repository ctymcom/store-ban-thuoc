import { ProfileUser } from '../../../order-history/component/profile-user';
import { DeliveredOrderDetail } from './delivered-order-detail';
import Link from 'next/link';

export function DeliveredOrder() {
    return <>
        <div className="main-container h-auto">
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
                <div className="oder-account w-full flex justify-between my-28 gap-7">
                    <div className="account__user w-1/5">
                        <ProfileUser activeIndex={0} />
                    </div>
                    <div className="oder-history w-4/5">
                        <DeliveredOrderDetail />
                    </div>
                </div>
            </div>
        </div>
    </>;
}