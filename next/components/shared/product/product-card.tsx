import Link from 'next/link';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { NumberPipe } from './../../../lib/pipes/number';
import { ProductQuantity } from './product-quantity';

type PropsType = {
  [x: string]: any;
  name: string;
  categories: { name: string }[]
  image: string;
  packagingUnit: string;
  tags: string[];
  price: number;
  sale?: number;
  saleValue?: number;
  isNew?: boolean
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
                <img src={props.image}/>
              </div>
              {
                props.isNew && 
                <div className="new-tag">Mới</div>
              }
              {
                props.saleValue && 
                <div className="sale-tag flex-center absolute right-0 top-3 text-white font-semibold">
                  <img src="/assets/svg/sale.svg"/>
                  <span className="absolute text-sm">-{props.saleValue}%</span>
                </div>
              }
            </div>
            <div className="text-sm text-gray-500 pt-3 group-hover:text-primary">{props.categories.map(x => x.name).join(', ')}</div>
            <div className="text-lg text-gray-800 pt-1 pb-1 font-semibold leading-snug h-20 text-ellipsis-3 group-hover:text-primary-dark" title={props.name}>{props.name}</div>
          </a>
        </Link>
        <div className="w-full h-20">
          {
            props.price ? (
              <>
              <div>
                <span className="font-semibold text-lg text-primary">{NumberPipe(props.price, true)}</span>
                <span className="pl-2 line-through text-sm text-gray-600">{NumberPipe(props.sale, true)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <div className="text-sm text-gray-500">Chọn số lượng</div>
                  <div className="text-sm text-gray-700">{props.packagingUnit}</div>
                </div>
                <ProductQuantity alternateStyle={true} quantity={quantity} setQuantity={setQuantity}/>
              </div>
              </>
            ) : (
              <div className="w-full h-full flex-center font-semibold text-primary text-lg whitespace-normal text-center">Đăng nhập để xem giá</div>
            )
          }
        </div>
        {
          !!props.tags?.length &&
          <div className="flex flex-wrap py-2 -mx-1">
            {
              props.tags.map((tag, index) => (
                <div key={index} className="p-1">
                  <span className="bg-primary-light text-primary-dark text-sm py-1 px-3 rounded-full">{tag}</span>
                </div>
              ))
            }
        </div>
        }
        <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
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
