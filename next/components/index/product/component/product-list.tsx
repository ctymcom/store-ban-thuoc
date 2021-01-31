import { ProductData } from "../../../shared/product/data/product-data";
import { ProductCard } from "../../../shared/product/product-card";

type ProductListProps = {
  [x: string]: any;
  limit?: number;

}
export function ProductList({ limit, ...props }) {
  console.log(limit)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5 py-8">
      {ProductData.map((item, index) => {
        if (index < limit) return <ProductCard key={index} {...item} />
      })}
    </div>
  );
}
