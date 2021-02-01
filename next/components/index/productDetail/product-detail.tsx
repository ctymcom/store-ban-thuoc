import { ProductDetail } from "./component/product-detail";
import { DefaultLayout } from "../../../layouts/default-layout";

export function ProductDetailPage() {
  return (
    <>
      <DefaultLayout>
        <ProductDetail />
      </DefaultLayout>
    </>
  );
}
