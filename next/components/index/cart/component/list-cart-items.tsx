import { CartItem } from './cart-item';
import CheckboxItem from './checkbox-item';

export function ListCartItems(props) {
    return (
        <>
            <div>
                <div className="grid grid-cols-12 uppercase text-center border-b-2 pb-2 text-24">
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
