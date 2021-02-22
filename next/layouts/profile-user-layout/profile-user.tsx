import Link from "next/link";
import { AiOutlineBell } from "react-icons/ai";
import { BiDonateHeart, BiListPlus } from "react-icons/bi";
import { ImUser } from "react-icons/im";
import { useRouter } from "next/router";

export function ProfileUser() {

    const router = useRouter();
    
    return <>
        <div className="user flex items-center">
            <img src="/assets/img/avatar.svg" alt="" className="user__avatar" />
            <div className="profile__user ml-4 sm:w-3/6">
                <a href="#" className="profile__user-link block font-normal mb-2">
                    minhuy2996543
                </a>
                <a href="#" className="profile__user-edit block text-gray-500">
                    Chỉnh sửa hồ sơ
                </a>
            </div>
        </div>
        <ul className="user__info-list">
                <li className="user__info-item flex my-4 items-center">
                    <ImUser className="text-primary border-2 border-primary rounded-full text-2xl p-0.5 mr-2"/>
                    <Link href="/profile" shallow={true}>
                        <a className={`"user__info-link uppercase text-sm hover:text-primary " 
                            ${router.pathname == "/profile" ? " text-primary" : ""}`}>
                            Tài khoản của tôi
                        </a>
                    </Link>
                    
                </li>
                <li className="user__info-item flex my-4 items-center">
                    <BiListPlus className="text-primary border-2 border-primary rounded text-2xl mr-2"/>
                    <Link href="/profile/order-history" shallow={true}>
                        <a className={`"order-link uppercase text-sm hover:text-primary "
                            ${router.pathname == "/profile/order-history" || 
                            router.pathname == "/profile/order-history/wait-confirm-order" || 
                            router.pathname == "/profile/order-history/wait-delivery-order" || 
                            router.pathname == "/profile/order-history/delivered-order" || 
                            router.pathname == "/profile/order-history/canceled-order" ||
                            router.pathname == "/profile/order-details" ? " text-primary" : ""}`}>
                            Đơn mua
                        </a>
                    </Link>
                   
                </li>
                <li className="user__info-item flex my-4 items-center">
                    <AiOutlineBell className="text-primary text-2xl mr-2"/>
                    <Link href="/profile/notification" shallow={true}>
                        <a className={`"notification-link uppercase text-sm hover:text-primary "
                            ${router.pathname == "/profile/notification" ? " text-primary" : ""}`}>
                            Thông báo
                        </a>
                    </Link>
                </li>
                <li className="user__info-item flex my-4 items-center">
                    <BiDonateHeart className="text-primary text-2xl mr-2"/>
                    <Link href="/profile/reward-point" shallow={true}>
                        <a className={`"reward-point-link uppercase text-sm hover:text-primary "
                            ${router.pathname == "/profile/reward-point" ? " text-primary" : ""}`}>
                            Điểm tích luỹ
                        </a>
                    </Link>
                </li>
            </ul>
    </>;
}