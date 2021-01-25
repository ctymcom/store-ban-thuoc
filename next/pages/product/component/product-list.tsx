import { useState } from "react";
import { ProductList } from "../../../components/shared/product/product-list";
import { HeaderProductList } from "./session-header-product-list";


export function ProductListPage(props) {
    const { Filter } = props
    const [filter, setfilter] = useState(Filter)
    console.log(filter)
    return <div className=" w-full px-5 py-5">
        < HeaderProductList Filter={Filter} />
        <ProductList limit={15} />
    </div >
}