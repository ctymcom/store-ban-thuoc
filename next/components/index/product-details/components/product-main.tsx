import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useProductDetailsContext } from "./../providers/product-details-provider";
import { ProductImage } from "./product-image";
import { ProductInfo } from "./product-info";
import BreadCrumbs from "./../../../shared/utilities/breadcrumbs/breadcrumbs";

export function ProductMain() {
  const { product } = useProductDetailsContext();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setBreadcrumbs([
        {
          href: "/",
          label: "Trang chủ",
        },
        {
          href: "/products",
          label: "Sản phẩm",
        },
        {
          href: "/products",
          label: product.categories[0]?.name,
        },
        {
          label: product.name,
        },
      ]);
    }
  }, [product]);

  return (
    <>
      <div className="pt-8 md:pt-12">
        <BreadCrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="flex flex-col md:flex-row mt-4">
        <div className="relative mt-2 md:mt-0 w-full md:w-2/5 z-20">
          {product?.tags.includes("NEW") && (
            <div className="flex-center z-10 absolute -left-2 xs:-left-3 sm:-left-3.5 md:-left-2 lg:-left-2.5 -top-2 xs:-top-3 sm:-top-3.5 md:-top-2 lg:-top-3 text-white font-semibold">
              <img
                className="w-16 xs:w-20 sm:w-24 md:w-14 lg:w-20 h-16 xs:h-20 sm:h-24 md:h-14 lg:h-20"
                src="/assets/img/NEW-01.png"
                alt="NEW"
              />
              <span className="absolute top-3 xs:top-5 sm:top-6 md:top-2.5 lg:top-5 left-2.5 xs:left-4 sm:left-5 md:left-2 lg:left-3 text-16 sm:text-18 md:text-14 lg:text-18 transform -rotate-45 tracking-widest">
                MỚI
              </span>
            </div>
          )}
          {product?.saleRate
            ? product?.tags.includes("FLASHSALES") && (
                <div className="flex-center z-10 absolute -right-0.5 sm:-right-1 md:-right-0.5  lg:-right-1 -top-2 xs:-top-2.5 sm:-top-3 md:-top-1.5 lg:-top-2.5 text-white font-semibold">
                  <img
                    className="w-16 xs:w-20 sm:w-24 md:w-14 lg:w-20 h-16 xs:h-20 sm:h-24 md:h-14 lg:h-20"
                    src="/assets/img/FLASHSALES-01.png"
                    alt="FLASHSALES"
                  />
                  <span className="absolute top-2 xs:top-3 sm:top-4 md:top-1.5 lg:top-2.5 left-6 xs:left-8 sm:left-10 md:left-5 lg:left-8 text-center text-14 xs:text-18 md:text-12 lg:text-16">
                    {product?.saleRate}
                    <sup>%</sup>
                    <p className="text-12 xs:text-14 sm:text-16 md:text-12 lg:text-14 -mt-1 xs:-mt-0 sm:mt-1 md:-mt-2 lg:-mt-0.5">
                      GIẢM
                    </p>
                  </span>
                </div>
              )
            : ""}
          <ProductImage />
        </div>
        <div className="mt-4 md:mt-0 pl-0 md:pl-8">
          <ProductInfo />
        </div>
      </div>
    </>
  );
}
