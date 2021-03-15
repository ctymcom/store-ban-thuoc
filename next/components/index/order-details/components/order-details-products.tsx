import { NumberPipe } from "./../../../../lib/pipes/number";

interface PropsType extends ReactProps {
  products: any[];
}
export function OrderDetailsProducts(props: PropsType) {
  const headerClass = "hidden md:flex text-gray-800 font-semibold p-2 border-b-2 border-gray-300";
  const cellClass =
    "md:flex items-start md:items-center text-gray-700 border-b border-gray-200 py-3";

  return props.products ? (
    <div className="md:grid md:grid-cols-8 mt-5">
      <div className={`${headerClass} md:col-span-4 lg:col-span-4 xl:col-span-5`}>Sản phẩm</div>
      <div className={`${headerClass} justify-center md:col-span-1 lg:col-span-1 `}>Đơn giá</div>
      <div
        className={`${headerClass} justify-center md:col-span-1 lg:col-span-1 whitespace-nowrap`}
      >
        Số lượng
      </div>
      <div className={`${headerClass} justify-end md:col-span-2 lg:col-span-2 xl:col-span-1`}>
        Giá tiền
      </div>
      <div className="block md:hidden text-17 px-1 mb-2">Thông tin kiện hàng</div>
      {props.products.length > 0 &&
        props.products.map((item, index) => (
          <>
            <div
              className={`${cellClass} flex md:col-span-4 lg:col-span-4 xl:col-span-5`}
              key={index}
            >
              <div className="flex-grow-0 flex-shrink-0 w-12 p-0 md:p-2">
                <div className="image-wrapper">
                  <img src={item.product.image} />
                </div>
              </div>
              <div className="pl-3">
                <div className="flex-grow font-normal text-13 sm:text-16 md:text-base">
                  <span className="inline-block md:hidden">Sản phẩm: </span>
                  <span className="font-semibold ml-1">{item.product.name}</span>
                </div>
                <div className="flex md:hidden flex-grow font-normal text-13 sm:text-16">
                  Đơn Giá: <span className="font-semibold ml-1">{NumberPipe(item?.price)}</span>
                </div>
                <div className="flex md:hidden flex-grow font-normal text-13 sm:text-16">
                  Số lượng: <span className="font-semibold ml-1">{item.qty}</span>
                </div>
                <div className="flex md:hidden flex-grow font-normal text-13 sm:text-16">
                  Giá tiền: <span className="font-semibold ml-1">{NumberPipe(item.amount)}</span>
                </div>
              </div>
            </div>
            <div className={`${cellClass} hidden justify-center col-span-1`} key={index + "price"}>
              {NumberPipe(item?.price, true)}
            </div>
            <div className={`${cellClass} hidden justify-center col-span-1`} key={index + "qty"}>
              {item.qty}
            </div>
            <div
              className={`${cellClass} hidden justify-end md:col-span-2 lg:col-span-2 xl:col-span-1 font-bold `}
              key={index + "product"}
            >
              {NumberPipe(item.amount, true)}
            </div>
          </>
        ))}
    </div>
  ) : null;
}
