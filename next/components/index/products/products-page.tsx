
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
import { PaginationRound } from './../../shared/utitlies/pagination/pagination-round';

export const SORT_TYPES = [
    { value: 'latest', display: 'Sắp xếp mới nhất' },
    { value: 'oldest', display: 'Sắp xếp cũ nhất' },
    { value: 'lowest', display: 'Sắp xếp giá thấp nhất' },
    { value: 'highest', display: 'Sắp xếp giá cao nhất' },
    { value: 'alphabet', display: 'Sắp xếp theo tên' },
]

interface ProductsFilter {
    tags: any[]
    categories: any[]
    manufactures: any[]
    sort: string
}

export function ProductsPage() {

    const [productsFilter, setProductsFilter] = useState<ProductsFilter>(null);
    const [products, setProducts] = useState([...ProductsData, ...ProductsData, ...ProductsData, ...ProductsData].slice(0, 16));
    const [pagination, setPagination] = useState({
        limit: 8,
        page: 1,
        total: 143
    });

    useEffect(() => {
        let categories = [...CategoriesData]
        categories.forEach(cat => {
            cat.checked = false
            if (cat.subcategories) {
                cat.subcategories.forEach(sub => sub.checked = false)
            }
        })

        let manufactures = [...ManufacturesData]
        manufactures.forEach(man => {
            man.checked = false
        })

        setProductsFilter({
            categories,
            manufactures,
            sort: SORT_TYPES[0].value,
            tags: TagsData
        })
    }, []);

    return <>
        <div className="py-12 main-container flex">
            {
                productsFilter ? <>
                    <div className="flex-shrink-0 w-56">
                        <div className="mt-8">
                            <ProductsCategoriesFilter 
                                title="Danh mục"
                                categories={productsFilter.categories} 
                                setCategories={categories => setProductsFilter({...productsFilter, categories})}
                            />
                        </div>
                        <div className="mt-4">
                            <ProductsCategoriesFilter 
                                title="Nhà sản xuất"
                                categories={productsFilter.manufactures}
                                setCategories={manufactures => setProductsFilter({...productsFilter, manufactures})}
                            />
                        </div>
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
                                    manufactures={productsFilter.manufactures} 
                                    setCategories={categories => setProductsFilter({...productsFilter, categories})}
                                    setManufactures={manufactures => setProductsFilter({...productsFilter, manufactures})}/>
                            </div>
                            <div className="flex-shrink-0 pl-4">
                                <ProductsFilterSort sort={productsFilter.sort} onChange={(sort) => setProductsFilter({...productsFilter, sort})}/>
                            </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 lg:gap-x-6 xl:gap-x-7 gap-y-10">
                            {
                                products.map((product, index) => <ProductCard {...product}/>)
                            }
                        </div>
                        <div className="flex justify-center mt-8">
                            <PaginationRound
                                limit={pagination.limit}
                                page={pagination.page}
                                total={pagination.total}
                                onPageChange={(page) => setPagination({...pagination, page})}
                            />
                        </div>
                    </div>                    
                </> : null
            }
        </div>
    </>
}