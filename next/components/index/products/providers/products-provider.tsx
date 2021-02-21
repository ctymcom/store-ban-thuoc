import { createContext, useContext, useEffect, useState } from "react";
import { MdFreeBreakfast } from "react-icons/md";
import { ProductsFilter } from "../products-page";
import { Category, CategoryService } from './../../../../lib/repo/category.repo';
import { GetListData, Pagination } from './../../../../lib/repo/crud.repo';
import { Product, ProductService } from './../../../../lib/repo/product.repo';

export const ProductsContext = createContext<{
  loadDone?: boolean
  categories?: Category[]
  subCategories?: Category[]
  loadProducts?: (filter: ProductsFilter, pagination?: Pagination) => Promise<GetListData<Product>>
}>({});

export function ProductsProvider(props) {
  const [loadDone, setLoadDone] = useState(false);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);

  const loadData = () => {    
    CategoryService.query({
      query: [
        CategoryService.getAllQuery({ query: { limit: 0, filter: { parentIds: { __size: 0 } } }, fragment: CategoryService.fullFragment }),
        CategoryService.getAllQuery({ query: { limit: 0, filter: { parentIds: { __size: 1 } } }, fragment: CategoryService.fullFragment }),
      ]
    }).then(res => {
      setCategories(res.data.g0.data)
      setSubCategories(res.data.g1.data)
      setLoadDone(true)
    })
  }

  const loadProducts = (filter: ProductsFilter, pagination: Pagination) => {
    let categoryIds = filter.categories.reduce((ids, cat) => {
      if (cat.checked) ids = [...ids, cat.id]
      else if (cat.checked == undefined && cat.subcategories) {
        ids = [...ids, ...cat.subcategories.filter(sub => sub.checked).map(sub => sub.id)]
      }
      return ids
    }, [])

    let order: any = {}
    switch (filter.sort) {
      case 'latest': {
        order = { createdAt: -1 }
        break
      }
      case 'oldest': {
        order = { createdAt: 1 }
        break
      }
      case 'lowest': {
        order = { basePrice: 1 }
        break
      }
      case 'highest': {
        order = { basePrice: -1 }
        break
      }
      case 'alphabet': {
        order = { name: 1 }
        break
      }
    }

    return ProductService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        filter: {
          ...categoryIds.length?{ categoryIds: { __in: categoryIds } }:{}
        },
        order
      }
    })
  }

  useEffect(() => {
    loadData();
  }, []);

  return <ProductsContext.Provider value={{ loadDone, categories, subCategories, loadProducts }}>
    {props.children}
  </ProductsContext.Provider>;
}

export const userProductsContext = () => useContext(ProductsContext);