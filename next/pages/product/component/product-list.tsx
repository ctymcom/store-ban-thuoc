import { useState } from "react";
import { ProductList } from "../../../components/shared/product/product-list";
import { TablePaginationCustom } from "../../../components/shared/table/table-pagination-custom";
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
    console.log(filter)
    return <div className=" w-full px-5 py-5">
        < HeaderProductList Filter={Filter} />
        <ProductList limit={pagination.limit} />
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