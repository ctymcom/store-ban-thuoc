import Link from 'next/link';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { NumberPipe } from './../../../lib/pipes/number';
import { ProductQuantity } from './product-quantity';
import { Product } from './../../../lib/repo/product.repo';

interface PropsType extends ReactProps {
  product?: Product
  onAddToCart?: () => void;
};
export function ProductCard(props: PropsType) {
  const [quantity, setQuantity] = useState(0);

  const handleSetQuantity = (value) => {
    if (value < 0) setQuantity(0)
    else setQuantity(value)
  }

  return (
    <>
      <div className="flex flex-col min-w-4xs">
        <Link href="/product-detail">
          <a className="group">
            <div className="relative w-full">
              <div className="image-wrapper contain">
                <img src={props.product.image} onError={(e)=>{(e.target as any).src="/assets/img/default.png"}}/>
              </div>
              {
                props.product.isNew && 
                <div className="new-tag">Mới</div>
              }
              {
                props.product.saleRate && 
                <div className="sale-tag flex-center absolute right-0 top-3 text-white font-semibold">
                  <img src="/assets/svg/sale.svg"/>
                  <span className="absolute text-sm">-{props.product.saleValue}%</span>
                </div>
              }
            </div>
            <div className="text-sm text-gray-500 pt-3 group-hover:text-primary">{props.product.categories.map(x => x.name).join(', ')}</div>
            <div className="text-lg text-gray-800 pt-1 pb-1 font-semibold leading-snug h-20 text-ellipsis-3 group-hover:text-primary-dark" title={props.product.name}>{props.product.name}</div>
          </a>
        </Link>
        <div className="w-full h-28 sm:h-20">
          {
            props.product.basePrice ? (
              <>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold text-lg text-primary">{NumberPipe(props.product.basePrice, true)}</span>
                <span className="sm:pt-1.5 sm:pl-2 line-through text-sm text-gray-600">{NumberPipe(props.product.salePrice, true)}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between mt-2">
                <div>
                  <div className="text-sm text-gray-500 hidden sm:block">Chọn số lượng</div>
                  <div className="text-sm text-gray-700">{props.product.unit}</div>
                </div>
                <ProductQuantity alternateStyle={true} quantity={quantity} setQuantity={setQuantity}/>
              </div>
              </>
            ) : (
              <Link href="/login">
                <a className="btn-default w-full h-full flex-center font-semibold text-primary text-lg whitespace-normal text-center hover:underline hover:text-primary-dark">
                  Đăng nhập để xem giá
                </a>
              </Link>
            )
          }
        </div>
        {
          !!props.product.tags?.length &&
          <div className="flex flex-wrap py-2 -mx-1">
            {
              props.product.tags.map((tag, index) => (
                <div key={index} className="p-1">
                  <span className="bg-primary-light text-primary-dark text-sm py-1 px-3 rounded-full">{tag}</span>
                </div>
              ))
            }
        </div>
        }
        <div className="mt-auto grid grid-cols-1 xs:grid-cols-2 gap-2 pt-3 border-t border-gray-100">
          <button className="btn-outline p-0 h-10 text-13 border-2 text-primary border-primary hover:border-primary-dark hover:text-primary-dark">
            Thêm vào giỏ
          </button>
          <button className="btn-primary p-0 h-10 text-13">
            Mua ngay
          </button>
        </div>
      </div>
    </>
  );
}
