import { useEffect, useState } from "react";
import { IconClose } from "../../../lib/svg/icon-close";
import { CategoryData } from "./category-data";
import { ManufacturerData } from "./manufacturer-data";
import { CategoryList } from "./session-category-list";

export function Category(props) {
    const [filter, setfilter] = useState([]);
    const [CategoryDT, setCategoryDT] = useState(CategoryData);
    const [ManufacturerDT, setManufacturerDT] = useState(ManufacturerData);
    const [ShowCatelogy_responesive, setShowCatelogy_responesive] = useState(false);
    useEffect(() => {
        setShowCatelogy_responesive(props.ShowCatelogy_responesive)
    });
    console.log(ShowCatelogy_responesive)
    return <>
        <div className="hidden lg:block inset-0 top-14 overflow-auto z-40 w-72 px-2 py-5">
            <CategoryList title='Danh mục' list={CategoryDT} onFilter={(e) => { props.onFilter(e); console.log(e) }} />
            <CategoryList title='Nhà sản xuất' list={ManufacturerDT} onFilter={(e) => { props.onFilter(e) }} />
        </div>
        <div className={"lg:hidden  z-50 w-full fixed top-0 right-0 overflow-auto min-h-screen h-screen flex bg-black bg-opacity-25 " +
            (ShowCatelogy_responesive ? " opacity-100 " : " invisible ")
        }>
            <div className="w-2/6 "
                onClick={() => {
                    setShowCatelogy_responesive(false);
                    props.onShowCatelogy_responesive(false)
                }}></div>
            <div className="w-4/6 bg-white ">
                <div className='flex flex-col'>
                    <div className="py-5 px-5 bg-primary-500 text-white flex items-center justify-between sticky top-0 w-full" >
                        <p className="text-xl uppercase">Bộ lọc</p>
                        <div
                            className="w-4 "
                            onClick={() => {
                                setShowCatelogy_responesive(false);
                                props.onShowCatelogy_responesive(false)
                            }}
                        >
                            <IconClose />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between bg-white px-4 ">
                        <div className="">
                            <CategoryList title='Danh mục' list={CategoryDT} onFilter={(e) => { props.onFilter(e); console.log(e) }} />
                            <CategoryList title='Nhà sản xuất' list={ManufacturerDT} onFilter={(e) => { props.onFilter(e) }} />
                        </div>
                    </div>
                    <div className="py-5 px-5 bg-white  flex items-center justify-end w-full sticky bottom-0 " >
                        <div className="px-5 py-2 text-xl text-primary-500">Hủy</div>
                        <div className="px-5 py-2 text-xl text-white bg-primary-500 rounded">Áp dụng</div>
                    </div>
                </div>
            </div>

        </div>
    </>
}