import { useEffect, useState } from "react";
import { Checkbox } from "../../../components/shared/form/checkbox";
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
    const [ListDT, setList] = useState(list);
    useEffect(() => {
        setList(list)
    })
    return <>
        <HeaderCategory title={title} />
        {
            ListDT.map((item, index) => {
                return <div className="" key={index}>
                    <Checkbox label={item.title} checked={item.status} key={index} count={`${item.count}`}
                        onChanged={() => {
                            item.status = !item.status;
                            setList([...ListDT])
                            onFilter(ListDT)
                        }} />
                </div>
            })
        }
    </>
}