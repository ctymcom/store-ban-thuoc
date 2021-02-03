import { ProductData } from "./data/product-data";
import { ProductCard } from "./product-card";
type ProductListProps = {
  [x: string]: any;
  limit?: number;

}
export function ProductList({ limit, ...props }) {
  return (
    <div className="scrollbar flex relative overflow-auto md:overflow-hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5 py-8">
      {ProductData.map((item, index) => {
        if (index < limit) return <ProductCard key={index} {...item} />
      })}
    </div>
  );
}
