export function AccountOverview(props) {
    const { User } = props

    return (
        <>
            <div className="w-full pt-3">
                <div className="container">
                    <div className="information-account">
                        <div className="header-avt-name flex items-start space-x-4">
                            <div className="avt">
                                <img src="https://ss-images.catscdn.vn/2019/05/02/5086417/58673861_2082849575345662_5550445563004059648_n.jpg" alt={User.name} className='rounded-lg w-24' />
                            </div>
                            <div className="infor">
                                <div className="name">
                                    <p>{User.name}</p>
                                </div>
                                <div className="text-gray-400 text-xs py-1">
                                    <p>Ngày tạo: {User.date_create}</p>
                                </div>
                                <div className="flex justify-statrt space-x-3 py-1">
                                    <div className="btn-change-avt">
                                        <div className="py-2 px-3 text-sm bg-primary-500 text-white rounded-md cursor-pointer hover:bg-primary-600">
                                            Đổi avatar
                                        </div>
                                    </div>
                                    <div className="btn-change-password">
                                        <div className="py-2 px-3 text-sm bg-secondary-500 text-gray-800 rounded-md cursor-pointer hover:bg-secondary-600">
                                            Đổi mật khẩu
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            Tổng quan tài khoản
        </>
    )
}