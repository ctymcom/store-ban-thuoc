import { useRouter } from 'next/router';
import { useState } from 'react'
import { TablePaginationCustom } from "../../../../../components/shared/table/table-pagination-custom";
import { IconBlock, IconUser, IconEdit } from "../../../../../lib/svg";

export function ViewGridUserpage(props) {
    const { ListUserData } = props;
    const router = useRouter();
    const [pagination, setpagination] = useState({
        limit: 8,
        total: 9,
        page: 1,
        offset: 2
    })
    const editUser = (item) => {
        router.push('/admin/manager/users/edit', null, { shallow: true });
    }
    return <>
        <div className="w-full py-3">
            <div className="w-full">
                <div className="w-full grid grid-cols-3 xl:grid-cols-4  gap-6">
                    {
                        ListUserData.slice(pagination.page * pagination.limit - pagination.limit, pagination.page * pagination.limit).map((item, index) => {
                            return <div key={index} className="user border-2 border-gray-200 p-3 rounded-md hover:shadow" >
                                <div className="profile-container pb-3 border-b-2">
                                    <div className="">
                                        <div className="avt flex justify-between items-start">
                                            <div className="container w-16 h-16 flex justify-center items-center bg-secondary-100 rounded-xl">
                                                <i className="w-12 h-12 z-10 text-secondary-400">
                                                    <IconUser />
                                                </i >
                                            </div>
                                            <button className="text-secondary-500">Xoá</button>
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
                                        <div className={(item.status ? " border-primary-500 bg-primary-500  text-white " : " bg-gray-200 text-gray-400") + " btn-block  border  cursor-pointer py-2 px-4 flex justify-center items-center rounded-md"}>
                                            <i className="icon w-10 h-5">
                                                <IconBlock />
                                            </i>
                                            <p>Khóa</p>
                                        </div>
                                    </div>
                                    <div className="btn-edit" onClick={() => editUser(item)}>
                                        <div className={(item.status ? " border-primary-500 bg-white text-primary-500 " : " bg-gray-200 text-gray-400") + " btn-block  border  cursor-pointer py-2 px-4 flex justify-center items-center rounded-md"}>
                                            <i className={(item.status ? " border-primary-500 bg-white text-primary-500 " : " bg-gray-200 text-gray-400 ") + " icon w-10 h-5 "}>
                                                <IconEdit />
                                            </i>
                                            <p className={(item.status ? " border-primary-500 bg-white text-primary-500 " : " bg-gray-200 text-gray-400 ")}>Sửa</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <TablePaginationCustom
                    pagination={pagination}
                    onPageChanged={(e) => {
                        var temp = { ...pagination }
                        temp.page = e
                        setpagination(temp)
                    }}
                />
            </div>
        </div>
    </>
}