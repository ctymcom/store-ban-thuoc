import Link from "next/link";
import { AiOutlineBell } from "react-icons/ai";
import { BiDonateHeart, BiListPlus } from "react-icons/bi";
import { ImUser } from "react-icons/im";
import { useRouter } from "next/router";
import { LOGIN_PATHNAME, useAuth } from "../../lib/providers/auth-provider";
import { useEffect } from "react";

export function ProfileUser() {

    const router = useRouter();
    const { user, saveCurrentPath, checkUser } = useAuth()
    useEffect(() => {
        sessionStorage.setItem(LOGIN_PATHNAME, router.pathname)
        if(checkUser() === null) {
            router.replace('/login');
        }
    }, []);
    
    return <>
    {
        user ? <>
            <div className="hidden lg:flex items-center justify-center lg:justify-start mb-3 md:mb-0">
                <img src={ user.imageLink || "/assets/img/avatar.svg" } onError={(e) => {(e.target as any).src="/assets/img/avatar.svg"}} alt="" className="lg:w-1/4 rounded-full" />
                <div className=" ml-3 text-sm md:text-base">
                    <a href="#" className="block font-normal mb-1 md:mb-2">
                        { user.nickname }
                    </a>
                    <a href="/profile" className="block text-gray-500">
                        Chỉnh sửa hồ sơ
                    </a>
                </div>
            </div>
            <ul className="flex flex-col md:flex-row lg:flex-col md:justify-between lg:mt-4 mb-2 sm:mb-3 md:mb-0 w-36 sm:w-40 md:w-full m-auto">
                    <li className="flex mb-2.5 sm:mb-3.5 md:mb-5 items-center">
                        <ImUser className="text-primary border-2 border-primary rounded-full text-lg sm:text-lg md:text-2xl p-0.5 mr-2"/>
                        <Link href="/profile" shallow={true}>
                            <a className={`"  uppercase text-xs sm:text-sm md:text-base hover:text-primary " 
                                ${router.pathname == "/profile" ? " text-primary" : ""}`}>
                                Tài khoản của tôi
                            </a>
                        </Link>
                        
                    </li>
                    <li className="flex mb-2.5 sm:mb-3.5 md:mb-5 items-center">
                        <BiListPlus className="text-primary border-2 border-primary rounded text-lg sm:text-lg md:text-2xl mr-2"/>
                        <Link href="/profile/order-history" shallow={true}>
                            <a className={`"  uppercase text-xs sm:text-sm md:text-base hover:text-primary "
                                ${router.pathname == "/profile/order-history" || 
                                router.pathname == "/profile/order-details" ? " text-primary" : ""}`}>
                                Đơn mua
                            </a>
                        </Link>
                    
                    </li>
                    <li className="flex mb-2.5 sm:mb-3.5 md:mb-5 items-center">
                        <AiOutlineBell className="text-primary text-lg sm:text-lg md:text-2xl mr-2"/>
                        <Link href="/profile/notification" shallow={true}>
                            <a className={`"  uppercase text-xs sm:text-sm md:text-base hover:text-primary "
                                ${router.pathname == "/profile/notification" ? " text-primary" : ""}`}>
                                Thông báo
                            </a>
                        </Link>
                    </li>
                    <li className="flex mb-2.5 sm:mb-3.5 md:mb-5 items-center">
                        <BiDonateHeart className="text-primary text-lg sm:text-lg md:text-2xl mr-2"/>
                        <Link href="/profile/reward-point" shallow={true}>
                            <a className={`"  uppercase text-xs sm:text-sm md:text-base hover:text-primary "
                                ${router.pathname == "/profile/reward-point" ? " text-primary" : ""}`}>
                                Điểm thưởng
                            </a>
                        </Link>
                    </li>
                </ul>
            </> :   <Link href="/login">
                        <a className="btn-default h-12" onClick={saveCurrentPath}>
                            Đăng nhập
                        </a>
                    </Link>
    }
        
    </>;
}