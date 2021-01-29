import { CartItem } from './cart-item';

export function ListCartItems(props) {
    return (
        <table>
            <thead>
                <tr className="uppercase  text-left border-b-4">
                    <th className="w-96 font-normal">Sản Phẩm</th>
                    <th className="font-normal  w-40">Giá</th>
                    <th className="font-normal  w-40">Số Lượng</th>
                    <th className="font-normal  w-48 pr-4">Tổng Tiền</th>
                </tr>
            </thead>
            <tbody>
                {

                    props.listCart.map((item, index) => {
                        return <CartItem item={item} index={index} handleDeleteCart={props.handleDeleteCart} handleChangeItem={props.handleChangeItem} />
                    }
                    )}
            </tbody>
        </table>
    );
}
