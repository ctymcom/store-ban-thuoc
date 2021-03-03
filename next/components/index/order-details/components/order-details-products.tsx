
import { NumberPipe } from './../../../../lib/pipes/number';

interface PropsType extends ReactProps {
  products: any[]
}
export function OrderDetailsProducts(props: PropsType) {

  const headerClass="hidden md:flex text-gray-800 font-semibold p-2 border-b-2 border-gray-300"
  const cellClass="md:flex items-start md:items-center text-gray-700 border-b border-gray-200 py-3 md:p-3.5"

  return <div className="md:grid md:grid-cols-8 mt-5">
    <div className={`${headerClass} col-span-5`}>Sản phẩm</div>
    <div className={`${headerClass} justify-center col-span-1`}>Đơn giá</div>
    <div className={`${headerClass} justify-center col-span-1`}>Số lượng</div>
    <div className={`${headerClass} justify-end col-span-1`}>Giá tiền</div>
    <div className="block md:hidden text-17 px-1 mb-2">Thông tin kiện hàng</div>
    {
      props.products.map((product, index) => <>
        <div className={`${cellClass} flex col-span-5`} key={index}>
          <div className="flex-grow-0 flex-shrink-0 w-12 p-0 md:p-2">
            <div className="image-wrapper">
              <img src={product.image}/>
            </div>
          </div>
          <div className="pl-3">
            <div className="flex-grow font-normal text-13 md:text-base">
              <span className="inline-block md:hidden">Sản phẩm:</span>
              <span className="font-semibold ml-1">{product.name}</span>
            </div>
            <div className="flex md:hidden flex-grow font-normal text-13" key={index + 'price'}>Giá: <span className="font-semibold ml-1">{NumberPipe(product.price, true)}</span></div>
            <div className="flex md:hidden flex-grow font-normal text-13" key={index + 'qty'}>Số lượng: <span className="font-semibold ml-1">{5}</span></div>
            <div className="flex md:hidden flex-grow font-normal text-13" key={index + 'product'}>Tạm tính: <span className="font-semibold ml-1">{NumberPipe(product.price, true)}</span></div>
          </div>
          
        </div>
        <div className={`${cellClass} hidden justify-center col-span-1`} key={index + 'price'}>{NumberPipe(product.price, true)}</div>
        <div className={`${cellClass} hidden justify-center col-span-1`} key={index + 'qty'}>{5}</div>
        <div className={`${cellClass} hidden justify-end col-span-1 font-bold`} key={index + 'product'}>{NumberPipe(product.price, true)}</div>
      </>)
    }
  </div>
}