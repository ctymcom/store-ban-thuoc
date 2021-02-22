
import { ProductsProvider } from "../components/index/products/providers/products-provider";
import { DefaultLayout } from "../layouts/default-layout";
import { ProductsPage } from './../components/index/products/products-page';


export default function Products() {
    return <>
        <ProductsProvider>
            <ProductsPage />
        </ProductsProvider>
    </>
}

Products.Layout = DefaultLayout