import { NumberPipe } from "./../../../../lib/pipes/number";
import useScreen from "./../../../../lib/hooks/useScreen";

interface PropsType extends ReactProps {
  products: any[];
}
export function OrderDetailsProducts(props: PropsType) {
  const headerClass = "flex text-gray-800 font-semibold p-2 border-b-2 border-gray-300";
  const cellClass =
    "flex items-start md:items-center text-gray-700 border-b border-gray-200 py-3 md:p-3.5";
  const screenMd = useScreen("md");

  return (
    <>
      {screenMd ? (
        <div className="grid grid-cols-9 mt-5">
          <div className={`${headerClass} col-span-4`}>Sản phẩm</div>
          <div className={`${headerClass} justify-center col-span-2`}>Đơn giá</div>
          <div className={`${headerClass} justify-center col-span-1`}>Số lượng</div>
          <div className={`${headerClass} justify-end col-span-2`}>Giá tiền</div>
          {props.products.map((item, index) => (
            <>
              <div className={`${cellClass} col-span-4`} key={index + "product"}>
                <div className="flex-grow-0 flex-shrink-0 w-14 p-2">
                  <div className="image-wrapper">
                    <img src={item.product.image} />
                  </div>
                </div>
                <div className="flex-grow font-normal">
                  <span className="font-semibold ml-1">{item.product.name}</span>
                </div>
              </div>
              <div className={`${cellClass} justify-center col-span-2`} key={index + "price"}>
                {NumberPipe(item?.price, true)}
              </div>
              <div className={`${cellClass} justify-center col-span-1`} key={index + "qty"}>
                {NumberPipe(item.qty)}
              </div>
              <div
                className={`${cellClass} justify-end col-span-2 font-bold`}
                key={index + "product"}
              >
                {NumberPipe(item.amount, true)}
              </div>
            </>
          ))}
        </div>
      ) : (
        <>
          <div className="font-semibold text-lg text-gray-600 px-2 mt-5">Thông tin kiện hàng</div>
          {props.products.map((item, index) => (
            <div className={`${cellClass}`} key={index}>
              <div className="flex-grow-0 flex-shrink-0 w-16">
                <div className="image-wrapper">
                  <img src={item.product.image} />
                </div>
              </div>
              <div className="pl-4">
                <div className="">
                  Sản phẩm: <span className="font-semibold ml-1">{item.product.name}</span>
                </div>
                <div className="">
                  Đơn Giá: <span className="font-semibold">{NumberPipe(item?.price, true)}</span>
                </div>
                <div className="">
                  Số lượng: <span className="font-semibold">{NumberPipe(item.qty)}</span>
                </div>
                <div className="">
                  Giá tiền:{" "}
                  <span className="font-semibold text-primary">
                    {NumberPipe(item.amount, true)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
