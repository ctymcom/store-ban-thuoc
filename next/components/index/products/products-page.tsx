
import { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layouts/default-layout";
import { ProductsTags } from './components/products-tags';
import { TagsData } from "./data/tags-data";
import { CategoriesData } from './data/categories-data';
import { ProductsCategoriesFilter } from "./components/products-categories-filter";
import { ManufacturesData } from "./data/manufactures-data";
import { ProductsCategoriesLabels } from './components/products-categories-labels';

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
                    <div className="flex-grow">
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
                            <div className="flex-shrink-0">

                            </div>
                        </div>
                    </div>
                </> : null
            }
        </div>
    </>
}

ProductsPage.Layout = DefaultLayout