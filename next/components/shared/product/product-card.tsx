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

interface PropsType extends ReactProps {
  product?: Product;
  showGroup?: boolean;
}
export function ProductCard({ product, showGroup = true, ...props }: PropsType) {
  const [quantity, setQuantity] = useState(0);

  const { saveCurrentPath } = useAuth();
  const { addProductToCart } = useCart();
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
          <Link href={"/product/" + product.code}>
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
                  <div className="flex-center absolute -left-2 -top-2 text-white font-semibold">
                    <img className="w-16 h-16" src="/assets/img/NEW-01.png" alt="NEW" />
                    <span className="absolute top-4 left-3 text-12 transform -rotate-45 tracking-widest">
                      MỚI
                    </span>
                  </div>
                )}

                {product?.saleRate
                  ? product?.tags.includes("FLASHSALES") && (
                      <div className="flex-center absolute -right-1 -top-2 text-white font-semibold">
                        <img
                          className="w-16 h-16"
                          src="/assets/img/FLASHSALES-01.png"
                          alt="FLASHSALES"
                        />
                        <span className="absolute top-0 left-6 text-14">
                          - {product?.saleRate}% GIẢM
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
                  {product.tagDetails.map((tagDetail) => (
                    <ProductTag key={tagDetail.code} tag={tagDetail} saleRate={product.saleRate} />
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
