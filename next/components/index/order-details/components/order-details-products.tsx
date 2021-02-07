
import { NumberPipe } from './../../../../lib/pipes/number';

interface PropsType extends ReactProps {
  products: any[]
}
export function OrderDetailsProducts(props: PropsType) {

  const headerClass="flex text-gray-800 font-semibold p-2 border-b-2 border-gray-300"
  const cellClass="flex items-center text-gray-700 border-b border-gray-200 p-2"

  return <div className="grid grid-cols-8 mt-5">
    <div className={`${headerClass} col-span-5`}>Sản phẩm</div>
    <div className={`${headerClass} justify-center col-span-1`}>Đơn giá</div>
    <div className={`${headerClass} justify-center col-span-1`}>Số lượng</div>
    <div className={`${headerClass} justify-end col-span-1`}>Giá tiền</div>

    {
      props.products.map((product, index) => <>
        <div className={`${cellClass} flex col-span-5`} key={index}>
          <div className="flex-grow-0 flex-shrink-0 w-12 p-2">
            <div className="image-wrapper">
              <img src={product.image}/>
            </div>
          </div>
          <div className="flex-grow font-semibold pl-3">{product.name}</div>
        </div>
        <div className={`${cellClass} justify-center col-span-1`} key={index + 'price'}>{NumberPipe(product.price, true)}</div>
        <div className={`${cellClass} justify-center col-span-1`} key={index + 'qty'}>{5}</div>
        <div className={`${cellClass} justify-end col-span-1 font-semibold`} key={index + 'product'}>{NumberPipe(product.price, true)}</div>
      </>)
    }
  </div>
}