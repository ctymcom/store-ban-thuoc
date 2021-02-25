import { cloneDeep, isEqual } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { ProductTag, ProductTagService } from "../../../../lib/repo/product-tag.repo";
import { Category, CategoryService } from '../../../../lib/repo/category.repo';
import { Pagination } from '../../../../lib/repo/crud.repo';
import { Product, ProductService } from '../../../../lib/repo/product.repo';
import useDebounce from "../../../../lib/hooks/useDebounce";

export const QuickShoppingContext = createContext<Partial<{
  products: Product[]
  search: string
  setSearch: Function
  pagination: Pagination
  setPagination: Function
}>>({});

export function QuickShoppingProvider(props) {
  const [products, setProducts] = useState<Product[]>(null);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ limit: 16, page: 1, total: 0 });
  const debouncedSearch = useDebounce(search, 300);

  const loadProducts = async () => {
    setProducts(null)
    let res = await ProductService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        search: debouncedSearch,
        order: { createdAt: -1 }
      }
    })

    setProducts(res.data)
    setPagination({...pagination, total: res.pagination.total})
  }
  
  useEffect(() => {
    loadProducts()
  }, [debouncedSearch, pagination.page]);

  return <QuickShoppingContext.Provider value={{ products, search, setSearch, pagination, setPagination }}>
    {props.children}
  </QuickShoppingContext.Provider>;
}

export const useQuickShoppingContext = () => useContext(QuickShoppingContext);