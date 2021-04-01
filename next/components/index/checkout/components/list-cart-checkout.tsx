import React, { useState } from "react";
import { useCart, CartProduct } from "../../../../lib/providers/cart-provider";
import { Spinner } from "../../../shared/utilities/spinner";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { NumberPipe } from "../../../../lib/pipes/number";
import NameProduct from "./name-product";
import useScreen from "../../../../lib/hooks/useScreen";
interface PropsType extends ReactProps {
  title: string;
}
const ListCartCheckout = (props: PropsType) => {
  const screenSm = useScreen("sm");
  const screenLg = useScreen("lg");
  const { cartProducts } = useCart();
  const [showMore, setShowMore] = useState(false);
  const stringNameShow = (name: string) => {
    let nameAfterCheck = name;
    if (screenSm) {
      if (nameAfterCheck?.length > 25) {
        return nameAfterCheck.substring(0, 24) + "...";
      } else {
        return name;
      }
    } else {
      if (nameAfterCheck?.length > 30) {
        return nameAfterCheck.substring(0, 29) + "...";
      } else {
        return name;
      }
    }
  };
  return cartProducts ? (
    <div className={`${props.className || ""} mt-4`}>
      <h3 className=" border-b-2 pb-2 flex gap-2 text-16 uppercase items-center">
        <HiOutlineShoppingCart className="text-primary text-20" /> {props.title}
      </h3>
      <div className={`my-2`}>
        {cartProducts.map((item: CartProduct, index) => {
          let name = item.product?.name;
          if (item.active) {
            return (
              <div
                className={
                  showMore || index < 5
                    ? "flex-wrap flex text-16 leading-7 justify-between"
                    : "hidden"
                }
                key={index}
              >
                <div className="flex justify-between gap-2">
                  <NameProduct
                    name={stringNameShow(name)}
                    fullName={name !== stringNameShow(name) ? name : ""}
                  />
                  <p className="flex text-16 gap-2">
                    <span className="font-extrabold"> x </span>
                    {`${item.qty}(${item.product?.unit})`}
                  </p>
                </div>
                <p className="" style={{ width: screenSm ? "" : "100%" }}>
                  {NumberPipe(item.price, false)} VND
                </p>
              </div>
            );
          }
        })}
      </div>
      <button
        className={`${
          cartProducts.length > 5
            ? "btn-default p-0 text-primary opacity-70 hover:opacity-100"
            : "hidden"
        }`}
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
