import React from "react";
import { useCart, CartProduct } from "../../../../lib/providers/cart-provider";
import { Spinner } from "../../../shared/utilities/spinner";
import { HiCheck, HiOutlineShoppingCart } from "react-icons/hi";
import { NumberPipe } from "../../../../lib/pipes/number";
interface PropsType extends ReactProps {
  title: string;
}
const ListCartCheckout = (props: PropsType) => {
  const { cartProducts } = useCart();
  return cartProducts ? (
    <div className={`${props.className || ""}`}>
      <h3 className=" border-b-2 pb-2 flex gap-2 text-16 uppercase items-center">
        <HiOutlineShoppingCart className="text-primary text-20" /> {props.title}
      </h3>
      {cartProducts.map((item: CartProduct, index) => {
        if (item.active) {
          return (
            <div className="flex-wrap flex justify-between text-16 leading-7" key={index}>
              <p className="whitespace-nowrap flex items-center">
                <HiCheck className="text-primary pr-1" />
                {item.product?.name} <span className="font-bold">X</span> {item.qty}
                <span className="ml-5">-</span>
              </p>
              <p>{NumberPipe(item.price, false)} VND</p>
            </div>
          );
        }
      })}
    </div>
  ) : (
    <Spinner />
  );
};

export default ListCartCheckout;
