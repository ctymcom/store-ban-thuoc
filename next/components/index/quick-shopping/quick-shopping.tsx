
import { useEffect, useState } from "react";
import { RiMedicineBottleLine } from "react-icons/ri";
import { NotFound } from "../../shared/utilities/not-found";
import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { ProductsData } from './../../shared/product/data/product-data';
import { QuickShoppingProduct } from "./components/quick-shopping-product";
import { QuickShoppingSearch } from './components/quick-shopping-search';
import { QuickShoppingTotal } from "./components/quick-shopping-total";

let productsData = ProductsData
productsData = [...productsData, ...productsData]
productsData = [...productsData, ...productsData]
productsData = [...productsData, ...productsData]
productsData = [...productsData, ...productsData]
export function QuickShoppingPage() {

  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    limit: 8,
    page: 1,
    total: productsData.length
  });
  const [filteredProducts, setFilteredProducts] = useState(productsData.slice(0, pagination.limit));

  useEffect(() => {
    let products = productsData.filter(x => x.name.includes(searchText)).slice(0, pagination.limit)
    setFilteredProducts(products)
    setPagination({...pagination, page: 1})
  }, [searchText]);

  useEffect(() => {
    let products = productsData.filter(x => x.name.includes(searchText)).slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit)
    setFilteredProducts(products)
  }, [pagination])

  return <>
    <div className="py-12 main-container flex">
      <div className="flex-grow pr-8">
        <QuickShoppingSearch searchText={searchText} onChange={setSearchText}/>
        <div>
          {
            filteredProducts.length?
            filteredProducts.map((product, index) => 
              <QuickShoppingProduct key={index} product={product} />
            ):
            <NotFound icon={<RiMedicineBottleLine/>} text="Không tìm thấy thuốc"/>
          }
        </div>
        <div className="mt-4 flex justify-end">
          <PaginationRound
            limit={pagination.limit}
            page={pagination.page}
            total={pagination.total}
            onPageChange={(page) => setPagination({...pagination, page})}
          />
        </div>
      </div>
      <div className="flex-shrink-0 w-80 relative">
        <div className="sticky top-8">
          <QuickShoppingTotal total={1200000}/>
        </div>
      </div>
    </div>
  </>
}