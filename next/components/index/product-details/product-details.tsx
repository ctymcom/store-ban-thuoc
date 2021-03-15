import { ProductList } from "../../shared/product/product-list";
import { Spinner } from "../../shared/utilities/spinner";
import { ProductComments } from "./components/product-comments";
import { ProductContent } from "./components/product-content";
import { ProductMain } from "./components/product-main";
import { useProductDetailsContext } from "./providers/product-details-provider";

export function ProductDetailsPage() {
  const { product } = useProductDetailsContext();

  return !product ? (
    <Spinner />
  ) : (
    <div className="main-container">
      <ProductMain />
      {!!product.relatedProducts.length && (
        <div className="my-8">
          <ProductList title="Sản phẩm tương tự" products={product.relatedProducts} />
        </div>
      )}
      <ProductContent />
      <ProductComments />
    </div>
  );
}
