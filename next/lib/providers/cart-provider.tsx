import MD5 from 'crypto-js/md5';
import jwt_decode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';
import { ClearAuthToken, SetAuthToken } from '../graphql/auth.link';
import { AritoUser, AritoUserService } from '../repo/arito-user.repo';
import { GraphService } from '../repo/graph.repo';
import { GetAuthToken } from './../graphql/auth.link';
import { useRouter } from 'next/router';
import { Product } from './../repo/product.repo';

export interface CartProduct {
  productId: string
  product?: Product
  qty: number
  price: number
  amount: number
}

const CartContext = createContext<Partial<{
  cartProducts: CartProduct[]
  cartProductCount: number
  addProductToCart: (product: Product, qty: number) => void
  changeProductQuantity: (product: Product, qty: number) => void
  removeProductFromCart: (product: Product) => void
}>>({});

export function CartProvider({ children }: any) {
  
  const [cartProducts, setcartProducts] = useState<CartProduct[]>([]);
  const [cartProductCount, setCartProductCount] = useState(0);

  useEffect(() => {
    setCartProductCount(cartProducts.reduce((count, cartProduct) => count += cartProduct.qty, 0))
  }, [cartProducts]);

  const addProductToCart = (product: Product, qty: number) => {
    if (!qty) return
    
    let cartProduct = cartProducts.find(x => x.productId == product.id)
    if (cartProduct) {
      cartProduct.qty += qty
      cartProduct.amount = cartProduct.price * cartProduct.qty 
    } else {
      cartProducts.push({
        productId: product.id,
        product: product,
        qty,
        price: product.salePrice,
        amount: product.salePrice * qty
      })
    }
    setcartProducts([...cartProducts])
  }

  const changeProductQuantity = (product: Product, qty: number) => {
    if (!qty) return

    let cartProduct = cartProducts.find(x => x.productId == product.id)
    if (cartProduct) {
      cartProduct.qty = qty
      cartProduct.amount = cartProduct.price * qty 
    } else {
      cartProducts.push({
        productId: product.id,
        product: product,
        qty,
        price: product.salePrice,
        amount: product.salePrice * qty
      })
    }
    setcartProducts([...cartProducts])
  }

  const removeProductFromCart = (product: Product) => {
    let cartProductIndex = cartProducts.findIndex(x => x.productId == product.id)
    if (cartProductIndex >= 0) {
      cartProducts.splice(cartProductIndex, 1)
    }
    setcartProducts([...cartProducts])
  }

  return (
    <CartContext.Provider value={{ cartProducts, cartProductCount, addProductToCart, changeProductQuantity, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);