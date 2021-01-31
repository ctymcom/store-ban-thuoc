import { ProductDetailData } from "../data/product-detail-data";
import { ProductImage } from "./product-image";
import { ProductInfo } from "./product-info";
import Link from "next/link";

export function ProductMain() {
  return (
    <>
      {" "}
      <div className="breadbcrum-product-detail">
        <ul className="breadbcrum-product-detail__list flex uppercase h-8 items-center mt-12">
          <Link href="/">
            <a className="breadbcrum-product-detail__link">Trang chủ /</a>
          </Link>
          <Link href="/products">
            <a className="breadbcrum-product-detail__link">Sản phẩm /</a>
          </Link>
          <Link href="/">
            <a className="breadbcrum-product-detail__link">Thực phẩm chức năng /</a>
          </Link>
          <Link href="/product-detail">
            <a className="breadbcrum-product-detail__link text-success">
              Homramin Gingseng Dpqt Usa (H/60v)
            </a>
          </Link>
        </ul>
      </div>
      {ProductDetailData.map((item, index) => {
        return (
          <div className="Product grid grid-cols-2 gap-x-7 mt-16">
            <ProductImage product={item} />
            <div className="product__info  ml-0">
              <ProductInfo product={item} />
            </div>
          </div>
        );
      })}
    </>
  );
}
