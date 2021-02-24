
import { RiMedicineBottleLine } from "react-icons/ri";
import { NotFound } from "../../shared/utilities/not-found";
import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { Spinner } from "../../shared/utilities/spinner";
import { QuickShoppingProduct } from "./components/quick-shopping-product";
import { QuickShoppingSearch } from './components/quick-shopping-search';
import { QuickShoppingTotal } from "./components/quick-shopping-total";
import { useQuickShoppingContext } from './providers/quick-shopping-provider';

export function QuickShoppingPage() {

  const { products, pagination, setPagination } = useQuickShoppingContext()

  return <>
    <div className="py-12 main-container flex">
      <div className="flex-grow pr-8">
        <QuickShoppingSearch/>
        {
          !products ? <Spinner/> : <>            
            <div>
              {
                products.length?
                products.map((product, index) => 
                  <QuickShoppingProduct key={index} product={product} />
                ):
                <NotFound icon={<RiMedicineBottleLine/>} text="Không tìm thấy thuốc"/>
              }
            </div>
            <div className="mt-4 flex justify-center">
              <PaginationRound
                limit={pagination.limit}
                page={pagination.page}
                total={pagination.total}
                onPageChange={(page) => setPagination({...pagination, page})}
              />
            </div>
          </>
        }
      </div>
      <div className="flex-shrink-0 w-80 relative">
        <QuickShoppingTotal total={1200000}/>
      </div>
    </div>
  </>
}