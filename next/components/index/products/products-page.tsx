
import { useEffect } from "react";
import { ProductCard } from "../../shared/product/product-card";
import { NotFound } from "../../shared/utilities/not-found";
import { Spinner } from "../../shared/utilities/spinner";
import { PaginationRound } from './../../shared/utilities/pagination/pagination-round';
import { ProductsCategoriesFilter } from "./components/products-categories-filter";
import { ProductsCategoriesLabels } from './components/products-categories-labels';
import { ProductsFilterSort } from './components/products-filter-sort';
import { useProductsContext } from "./providers/products-provider";
import { ProductsTags } from './components/products-tags';

export function ProductsPage() {
    const { loadDone, products, pagination, setPagination } = useProductsContext()

    useEffect(() => {
        if (!products) {
            scroll({ top: 0 })
        }
    }, [products]);

    return <>
        {
            !loadDone ? <Spinner/> : 
            <>
                <div className="py-12 main-container flex">
                    <div className="flex-shrink-0 w-72">
                        <div className="mt-8">
                            <ProductsCategoriesFilter title="Danh mục"/>
                        </div>
                        {/* <div className="mt-4">
                            <ProductsCategoriesFilter 
                                title="Nhà sản xuất"
                                categories={productsFilter.manufactures}
                                setCategories={manufactures => setProductsFilter({...productsFilter, manufactures})}
                            />
                        </div> */}
                    </div>
                    <div className="flex-grow pl-3">
                        <ProductsTags/>
                        <hr className="my-4 border"/>
                        <div className="flex justify-between">
                            <div className="flex-grow">
                                <ProductsCategoriesLabels/>
                            </div>
                            <div className="flex-shrink-0 pl-4">
                                <ProductsFilterSort/>
                            </div>
                        </div>
                        {
                            !products ? <Spinner/> : <>                                        
                                <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 lg:gap-x-6 xl:gap-x-7 gap-y-10">
                                {
                                    !products.length ? <NotFound text="Không có sản phẩm nào" className="col-span-5"/> :
                                    products.map((product) => <ProductCard key={product.id} product={product}/>)       
                                }
                                </div>
                                <div className="flex justify-center mt-8">
                                    <PaginationRound
                                        limit={pagination.limit}
                                        page={pagination.page}
                                        total={pagination.total}
                                        onPageChange={(page) => { setPagination({...pagination, page}) }}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </>  
        }
    </>
}