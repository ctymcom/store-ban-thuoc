
import { useState } from 'react';
import { NumberPipe } from './../../../../lib/pipes/number';
import { ProductQuantity } from './../../../shared/product/product-quantity';

interface PropsType extends ReactProps {
  product: any
}
export function QuickShoppingProduct(props: PropsType) {
  const [quantity, setQuantity] = useState(0);

  return <div className="relative flex items-center border-b border-gray-300 px-2 py-4">
    <div className="flex-shrink-0 w-20 rounded p-2">
      <div className="image-wrapper">
        <img src={props.product.image}/>
      </div>
    </div>
    <div className="flex-grow pl-4">
      <div className="text-gray-700 text-lg font-semibold leading-snug">{props.product.name}</div>
      <div className="text-gray-600 text-sm mt-1">{props.product.packagingUnit}</div>
    </div>
    <div className="flex-shrink-0 w-32 text-gray-700 font-semibold text-lg text-center px-4">
      {props.product.price?NumberPipe(props.product.price, true):
        <span className="text-primary text-base leading-tight">Đăng nhập để thấy giá</span>
      }
    </div>
    <div className="flex-shrink-0">
      <ProductQuantity inputClassName="w-20 mx-2 border rounded border-gray-400 hover:border-primary focus:border-primary-dark" 
      quantity={quantity} setQuantity={setQuantity}/>
    </div>
  </div>
}