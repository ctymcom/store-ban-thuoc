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

export default function CartPage(props) {
  // const [Tit, setTit] = useState('cart');
  const { cartProducts, setcartProducts, cartTotal, usePoint, setUsePoint } = useCart();
  const [checkAll, setCheckAll] = useState(true);
  const [mess, setMess] = useState("");
  const router = useRouter();
  const toast = useToast();
  const [listMoneyCart, setListMoneyCart] = useState([
    {
      title: "Tạm tính",
      money: 0,
    },
    {
      title: "Khuyến mãi",
      money: 0,
    },
    {
      title: "Tổng tiền",
      money: 0,
    },
  ]);
  useEffect(() => {
    let newListMoney = listMoneyCart;
    newListMoney[0].money = cartTotal;
    newListMoney[2].money = cartTotal;
    setListMoneyCart([...newListMoney]);
    checkAndsetCheckAll();
  }, [cartTotal]);

  const handleDeleteCart = (id: string) => {
    let listNew = cartProducts;
    let index = cartProducts.findIndex((cartProd: CartProduct) => cartProd.productId === id);
    if (index !== -1) {
      listNew.splice(index, 1);
    }
    setcartProducts([...listNew]);
    checkAndsetCheckAll();
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
  const handleChangeItem = (id: string, type: string, value: any) => {
    switch (type) {
      case "add":
        {
          if (value < 10000)
            setcartProducts([
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
            setcartProducts([
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
            setcartProducts([
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
          setcartProducts([
            ...cartProducts.map((cartProduct: CartProduct) =>
              cartProduct.productId !== id ? cartProduct : { ...cartProduct, active: value }
            ),
          ]);
        }
        break;
      case "activeAll": {
        let listNew = cartProducts;
        listNew.forEach((item: CartProduct) => {
          item.active = value;
        });
        setCheckAll(value);
        setcartProducts([...listNew]);
      }
      default:
        break;
    }
  };
  return (
    <div className="mx-auto w-11/12 sm:w-full">
      <div className="lg:flex gap-20">
        <div className="w-full lg:w-3/4 border-b-2 sm:border-0 my-5">
          <ListCartItems
            handleDeleteCart={handleDeleteCart}
            handleChangeItem={handleChangeItem}
            checkAll={checkAll}
          />
          <div className="text-primary flex items-center whitespace-nowrap">
            <div
              className="cursor-pointer flex items-center text-16 "
              onClick={() => router.push("/home")}
            >
              <i className="text-18 px-1">
                <HiArrowNarrowLeft />
              </i>
              <p>Tiếp tục mua sắm</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4 flex flex-col">
          <div className="sm:pr-2 lg:pr-0 row-auto">
            <Promotion />
          </div>
          <div className="sm:pl-2 lg:pl-0 my-5 sm:mt-5 lg:mt-3.5">
            <PayMoney listMoney={listMoneyCart} />
            <CheckBoxSquare
              checked={usePoint}
              text={"Sử dụng điểm thưởng"}
              onClick={(e) => setUsePoint(e)}
            />
            <Link href={mess ? "" : "/checkout"}>
              <button
                className="btn btn-primary w-full py-6 mt-2 "
                onClick={() => (mess ? toast.warn(mess) : "")}
              >
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
