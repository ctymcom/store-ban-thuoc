import Link from "next/link";
import { useEffect, useState } from "react";
import { NumberPipe } from "./../../../../lib/pipes/number";
import { ProductQuantity } from "./../../../shared/product/product-quantity";
import { useAuth } from "./../../../../lib/providers/auth-provider";
import { Product } from "./../../../../lib/repo/product.repo";
import { useCart } from "./../../../../lib/providers/cart-provider";
import { useDefaultLayoutContext } from "../../../../layouts/default-layout/providers/default-layout-providers";
import { ProductTag } from "../../../shared/product/product-tag";

interface PropsType extends ReactProps {
  product: Product;
}
export function QuickShoppingProduct({ product }: PropsType) {
  const [quantity, setQuantity] = useState(0);
  const { hiddenTags } = useDefaultLayoutContext();

  const { saveCurrentPath } = useAuth();
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

  return (
    <div className="relative border-b border-gray-300 px-1 py-2 md:px-2 md:py-1">
      <div className="flex flex-col items-start md:flex-row md:items-center">
        <div className="flex-grow">
          <Link href={"/product/" + product.slug}>
            <a className="flex items-center group">
              <div className="flex-shrink-0 w-16 rounded p-2">
                <div className="image-wrapper">
                  <img
                    src={product.imageS}
                    onError={(e) => {
                      (e.target as any).src = "/assets/img/default.png";
                    }}
                  />
                </div>
              </div>
              <div className="flex-grow pl-4">
                <div className="text-gray-700 lg:text-lg font-semibold leading-tight group-hover:text-primary-dark">
                  {product.name}
                </div>
                <div className="text-gray-600 text-xs lg:text-sm group-hover:text-primary">
                  {product.unit} {!!product.packing && <span>- {product.packing}</span>}
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="w-full md:w-auto flex-shrink-0 text-gray-700 font-semibold text-lg text-center px-4">
          {product.basePrice ? (
            <div className="flex items-center">
              <span className="pr-4">{NumberPipe(product.salePrice, true)}</span>
              <ProductQuantity
                inputClassName="h-8 w-16 mx-1 md:h-10 md:w-20 md:mx-2 border rounded border-gray-400 hover:border-primary focus:border-primary-dark"
                quantity={quantity}
                setQuantity={setQuantity}
                disabled={!product.basePrice}
              />
            </div>
          ) : (
            <Link href="/login">
              <a
                className="btn-default h-10 text-primary text-base text-center leading-tight hover:underline hover:text-primary-dark"
                onClick={saveCurrentPath}
              >
                Đăng nhập để xem giá
              </a>
            </Link>
          )}
        </div>
      </div>

      {!!product.tags?.length && (
        <div className="flex flex-wrap py-2 -mx-1">
          {product.tagDetails
            .filter((t) => !hiddenTags.includes(t.code))
            .map((tagDetail) => (
              <ProductTag key={tagDetail.code} tag={tagDetail} saleRate={product.saleRate} />
            ))}
        </div>
      )}
    </div>
  );
}
