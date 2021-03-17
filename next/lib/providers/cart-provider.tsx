import { createContext, useContext, useEffect, useState } from "react";

import { Product } from "./../repo/product.repo";
import { ProductService } from "../repo/product.repo";
import { useToast } from "./toast-provider";

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
  }>
>({});

export function CartProvider({ children }: any) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promotion, setPromotion] = useState("");
  const [usePoint, setUsePoint] = useState(true);

  const toast = useToast();

  useEffect(() => {
    if (!cartProducts) {
      try {
        setLoading(true);
        let cartProductStorage = JSON.parse(
          localStorage.getItem("cartProductStorage")
        ) as CartProduct[];
        if (cartProductStorage) {
          ProductService.getAll({
            query: {
              limit: 0,
              filter: {
                _id: { __in: cartProductStorage.map((x) => x.productId) },
              },
            },
          }).then((res) => {
            setLoading(false);

            cartProductStorage.forEach((cartProduct) => {
              let product = res.data.find((x) => x.id == cartProduct.productId);
              if (product) {
                cartProduct.price = product.salePrice;
                cartProduct.amount = product.salePrice * cartProduct.qty;
                cartProduct.product = product;
              }
            });
            cartProductStorage = cartProductStorage.filter((x) => x.product);
            setLoading(false);
            setCartProductCount(
              cartProductStorage.reduce((count, cartProduct) => (count += cartProduct.qty), 0)
            );
            setCartTotal(
              cartProductStorage.reduce(
                (total, cartProduct) =>
                  cartProduct.active ? (total += cartProduct.amount) : total,
                0
              )
            );
          });
          setCartProducts([...cartProductStorage]);
          console.log(cartProductStorage);
        } else {
          console.log(cartProductStorage);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setPromotion("");
        setLoading(false);
      }
    }
  }, []);
  useEffect(() => {
    console.log(cartProducts);
    localStorage.setItem(
      "cartProductStorage",
      JSON.stringify(
        cartProducts?.map((item) => {
          return { productId: item.productId, qty: item.qty, active: item.active };
        })
      )
    );
    setCartProductCount(
      cartProducts?.reduce((count, cartProduct) => (count += cartProduct.qty), 0)
    );
    setCartTotal(
      cartProducts?.reduce(
        (total, cartProduct) => (cartProduct.active ? (total += cartProduct.amount) : total),
        0
      )
    );
  }, [cartProducts]);
  const reOrder = async (items: [{ productId: string; qty: number }]) => {
    let resCartProducts = [...items];
    let newCarts = cartProducts;
    newCarts.forEach((item) => (item.active = false));
    console.log(resCartProducts);

    if (resCartProducts) {
      ProductService.getAll({
        query: {
          limit: 0,
          filter: {
            _id: { __in: resCartProducts.map((x) => x.productId) },
          },
        },
      }).then((res) => {
        console.log(res);

        setLoading(false);

        resCartProducts.forEach((reCartProduct) => {
          let { __typename, ...product } = res.data.find((x) => x.id == reCartProduct.productId);
          if (product) {
            let cartFound = newCarts.find((x) => x.productId == product.id);
            if (cartFound) {
              cartFound.active = true;
              cartFound.qty = reCartProduct.qty;
              cartFound.price = product.salePrice;
              cartFound.amount = product.salePrice * reCartProduct.qty;
            } else {
              let cartResPro: CartProduct = {
                productId: reCartProduct.productId,
                price: product.salePrice,
                qty: reCartProduct.qty,
                amount: product.salePrice * reCartProduct.qty,
                product,
                active: true,
              };
              newCarts.push(cartResPro);
            }
          }
        });
        setLoading(false);
      });
      await setCartProducts([...newCarts]);
      console.log(newCarts);
    } else {
      setLoading(false);
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
    } else {
      cartProducts.push({
        productId: product.id,
        product: product,
        qty,
        price: product.salePrice,
        amount: product.salePrice * qty,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
