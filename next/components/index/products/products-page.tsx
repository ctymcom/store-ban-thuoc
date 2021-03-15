import React, { useEffect, useState } from "react";
import { ProductCard } from "../../shared/product/product-card";
import { NotFound } from "../../shared/utilities/not-found";
import { Spinner } from "../../shared/utilities/spinner";
import { PaginationRound } from "./../../shared/utilities/pagination/pagination-round";
import { ProductsCategoriesFilter } from "./components/products-categories-filter";
import { ProductsCategoriesLabels } from "./components/products-categories-labels";
import { ProductsFilterSort } from "./components/products-filter-sort";
import { useProductsContext } from "./providers/products-provider";
import { ProductsTags } from "./components/products-tags";
import useScreen from "../../../lib/hooks/useScreen";
import { HiFilter, HiOutlineX } from "react-icons/hi";
import { Transition } from "@headlessui/react";
import useScrollBlock from "./../../../lib/hooks/useScrollBlock";
import BreadCrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";

const breadcrumbs = [
  {
    href: "/",
    label: "Trang chủ",
  },
  {
    label: "Sản phẩm",
  },
];

export function ProductsPage() {
  const { loadDone, products, pagination, setPagination } = useProductsContext();
  const [filterOpened, setFilterOpened] = useState(false);

  useEffect(() => {
    if (!products) {
      scroll({ top: 0 });
    }
  }, [products]);

  const screenLg = useScreen("lg");
  useScrollBlock({ dependencies: [filterOpened] });

  return (
    <>
      {!loadDone ? (
        <Spinner />
      ) : (
        <>
          {!screenLg && filterOpened && (
            <Transition
              show={filterOpened}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed w-screen h-screen z-50 top-0 left-0">
                <div
                  className="absolute bg-black w-full h-full opacity-40"
                  onClick={() => setFilterOpened(false)}
                ></div>
                <div className="relative w-8/12 max-w-xs h-full bg-white shadow-md min-w-2xs flex flex-col">
                  <div className="h-16 bg-primary flex items-center justify-between">
                    <span className="text-white text-lg font-bold px-6">Lọc sản phẩm</span>
                    <button
                      className="btn-default px-0 w-10 h-10 mr-2 text-gray-100 hover:text-white hover:bg-primary-dark text-24"
                      onClick={() => setFilterOpened(false)}
                    >
                      <i>
                        <HiOutlineX />
                      </i>
                    </button>
                  </div>
                  <div
                    className="flex flex-col w-full p-4 v-scrollbar"
                    style={{ maxHeight: "calc(100vh - 4rem)" }}
                  >
                    <ProductsCategoriesFilter title="Danh mục" />
                  </div>
                </div>
              </div>
            </Transition>
          )}
          <div className="py-4 md:py-12 main-container">
            <div className="pb-4">
              <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex">
              {screenLg && (
                <div className="flex-shrink-0 w-72">
                  <div className="mt-3">
                    <ProductsCategoriesFilter title="Danh mục" />
                  </div>
                  {/* <div className="mt-4">
                                <ProductsCategoriesFilter 
                                    title="Nhà sản xuất"
                                    categories={productsFilter.manufactures}
                                    setCategories={manufactures => setProductsFilter({...productsFilter, manufactures})}
                                />
                            </div> */}
                </div>
              )}
              <div className="flex-grow lg:pl-3">
                <ProductsTags />
                <hr className="my-4 border" />
                {!screenLg && (
                  <>
                    <div className="flex justify-between">
                      <button className="btn-default px-0" onClick={() => setFilterOpened(true)}>
                        <i className="text-xl">
                          <HiFilter />
                        </i>
                        <span>Lọc</span>
                      </button>
                      <ProductsFilterSort />
                    </div>
                    <ProductsCategoriesLabels />
                  </>
                )}
                {screenLg && (
                  <div className="flex justify-between">
                    <div className="flex-grow">
                      <ProductsCategoriesLabels />
                    </div>
                    <div className="flex-shrink-0 pl-4">
                      <ProductsFilterSort />
                    </div>
                  </div>
                )}
                {!products ? (
                  <Spinner />
                ) : (
                  <>
                    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-x-6 xl:gap-x-7 gap-y-10">
                      {!products.length ? (
                        <NotFound text="Không có sản phẩm nào" className="col-span-5" />
                      ) : (
                        products.map((product) => (
                          <ProductCard key={product.id} product={product} />
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
        </>
      )}
    </>
  );
}
