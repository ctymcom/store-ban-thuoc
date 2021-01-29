
type DeliveredOrderListProps = {
    [x: string]: any;
    data: any[]
}

export function DeliveredOrderList({ data }: DeliveredOrderListProps) {
    return <>
    {
        data.map((item, index) => {
            return  <div className="oder-history__info-item flex justify-between items-center border-b-2 py-3" key={index}>
            <div className="oder-history__info w-3/5">
                <span className="oder-code">Mã đơn hàng: {item.id_oder}</span>
                <a href="#" className="oder-detail text-success ml-2">Xem chi tiết đơn hàng</a>
                <p className="delivery-time">Thời gian giao hàng dự kiến: {item.delivery_time} đến {item.intend_time} </p>
                <p className="total-product">Tổng sản phẩm: {item.total_product} sản phẩm</p>
                <p className="total-price">Tổng tiển:
                    <span className="number-price text-success ml-2">{item.total_price}</span>
                </p>
            </div>
            <button className="oder-history__btn-repurchase bg-btn-warning text-white px-16 h-10 whitespace-nowrap">Đã giao</button>
        </div>
        })
    }    
    </>;
}