import { CartItem } from './cart-item';
import CheckboxItem from './check-box-circle';

export function ListCartItems(props) {
    return (
        <>
            <div>
                <div className="sm:grid grid-cols-12 uppercase text-center border-b-2 pb-2 text-24 hidden">
                    <div className="col-span-5 text-left grid grid-cols-12">
                        <div className="col-span-1 text-20" onClick={()=>props.handleChangeItem(null, "ca", !props.CheckAll)}>
                            <CheckboxItem checked={props.CheckAll}/></div>
                        <span className="col-span-11">Sản Phẩm</span>
                    </div>
                    <div className="col-span-2">Giá</div>
                    <div className="col-span-2">Số Lượng</div>
                    <div className="col-span-2">Tổng Tiền</div>
                    <div className="col-span-1"></div>
                </div>
                <h3 className="block sm:hidden border-b-2 pb-2">Thông tin kiện hàng</h3>
            </div>
            <div>
                {
                    props.listCart.map((item, index) => {
                        return <CartItem key={index} item={item} handleDeleteCart={props.handleDeleteCart} handleChangeItem={props.handleChangeItem} />
                    })
                }
            </div>
        </ >
    );
}
