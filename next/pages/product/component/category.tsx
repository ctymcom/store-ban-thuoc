import { useState } from "react";
import { Checkbox } from "../../../components/shared/form/checkbox";
import { CategoryData } from "./category-data";
import { ManufacturerData } from "./manufacturer-data";
import { HeaderCategory } from "./session-header-category";

export function Category() {
    const [CategoryDT, setCategoryDT] = useState(CategoryData);
    const [ManufacturerDT, setManufacturerDT] = useState(ManufacturerData);
    return <>
        <div className="inset-0 top-14 overflow-auto z-40 w-72 px-2 py-5">
            <HeaderCategory title='Danh mục' />
            {
                CategoryDT.map((item, index) => {
                    return <div className="" key={index}>
                        <Checkbox label={item.title} checked={item.status} key={index} count={`${item.count}`}
                            onChanged={() => {
                                item.status = !item.status;
                                setCategoryDT([...CategoryDT])
                            }} />
                    </div>
                })
            }
            <HeaderCategory title='Nhà sản xuất' />
            {
                ManufacturerDT.map((item, index) => {
                    return <div className="" key={index}>
                        <Checkbox label={item.title} checked={item.status} key={index} count={`${item.count}`}
                            onChanged={() => {
                                item.status = !item.status;
                                setCategoryDT([...CategoryDT])
                            }} />
                    </div>
                })
            }
        </div>
    </>
}