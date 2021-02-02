import Link from 'next/link';

export function CanceledOrderList () {
    return <>
        <ul className="order-history__list flex justify-between  border-b-4 pb-1">
            <li className="order-history__item">
                <Link href="/profile/order-history/">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Tất cả</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/wait-confirm-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Chờ xác nhận</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/wait-delivery-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Đang giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/delivered-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Đã giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/canceled-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-1.5 text-primary border-primary">Đã hủy</a>
                </Link>
            </li>
        </ul>
        <ul className="order-confirm-list">
            <li className="order-confirm-item mt-32 text-center">
                <span className="order-cancel text-gray-400">Không có đơn hàng đã huỷ</span>
            </li>
        </ul>
    </>;
}