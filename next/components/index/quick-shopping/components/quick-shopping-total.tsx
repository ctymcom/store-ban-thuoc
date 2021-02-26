
import Link from 'next/link';
import { NumberPipe } from '../../../../lib/pipes/number';
import { useCart } from './../../../../lib/providers/cart-provider';

interface PropsType extends ReactProps {
  
}
export function QuickShoppingTotal(props: PropsType) {

  const { cartProducts, cartTotal } = useCart()

  return <div className="border border-gray-100 rounded-lg shadow-md overflow-hidden">
    {
      cartProducts.map((cartProduct) => 
        <div className="flex justify-between items-center text-gray-600 py-2 px-4 border-b border-gray-100" key={cartProduct.productId}>
          <div className="pr-2">
            <div className="leading-tight">{cartProduct.product.name}</div>
            <div className="text-sm text-gray-500">Số lượng: {cartProduct.qty}</div>
          </div>
          <div className="font-semibold whitespace-nowrap">
            {NumberPipe(cartProduct.amount, true)}
          </div>
        </div>
      )
    }
    <div className="flex justify-between p-4">
      <div className="text-lg text-gray-700 font-semibold">Tổng tiền</div>
      <div className="text-lg text-primary font-bold whitespace-nowrap">{NumberPipe(cartTotal, true)}</div>
    </div>
    <Link href="/cart">
      <a 
        className="btn-primary w-full h-14 rounded-tl-none rounded-tr-none text-md font-bold uppercase"
      >
          Đến trang giỏ hàng
      </a>
    </Link>
  </div>
}