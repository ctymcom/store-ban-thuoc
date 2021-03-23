import { intervalToDuration, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NumberPipe } from "../../../../lib/pipes/number";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { useCart } from "../../../../lib/providers/cart-provider";
import { ProductQuantity } from "../../../shared/product/product-quantity";
import { ProductTag } from "../../../shared/product/product-tag";
import useInterval from "./../../../../lib/hooks/useInterval";
import { useProductDetailsContext } from "./../providers/product-details-provider";
import { HiOutlineShoppingCart, HiEye } from "react-icons/hi";

interface PropsType extends ReactProps {}

export function ProductInfo(props: PropsType) {
  const [quantity, setQuantity] = useState(0);

  const { cartProducts, changeProductQuantity, removeProductFromCart } = useCart();

  useEffect(() => {
    setQuantity(cartProducts.find((x) => x.productId == product.id)?.qty || 0);
  }, []);

  useEffect(() => {
    if (quantity) {
      changeProductQuantity(product, quantity);
    } else {
      removeProductFromCart(product);
    }
  }, [quantity]);
  const [expiredFromNowText, setExpiredFromNowText] = useState("");

  const { saveCurrentPath } = useAuth();
  const { product } = useProductDetailsContext();
  // const router = useRouter();
  // const { addProductToCart } = useCart();
  // const onAddToCart = (redirect: boolean = false) => {
  //   if (redirect) {
  //     if (addProductToCart(product, quantity)) {
  //       router.push("/cart");
  //     }
  //   } else {
  //     addProductToCart(product, quantity);
  //     setQuantity(0);
  //   }
  // };

  useInterval(() => {
    if (product?.saleExpiredDate) {
      const duration = intervalToDuration({
        start: new Date(),
        end: parseISO(product.saleExpiredDate),
      });
      setExpiredFromNowText(
        `${duration.hours.toString().padStart(2, "0")} : ${duration.minutes
          .toString()
          .padStart(2, "0")} : ${duration.seconds.toString().padStart(2, "0")}`
      );
    }
  }, 1000);

  return (
    <>
      {/* <div className="text-gray-600 mb-2 text-sm">
        {product.categories
          .filter((x) => x.parents.length)
          .map((x) => x.name)
          .join(", ")}
      </div> */}
      <h2 className="text-gray-700 mb-1 lg:mb-2 font-bold text-xl lg:text-2xl">{product.name}</h2>
      <div className="flex flex-wrap max-w-sm mb-2">
        {product.tagDetails.map((tag) => (
          <ProductTag tag={tag} key={tag.code} saleRate={product.saleRate} />
        ))}
      </div>
      {!!product.description && (
        <div className="my-4 whitespace-pre-wrap">{product.description}</div>
      )}
      {product.basePrice ? (
        <>
          <div className="mb-1 lg:mb-4 flex items-center text-gray-500 text-14">
            <div className="flex flex-grow items-center">
              <HiEye className="text-16" />
              <span className="ml-1">{product.viewCount ? product.viewCount : 0} lượt xem</span>
            </div>
            <div className="flex flex-grow items-center">
              <HiOutlineShoppingCart className="text-16" />
              <span className="ml-1">{product.saleCount ? product.saleCount : 0} lượt mua</span>
            </div>
          </div>
          <div className="mb-1 lg:mb-4">
            <span className="text-primary font-semibold mr-2 text-xl lg:text-2xl">
              {NumberPipe(product.salePrice)} VND
            </span>
            <span className="text-gray-400 line-through">{NumberPipe(product.basePrice)} VND</span>
          </div>

          <div className="mb-4">
            <div className="text-gray-700 mb-1 text-sm lg:text-base">
              Đơn vị: <span className="font-semibold">{product.unit}</span>
            </div>
            <div className="text-gray-700 mb-1 text-sm lg:text-base">
              Quy cách đóng gói: <span className="font-semibold">{product.packing}</span>
            </div>
            <ProductQuantity
              inputClassName="w-20 mx-4 border rounded border-gray-400 hover:border-primary focus:border-primary-dark"
              buttonClassName="text-40"
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
          {!!expiredFromNowText && (
            <div className="finish-time text-danger font-extrabold mb-4">
              Kết thúc sau: {expiredFromNowText}
            </div>
          )}
          {/* <div className="flex">
            <button className="btn-accent btn-lg" onClick={() => onAddToCart()}>
              Thêm vào giỏ
            </button>
            <button className="btn-primary btn-lg ml-2" onClick={() => onAddToCart(true)}>
              Mua ngay
            </button>
          </div> */}
        </>
      ) : (
        <Link href="/login">
          <a className="btn-primary w-60 h-12 hover:underline" onClick={saveCurrentPath}>
            Đăng nhập để xem giá
          </a>
        </Link>
      )}
    </>
  );
}
