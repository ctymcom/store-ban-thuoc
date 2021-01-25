
import { useState } from "react";
import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Category } from "./component/category";
import { ProductListPage } from "./component/product-list";

export function ProductsPage() {
    const [filter, setfilter] = useState([])
    const breadcrumbs = [
        { title: 'Trang chủ', path: '' },
        { title: 'Sản phẩm', path: '' },
    ]
    return <>
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <div className="container-1 flex">
                <Category onFilter={(e) => { setfilter(e.filter((item) => { return item.status })) }} />
                <ProductListPage Filter={filter} />
            </div>
        </DashboardLayout>
    </>
}