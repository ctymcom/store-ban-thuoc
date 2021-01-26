

export function ProfileUser() {
    return (
        <>
            <div className="user flex items-center">
                <img src="../../../../public/assets/images/avatar.png" alt="" className="user__avatar" />
                <div className="profile__user ml-4">
                    <a href="#" className="profile__user-link block font-semibold text-text-color mb-2">
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
                    <a href="./profile-user" className="user__info-link uppercase font-semibold text-sm">
                        Tài khoản của tôi
                    </a>
                </li>
                <li className="user__info-item flex my-4">
                    <img
                        src="../../../../public/assets/images/icons/icon-oder.png"
                        alt=""
                        className="user__info-icon w-5 h-5 mr-3"
                    />
                    <a href="./oder-history" className="user__info-link uppercase font-semibold text-sm text-success">
                        Đơn mua
                    </a>
                </li>
                <li className="user__info-item flex my-4">
                    <img
                        src="../../../../public/assets/images/icons/icon-bell.png"
                        alt=""
                        className="user__info-icon w-5 h-5 mr-3"
                    />
                    <a href="./notification" className="user__info-link uppercase font-semibold text-sm">
                        Thông báo
                    </a>
                </li>
            </ul>
        </>
    );
}
