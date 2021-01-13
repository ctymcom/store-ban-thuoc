import { IconBlock, IconUser, IconEdit } from "../../../../../lib/svg";

export function ViewGridUserpage(props) {
    const { ListUserData } = props
    return <>
        <div className="w-full py-3">
            <div className="w-full">
                <div className="w-full grid grid-cols-4  gap-6">
                    {
                        ListUserData.map((item, index) => {
                            return (
                                <>
                                    <div className="user w-64 border-2 border-gray-200 p-3 rounded-md hover:shadow" >
                                        <div className="profile-container pb-3 border-b-2">
                                            <div className="w-80">
                                                <div className="avt">
                                                    <div className="container w-16 h-16 flex justify-center items-center bg-yellow-100 rounded-xl">
                                                        <i className="w-12 h-12 z-10 text-yellow-400">
                                                            <IconUser />
                                                        </i >
                                                    </div>
                                                </div>
                                                <div className="name pt-2">
                                                    <div className="nickname text-sm text-gray-400">
                                                        <p>{item.nickname}</p>
                                                    </div>
                                                    <div className="fullname text-sm text-gray-700">
                                                        <p>{item.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="infor-user">
                                            <div className="infor py-2 text-sm">
                                                <div className="date-create text-sm">
                                                    <p>Ngày tạo: {item.date_create}</p>
                                                </div>
                                                <div className="email text-sm">
                                                    <p>Email: {item.email}</p>
                                                </div>
                                                <div className="phone text-sm">
                                                    <p>Điện thoại: {item.phone}</p>
                                                </div>
                                                <div className="status text-sm">
                                                    {item.status ?
                                                        <p className={'text-green-400'}>Đang hoạt động</p> :
                                                        <p className={'text-gray-400'}>Dừng hoạt động</p>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-edit grid grid-cols-2 gap-2 py-2">
                                            <div className="btn-block ">
                                                <div className="btn-block bg-red-100 hover:bg-red-200 cursor-pointer w-24 h-10 flex justify-center items-center text-red-500 rounded-md">
                                                    <i className="icon w-10 h-5">
                                                        <IconBlock />
                                                    </i>
                                                    <p>Khóa</p>
                                                </div>
                                            </div>
                                            <div className="btn-edit">
                                                <div className="btn-block bg-green-100 hover:bg-green-200 cursor-pointer w-24 h-10 flex justify-center items-center text-green-500 rounded-md">
                                                    <i className="icon w-10 h-5">
                                                        <IconEdit />
                                                    </i>
                                                    <p>Sửa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
}