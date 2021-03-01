import { ProductImage } from "./product-image";
import { ProductInfo } from "./product-info";
import Link from "next/link";
import { toNumber } from 'lodash';
import { useProductDetailsContext } from './../providers/product-details-provider';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export function ProductMain() {

  const { product } = useProductDetailsContext()
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const router = useRouter()

  useEffect(() => {
    if (product) {
      setBreadcrumbs([
        {
          href: '/',
          label: 'Trang chủ'
        },
        {
          href: '/products',
          label: 'Sản phẩm'
        },
        {
          href: '/products',
          label: product.categories[0]?.name
        }
      ])
    }
  }, [product]);

  return (
    <>
      <div className="flex uppercase h-8 items-center mt-12 text-sm">
        {
          breadcrumbs.map((breadcrumb, index) => 
            <Link href={breadcrumb.href} key={index}>
              <a className="text-gray-600 hover:text-primary">
                <span>{breadcrumb.label}</span>
                <span className="px-1">/</span>
              </a>
            </Link>
          )
        }
        <a className="text-primary">
          <span>{product.name}</span>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-6 mt-4">
        <div>
          <ProductImage/>
        </div>
        <div>
          <ProductInfo/>
        </div>
      </div>
    </>
  );
}