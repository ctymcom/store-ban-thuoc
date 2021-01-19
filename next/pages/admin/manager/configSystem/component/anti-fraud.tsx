import { useRouter } from 'next/router';
import { useState } from 'react'
import { TablePaginationCustom } from "../../../../../components/shared/table/table-pagination-custom";
import { IconBlock, IconUser, IconEdit, IconDelete } from "../../../../../lib/svg";
import { HeaderAntiFraud } from './header-anti-fraud';
export function AntiFraud(props) {
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
        <HeaderAntiFraud />
        <div className="w-full py-3">
            <div className="w-full">
                <div className="w-full grid grid-cols-3 xl:grid-cols-4  gap-6">
                    {
                        ListUserData.slice(pagination.page * pagination.limit - pagination.limit, pagination.page * pagination.limit).map((item, index) => {
                            return <div key={index} className="user border-2 border-gray-200 p-2 rounded-md hover:shadow" >

                                <div className="infor-user">
                                    <div className="infor py-2 text-sm">
                                        <div className="date-create text-sm py-1">
                                            <p><b>Ngày tạo quy tắc:</b> {item.date_create}</p>
                                        </div>
                                        <div className="email text-sm py-1">
                                            <p><b>Tên quy tắc:</b> Quy tắc cộng trừ nhân chia Quy tắc cộng trừ nhân chia</p>
                                        </div>
                                        <div className="phone text-sm py-1">
                                            <p><b>Ngày kích hoạt quy tắc:</b> {item.date_create}</p>
                                        </div>
                                        <div className="status text-sm py-1">
                                            {item.status ?
                                                <p className={'text-green-400'}>Đã kích hoạt</p> :
                                                <p className={'text-gray-400'}>Chưa kích hoạt</p>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="btn-edit grid grid-cols-2 gap-2 py-2">
                                    <div className="btn-block ">
                                        <div className="btn-block text-white border border-primary-500 bg-primary-500 hover:bg-primary-400 cursor-pointer py-2 px-4 flex justify-center items-center rounded-md">
                                            <i className="icon w-10 h-5">
                                                <IconDelete />
                                            </i>
                                            <p>Xóa</p>
                                        </div>
                                    </div>
                                    <div className="btn-edit" onClick={() => editUser(item)}>
                                        <div className="btn-block bg-white border border-primary-500 cursor-pointer py-2 px-4 flex justify-center items-center rounded-md">
                                            <i className="icon w-10 h-5 text-primary-500">
                                                <IconEdit />
                                            </i>
                                            <p className=" text-primary-500">Sửa</p>
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