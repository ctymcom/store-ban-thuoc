import { ProductDetailPage } from "../components/index/productDetail/product-detail";
import { DefaultLayout } from '../layouts/default-layout';

export default function ProductDetail() {
  return (
    <>
      <ProductDetailPage />
    </>
  );
}
ProductDetail.Layout = DefaultLayout;
