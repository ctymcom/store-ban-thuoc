import { createContext, useContext, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { ProductTag, ProductTagService } from "../../../../lib/repo/product-tag.repo";
import { Category, CategoryService } from "../../../../lib/repo/category.repo";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { Product, ProductService } from "../../../../lib/repo/product.repo";
import { useRouter } from "next/router";
import { Ingredient } from "../../../../lib/repo/ingredient.repo";
import { SettingService } from "../../../../lib/repo/setting.repo";

enum SORT {
  latest,
  oldest,
  lowest,
  highest,
  alphabet,
}

export const SORT_TYPES = [
  { value: SORT.latest, display: "Sắp xếp mới nhất" },
  { value: SORT.oldest, display: "Sắp xếp cũ nhất" },
  { value: SORT.lowest, display: "Sắp xếp giá thấp nhất" },
  { value: SORT.highest, display: "Sắp xếp giá cao nhất" },
  { value: SORT.alphabet, display: "Sắp xếp theo tên" },
];

export const DiscountContext = createContext<
  Partial<{
    loadDone: boolean;
    products: Product[];
    pagination: Pagination;
    setPagination: Function;
    sort: number;
    setSort: Function;
  }>
>({});

export function DiscountProvider(props) {
  const [products, setProducts] = useState<Product[]>(null);
  const [sort, setSort] = useState<SORT>();
  const [pagination, setPagination] = useState<Pagination>({ limit: 16, page: 1, total: 0 });

  const loadProducts = async () => {
    let order: any = {};
    switch (+sort) {
      case SORT.latest: {
        order = { createdAt: -1 };
        break;
      }
      case SORT.oldest: {
        order = { createdAt: 1 };
        break;
      }
      case SORT.lowest: {
        order = { basePrice: 1 };
        break;
      }
      case SORT.highest: {
        order = { basePrice: -1 };
        break;
      }
      case SORT.alphabet: {
        order = { name: 1 };
        break;
      }
    }
    setProducts(null);
    let res = await ProductService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        filter: {
          tags: { __in: ["FLASHSALES"] },
        },
        order,
      },
    });

    setProducts(res.data);
    setPagination({ ...pagination, total: res.pagination.total });
  };

  useEffect(() => {
    loadProducts();
  }, [pagination.page, sort]);

  return (
    <DiscountContext.Provider
      value={{
        products,
        sort,
        setSort,
        pagination,
        setPagination,
      }}
    >
      {props.children}
    </DiscountContext.Provider>
  );
}

export const useDiscountContext = () => useContext(DiscountContext);
