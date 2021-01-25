
import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Category } from "./component/category";
import { ProductList } from "./component/product-list";

export function ProductsPage() {
    const breadcrumbs = [
        { title: 'Trang chủ', path: '' },
        { title: 'Sản phẩm', path: '' },
    ]
    return <>
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <div className="container-1 flex">
                <Category />
                <ProductList />
            </div>
        </DashboardLayout>
    </>
}