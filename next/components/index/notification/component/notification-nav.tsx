import Link from "next/link";


export function NotificationNav() {
    return <>
            <ul className="notification__list flex border-b-4 pb-1 space-x-20 mb-4">
                <li className="notification__item">
                    <Link href="/notification">
                        <a className="notification__link uppercase text-lg px-3 border-b-4 pb-1.5 text-primary border-primary">Tất cả</a>
                    </Link>
                    
                </li>
                <li className="notification__item">
                    <Link href="/profile/notification/wait-confirm-order">
                        <a className="notification__link uppercase text-lg px-3 hover:text-primary">Thông tin đơn hàng</a>
                    </Link>
                    
                </li>
                <li className="notification__item">
                    <Link href="/profile/notification/wait-delivery-order">
                        <a className="notification__link uppercase text-lg px-3 hover:text-primary">Thông tin khuyến mãi</a>
                    </Link>
                </li>
            </ul>
    </>;
}