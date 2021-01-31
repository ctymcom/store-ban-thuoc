import { useEffect, useState } from "react";
import { Checkbox } from "../../../shared/form/checkbox";
import { HeaderCategory } from "./session-header-category";
type CategoryItemProps = {
    title?: string;
    status?: boolean;
    count?: number;
}
type CategoryListProps = {
    [x: string]: any;
    title?: string;
    list?: CategoryItemProps[] | string[];
    onFilter?: (e: any) => void;
}
export function CategoryList({ title, list = [], onFilter, ...props }: CategoryListProps) {
    const [listData, setListData] = useState(list);
    useEffect(() => {
        setListData(list)
    })
    return <>
        <HeaderCategory title={title} />
        {
            (listData as CategoryItemProps[]).map((item, index) => {
                return <div className="" key={index}>
                    <Checkbox label={item.title} checked={item.status} key={index} count={`${item.count}`}
                        onChanged={() => {
                            item.status = !item.status;
                            setListData([...listData] as CategoryItemProps[])
                            onFilter(listData)
                        }} />
                </div>
            })
        }
    </>
}