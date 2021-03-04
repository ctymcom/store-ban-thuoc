import Link from "next/link";
import { useState } from "react";
import { NumberPipe } from "./../../../lib/pipes/number";
import { ProductQuantity } from "./product-quantity";
import { Product } from "./../../../lib/repo/product.repo";
import { useAuth } from "./../../../lib/providers/auth-provider";
import { useCart } from "./../../../lib/providers/cart-provider";
import { useRouter } from "next/router";
import { useMemo } from "react";
import LazyLoad from "react-lazyload";

interface PropsType extends ReactProps {
  product?: Product;
}
export function ProductCard({ product, ...props }: PropsType) {
  const [quantity, setQuantity] = useState(0);

  const { saveCurrentPath } = useAuth();
  const { addProductToCart } = useCart();
  const router = useRouter();

  const categoryText = `${product.categories
    .filter((x) => x.parents.length)
    .map((x) => x.name)
    .join(", ")}`;

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
                {product.isNew && <div className="new-tag">Mới</div>}
                {product.saleRate && (
                  <div className="flex-center absolute right-0 top-3 text-white font-semibold">
                    <img src="/assets/img/sale.svg" />
                    <span className="absolute text-sm">-{product.saleRate}%</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 pt-3 group-hover:text-primary overflow-ellipsis overflow-hidden whitespace-nowrap">
                {categoryText}
              </div>
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
                    <div key={tagDetail.code} className="p-1">
                      <span className="bg-primary-light text-primary-dark text-sm py-1 px-3 rounded-sm">
                        {tagDetail.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-15 leading-tight text-accent">{product.packing}</div>
            </div>
            {product.basePrice ? (
              <>
                <div>
                  <div className="h-28 sm:h-20">
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
                  className="btn-primary w-full h-12 flex-center font-semibold hover:underline mt-4"
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
