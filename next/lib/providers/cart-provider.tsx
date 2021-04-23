import { createContext, useContext, useEffect, useState } from "react";

import { Product } from "./../repo/product.repo";
import { ProductService } from "../repo/product.repo";
import { useToast } from "./toast-provider";
import { GraphService } from "../repo/graph.repo";
import gql from "graphql-tag";
import { useAuth } from "./auth-provider";

export interface CartProduct {
  productId: string;
  product?: Product;
  qty: number;
  price?: number;
  amount?: number;
  active?: boolean;
}

const CartContext = createContext<
  Partial<{
    cartProducts: CartProduct[];
    cartProductCount: number;
    cartTotal: number;
    setCartProducts: Function;
    setCartTotal: Function;
    loading: boolean;
    setLoading: Function;
    setCartProductCount: Function;
    addProductToCart: (product: Product, qty: number) => boolean;
    changeProductQuantity: (product: Product, qty: number) => void;
    removeProductFromCart: (product: Product) => void;
    promotion: string;
    setPromotion: Function;
    usePoint: boolean;
    setUsePoint: Function;
    reOrder: Function;
    cartProductTotal: number;
    setCartProductTotal: Function;
  }>
>({});

export function CartProvider({ children }: any) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartProductTotal, setCartProductTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promotion, setPromotion] = useState("");
  const [usePoint, setUsePoint] = useState(true);
  const { user } = useAuth();

  const toast = useToast();
  const getUserCart = async () => {
    const api = "getUserCart";
    const result = await GraphService.apollo.query({
      query: gql`
        query {
          ${api} {
            id
            createdAt
            updatedAt
            userId
            items{
                productId
                productCode
                qty
                product{
                    id
                    createdAt
                    updatedAt
                    code
                    name
                    unit
                    packing
                    basePrice
                    salePrice
                    saleRate
                    image
                    imageS
              }
            }
          }
        }
      `,
    });
    return result.data.getUserCart.items;
  };
  const updateCart = async (carts: CartProduct[]) => {
    if (user) {
      let data = {
        items: carts.map((item) => {
          return {
            productId: item.productId,
            productCode: item.product.code,
            qty: item.qty,
          };
        }),
      };
      console.log(data);
      let mutationName = "updateCart";
      const res = await GraphService.apollo.mutate({
        mutation: gql`
            mutation mutationName($data: UpdateCartInput!) {
              ${mutationName} (
                data: $data
              ) {
                id
                createdAt
                updatedAt
                userId
              }
            }
          `,
        variables: {
          data,
        },
      });
      if (res.data) {
      }
    }
  };
  useEffect(() => {
    try {
      setLoading(true);
      getUserCart()
        .then((res) => {
          let listCart: CartProduct[] = res.map((item: CartProduct) => {
            return {
              productId: item.productId,
              product: item.product,
              qty: item.qty,
              price: 0,
              amount: 0,
              active: true,
            };
          });
          if (listCart) {
            ProductService.getAll({
              query: {
                limit: 0,
                filter: {
                  _id: { __in: listCart.map((x) => x.productId) },
                },
              },
            }).then((res) => {
              if (res.data) {
                listCart.forEach((cartProduct) => {
                  let product = res.data.find((x) => x.id === cartProduct.productId);
                  if (product) {
                    cartProduct.price = product.salePrice;
                    cartProduct.amount = product.salePrice * cartProduct.qty;
                    cartProduct.product = product;
                  }
                });
                listCart = listCart.filter((x) => x.product);
                setLoading(false);
                setCartProductCount(
                  listCart.reduce((count, cartProduct) => (count += cartProduct.qty), 0)
                );
                setCartTotal(
                  listCart.reduce(
                    (total, cartProduct) =>
                      cartProduct.active ? (total += cartProduct.amount) : total,
                    0
                  )
                );
                setCartProducts([...listCart]);
              }
            });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      setPromotion("");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    updateCart(cartProducts);
    setCartProductCount(cartProducts.reduce((count, cartProduct) => (count += cartProduct.qty), 0));
    setCartTotal(
      cartProducts.reduce(
        (total, cartProduct) => (cartProduct.active ? (total += cartProduct.amount) : total),
        0
      )
    );
    setCartProductTotal(cartProducts.length);
  }, [cartProducts]);
  const reOrder = (items: { productId: string; qty: number }[]) => {
    let resCartProducts = [...items];
    cartProducts.forEach((item) => (item.active = false));
    if (resCartProducts) {
      //lấy danh sách product mua lại
      ProductService.getAll({
        query: {
          limit: 0,
          filter: {
            _id: { __in: resCartProducts.map((x) => x.productId) },
          },
        },
      }).then((res) => {
        let listCartNew = cartProducts;
        resCartProducts.forEach((reCartProduct) => {
          let { __typename, ...product } = res.data.find((x) => x.id == reCartProduct.productId);
          if (product) {
            let index = listCartNew.findIndex((x) => x.productId == product.id);
            console.log(index);
            if (index !== -1) {
              listCartNew.splice(index, 1);
            }
            listCartNew = [
              {
                productId: product.id,
                product: product,
                qty: reCartProduct.qty,
                price: product.salePrice,
                amount: product.salePrice * reCartProduct.qty,
                active: true,
              },
              ...listCartNew,
            ];
          }
        });
        setCartProducts([...listCartNew]);
      });
    }
  };
  const addProductToCart = (product: Product, qty: number): boolean => {
    if (!qty) return false;
    let cartProduct = cartProducts.find((x) => x.productId == product.id);
    if (cartProduct) {
      cartProduct.qty += qty;
      cartProduct.amount = cartProduct.price * cartProduct.qty;
    } else {
      cartProducts.push({
        productId: product.id,
        product: product,
        qty,
        price: product.salePrice,
        amount: product.salePrice * qty,
        active: true,
      });
    }
    setCartProducts([...cartProducts]);
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    return true;
  };

  const changeProductQuantity = (product: Product, qty: number) => {
    if (!qty) return;

    let cartProduct = cartProducts.find((x) => x.productId == product.id);
    if (cartProduct) {
      cartProduct.qty = qty;
      cartProduct.amount = cartProduct.price * qty;
      cartProduct.active = true;
    } else {
      cartProducts.push({
        productId: product.id,
        product: product,
        qty,
        price: product.salePrice,
        amount: product.salePrice * qty,
        active: true,
      });
    }
    setCartProducts([...cartProducts]);
  };

  const removeProductFromCart = (product: Product) => {
    let cartProductIndex = cartProducts.findIndex((x) => x.productId == product.id);
    if (cartProductIndex >= 0) {
      cartProducts.splice(cartProductIndex, 1);
    }
    setCartProducts([...cartProducts]);
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        setLoading,
        cartProducts,
        cartProductCount,
        cartTotal,
        addProductToCart,
        setCartProducts,
        changeProductQuantity,
        removeProductFromCart,
        setCartProductCount,
        promotion,
        setPromotion,
        usePoint,
        setUsePoint,
        reOrder,
        cartProductTotal,
        setCartProductTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
