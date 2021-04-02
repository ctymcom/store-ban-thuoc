import React, { useEffect } from "react";
import { ProductCard } from "../../shared/product/product-card";
import { NotFound } from "../../shared/utilities/not-found";
import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { Spinner } from "../../shared/utilities/spinner";
import { ProductsFilterSort } from "./components/products-filter-sort";
import { useDiscountContext } from "./providers/discount-provider";

export function DiscountPage() {
  const { products, pagination, setPagination } = useDiscountContext();

  useEffect(() => {
    if (!products) {
      scroll({ top: 0 });
    }
  }, [products]);

  return (
    <div className="w-full h-full -mb-20 bg-gradient-to-r from-green-400 to-blue-400">
      <div className="py-4 md:py-12 main-container">
        <div className="flex justify-between">
          <div className="text-2xl font-bold text-accent-light">Sản phẩm khuyến mãi</div>
          <ProductsFilterSort />
        </div>
        <div className="pb-4">
          {!products ? (
            <Spinner color="white" />
          ) : (
            <>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-5 gap-y-5">
                {!products.length ? (
                  <NotFound text="Không có sản phẩm nào" className="col-span-5" />
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="bg-white p-2 rounded shadow-md">
                      <ProductCard product={product} showGroup={false} />
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center mt-8">
                <PaginationRound
                  limit={pagination.limit}
                  page={pagination.page}
                  total={pagination.total}
                  onPageChange={(page) => {
                    setPagination({ ...pagination, page });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
