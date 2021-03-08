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
    setcartProducts: Function;
    setCartTotal: Function;
    loading: boolean;
    setLoading: Function;
    addProductToCart: (product: Product, qty: number) => boolean;
    changeProductQuantity: (product: Product, qty: number) => void;
    removeProductFromCart: (product: Product) => void;
  }>
>({});

export function CartProvider({ children }: any) {
  const [cartProducts, setcartProducts] = useState<CartProduct[]>([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
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
              (total, cartProduct) => (cartProduct.active ? (total += cartProduct.amount) : total),
              0
            )
          );
        });
        setcartProducts([...cartProductStorage]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "cartProductStorage",
      JSON.stringify(
        cartProducts.map((item) => {
          return { productId: item.productId, qty: item.qty, active: item.active };
        })
      )
    );
    setCartProductCount(cartProducts.reduce((count, cartProduct) => (count += cartProduct.qty), 0));
    setCartTotal(
      cartProducts.reduce(
        (total, cartProduct) => (cartProduct.active ? (total += cartProduct.amount) : total),
        0
      )
    );
  }, [cartProducts]);

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
    setcartProducts([...cartProducts]);
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
    setcartProducts([...cartProducts]);
  };

  const removeProductFromCart = (product: Product) => {
    let cartProductIndex = cartProducts.findIndex((x) => x.productId == product.id);
    if (cartProductIndex >= 0) {
      cartProducts.splice(cartProductIndex, 1);
    }
    setcartProducts([...cartProducts]);
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
        setcartProducts,
        changeProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
