import { useEffect, useState } from "react"
import { SelectBox } from "../../../components/shared/form/select-box"
import { IconClose } from "../../../lib/svg/icon-close"

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
    const [filter, setfilter] = useState([])
    useEffect(() => {
        setfilter(Filter)
    });
    console.log(filter)
    return <div className="flex justify-between">
        <div className="flex items-center space-x-2">
            <p className="text-xl">Bộ lọc: </p>
            <div className="flex space-x-3">
                {
                    Filter.map((item, index) => {
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
        <div className="flex justify-between space-x-2">
            <p className="text-xl">Sắp xếp:</p>
            <SelectBox style=' py-2 w-16 ' options={['Mới nhất', 'Rẻ nhất']} />
        </div>
    </div>
}