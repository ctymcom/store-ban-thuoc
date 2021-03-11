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
        <div className="mt-2 md:mt-0 w-full md:w-2/5 z-20">
          <ProductImage />
        </div>
        <div className="mt-4 md:mt-0 pl-0 md:pl-8">
          <ProductInfo />
        </div>
      </div>
    </>
  );
}
