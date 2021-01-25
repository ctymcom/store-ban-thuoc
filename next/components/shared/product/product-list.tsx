import { ProductData } from "./data/product-data";
import { ProductCard } from "./product-card";

export function ProductList() {
  return (
    <div className="grid grid-cols-5 gap-8 py-8">
      {ProductData.map((item, index) => (
        <ProductCard key={index} {...item} />
      ))}
    </div>
  );
}
