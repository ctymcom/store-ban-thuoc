import { SectionHeader } from "../../index/home/component/section-header";
import { ProductsData } from "./data/product-data";
import { ProductCard } from "./product-card";
type ProductListProps = {
  [x: string]: any;
  type: 'latest' | 'best_seller' | 'exclusive' | 'personalized' | 'related'
}
export function ProductList({ type, ...props }: ProductListProps) {

  let title = ''
  switch (type) {
    case 'best_seller': title = 'Sản phẩm bán chạy'; break;
    case 'exclusive': title = 'Chỉ có tại ThuocSi.vn'; break;
    case 'latest': title = 'Sản phẩm mới nhất'; break;
    case 'personalized': title = 'Lựa chọn của bạn'; break;
    case 'related': title = 'Sản phẩm liên quan'; break;
  }

  return (
    <>
      <SectionHeader text={title}/>
      <div className="grid grid-cols-5 gap-4">
        {
          ProductsData.map((item, index) => {
            return <ProductCard key={index} {...item} />
          })
        }
      </div>
    </>
  );
}
