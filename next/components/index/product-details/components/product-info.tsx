import { intervalToDuration, isBefore } from "date-fns";
import gql from "graphql-tag";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiEye, HiOutlineShoppingCart, HiThumbDown, HiThumbUp } from "react-icons/hi";
import { NumberPipe } from "../../../../lib/pipes/number";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { useCart } from "../../../../lib/providers/cart-provider";
import { GraphService } from "../../../../lib/repo/graph.repo";
import { ProductService } from "../../../../lib/repo/product.repo";
import { ProductQuantity } from "../../../shared/product/product-quantity";
import { ProductTag } from "../../../shared/product/product-tag";
import useInterval from "./../../../../lib/hooks/useInterval";
import { useProductDetailsContext } from "./../providers/product-details-provider";

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
    if (product?.saleExpiredDate && isBefore(new Date(), new Date(product.saleExpiredDate))) {
      const duration = intervalToDuration({
        start: new Date(),
        end: new Date(product.saleExpiredDate),
      });
      setExpiredFromNowText(
        `${duration.days ? duration.days + " ng??y " : ""}${duration.hours
          .toString()
          .padStart(2, "0")} gi??? ${duration.minutes
          .toString()
          .padStart(2, "0")} ph??t ${duration.seconds.toString().padStart(2, "0")} gi??y`
      );
    }
  }, 1000);

  const [active, setActive] = useState(null);
  const handlerToggleBtn = (style, isHigh) => {
    setActive(style);
    rateProductPrice(product.id, isHigh);
  };

  const rateProductPrice = async (productId: string, isHigh: boolean) => {
    let mutationName = "rateProductPrice";
    const res = await GraphService.apollo.mutate({
      mutation: gql`
          mutation mutationName($productId: ID!, $isHigh: Boolean!) {
            ${mutationName} (
              productId: $productId
              isHigh: $isHigh
            ) {
              ${ProductService.fullFragment}
            }
          }
        `,
      variables: {
        productId,
        isHigh,
      },
    });
  };
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
          <ProductTag tag={tag} key={tag.code} saleRate={product.saleRate} product={product} />
        ))}
      </div>
      {product.salePrice ? (
        <>
          <div className="mb-1.5 flex items-center text-gray-500 text-sm">
            <div className="flex items-center mr-8">
              <HiEye className="text-16" />
              <span className="ml-1 whitespace-nowrap">
                {product.viewCount ? product.viewCount : 0} l?????t xem
              </span>
            </div>
            <div className="flex items-center">
              <HiOutlineShoppingCart className="text-16" />
              <span className="ml-1 whitespace-nowrap">
                {product.saleCount ? product.saleCount : 0} l?????t mua
              </span>
            </div>
          </div>
          {product?.shortDescription && (
            <div className="mb-1.5">
              <span className="text-gray-600">{product?.shortDescription}</span>
            </div>
          )}
          <div className="mb-1 lg:mb-4 flex flex-col lg:flex-row items-start justify-center">
            <div className="flex-grow">
              <span className="text-primary font-semibold mr-2 text-xl lg:text-2xl">
                {NumberPipe(product.salePrice)} VND
              </span>
              {product.basePrice > 0 && (
                <p className="text-gray-400 line-through">{NumberPipe(product.basePrice)} VND</p>
              )}

              <div className="text-gray-700 mb-1 text-sm lg:text-base mt-2">
                ????n v???: <span className="font-semibold">{product.unit}</span>
              </div>
              <div className="text-gray-700 mb-1 text-sm lg:text-base">
                Quy c??ch ????ng g??i: <span className="font-semibold">{product.packing}</span>
              </div>
            </div>
            <div className="flex-grow ml-0 lg:ml-6 my-3 lg:my-0">
              <p className="text-gray-400 text-14 md:text-18">B???n th???y gi?? n??y:</p>
              <div className="flex mt-3">
                <button
                  className={`flex items-center mr-3 justify-center px-3 lg:px-4 py-1.5 lg:py-1.5 border text-primary text-18 border-primary rounded focus:outline-none 
                              ${active === "activeDown" ? "bg-primary text-white" : ""}`}
                  onClick={() => handlerToggleBtn("activeDown", true)}
                >
                  <HiThumbDown className={`${active === "activeDown" ? "text-white" : ""}`} />
                  <span className={`ml-1 text-14 ${active === "activeDown" ? "text-white" : ""}`}>
                    Cao
                  </span>
                </button>
                <button
                  className={`flex items-center mr-3 justify-center px-3 lg:px-4 py-1.5 lg:py-1.5 border text-primary text-18 border-primary rounded focus:outline-none 
                            ${active === "activeUp" ? "bg-primary text-white" : ""}`}
                  onClick={() => handlerToggleBtn("activeUp", false)}
                >
                  <HiThumbUp className={`${active === "activeUp" ? "text-white" : ""}`} />
                  <span
                    className={`ml-1 text-14 whitespace-nowrap ${
                      active === "activeUp" ? "text-white" : ""
                    }`}
                  >
                    H???p l??
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <ProductQuantity
              inputClassName="w-20 mx-4 border rounded border-gray-400 hover:border-primary focus:border-primary-dark"
              buttonClassName="text-40"
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
          {!!expiredFromNowText && (
            <div className="finish-time text-danger font-extrabold mb-4">
              K???t th??c sau: {expiredFromNowText}
            </div>
          )}
          {/* <div className="flex">
            <button className="btn-accent btn-lg" onClick={() => onAddToCart()}>
              Th??m v??o gi???
            </button>
            <button className="btn-primary btn-lg ml-2" onClick={() => onAddToCart(true)}>
              Mua ngay
            </button>
          </div> */}
        </>
      ) : (
        <Link href="/login">
          <a className="btn-primary w-60 h-12 hover:underline" onClick={saveCurrentPath}>
            ????ng nh???p ????? xem gi??
          </a>
        </Link>
      )}
    </>
  );
}
