import { CartItem } from './cart-item';
import CheckboxItem from './check-box-circle';
import { CartProduct, useCart } from '../../../../lib/providers/cart-provider';
import { Spinner } from '../../../shared/utilities/spinner';
interface Proptype extends ReactProps{
    checkAll:boolean,
    handleDeleteCart:Function,
    handleChangeItem:Function
}
export function ListCartItems(props:Proptype) {
    const {cartProducts, loading} =useCart();
    return (
        <>
            <div>
                <div className="sm:grid grid-cols-12 uppercase text-center border-b-2 pb-2 text-24 hidden">
                    <div className="col-span-5 text-left grid grid-cols-12">
                        <div className="col-span-1 text-20" 
                        onClick={()=>props.handleChangeItem(null, "activeAll", !props.checkAll)}
                        >
                            <CheckboxItem 
                            checked={props.checkAll}
                            /></div>
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
                    !loading?
                    cartProducts.map((cartProduct:CartProduct) => {
                        return <CartItem key={cartProduct.productId} cartProduct={cartProduct} handleDeleteCart={props.handleDeleteCart} handleChangeItem={props.handleChangeItem}/>
                    }):<Spinner/>
                }
            </div>
        </ >
    );
}
