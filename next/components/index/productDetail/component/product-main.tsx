import { ProductDetailData } from "../data/product-detail-data";
import { ProductImage } from "./product-image";
import { ProductInfo } from "./product-info";
import Link from "next/link";
import { useState } from 'react';
import { toNumber } from 'lodash';

export function ProductMain() {

  const [product, setProduct] = useState(ProductDetailData);

  const findIndex = (id) => {
    return product.findIndex((item) => { return item.id === id });
  }

  const handleChangeAmount = (id: number, type: string, value: number) => {
    switch (type) {
      case "updown":
          {
            let index = findIndex(id);
            let productNew = product;
            productNew[index].amount += 1;
            setProduct([...productNew]);
          }
          break;
      case "down":
          {
            let index = findIndex(id);
            let productNew = product;
            if (productNew[index].amount > 1) {
              productNew[index].amount -= 1;
            }
            setProduct([...productNew]);
          }
          break;
      case "i":
          {
            let numberAmout = toNumber(value);
            if (numberAmout >= 0 && numberAmout <= 100000) {
              let index = findIndex(id);
              let productNew = product;
              productNew[index].amount = numberAmout;
              setProduct([...productNew]);
            }
          }
          break;
      default:
          break;
    }
  }

  return (
    <>
      <div className="breadbcrum-product-detail">
        <ul className="breadbcrum-product-detail__list flex uppercase h-8 items-center mt-12 text-sm">
          <Link href="/">
            <a className="breadbcrum-product-detail__link hover:text-primary">Trang chủ /</a>
          </Link>
          <Link href="/products">
            <a className="breadbcrum-product-detail__link hover:text-primary">Sản phẩm /</a>
          </Link>
          <Link href="/">
            <a className="breadbcrum-product-detail__link hover:text-primary">Thực phẩm chức năng /</a>
          </Link>
          <Link href="/product-detail">
            <a className="breadbcrum-product-detail__link text-primary">
              Homramin Gingseng Dpqt Usa (H/60v)
            </a>
          </Link>
        </ul>
      </div>
      {ProductDetailData.map((item, index) => {
        return (
          <div className="Product grid grid-cols-2 gap-x-6 mt-16">
            <ProductImage product={item} />
            <div className="product__info">
              <ProductInfo product={item} handleChangeAmount={handleChangeAmount}/>
            </div>
          </div>
        );
      })}
    </>
  );
}
