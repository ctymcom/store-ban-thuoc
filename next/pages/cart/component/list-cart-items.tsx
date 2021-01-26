import {CartItem} from './cart-item';

export function ListCartItems(props){
    const {cartItemData} = props;
    console.log(cartItemData);
    
    return (
                <table>
                    <thead className="uppercase  text-left border-b-2">
                        <tr>
                            <th className="w-2/5 font-semibold">Sản Phẩm</th>
                            <th className="font-semibold">Giá</th>
                            <th className="font-semibold">Số Lượng</th>
                            <th className="font-semibold">Tổng Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItemData.map((item,index) => {
                            return <CartItem item = {item} index = {index} handleChangeListCart = {props.handleChangeListCart}/>
                            }
                        )}
                    </tbody>
                </table>
    );
}
