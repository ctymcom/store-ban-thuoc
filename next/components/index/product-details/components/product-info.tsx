import { toNumber } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { NumberPipe } from '../../../../lib/pipes/number';
import { useProductDetailsContext } from './../providers/product-details-provider';
import useInterval from './../../../../lib/hooks/useInterval';
import { intervalToDuration, parseISO } from "date-fns";
import { ProductQuantity } from "../../../shared/product/product-quantity";

interface PropsType extends ReactProps {
    
}

export function ProductInfo(props: PropsType) {
    const [quantity, setQuantity] = useState(0);
    const [expiredFromNowText, setExpiredFromNowText] = useState('');

    const { product } = useProductDetailsContext()
    
    useInterval(() => {
        if (product?.saleExpiredDate) {
            const duration = intervalToDuration({ start: new Date(), end: parseISO(product.saleExpiredDate) })
            setExpiredFromNowText(`${duration.hours.toString().padStart(2, '0')} : ${duration.minutes.toString().padStart(2, '0')} : ${duration.seconds.toString().padStart(2, '0')}`)
        }
    }, 1000);

    return  <>
        <div className="text-gray-600 mb-2 text-sm">{product.categories[0]?.name}</div>
        <h2 className="text-gray-700 mb-2 font-bold text-2xl">{product.name}</h2>
        <div className="mb-4">
            <span className="text-primary font-semibold mr-2 text-2xl">{NumberPipe(product.salePrice)} VND</span>
            <span className="text-gray-400 line-through">{NumberPipe(product.basePrice)} VND</span>
        </div>
        {
            !!expiredFromNowText && 
            <div className="finish-time text-danger font-extrabold mb-4">Kết thúc sau: {expiredFromNowText}</div>
        }
        <div>
            { product.description }
        </div>
        <div className="mb-4">
            <div className="text-gray-600">Chọn số lượng</div>
            <div className="text-gray-700 mb-2">{product.packing}</div>
            <ProductQuantity 
                inputClassName="w-20 mx-4 border rounded border-gray-400 hover:border-primary focus:border-primary-dark"
                buttonClassName="text-40"
                quantity={quantity} setQuantity={setQuantity}
            />
        </div>
        <div className="flex">
            <button className="btn-accent btn-lg">Thêm vào giỏ</button>                        
            <button className="btn-primary btn-lg ml-2">Mua ngay</button>
        </div>
        <div className="mt-4">
            {
                product.tagDetails.map((tag) => 
                    <span className="border border-primary px-4 py-1 rounded-full mr-4 hover:bg-primary hover:text-white cursor-pointer">
                        {tag.name}
                    </span>
                )
            }
        </div>
    </>
}