import { ProductData } from "./data/product-data";
import { ProductCard } from "./product-card";
type ProductListProps = {
  [x: string]: any;
  limit?: number;

}
export function ProductList({ limit, ...props }) {
  console.log(limit)
  return (
    <div className="grid grid-cols-5 gap-8 py-8">
      {ProductData.map((item, index) => {
        if (index < limit) return <ProductCard key={index} {...item} />
      })}
    </div>
  );
}
