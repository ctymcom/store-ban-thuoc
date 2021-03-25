import React, { useState } from "react";
import { useCart, CartProduct } from "../../../../lib/providers/cart-provider";
import { Spinner } from "../../../shared/utilities/spinner";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { NumberPipe } from "../../../../lib/pipes/number";
interface PropsType extends ReactProps {
  title: string;
}
const ListCartCheckout = (props: PropsType) => {
  const { cartProducts } = useCart();
  const [showMore, setShowMore] = useState(false);
  return cartProducts ? (
    <div className={`${props.className || ""} my-4`}>
      <h3 className=" border-b-2 pb-2 flex gap-2 text-16 uppercase items-center">
        <HiOutlineShoppingCart className="text-primary text-20" /> {props.title}
      </h3>
      <div className={`${showMore || cartProducts.length < 5 ? "" : "h-40 overflow-hidden"} my-2`}>
        {cartProducts.map((item: CartProduct, index) => {
          if (item.active) {
            return (
              <div className="flex-wrap flex justify-between text-16 leading-7" key={index}>
                <p className="">
                  {item.product?.name} <span className="font-bold"> x </span> {item.qty}(
                  {item.product?.unit})
                </p>
                <p>{NumberPipe(item.price, false)} VND</p>
              </div>
            );
          }
        })}
      </div>
      <button
        className={`${cartProducts.length > 5 ? "btn-default pl-0" : "hidden"}`}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Ẩn bớt" : ". . . xem tất cả"}
      </button>
    </div>
  ) : (
    <Spinner />
  );
};

export default ListCartCheckout;
