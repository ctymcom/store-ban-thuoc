import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { NumberPipe } from './../../../lib/pipes/number';

type ProductCardProps = {
  [x: string]: any;
  name: string;
  categories: { name: string }[]
  image: string;
  packagingUnit: string;
  tags: string[];
  price: number;
  sale?: number;
  onAddToCart?: () => void;
};
export function ProductCard(props: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const handleSetQuantity = (value) => {
    if (value < 0) setQuantity(0)
    else setQuantity(value)
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="image-container w-full">
          <div className="image-wrapper contain">
            <img src={props.image}/>
          </div>
        </div>
        <div className="text-sm text-gray-500 pt-3">{props.categories.map(x => x.name).join(', ')}</div>
        <div className="text-lg text-gray-800 pt-1 pb-1 font-semibold leading-snug">{props.name}</div>
        <div className="w-full h-20 mt-auto">
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
                <div className="flex items-center">
                  <button className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                  onClick={() => handleSetQuantity(quantity - 1)}>
                    <i><HiMinusCircle/></i>
                  </button>
                  <input className="w-11 h-12 text-center text-lg" value={quantity} type="number" 
                  onChange={e => handleSetQuantity(Number(e.target.value))}/>
                  <button className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                  onClick={() => handleSetQuantity(quantity + 1)}>
                    <i><HiPlusCircle/></i>
                  </button>
                </div>
              </div>
              </>
            ) : (
              <div className="w-full h-full flex-center font-semibold text-primary text-lg">Đăng nhập để xem giá</div>
            )
          }
        </div>
        <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-gray-100">
          <button className="btn-outline p-0 h-10 text-13 border-2 text-primary border-primary
          hover:border-primary-dark hover:text-primary-dark">Thêm vào giỏ</button>
          <button className="btn-primary p-0 h-10 text-13">Mua ngay</button>
        </div>
        {/* <div className="">
          <div className="">
            <div className="line-through text-green-200 text-sm">{props.price}</div>
            <div className="flex space-x-1 items-center">
              <p className="text-green-500">{props.sale}</p>
              <p className="text-sm text-gray-400"> /Hộp</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-2 lg:space-y-0 space-y-2 items-center py-2">
              <div className="w-full cursor-pointer text-center text-sm px-3 py-2 border border-green-400 rounded text-green-400">
                Thêm vào giỏ
              </div>
              <div className="w-full cursor-pointer text-center text-sm px-3 py-2 border border-green-400  rounded text-white bg-green-400">
                Mua ngay
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
