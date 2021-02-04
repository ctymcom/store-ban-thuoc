import { useState } from "react";
import { ProductList } from "./product-list";
import { TablePaginationCustom } from "../../../shared/table/table-pagination-custom";
import { HeaderProductList } from "./session-header-product-list";


export function ProductListPage(props) {
    const { Filter } = props
    const [filter, setfilter] = useState(Filter)
    const [pagination, setpagination] = useState({
        limit: 15,
        total: 100,
        page: 1,
        offset: 2
    })
    return <div className=" w-full px-5 py-5">
        <HeaderProductList Filter={Filter} onShowCatelogy={(e) => props.onShowCatelogy_responesive(e)} />
        {/* <ProductList limit={pagination.limit} /> */}
        <TablePaginationCustom
            pagination={pagination}
            onPageChanged={(e) => {
                var temp = { ...pagination }
                temp.page = e
                setpagination(temp)
            }}
        />
    </div >
}