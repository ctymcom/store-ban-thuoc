
import Link from 'next/link';
import { useState } from 'react';
import { NumberPipe } from './../../../../lib/pipes/number';
import { ProductQuantity } from './../../../shared/product/product-quantity';

interface PropsType extends ReactProps {
  product: any
}
export function QuickShoppingProduct(props: PropsType) {
  const [quantity, setQuantity] = useState(0);

  return <div className="relative flex items-center border-b border-gray-300 px-2 py-1">
    <div className="flex-shrink-0 w-16 rounded p-2">
      <div className="image-wrapper">
        <img src={props.product.image}/>
      </div>
    </div>
    <div className="flex-grow pl-4">
      <div className="text-gray-700 text-lg font-semibold leading-snug">{props.product.name}</div>
      <div className="text-gray-600 text-sm mt-1">{props.product.packagingUnit}</div>
    </div>
    <div className="flex-shrink-0 text-gray-700 font-semibold text-lg text-center px-4">
      {props.product.price?
        <div className="flex items-center">
          <span className="pr-4">{NumberPipe(props.product.price, true)}</span>
          <ProductQuantity inputClassName="w-20 mx-2 border rounded border-gray-400 hover:border-primary focus:border-primary-dark" 
          quantity={quantity} setQuantity={setQuantity} disabled={!props.product.price}/>
        </div>
        :
        <Link href="/login">
          <a className="btn-default h-10 text-primary text-base text-center leading-tight hover:underline hover:text-primary-dark">
            Đăng nhập để xem giá
          </a>
        </Link>
      }
      
    </div>
  </div>
}