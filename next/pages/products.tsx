import { ProductsPage } from "../components/index/product/product-page";
import { DefaultLayout } from "../layouts/default-layout";


export default function Products() {
    return <>
        <ProductsPage />
    </>
}

Products.Layout = DefaultLayout