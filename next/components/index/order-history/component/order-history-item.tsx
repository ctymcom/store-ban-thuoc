import { NumberPipe } from '../../../../lib/pipes/number';
import moment from 'moment-timezone';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PropsType extends ReactProps {
  data: any[];
  status: any;
}

export function OrderHistoryItem ({ data, status } :PropsType) {

  
  
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    
  console.log(data, status);
    if(status) {
      setListOrder(data.filter(x => x.status == status))
    } else {
      setListOrder(data)
    }
    
  }, [status, data]);
  
  return  <>
            {
              listOrder.map((item, index) => {
                
                  return  (   
                    <div className="oder-history__info-item flex justify-between items-center border-b-2 py-3" key={index}>
                        <div className="oder-history__info w-3/5">
                            <span className="oder-code">Mã đơn hàng: {item.id_oder}</span>
                            <Link href="/profile/order-details">
                                <a className="oder-detail text-primary ml-2">Xem chi tiết đơn hàng</a>
                            </Link>
                            <p className="delivery-time">Thời gian giao hàng dự kiến: { moment(item.delivery_time).format("DD/MM")} đến { moment(item.intend_time).subtract(-5).format("DD/MM/YYYY")}</p>
                            <p className="total-product">Tổng sản phẩm: {item.total_product} sản phẩm</p>
                            <p className="total-price">Tổng tiển:
                                <span className="number-price text-primary ml-2">{NumberPipe(item.total_price)}</span>
                            </p>
                            <p className="status-product">Trạng thái sản phẩm:  
                                <span className="ml-2">
                                    {
                                        item.status == 'pending' ? 'Chờ xác nhận' : 
                                        (item.status == 'delivering' ? 'Đang giao' : 
                                        (item.status == 'complete' ? 'Đã giao' : 
                                        (item.status == 'canceled' ? 'Đã hủy' : 'Mua lại')))
                                    }
                                </span>
                            </p>
                        </div>
                        <button className="bg-primary text-white px-8 py-1.5 rounded-md whitespace-nowrap">
                            {   
                                item.status == 'pending' ? 'Chờ xác nhận' : 
                                (item.status == 'delivering' ? 'Đang giao' : 
                                (item.status == 'complete' ? 'Đã giao' : 
                                (item.status == 'canceled' ? 'Đã hủy' : 'Mua lại')))
                            }
                        </button>
                    </div>
                );
              })
            }    
  </>;
  
}