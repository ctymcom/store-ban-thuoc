import { SectionHeader } from "../../index/home/component/section-header";
import { ProductCard } from "./product-card";
import { Product } from './../../../lib/repo/product.repo';

interface PropsType extends ReactProps {
  products?: Product[]
  title?: string
}
export function ProductList(props: PropsType) {

  return (
    <>
      <SectionHeader text={props.title}/>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
        {
          props.products.map((product, index) => {
            return <ProductCard key={product.id} product={product} />
          })
        }
      </div>
    </>
  );
}
