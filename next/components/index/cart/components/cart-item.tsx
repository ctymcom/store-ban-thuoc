import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { NumberPipe } from "../../../../lib/pipes/number";
import CheckboxItem from "./check-box-circle";
import { CartProduct } from "../../../../lib/providers/cart-provider";
import { Spinner } from "../../../shared/utilities/spinner";
interface Proptype extends ReactProps {
  cartProduct: CartProduct;
  handleDeleteCart: Function;
  handleChangeItem: Function;
}
export function CartItem(props: Proptype) {
  return (
    <>
      {props.cartProduct.product ? (
        <div className="grid grid-cols-12 text-center text-16  border-b-2 items-center overflow-hidden">
          <div className="col-span-8 sm:col-span-5 text-left flex items-center gap-2">
            <div
              className="w-1/12 h-full cursor-pointer text-20 flex items-center"
              onClick={() =>
                props.handleChangeItem(
                  props.cartProduct.productId,
                  "changeActive",
                  !props.cartProduct.active
                )
              }
            >
              <CheckboxItem checked={props.cartProduct.active} />
            </div>
            <div
              className={`w-11/12 flex gap-2 items-center sm:h-24  ${
                props.cartProduct.active ? "" : "sm:opacity-50"
              }`}
            >
              <img
                className="w-16 max-h-16 object-contain"
                src={props.cartProduct.product.image || "/assets/img/default.png"}
                onError={(e) => {
                  (e.target as any).src = "/assets/img/default.png";
                }}
                alt={props.cartProduct.product.name}
              />
              <p className="w-3/4 sm:w-2/3 text-left flex-wrap items-center justify-between">
                <span>{props.cartProduct.product.name}</span>
                <span className="block sm:hidden text-primary">
                  {NumberPipe(
                    props.cartProduct.product.salePrice
                      ? props.cartProduct.product.salePrice
                      : props.cartProduct.product.basePrice,
                    true
                  )}
                </span>
              </p>
            </div>
          </div>
          <div
            className={`col-span-2 hidden sm:block ${
              props.cartProduct.active ? "" : "sm:opacity-50"
            }`}
          >
            {NumberPipe(
              props.cartProduct.product.salePrice
                ? props.cartProduct.product.salePrice
                : props.cartProduct.product.basePrice,
              true
            )}
          </div>
          <div className={`col-span-4 sm:col-span-2 props.cartProduct.active?"":"sm:opacity-50"}`}>
            <div className="flex items-center justify-between w-24 mx-auto">
              <i
                className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                onClick={() => {
                  props.handleChangeItem(props.cartProduct.productId, "sub", props.cartProduct.qty);
                }}
              >
                <HiMinusCircle />
              </i>
              <input
                className="w-full text-center"
                type="number"
                value={
                  props.cartProduct.qty < 10
                    ? "0" + props.cartProduct.qty
                    : props.cartProduct.qty.toString()
                }
                onChange={(e) => {
                  props.handleChangeItem(
                    props.cartProduct.productId,
                    "input",
                    parseInt(e.target.value)
                  );
                }}
              />
              <i
                className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                onClick={() => {
                  props.handleChangeItem(props.cartProduct.productId, "add", props.cartProduct.qty);
                }}
              >
                <HiPlusCircle />
              </i>
            </div>
          </div>
          <div
            className={`col-span-2 hidden sm:block ${
              props.cartProduct.active ? "" : "sm:opacity-50"
            }`}
          >
            <div className="font-bold text-center">
              {NumberPipe(props.cartProduct.amount, true)}
            </div>
          </div>
          <div
            className={`col-span-1 grid-cols-5 hidden sm:block ${
              props.cartProduct.active ? "" : "sm:opacity-50"
            }`}
          >
            <button
              className="col-span-1 btn-outline border-none text-20 text-danger hover:text-danger-dark"
              onClick={() => {
                props.handleDeleteCart(props.cartProduct.productId);
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
