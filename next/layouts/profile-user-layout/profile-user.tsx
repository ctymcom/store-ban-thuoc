import Link from "next/link";
import { AiOutlineBell } from "react-icons/ai";
import { BiDonateHeart, BiListPlus } from "react-icons/bi";
import { ImUser } from "react-icons/im";
import { useRouter } from "next/router";

export function ProfileUser() {

    const router = useRouter();
    
    return <>
        <div className="flex items-center justify-center lg:justify-start mb-3 md:mb-0">
            <img src="/assets/img/avatar.svg" alt="" className="max-w-6xs lg:max-w-5xs rounded-full" />
            <div className=" ml-4 text-sm md:text-base">
                <a href="#" className="block font-normal mb-2">
                    minhuy2996543
                </a>
                <a href="#" className="block text-gray-500">
                    Chỉnh sửa hồ sơ
                </a>
            </div>
        </div>
        <ul className="flex flex-col md:flex-row lg:flex-col items-center md:items-start md:justify-between md:mt-4">
                <li className="flex my-2 md:my-2 items-center">
                    <ImUser className="text-primary border-2 border-primary rounded-full text-xl md:text-2xl p-0.5 mr-2"/>
                    <Link href="/profile" shallow={true}>
                        <a className={`" uppercase text-sm hover:text-primary " 
                            ${router.pathname == "/profile" ? " text-primary" : ""}`}>
                            Tài khoản của tôi
                        </a>
                    </Link>
                    
                </li>
                <li className="flex my-2 md:my-2 items-center">
                    <BiListPlus className="text-primary border-2 border-primary rounded text-xl md:text-2xl mr-2"/>
                    <Link href="/profile/order-history" shallow={true}>
                        <a className={`" uppercase text-sm hover:text-primary "
                            ${router.pathname == "/profile/order-history" || 
                            router.pathname == "/profile/order-details" ? " text-primary" : ""}`}>
                            Đơn mua
                        </a>
                    </Link>
                   
                </li>
                <li className="flex my-2 md:my-2 items-center">
                    <AiOutlineBell className="text-primary text-xl md:text-2xl mr-2"/>
                    <Link href="/profile/notification" shallow={true}>
                        <a className={`" uppercase text-sm hover:text-primary "
                            ${router.pathname == "/profile/notification" ? " text-primary" : ""}`}>
                            Thông báo
                        </a>
                    </Link>
                </li>
                <li className="flex my-2 md:my-2 items-center">
                    <BiDonateHeart className="text-primary text-xl md:text-2xl mr-2"/>
                    <Link href="/profile/reward-point" shallow={true}>
                        <a className={`" uppercase text-sm hover:text-primary "
                            ${router.pathname == "/profile/reward-point" ? " text-primary" : ""}`}>
                            Điểm thưởng
                        </a>
                    </Link>
                </li>
            </ul>
    </>;
}