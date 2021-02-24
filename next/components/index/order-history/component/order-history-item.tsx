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
          <div className="oder-history__info-item flex justify-between items-center border-b-2 py-3" key={index}>
            <div className="oder-history__info w-3/5">
              <span className="oder-code">Mã đơn hàng: {item.id_oder}</span>
              <Link href="/profile/order-details">
                <a className="oder-detail text-primary ml-2">Xem chi tiết đơn hàng</a>
              </Link>
              <p className="delivery-time">Thời gian giao hàng dự kiến: {moment(item.delivery_time).format("DD/MM")} đến {moment(item.intend_time).subtract(-5).format("DD/MM/YYYY")}</p>
              <p className="total-product">Tổng sản phẩm: {item.total_product} sản phẩm</p>
              <p className="total-price">Tổng tiển:
                <span className="number-price text-primary ml-2">{NumberPipe(item.total_price)}</span>
              </p>
              <p className="status-product">Trạng thái sản phẩm:
                <span className="ml-2">{showLabelStatus}</span>
              </p>
            </div>
            <button className={`${backgroundBtn} text-white px-6 py-1.5 rounded-md whitespace-nowrap`}>{showLabelStatus}</button>
          </div>
  </>;

}