import Link from "next/link";

export function RewardPointNav () {
    return <>
            <li className="reward-point__item mr-8">
                <Link href="/reward-point">
                    <a className="reward-point__link capitalize text-lg px-3 border-b-4 pb-1.5 text-primary border-primary">Điểm thưởng</a>
                </Link>   
            </li>
            <li className="reward-point__item mr-8">
                <Link href="/profile/reward-point/wait-confirm-order">
                    <a className="reward-point__link capitalize text-lg px-3 hover:text-primary">Thời gian</a>
                </Link>
            </li>
            <li className="reward-point__item mr-auto">
                <Link href="/profile/reward-point/wait-delivery-order">
                    <a className="reward-point__link capitalize text-lg px-3 hover:text-primary">Nội dung</a>
                </Link>
            </li>
            <li className="reward-point__item mr-4">
                <Link href="/profile/reward-point/wait-delivery-order">
                    <a className="reward-point__link capitalize text-lg px-3 hover:text-primary">Trạng thái</a>
                </Link>
            </li>
    </>;
}       