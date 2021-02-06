
import { DefaultLayout } from "../layouts/default-layout";
import { ProductsPage } from './../components/index/products/products-page';


export default function Products() {
    return <>
        <ProductsPage />
    </>
}

Products.Layout = DefaultLayout