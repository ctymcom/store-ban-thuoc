import { NumberPipe } from '../../../../lib/pipes/number';
import moment from 'moment-timezone';
import Link from 'next/link';

interface PropsType extends ReactProps {
  item: any;
  index: any;
}

export function OrderHistoryItem({ item, index }: PropsType) {

  let showLabelStatus = '';
  let backgroundBtn = '';
  switch (item.status) {
    case 'pending': showLabelStatus = 'Chờ xác nhận'; backgroundBtn = 'bg-info'; break;
    case 'delivering': showLabelStatus = 'Đang giao'; backgroundBtn = 'bg-warning'; break;
    case 'complete': showLabelStatus = 'Đã giao'; backgroundBtn = 'bg-success'; break;
    case 'canceled': showLabelStatus = 'Đã hủy'; backgroundBtn = 'bg-danger'; break;
    default: showLabelStatus = 'Mua lại'; break;
  }

  return <>
          <div className="flex flex-col md:flex-row justify-between items-center border-b-2 py-5 md:py-3" key={index}>
            <div className="w-full md:w-3/5 text-sm md:text-base">
              <p className="text-base"> Mã đơn hàng: 
                <span className="ml-1.5">{item.id_oder}</span>
                <Link href="/profile/order-details">
                  <a className="text-primary ml-1 hidden md:inline-block">Xem chi tiết đơn hàng</a>
                </Link>
              </p>

              <p className="pt-1 md:pt-0">Thời gian giao hàng dự kiến:  
                <span className="ml-1 md:ml-2">{moment(item.delivery_time).format("DD/MM")} đến {moment(item.intend_time).subtract(-5).format("DD/MM/YYYY")}</span>
              </p>

              <p className="pt-1 md:pt-0">Tổng sản phẩm: 
                <span className="ml-2">{item.total_product} sản phẩm</span>
              </p>

              <p className="pt-1 md:pt-0">Tổng tiển:
                <span className="number-price text-primary ml-2">{NumberPipe(item.total_price)}</span>
              </p>

              <p className="pt-1 md:pt-0">Trạng thái sản phẩm:
                <span className="ml-2">{showLabelStatus}</span>
              </p>
            </div>
            <button className={`${backgroundBtn} hidden md:block text-white px-6 py-1.5 rounded-md whitespace-nowrap text-sm md:text-base mt-4 md:mt-0`}>{showLabelStatus}</button>
          </div>
  </>;

}