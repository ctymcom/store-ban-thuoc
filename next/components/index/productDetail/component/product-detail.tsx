import { ProductDescription } from "./product-description";
import { ProductHeading } from "./product-heading";
import { ProductMain } from "./product-main";

export function ProductDetail() {
  return (
    <>
      <div className="container-1">
        <div className="grid grid-rows-1">
          <ProductMain />
        </div>

        <div className="grid grid-rows-1">
          <div className="grid grid-cols-10 mt-52 text-lg uppercase font-medium">
            <ProductHeading />
          </div>
          <ProductDescription />
        </div>
      </div>
    </>
  );
}
