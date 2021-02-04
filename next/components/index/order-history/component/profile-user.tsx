import Link from 'next/link';
import { useState } from 'react';
type ProfileUserProps = {
    [x: string]: any,
    activeIndex: number
}

export function ProfileUser(props: ProfileUserProps) {

    const [Active, setActive] = useState(props.activeIndex);  
    return (
        <>
            <div className="user flex items-center">
                <img src="../../../../public/assets/images/avatar.png" alt="" className="user__avatar" />
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
                <li className="user__info-item flex my-4">
                    <img
                        src="../../../../public/assets/images/icons/icon-sale.png"
                        alt=""
                        className="user__info-icon w-5 h-5 mr-3"
                    />
                    <Link href="/profile/profile-user" shallow={true}>
                        <a className={`"user__info-link uppercase font-semibold text-sm hover:text-primary " 
                            ${Active == 1 ? " text-primary" : ""}`}
                            onClick={() => setActive(1)}>
                            Tài khoản của tôi
                        </a>
                    </Link>
                    
                </li>
                <li className="user__info-item flex my-4">
                    <img
                        src="../../../../public/assets/images/icons/icon-oder.png"
                        alt=""
                        className="user__info-icon w-5 h-5 mr-3"
                    />
                    <Link href="/profile/order-history" shallow={true}>
                        <a className={`"user__info-link uppercase font-semibold text-sm hover:text-primary "
                            ${Active ==  0 ? " text-primary" : ''}`}>
                            Đơn mua
                        </a>
                    </Link>
                   
                </li>
                <li className="user__info-item flex my-4">
                    <img
                        src="../../../../public/assets/images/icons/icon-bell.png"
                        alt=""
                        className="user__info-icon w-5 h-5 mr-3"
                    />
                    <Link href="/profile/notification" shallow={true}>
                        <a className={`"user__info-link uppercase font-semibold text-sm hover:text-primary "
                            ${Active == 2 ? " text-primary" : ""}`}
                            onClick={() => setActive(2)}>
                            Thông báo
                        </a>
                    </Link>
                </li>
            </ul>
        </>
    );
}