import { ProductDescription } from "./component/product-description";
import { ProductHeading } from "./component/product-heading";
import { ProductMain } from "./component/product-main";

export function ProductDetailPage() {
  return (
    <>
      <div className="main-container px-4">
        <div className="grid grid-rows-1">
          <ProductMain />
        </div>
        <div className="grid grid-rows-1">
          <div className="grid grid-cols-10 mt-20 text-lg uppercase font-medium">
            <ProductHeading />
          </div>
          <ProductDescription />
        </div>
      </div>
    </>
  );
}
