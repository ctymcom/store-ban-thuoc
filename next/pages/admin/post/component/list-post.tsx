import { useState } from "react";
import { SelectBox } from "../../../../components/shared/form/select-box";
import { TablePaginationCustom } from "../../../../components/shared/table/table-pagination-custom";
import { ListPostData } from "./list-post-data";

export function ListPost() {
    const [pagination, setpagination] = useState({
        limit: 12,
        total: 24,
        page: 1,
        offset: 2
    })
    return <div className="">
        <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Bài viết</div>
            <div className="flex items-center">
                <SelectBox options={['Tất cả bài viết', 'Bản nháp']}
                    style='py-1 ' />
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                    <p className="text-sm font-semibold">Sắp xếp: </p>
                    <SelectBox options={['Tất cả bài viết', 'Bản nháp']}
                        style='border-none font-semibold py-1 '
                    />
                </div>
                <div className="ml-4">
                    <div className="px-3 py-2 text-sm bg-primary-500 cursor-pointer text-white rounded">
                        Tạo bài viết
                    </div>
                </div>
            </div>
        </div>
        <div className="py-8">
            <div className="grid grid-cols-4 gap-8 py-2">
                {
                    ListPostData.slice(pagination.page * pagination.limit - pagination.limit, pagination.page * pagination.limit).map((item, index) => {
                        return <div className="p-2 rounded bg-white flex flex-col justify-between" key={index}>
                            <div className="cursor-pointer">
                                <div className=" max-h-40">
                                    <img src={item.img} alt="" className=" max-h-40" />
                                </div>
                                <div className="py-2 max-h-80">
                                    <h1 className="py-2 font-semibold">{item.title}</h1>
                                    <h3 className="py-2 text-sm font-semibold text-gray-400">Người viết: <span className='text-blue-500'>{item.author}</span></h3>
                                    <p className="text-sm text-gray-400"> {item.description}  </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-end py-2">
                                <div className="px-4 py-2 cursor-pointer mr-2 bg-gray-200 text-gray-400 border-2 border-gray-200 text-center rounded font-semibold">
                                    Chỉnh sửa
                                </div>
                                {
                                    item.posted ? <div className="px-4 py-2 cursor-pointer  border-2 border-primary-500  text-primary-500 text-center rounded font-semibold">
                                        Gỡ bài
                                    </div>
                                        : <div className="px-4 py-2 cursor-pointer bg-primary-500 border-2 border-primary-500 text-white  text-center rounded font-semibold">
                                            Đăng bài
                                        </div>
                                }
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="">
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
    </div>
}