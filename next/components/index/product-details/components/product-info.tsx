import { intervalToDuration, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { NumberPipe } from '../../../../lib/pipes/number';
import { useAuth } from "../../../../lib/providers/auth-provider";
import { useCart } from "../../../../lib/providers/cart-provider";
import { ProductQuantity } from "../../../shared/product/product-quantity";
import useInterval from './../../../../lib/hooks/useInterval';
import { useProductDetailsContext } from './../providers/product-details-provider';

interface PropsType extends ReactProps {
    
}

export function ProductInfo(props: PropsType) {
    const [quantity, setQuantity] = useState(0);
    const [expiredFromNowText, setExpiredFromNowText] = useState('');

    const { saveCurrentPath } = useAuth()
    const { product } = useProductDetailsContext()
    const router = useRouter()
    const { addProductToCart } = useCart()
    const onAddToCart = (redirect: boolean = false) => {
      if (redirect) {
        if (addProductToCart(product, quantity)) {
            router.push('/cart')
        }
      } else {
        addProductToCart(product, quantity)
        setQuantity(0)
      }
    }
    
    useInterval(() => {
        if (product?.saleExpiredDate) {
            const duration = intervalToDuration({ start: new Date(), end: parseISO(product.saleExpiredDate) })
            setExpiredFromNowText(`${duration.hours.toString().padStart(2, '0')} : ${duration.minutes.toString().padStart(2, '0')} : ${duration.seconds.toString().padStart(2, '0')}`)
        }
    }, 1000);

    return  <>
        <div className="text-gray-600 mb-2 text-sm">{product.categories.filter(x => x.parents.length).map(x => x.name).join(', ')}</div>
        <h2 className="text-gray-700 mb-2 font-bold text-2xl">{product.name}</h2>
        {
            !!expiredFromNowText && 
            <div className="finish-time text-danger font-extrabold mb-4">Kết thúc sau: {expiredFromNowText}</div>
        }
        { !!product.description && 
            <div className="my-4 whitespace-pre-wrap">
                {product.description}
            </div> 
        }
        {
            product.basePrice ? <>    
                <div className="mb-4">
                    <span className="text-primary font-semibold mr-2 text-2xl">{NumberPipe(product.salePrice)} VND</span>
                    <span className="text-gray-400 line-through">{NumberPipe(product.basePrice)} VND</span>
                </div>        
                <div className="mb-4">
                    <div className="text-gray-700 mb-1">Đơn vị: <span className="font-semibold">{product.unit}</span></div>
                    <div className="text-gray-700 mb-1">Quy cách đóng gói: <span className="font-semibold">{product.packing}</span></div>
                    <ProductQuantity 
                        inputClassName="w-20 mx-4 border rounded border-gray-400 hover:border-primary focus:border-primary-dark"
                        buttonClassName="text-40"
                        quantity={quantity} setQuantity={setQuantity}
                    />
                </div>
                <div className="flex">
                    <button className="btn-accent btn-lg" onClick={() => onAddToCart()}>Thêm vào giỏ</button>                        
                    <button className="btn-primary btn-lg ml-2" onClick={() => onAddToCart(true)}>Mua ngay</button>
                </div>
            </> : 
            <Link href="/login">
              <a className="btn-outline w-60 h-16 flex-center font-semibold text-primary text-lg whitespace-normal text-center hover:underline hover:text-primary-dark"
                onClick={saveCurrentPath}
              >
                Đăng nhập để xem giá
              </a>
            </Link>
        }
        <div className="mt-4">
            {
                product.tagDetails.map((tag) => 
                    <span className="bg-primary-light text-primary px-3 py-1 rounded-full mr-2 mb-2 hover:bg-primary hover:text-white cursor-pointer">
                        {tag.name}
                    </span>
                )
            }
        </div>
    </>
}