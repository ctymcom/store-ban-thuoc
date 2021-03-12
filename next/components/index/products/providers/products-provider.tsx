import { createContext, useContext, useEffect, useState } from "react";
import { cloneDeep } from "../../../../lib/lodash";
import { ProductTag, ProductTagService } from "../../../../lib/repo/product-tag.repo";
import { Category, CategoryService } from "./../../../../lib/repo/category.repo";
import { Pagination } from "./../../../../lib/repo/crud.repo";
import { Product, ProductService } from "./../../../../lib/repo/product.repo";
import { useRouter } from "next/router";
import { Ingredient } from "./../../../../lib/repo/ingredient.repo";

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

export interface FilterCategory extends Category {
  checked?: boolean;
  open?: boolean;
  subcategories?: FilterCategory[];
}

export const ProductsContext = createContext<
  Partial<{
    loadDone: boolean;
    products: Product[];
    sort: number;
    setSort: Function;
    tags: ProductTag[];
    setTags: Function;
    categories: Category[];
    setCategories: Function;
    pagination: Pagination;
    setPagination: Function;
    ingredient: Partial<Ingredient>;
    setIngredient: Function;
  }>
>({});

export function ProductsProvider(props) {
  const [products, setProducts] = useState<Product[]>(null);
  const [loadDone, setLoadDone] = useState(false);
  const [sort, setSort] = useState<SORT>();
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [categories, setCategories] = useState<FilterCategory[]>(null);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ limit: 16, page: 1, total: 0 });
  const [ingredient, setIngredient] = useState<Partial<Ingredient>>(null);

  const router = useRouter();
  const initData = () => {
    if (router.query["ingredientId"]) {
      setIngredient({
        id: router.query["ingredientId"] as string,
        name: router.query["ingredientName"] as string,
      });
    }

    CategoryService.query({
      query: [
        CategoryService.getAllQuery({
          query: { limit: 0, filter: { parentIds: { __size: 0 } } },
          fragment: CategoryService.fullFragment,
        }),
        CategoryService.getAllQuery({
          query: { limit: 0, filter: { parentIds: { __size: 1 } } },
          fragment: CategoryService.fullFragment,
        }),
        ProductTagService.getAllQuery({ query: { limit: 0, order: { position: 1 } } }),
      ],
    }).then((res) => {
      let newCategories = cloneDeep(res.data.g0.data);
      let newSubCategories = cloneDeep(res.data.g1.data);
      newCategories.forEach((cat) => {
        cat.checked = false;
        cat.subcategories = newSubCategories.filter((sub) => sub.parentIds.includes(cat.id));
        cat.subcategories.forEach((sub) => (sub.checked = false));
      });
      setCategories(newCategories);
      setSort(SORT_TYPES[0].value);

      const clonedTags = cloneDeep(res.data.g2.data) as ProductTag[];
      if (router.query["sale"]) {
        clonedTags
          .filter((x) => ["FLASHSALES", "SALESDOWN"].includes(x.code))
          .forEach((x) => (x.active = true));
      }
      setTags(clonedTags);

      setLoadDone(true);
    });
  };

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
    let tagCodes = tags.filter((x) => x.active).map((x) => x.code);

    setProducts(null);
    let res = await ProductService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        filter: {
          ...(categoryIds.length ? { categoryIds: { __in: categoryIds } } : {}),
          ...(tagCodes.length ? { tags: { __in: tagCodes } } : {}),
          ...(ingredient ? { ingredientIds: { __in: ingredient.id } } : {}),
        },
        order,
      },
    });

    setProducts(res.data);
    setPagination({ ...pagination, total: res.pagination.total });
  };

  useEffect(() => {
    if (categories) {
      let ids = categories.reduce((ids, cat) => {
        if (cat.checked) ids = [...ids, cat.id];
        else if (cat.checked == undefined && cat.subcategories) {
          ids = [...ids, ...cat.subcategories.filter((sub) => sub.checked).map((sub) => sub.id)];
        }
        return ids;
      }, []);

      if (ids.sort().join() != categoryIds.sort().join()) {
        setCategoryIds(ids);
      }
    }
  }, [categories]);

  useEffect(() => {
    loadProducts();
  }, [categoryIds, sort, pagination.page, tags, ingredient]);

  useEffect(() => {
    initData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        loadDone,
        products,
        categories,
        setCategories,
        sort,
        setSort,
        tags,
        setTags,
        pagination,
        setPagination,
        ingredient,
        setIngredient,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
