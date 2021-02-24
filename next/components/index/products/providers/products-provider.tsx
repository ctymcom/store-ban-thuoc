import { cloneDeep, isEqual } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { Category, CategoryService } from './../../../../lib/repo/category.repo';
import { Pagination } from './../../../../lib/repo/crud.repo';
import { Product, ProductService } from './../../../../lib/repo/product.repo';

enum SORT {
  latest,
  oldest,
  lowest,
  highest,
  alphabet
}

export const SORT_TYPES = [
  { value: SORT.latest, display: 'Sắp xếp mới nhất' },
  { value: SORT.oldest, display: 'Sắp xếp cũ nhất' },
  { value: SORT.lowest, display: 'Sắp xếp giá thấp nhất' },
  { value: SORT.highest, display: 'Sắp xếp giá cao nhất' },
  { value: SORT.alphabet, display: 'Sắp xếp theo tên' },
]

export interface FilterCategory extends Category {
    checked?: boolean
    open?: boolean
    subcategories?: FilterCategory[]
}

export const ProductsContext = createContext<{
  loadDone?: boolean
  products?: Product
  sort?: number
  setSort?: Function
  categories?: Category[]
  setCategories?: Function
  pagination?: Pagination
  setPagination?: Function
}>({});

export function ProductsProvider(props) {
  const [products, setProducts] = useState<Product[]>(null);
  const [loadDone, setLoadDone] = useState(false);
  const [sort, setSort] = useState<SORT>();
  const [categories, setCategories] = useState<FilterCategory[]>(null);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ limit: 16, page: 1, total: 0 });

  const initData = () => {
    CategoryService.query({
      query: [
        CategoryService.getAllQuery({ query: { limit: 0, filter: { parentIds: { __size: 0 } } }, fragment: CategoryService.fullFragment }),
        CategoryService.getAllQuery({ query: { limit: 0, filter: { parentIds: { __size: 1 } } }, fragment: CategoryService.fullFragment }),
      ]
    }).then(res => {
      let newCategories = cloneDeep(res.data.g0.data)
      let newSubCategories = cloneDeep(res.data.g1.data)
      newCategories.forEach(cat => {
          cat.checked = false
          cat.subcategories = newSubCategories.filter(sub => sub.parentIds.includes(cat.id))
          cat.subcategories.forEach(sub => sub.checked = false)
      })
      setCategories(newCategories)
      setSort(SORT_TYPES[0].value)
      setLoadDone(true)
    })
  }

  const loadProducts = async () => {
    let order: any = {}
    switch (sort) {
      case SORT.latest: {
        order = { createdAt: -1 }
        break
      }
      case SORT.oldest: {
        order = { createdAt: 1 }
        break
      }
      case SORT.lowest: {
        order = { basePrice: 1 }
        break
      }
      case SORT.highest: {
        order = { basePrice: -1 }
        break
      }
      case SORT.alphabet: {
        order = { name: 1 }
        break
      }
    }

    setProducts(null)
    let res = await ProductService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        filter: {
          ...categoryIds.length?{ categoryIds: { __in: categoryIds } }:{}
        },
        order
      }
    })
    setProducts(res.data)
    console.log('hello', res)
    setPagination({...pagination, total: res.pagination.total})
  }

  useEffect(() => {
    if (categories) {
      let ids = categories.reduce((ids, cat) => {
        if (cat.checked) ids = [...ids, cat.id]
        else if (cat.checked == undefined && cat.subcategories) {
          ids = [...ids, ...cat.subcategories.filter(sub => sub.checked).map(sub => sub.id)]
        }
        return ids
      }, [])
      if (isEqual(ids.sort(), categoryIds.sort())) {
        setCategoryIds(ids)
      }
    }
  }, [categories]);

  useEffect(() => {
    loadProducts()
  }, [categoryIds, sort, pagination.page]);

  useEffect(() => {
    initData();
  }, []);

  return <ProductsContext.Provider value={{ loadDone, categories, setCategories, sort, setSort, pagination, setPagination }}>
    {props.children}
  </ProductsContext.Provider>;
}

export const userProductsContext = () => useContext(ProductsContext);