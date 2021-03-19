import { CartItem } from "./cart-item";
import CheckboxItem from "./check-box-circle";
import { CartProduct, useCart } from "../../../../lib/providers/cart-provider";
import { Spinner } from "../../../shared/utilities/spinner";
interface Proptype extends ReactProps {
  checkAll: boolean;
  handleDeleteCart: Function;
  handleChangeItem: Function;
}
export function ListCartItems(props: Proptype) {
  const { cartProducts, loading } = useCart();
  return (
    <>
      <div className="uppercase text-16 border-b-2 pb-2">
        <div className="sm:grid grid-cols-12 hidden text-center">
          <div className="col-span-5 text-left grid grid-cols-12">
            <div
              className="col-span-1 text-20"
              onClick={() => props.handleChangeItem(null, "activeAll", !props.checkAll)}
            >
              <CheckboxItem checked={props.checkAll} />
            </div>
            <span className="col-span-11 ml-2">Sản Phẩm</span>
          </div>
          <div className="col-span-2">Giá</div>
          <div className="col-span-2">Số Lượng</div>
          <div className="col-span-2">Tổng Tiền</div>
          <div className="col-span-1"></div>
        </div>
        <div className="block sm:hidden">
          <h3>Thông tin kiện hàng</h3>
          <div className="flex justify-between text-16 normal-case pt-2">
            <p
              className="btn-default p-0"
              onClick={() => props.handleChangeItem(null, "activeAll", !props.checkAll)}
            >
              {props.checkAll ? "Bỏ chọn tất cả" : " Chọn tất cả"}
            </p>
            <p
              className="btn-default p-0"
              onClick={() => props.handleChangeItem(null, "deleteItemsSelected", null)}
            >
              Xóa đã chọn
            </p>
          </div>
        </div>
      </div>
      <div>
        {!loading ? (
          cartProducts.map((cartProduct: CartProduct) => {
            return (
              <CartItem
                key={cartProduct.productId}
                cartProduct={cartProduct}
                handleDeleteCart={props.handleDeleteCart}
                handleChangeItem={props.handleChangeItem}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
