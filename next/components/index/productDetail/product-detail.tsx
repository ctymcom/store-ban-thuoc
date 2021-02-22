import { ProductList } from "../../shared/product/product-list";
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
          {/* <div className="py-12">
              <ProductList type='similar-products' />
          </div> */}
          <div className="grid mt-20 text-lg uppercase font-medium">
            <ul className="flex">
              <ProductHeading />
            </ul>
          </div>
          <ProductDescription />
        </div>
      </div>
      
    </>
  );
}
