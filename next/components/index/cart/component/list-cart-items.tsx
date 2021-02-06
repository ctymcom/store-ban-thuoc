import { CartItem } from './cart-item';
import { Checkbox } from '../../../shared/form/checkbox';

export function ListCartItems(props) {
    return (
        <>
            <div>
                <div className="grid grid-cols-12 uppercase text-center border-b-2 pb-2">
                    <div className="col-span-5 text-left grid grid-cols-12">
                        <div className="col-span-1">
                            <Checkbox checked={props.CheckAll}
                                onChanged={(e) => {
                                    props.handleChangeItem(null, "ca", e);
                                }}
                            /></div>
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
                        console.log(item);

                        return <CartItem key={index} item={item} handleDeleteCart={props.handleDeleteCart} handleChangeItem={props.handleChangeItem} />
                    })
                }
            </div>
        </ >
    );
}
