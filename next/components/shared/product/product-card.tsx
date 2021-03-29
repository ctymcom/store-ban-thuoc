import Link from "next/link";
import { useEffect, useState } from "react";
import { NumberPipe } from "./../../../lib/pipes/number";
import { ProductQuantity } from "./product-quantity";
import { Product } from "./../../../lib/repo/product.repo";
import { useAuth } from "./../../../lib/providers/auth-provider";
import { useCart } from "./../../../lib/providers/cart-provider";
import { useRouter } from "next/router";
import { useMemo } from "react";
import LazyLoad from "react-lazyload";
import { ProductTag } from "./product-tag";
import { useDefaultLayoutContext } from "../../../layouts/default-layout/providers/default-layout-providers";

interface PropsType extends ReactProps {
  product?: Product;
  showGroup?: boolean;
}
export function ProductCard({ product, showGroup = true, ...props }: PropsType) {
  const [quantity, setQuantity] = useState(0);

  const { saveCurrentPath } = useAuth();
  const { addProductToCart } = useCart();
  const { hiddenTags } = useDefaultLayoutContext();
  const router = useRouter();

  const categoryText = showGroup
    ? `${product.categories
        .filter((x) => x.parents.length)
        .map((x) => x.name)
        .join(", ")}`
    : "";

  const onAddToCart = (redirect: boolean = false) => {
    if (redirect) {
      addProductToCart(product, quantity || 1);
      router.push("/cart");
    } else {
      addProductToCart(product, quantity);
      setQuantity(0);
    }
  };

  return useMemo(() => {
    return (
      <>
        <div className="flex flex-col min-w-4xs place-content-between">
          <Link href={"/product/" + product.slug}>
            <a className="group">
              <div className="relative w-full">
                <LazyLoad>
                  <div className="image-wrapper contain">
                    <img
                      src={product.image}
                      onError={(e) => {
                        (e.target as any).src = "/assets/img/default.png";
                      }}
                    />
                  </div>
                </LazyLoad>
                {product?.tags.includes("NEW") && (
                  <div className="flex-center z-10 absolute -left-1.5 xs:-left-2.5 sm:-left-3 md:-left-2 lg:-left-2.5 -top-1.5 xs:-top-2 sm:-top-3 md:-top-2 lg:-top-3 text-white font-semibold">
                    <img
                      className="w-12 xs:w-16 sm:w-20 md:w-16 lg:w-20 h-12 xs:h-16 sm:h-20 md:h-16 lg:h-20"
                      src="/assets/img/new.png"
                      alt="NEW"
                    />
                    <span className="absolute top-2 xs:top-3.5 sm:top-5 md:top-3.5 lg:top-5 left-1.5 xs:left-2.5 sm:left-3 md:left-2.5 lg:left-4 text-12 xs:text-16 sm:text-18 md:text-16 lg:text-16 transform -rotate-45 tracking-wider">
                      MỚI
                    </span>
                  </div>
                )}

                {product?.saleRate
                  ? product?.tags.includes("FLASHSALES") && (
                      <div className="flex-center z-10 absolute -right-0.5 sm:-right-1 md:-right-0.5  lg:-right-1 -top-1.5 xs:-top-2 sm:-top-3 md:-top-1 lg:-top-2 text-white font-semibold">
                        <img
                          className="w-14 xs:w-16 sm:w-20 md:w-16 lg:w-120 h-12 xs:h-16 sm:h-20 md:h-16 lg:h-16"
                          src="/assets/img/sale.png"
                          alt="FLASHSALES"
                        />
                        <span className="absolute top-1 xs:top-1.5 sm:top-3 md:top-1.5 lg:top-1.5 left-6 xs:left-6 sm:left-8 md:left-6 lg:left-6 text-center text-12 xs:text-16 sm:text-18 md:text-16 lg:text-14">
                          {product?.saleRate}
                          <sup>%</sup>
                          <p className="text-10 xs:text-12 sm:text-14 md:text-12 lg:text-12 -mt-2.5 xs:-mt-1.5 sm:-mt-0 md:-mt-2 lg:-mt-1">
                            GIẢM
                          </p>
                        </span>
                      </div>
                    )
                  : ""}
              </div>
              {showGroup && (
                <div className="text-sm text-gray-500 pt-3 group-hover:text-primary overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {categoryText}
                </div>
              )}
              <div
                className="h-14 text-ellipsis-2 text-lg text-gray-800 pt-1 pb-1 font-semibold leading-snug group-hover:text-primary-dark"
                title={product.name}
              >
                {product.name}
              </div>
            </a>
          </Link>
          <div className="w-full flex-grow flex flex-col place-content-between">
            <div>
              {!!product.tags?.length && (
                <div className="flex flex-wrap py-2 -mx-1">
                  {product.tagDetails
                    .filter((t) => !hiddenTags.includes(t.code))
                    .map((tagDetail) => (
                      <ProductTag
                        key={tagDetail.code}
                        tag={tagDetail}
                        saleRate={product.saleRate}
                      />
                    ))}
                </div>
              )}
              <div className="text-15 leading-tight text-accent">{product.packing}</div>
            </div>
            {product.basePrice ? (
              <>
                <div>
                  <div className="">
                    <div className="flex flex-col sm:flex-row">
                      <span className="font-semibold text-lg text-primary">
                        {NumberPipe(product.salePrice, true)}
                      </span>
                      <span className="sm:pt-1.5 sm:pl-2 line-through text-sm text-gray-600">
                        {NumberPipe(product.basePrice, true)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between mt-2">
                      <div>
                        <div className="text-sm text-gray-500 hidden sm:block">Chọn số lượng</div>
                        <div className="text-sm text-gray-700">{product.unit}</div>
                      </div>
                      <ProductQuantity
                        alternateStyle={true}
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                      <button
                        className="btn-outline p-0 h-10 text-13 border-2 text-primary border-primary hover:border-primary-dark hover:text-primary-dark"
                        onClick={() => onAddToCart()}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        className="btn-primary p-0 h-10 text-13"
                        onClick={() => onAddToCart(true)}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/login">
                <a
                  className="btn-primary w-full h-12 flex-center text-center leading-tight font-semibold hover:underline mt-4"
                  onClick={saveCurrentPath}
                >
                  Đăng nhập để xem giá
                </a>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }, [product, quantity]);
}
