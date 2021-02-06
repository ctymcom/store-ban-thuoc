
import { useEffect, useState } from "react";
import { QuickShoppingSearch } from './components/quick-shopping-search';
import { ProductsData } from './../../shared/product/data/product-data';
import { QuickShoppingProduct } from "./components/quick-shopping-product";
import { QuickShoppingTotal } from "./components/quick-shopping-total";
import { NotFound } from "../../shared/utitlies/not-found";
import { RiMedicineBottleLine } from "react-icons/ri";

let productsData = ProductsData
productsData = [...productsData, ...productsData]
productsData = [...productsData, ...productsData]
export function QuickShoppingPage() {

  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    setFilteredProducts(productsData.filter(x => x.name.includes(searchText)))
  }, [searchText]);

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
      </div>
      <div className="flex-shrink-0 w-80 relative">
        <div className="sticky top-8">
          <QuickShoppingTotal total={1200000}/>
        </div>
      </div>
    </div>
  </>
}