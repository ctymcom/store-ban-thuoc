import { SectionHeader } from "../../index/home/component/section-header";
import { ProductsData } from "./data/product-data";
import { ProductCard } from "./product-card";
type ProductListProps = {
  [x: string]: any;
  type: 'latest' | 'best_seller' | 'exclusive' | 'personalized' | 'related' | 'similar-products'
}
export function ProductList({ type, ...props }: ProductListProps) {

  let title = ''
  switch (type) {
    case 'best_seller': title = 'Sản phẩm bán chạy'; break;
    case 'exclusive': title = 'Chỉ có tại ThuocSi.vn'; break;
    case 'latest': title = 'Sản phẩm mới nhất'; break;
    case 'personalized': title = 'Lựa chọn của bạn'; break;
    case 'related': title = 'Sản phẩm liên quan'; break;
    case 'similar-products': title = 'Sản phẩm tương tự'; break;
  }

  return (
    <>
      <SectionHeader text={title}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-5">
        {
          ProductsData.map((item, index) => {
            return <ProductCard key={index} {...item} />
          })
        }
      </div>
    </>
  );
}
