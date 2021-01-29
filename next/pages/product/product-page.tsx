
import { useState } from "react";
import { TablePaginationCustom } from "../../components/shared/table/table-pagination-custom";
import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Category } from "./component/category";
import { ProductListPage } from "./component/product-list-page";

export function ProductsPage() {
    const [filter, setfilter] = useState([])
    const [ShowCatelogy_responesive, setShowCatelogy_responesive] = useState(false);

    const breadcrumbs = [
        { title: 'Trang chủ', path: '' },
        { title: 'Sản phẩm', path: '' },
    ]
    console.log(ShowCatelogy_responesive)
    return <>
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <div className="px-8 container-1 flex">
                <Category
                    onFilter={(e) => { setfilter(e.filter((item) => { return item.status })) }}
                    ShowCatelogy_responesive={ShowCatelogy_responesive}
                    onShowCatelogy_responesive={(e) => { setShowCatelogy_responesive(e) }}
                />
                <ProductListPage
                    Filter={filter}
                    onShowCatelogy_responesive={(e) => { setShowCatelogy_responesive(e) }}
                />

            </div>
        </DashboardLayout>
    </>
}