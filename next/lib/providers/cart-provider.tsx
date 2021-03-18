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
              (total, cartProduct) => (cartProduct.active ? (total += cartProduct.amount) : total),
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
        cartProductTotal,
        setCartProductTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
