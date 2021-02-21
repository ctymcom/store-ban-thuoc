
import { useEffect, useState } from "react";
import { ProductsTags } from './components/products-tags';
import { TagsData } from "./data/tags-data";
import { CategoriesData } from './data/categories-data';
import { ProductsCategoriesFilter } from "./components/products-categories-filter";
import { ManufacturesData } from "./data/manufactures-data";
import { ProductsCategoriesLabels } from './components/products-categories-labels';
import { ProductsFilterSort } from './components/products-filter-sort';
import { ProductsData } from "../../shared/product/data/product-data";
import { ProductCard } from "../../shared/product/product-card";
import { PaginationRound } from './../../shared/utilities/pagination/pagination-round';
import { ProductsContext, ProductsProvider, userProductsContext } from "./providers/products-provider";
import { Spinner } from "../../shared/utilities/spinner";
import { cloneDeep } from "lodash";
import { Category } from "../../../lib/repo/category.repo";
import { Pagination } from './../../../lib/repo/crud.repo';
import { Product } from "../../../lib/repo/product.repo";
import { NotFound } from "../../shared/utilities/not-found";

export const SORT_TYPES = [
    { value: 'latest', display: 'Sắp xếp mới nhất' },
    { value: 'oldest', display: 'Sắp xếp cũ nhất' },
    { value: 'lowest', display: 'Sắp xếp giá thấp nhất' },
    { value: 'highest', display: 'Sắp xếp giá cao nhất' },
    { value: 'alphabet', display: 'Sắp xếp theo tên' },
]

export interface FilterCategory extends Category {
    checked?: boolean
    subcategories?: FilterCategory[]
}

export interface ProductsFilter {
    tags: any[]
    categories: FilterCategory[]
    manufactures?: any[]
    sort: string
}

export function ProductsPage() {

    const [productsFilter, setProductsFilter] = useState<ProductsFilter>(null);
    const [products, setProducts] = useState<Product[]>(null);
    const [pagination, setPagination] = useState<Pagination>({ limit: 16, page: 1, total: 0 });
    const { loadDone, categories, subCategories, loadProducts } = userProductsContext()

    useEffect(() => {
        if (loadDone) {
            let newCategories = cloneDeep(categories)
            let newSubCategories = cloneDeep(subCategories)
            newCategories.forEach(cat => {
                cat.checked = false
                cat.subcategories = newSubCategories.filter(sub => sub.parentIds.includes(cat.id))
                cat.subcategories.forEach(sub => sub.checked = false)
            })
            setProductsFilter({
                categories: newCategories,
                sort: SORT_TYPES[0].value,
                tags: TagsData
            })
        }
    }, [loadDone]);

    const reloadProducts = () => {
        setProducts(null)
        scroll({ top: 0 })
        loadProducts(productsFilter, pagination).then(res => {
            setProducts(res.data)
            setPagination(res.pagination)
        })
    }

    const onPageChanged = (page) => {
        setPagination({...pagination, page})
        reloadProducts()
    }

    useEffect(() => {
        if (productsFilter) {
            setPagination({...pagination, page: 1})
            reloadProducts()
        }
    }, [productsFilter]);

    return <>
        {
            !loadDone ? <Spinner/> : 
            <>
                <div className="py-12 main-container flex">
                    {
                        productsFilter ? <>
                            <div className="flex-shrink-0 w-72">
                                <div className="mt-8">
                                    <ProductsCategoriesFilter 
                                        title="Danh mục"
                                        categories={productsFilter.categories} 
                                        setCategories={categories => setProductsFilter({...productsFilter, categories})}
                                    />
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
                                <ProductsTags 
                                    tags={productsFilter.tags} 
                                    setTags={tags => setProductsFilter({...productsFilter, tags})}
                                />
                                <hr className="my-4 border"/>
                                <div className="flex justify-between">
                                    <div className="flex-grow">
                                        <ProductsCategoriesLabels 
                                            categories={productsFilter.categories} 
                                            // manufactures={productsFilter.manufactures} 
                                            setCategories={categories => setProductsFilter({...productsFilter, categories})}
                                            // setManufactures={manufactures => setProductsFilter({...productsFilter, manufactures})}
                                        />
                                    </div>
                                    <div className="flex-shrink-0 pl-4">
                                        <ProductsFilterSort sort={productsFilter.sort} onChange={(sort) => setProductsFilter({...productsFilter, sort})}/>
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
                                                onPageChange={(page) => { onPageChanged(page) }}
                                            />
                                        </div>
                                    </>
                                }
                            </div>                    
                        </> : null
                    }
                </div>
            </>  
        }
    </>
}