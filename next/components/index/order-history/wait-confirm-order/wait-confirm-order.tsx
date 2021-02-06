import Link from 'next/link';
import { ProfileUser } from '../component/profile-user';
import { OrderConfirmList } from './component/order-confirm-list';

export function WaitConfirmOrderPage () {
    return  <>
            <div className="main-container h-auto px-4">
                <div className="grid grid-rows-1">
                    <div className="breadbcrum__order">
                        <ul className="breadbcrum__order-list flex h-10 items-center mt-8 uppercase ">
                            <Link href="/">
                                <a className="breadbcrum__order-link hover:text-primary mr-1">Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <Link href="/profile/order-history">
                                <a className="breadbcrum__order-link text-primary ml-1">Đơn hàng</a>
                            </Link>
                        </ul>
                    </div>
                    <div className="oder-account w-full flex justify-between mt-10 mb-28 gap-7">
                        <div className="account__user w-1/5">
                            <ProfileUser activeIndex={0}/>
                        </div>
                        <div className="oder-history w-4/5">
                            <OrderConfirmList/>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}