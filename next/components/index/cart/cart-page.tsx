import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useCart, CartProduct } from "../../../lib/providers/cart-provider";
import { ListCartItems } from "./components/list-cart-items";
import { PayMoney } from "./components/pay-money";
import { Promotion } from "./components/promotion";
import CheckBoxSquare from "../checkout/components/check-box-square";
import { useToast } from "../../../lib/providers/toast-provider";
import { useAlert } from "../../../lib/providers/alert-provider";
import ca from "date-fns/locale/ca/index";

export default function CartPage(props) {
  // const [Tit, setTit] = useState('cart');
  const { cartProducts, setCartProducts, cartTotal, usePoint, setUsePoint } = useCart();
  const [checkAll, setCheckAll] = useState(true);
  const [mess, setMess] = useState("");
  const toast = useToast();
  const alert = useAlert();
  const [listMoneyCart, setListMoneyCart] = useState([
    {
      title: "Tạm tính",
      money: 0,
    },
  ]);
  useEffect(() => {
    let newListMoney = listMoneyCart;
    newListMoney[0].money = cartTotal;
    setListMoneyCart([...newListMoney]);
    checkAndsetCheckAll();
  }, [cartTotal]);
  useEffect(() => {
    checkAndsetCheckAll();
  }, [cartProducts]);

  const handleDeleteCart = async (id: string) => {
    let listNew = cartProducts;
    let res = false;
    if (listNew.length > 1) {
      res = true;
    } else {
      res = await alert.question("Thông báo", "Bạn có muốn xóa Sản phẩm cuối cùng?", "Xác nhận");
    }
    if (res) {
      let index = cartProducts.findIndex((cartProd: CartProduct) => cartProd.productId === id);
      if (index !== -1) {
        listNew.splice(index, 1);
      }
    }
    setCartProducts([...listNew]);
  };
  const checkAndsetCheckAll = () => {
    let isCheckAll = true;
    let disabledAll = true;
    if (cartProducts) {
      cartProducts.forEach((item: CartProduct) => {
        if (!item.active) {
          isCheckAll = item.active;
        } else {
          disabledAll = !item.active;
        }
      });
    }
    setCheckAll(isCheckAll);
    if (disabledAll) {
      setMess("Bạn chưa chọn bất kì sản phẩm nào trong giỏ hàng!");
    } else {
      setMess("");
    }
  };
  const handleChangeItem = async (id: string, type: string, value: any) => {
    switch (type) {
      case "add":
        {
          if (value < 10000)
            setCartProducts([
              ...cartProducts.map((cartProduct: CartProduct) =>
                cartProduct.productId !== id
                  ? cartProduct
                  : { ...cartProduct, qty: value + 1, amount: (value + 1) * cartProduct.price }
              ),
            ]);
        }
        break;
      case "sub":
        {
          if (value > 1) {
            setCartProducts([
              ...cartProducts.map((cartProduct: CartProduct) =>
                cartProduct.productId !== id
                  ? cartProduct
                  : { ...cartProduct, qty: value - 1, amount: (value - 1) * cartProduct.price }
              ),
            ]);
          }
        }
        break;
      case "input":
        {
          if (value <= 10000 && value >= 0) {
            setCartProducts([
              ...cartProducts.map((cartProduct: CartProduct) =>
                cartProduct.productId !== id
                  ? cartProduct
                  : { ...cartProduct, qty: value, amount: value * cartProduct.price }
              ),
            ]);
          }
        }
        break;
      case "changeActive":
        {
          let cart = cartProducts.find((item) => item.productId === id);
          let isZero = true;
          if (cart && cart.qty > 0) {
            isZero = false;
          }
          if (isZero && !cart.active) {
            toast.warn("Vui lòng tăng số lượng sản phẩm trước");
          } else {
            setCartProducts([
              ...cartProducts.map((cartProduct: CartProduct) =>
                cartProduct.productId !== id ? cartProduct : { ...cartProduct, active: value }
              ),
            ]);
            checkAndsetCheckAll();
          }
        }
        break;
      case "activeAll":
        {
          let changeAll = "";
          let listNew = cartProducts;
          listNew.forEach((item: CartProduct) => {
            if (item.qty > 0) {
              item.active = value;
            } else {
              changeAll = item.product.name;
            }
          });
          if (!changeAll) {
            setCheckAll(value);
          } else {
            toast.warn("Vui lòng tăng số lượng " + changeAll + " trước");
          }
          setCartProducts([...listNew]);
        }
        break;
      case "deleteItemsSelected":
        {
          let index = cartProducts.findIndex((item) => item.active);
          if (index !== -1) {
            let res = await alert.question(
              "Thông báo",
              "Bạn muốn xóa hết sản phẩm được chọn",
              "Xác nhận"
            );
            if (res) {
              let listNew = [];
              cartProducts.forEach((item: CartProduct) => {
                if (!item.active) {
                  listNew.push(item);
                }
              });
              setCartProducts([...listNew]);
            }
          } else {
            toast.info("Bạn chưa chọn sản phẩm nào để xóa");
          }
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="">
      <div className="lg:flex gap-20">
        <div className="w-full lg:w-3/4 border-b-2 sm:border-0 my-5">
          <ListCartItems
            handleDeleteCart={handleDeleteCart}
            handleChangeItem={handleChangeItem}
            checkAll={checkAll}
          />
        </div>
        <div className="w-full lg:w-1/4 flex flex-col">
          <div className="sm:pr-2 lg:pr-0 row-auto">
            <Promotion />
          </div>
          <div className="sm:pl-2 lg:pl-0 my-5 sm:mt-5 lg:mt-3.5 leading-7">
            <PayMoney listMoney={listMoneyCart} />
            <CheckBoxSquare
              checked={usePoint}
              text={"Sử dụng điểm thưởng"}
              onClick={(e) => setUsePoint(e)}
            />
            <Link href={mess ? "" : "/checkout"}>
              <button
                className="btn-primary w-full py-6 my-2 "
                onClick={() => (mess ? toast.warn(mess) : "")}
              >
                Tiến hành thanh toán
              </button>
            </Link>
            <Link href="/">
              <p className=" btn-default text-danger flex items-center gap-2">
                <HiArrowNarrowLeft className="text-20" />
                Tiếp tục mua sắm
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
