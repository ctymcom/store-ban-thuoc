import { useEffect, useState } from "react"
import { SelectBox } from "../../../components/shared/form/select-box"
import { IconClose } from "../../../lib/svg/icon-close"
import { IconFilter } from "../../../lib/svg/icon-filter"

type FilterProps = {
    title?: string;
    status?: boolean;
    count?: number;
}
type HeaderProductListProps = {
    [x: string]: any;
    Filter: FilterProps[] | string[];
}

export function HeaderProductList({ Filter, ...props }: HeaderProductListProps) {
    const [filter, setfilter] = useState([{
        title: 'Tất cả sản phẩm',
        count: 423,
        status: true,
    },
    {
        title: 'Cơ xương khớp',
        count: 85,
        status: true,
    },
    {
        title: 'Da liễu',
        count: 486,
        status: true,
    },])
    // useEffect(() => {
    //     setfilter(Filter)
    // });
    return <>
        <div className="flex justify-between py-4 lg:hidden">
            <div className="flex lg:hidden space-x-2">
                <p className="text-xl">Sắp xếp:</p>
                <SelectBox style=' py-1 ' options={['Mới nhất', 'Rẻ nhất']} />
            </div>
            <div className="flex lg:hidden space-x-2">
                <p className="text-xl">Bộ lọc:</p>
                <div className="w-8" onClick={() => { props.onShowCatelogy(true) }}><IconFilter /></div>
            </div>
        </div>
        <div className="flex justify-between border-t-2 border-b-2 py-2 lg:border-t-0 lg:border-b-0">
            <div className="">
                <div className="flex items-center space-x-2">
                    <p className="text-xl">Danh mục: </p>
                    <div className="flex space-x-3">
                        {
                            filter.map((item, index) => {
                                return <div className="flex items-center space-x-2 bg-primary-100 px-2 rounded-sm" key={index}>
                                    <p className="">{item.title}</p>
                                    <div className="w-3 cursor-pointer"
                                        onClick={() => {
                                            filter.splice(index, 1)
                                            setfilter([...filter])
                                        }}>
                                        <IconClose /></div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-xl">Nhà sản xuất: </p>
                    <div className="flex space-x-3">
                        {
                            filter.map((item, index) => {
                                return <div className="flex items-center space-x-2 bg-primary-100 px-2 rounded-sm" key={index}>
                                    <p className="">{item.title}</p>
                                    <div className="w-3 cursor-pointer"
                                        onClick={() => {
                                            filter.splice(index, 1)
                                            setfilter([...filter])
                                        }}>
                                        <IconClose /></div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex justify-between space-x-2">
                <p className="text-xl">Sắp xếp:</p>
                <SelectBox style=' py-2 w-16 ' options={['Mới nhất', 'Rẻ nhất']} />
            </div>
        </div>
    </>
}