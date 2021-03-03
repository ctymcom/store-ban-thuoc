import { createContext, useContext, useEffect, useState } from 'react';

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
  cartTotal: number
  addProductToCart: (product: Product, qty: number) => boolean
  changeProductQuantity: (product: Product, qty: number) => void
  removeProductFromCart: (product: Product) => void
}>>({});

export function CartProvider({ children }: any) {
  
  const [cartProducts, setcartProducts] = useState<CartProduct[]>([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartProductCount(cartProducts.reduce((count, cartProduct) => count += cartProduct.qty, 0))
    setCartTotal(cartProducts.reduce((total, cartProduct) => total += cartProduct.amount, 0))
  }, [cartProducts]);

  const addProductToCart = (product: Product, qty: number): boolean => {
    if (!qty) return false
    
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
    return true
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
    <CartContext.Provider value={{ cartProducts, cartProductCount, cartTotal, addProductToCart, 
    changeProductQuantity, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);