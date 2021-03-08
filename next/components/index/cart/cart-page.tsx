import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useCart, CartProduct } from '../../../lib/providers/cart-provider';
import { ListCartItems } from "./components/list-cart-items";
import { PayMoney } from "./components/pay-money";
import { Promotion } from "./components/promotion";
import { Spinner } from '../../shared/utilities/spinner';
import { NotFound } from '../../shared/utilities/not-found';

export default function CartPage(props) {
  // const [Tit, setTit] = useState('cart');
  const {cartProducts,setcartProducts} = useCart();
  const [checkAll, setCheckAll] = useState(true);
  const router = useRouter();
  const [listMoneyCart, setListMoneyCart] = useState([ 
    {
    title: "Tạm tính",
    money: 0
    },
    {
        title: "Khuyến mãi",
        money: 0
    },
    {
        title: "Tổng tiền",
        money: 0
    }]);
  const toTalMoney = (cartProducts:CartProduct[]) => {
    let total = 0;
    if(cartProducts){
      cartProducts.forEach((item:CartProduct) => {
        if (item.active) {
          total += item.amount;
        }
      });
    }
    return total;
  };
  useEffect(() => {
    let newListMoney = listMoneyCart;
    newListMoney[2].money=toTalMoney(cartProducts);
    setListMoneyCart([...newListMoney]);
    checkAndsetCheckAll();
  }, [cartProducts]);

  const handleDeleteCart = (id: string) => {    
    let listNew = cartProducts;
    let index = cartProducts.findIndex((cartProd:CartProduct) => cartProd.productId===id);
    if (index !== -1) {
      listNew.splice(index, 1);
    }
    setcartProducts([...listNew]);
    checkAndsetCheckAll();
  };
  const checkAndsetCheckAll = () => {
    let isCheckAll = true;
    if(cartProducts)
    {
      cartProducts.forEach((item:CartProduct) => {
        if (!item.active) {
          isCheckAll = item.active;
        }
      });
    }
    setCheckAll(isCheckAll);
  };
  const handleChangeItem = (id: string, type: string, value: any) => {
    switch (type) {
      case "add":
        {
          setcartProducts(cartProducts.map((cartProduct:CartProduct)=>cartProduct.productId!==id?cartProduct:{...cartProduct,qty:value+1,amount:value*cartProduct.price}));
        }
        break;
      case "sub":
        {
          if(value>1){
            setcartProducts(cartProducts.map((cartProduct:CartProduct)=>cartProduct.productId!==id?cartProduct:{...cartProduct,qty:value-1,amount:value*cartProduct.price}));
          }
        }
        break;
      case "input":
        {
          if(value<=10000){
            if(value<1){
              setcartProducts(cartProducts.map((cartProduct:CartProduct)=>cartProduct.productId!==id?cartProduct:{...cartProduct,qty:1,amount:1*cartProduct.price}));
            }else{
              setcartProducts(cartProducts.map((cartProduct:CartProduct)=>cartProduct.productId!==id?cartProduct:{...cartProduct,qty:value,amount:value*cartProduct.price}));
            }
          }
        }
        break;
      case "changeActive":
        {
          setcartProducts(cartProducts.map((cartProduct:CartProduct)=>cartProduct.productId!==id?cartProduct:{...cartProduct,active:value}));
        }
        break;
      case "activeAll": {
        let listNew = cartProducts;
        listNew.forEach((item:CartProduct) => {
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
    cartProducts.length>0?
    <div className="mx-auto w-11/12 sm:w-full">
      <div className="lg:flex gap-20">
        <div className="w-full lg:w-3/4 border-b-2 sm:border-0 mt-5">
          <ListCartItems handleDeleteCart={handleDeleteCart}
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
            <Promotion/>
          </div>
          <div className="sm:pl-2 lg:pl-0 sm:mt-5 lg:mt-3.5">
            <PayMoney listMoney={listMoneyCart} />
            <Link href="/checkout">
              <button className="btn btn-primary w-full py-6 mt-2 ">
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>:<NotFound text={"Bạn chưa có sản phẩm nào trong giỏ hàng"} className="text-32" href={"/home"} textBtn={"Quay về trang chủ"}/>
  );
}
