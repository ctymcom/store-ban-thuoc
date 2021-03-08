import { RiMedicineBottleLine } from "react-icons/ri";
import { NotFound } from "../../shared/utilities/not-found";
import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { Spinner } from "../../shared/utilities/spinner";
import { QuickShoppingProduct } from "./components/quick-shopping-product";
import { QuickShoppingSearch } from "./components/quick-shopping-search";
import { QuickShoppingTotal } from "./components/quick-shopping-total";
import { useQuickShoppingContext } from "./providers/quick-shopping-provider";

export function QuickShoppingPage() {
  const { products, pagination, setPagination } = useQuickShoppingContext();

  return (
    <>
      <div className="py-4 md:py-12 main-container flex">
        <div className="flex-grow px-2 lg:px-0 lg:pr-8">
          <QuickShoppingSearch />
          {!products ? (
            <Spinner />
          ) : (
            <>
              <div>
                {products.length ? (
                  products.map((product, index) => (
                    <QuickShoppingProduct key={index} product={product} />
                  ))
                ) : (
                  <NotFound icon={<RiMedicineBottleLine />} text="Không tìm thấy thuốc" />
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <PaginationRound
                  limit={pagination.limit}
                  page={pagination.page}
                  total={pagination.total}
                  onPageChange={(page) => {
                    setPagination({ ...pagination, page });
                    scroll(0, 0);
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div className="fixed left-0 bottom-0 lg:relative lg:flex-shrink-0 w-full lg:w-80">
          <QuickShoppingTotal />
        </div>
      </div>
    </>
  );
}
