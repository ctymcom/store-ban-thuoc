import { useState } from 'react';
import { listItem, listMoneyCart, listPromotionCode } from './component/cart-item-data';
import { PayMoney } from './component/pay-money';
import { CartPayHeader } from './component/cart-pay-header';
import { useRouter } from 'next/router';
import { toNumber, set } from 'lodash';
import { Promotion } from './component/promotion';
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { ListCartItems } from "./component/list-cart-items";

export default function CartPage(props) {
    // const [Tit, setTit] = useState('cart');
    const [Change, setChange] = useState(false);
    const [listCart, setListCart] = useState(listItem);
    const [PrUsing, setPrUsing] = useState(null);
    const [CheckAll, setCheckAll] = useState(true);
    const router = useRouter();
    const toTalMoney = (listCart) => {
        let total = 0;
        listCart.forEach(item => {
            if (item.isCheck) {
                total += item.sale * item.amount;
            }
        });
        return total;
    }
    const [ListMoneyCart, setListMoneyCart] = useState([...listMoneyCart]);

    const setListMoney = (code) => {
        let des = 0;
        if (code !== null) {
            des = code.des;
        }
        let total = toTalMoney(listCart);
        let listMoneyNew = ListMoneyCart;
        let discount = -total * des / 100;
        let final = total + discount;
        listMoneyNew[0].money = total;
        listMoneyNew[1].money = discount;
        listMoneyNew[2].money = final;
        setListMoneyCart([...listMoneyNew]);
    }
    const handleDeleteCart = (id: number) => {
        let listNew = listCart;
        let index = listCart.findIndex((item) => { return item.id === id });
        if (index !== -1) {
            listNew.splice(index, 1);
        }
        setListCart([...listNew]);
        setListMoney(PrUsing);
        setChange(true);
        checkAndsetCheckAll();
    }
    const findIndex = (id) => {
        return listCart.findIndex((item) => { return item.id === id });
    }
    const checkAndsetCheckAll = () => {
        let isCheckAll = true;
        listCart.forEach((item => {
            if (!item.isCheck) {
                isCheckAll = item.isCheck;
            }
        }))
        setCheckAll(isCheckAll);
    }
    const handleChangeItem = (id: number, type: string, value: any) => {
        switch (type) {
            case "u":
                {
                    let index = findIndex(id);
                    let listNew = listCart;
                    listNew[index].amount += 1;
                    setListCart([...listNew]);
                    setListMoney(PrUsing);
                }
                break;
            case "d":
                {
                    let index = findIndex(id);
                    let listNew = listCart;
                    if (listNew[index].amount > 1) {
                        listNew[index].amount -= 1;
                    }
                    setListCart([...listNew]);
                    setListMoney(PrUsing);
                }
                break;
            case "i":
                {
                    let numIt = toNumber(value);
                    if (numIt >= 0 && numIt <= 1000) {
                        let index = findIndex(id);
                        let listNew = listCart;
                        listNew[index].amount = numIt;
                        setListCart([...listNew]);
                        setListMoney(PrUsing);
                    }
                }
                break;
            case "c": {
                let index = findIndex(id);
                let listNew = listCart;
                listNew[index].isCheck = value;
                setListCart([...listNew]);
                checkAndsetCheckAll();
                setListMoney(PrUsing);
            } break;
            case "ca": {
                let listNew = listCart;
                listNew.forEach((item) => {
                    item.isCheck = value;
                })
                setCheckAll(value);
                setListCart([...listNew]);
                setListMoney(PrUsing);
            }
            default:
                break;
        }
    }
    const handleChangeListCart = (list) => {
    }
    const handleSetPromotion = (Cod) => {
        switch (Cod) {
            case listPromotionCode[0].code: {
                setPrUsing(listPromotionCode[0]);
                setListMoney(listPromotionCode[0]);
            } break;
            case listPromotionCode[1].code: {
                setPrUsing(listPromotionCode[1]);
                setListMoney(listPromotionCode[1]);
            } break
            case null: {
                setPrUsing(null);
                setListMoney(null);
            } break;
            default: {
                setPrUsing(null);
                setListMoney(null);
            } break;
        }
    }
    return <>
        <div className="main-container text-gray-800 text-20">
            <div>
                <CartPayHeader name="cart"/>
            </div>
            <div className="">
                <div className="col-span-3 grid grid-cols-7 gap-20">
                    <div className="col-span-5" id="cart__Table">
                        <ListCartItems listCart={listCart} handleDeleteCart={handleDeleteCart} handleChangeItem={handleChangeItem} CheckAll={CheckAll} />
                        <div className="text-primary flex items-center">
                            <div className="cursor-pointer flex items-center text-20" onClick={() => router.push('/home')}>
                                <i className="text-18 px-1"><HiArrowNarrowLeft /></i>
                                <p>Tiếp tục mua sắm</p>
                            </div>
                            <button className="bt btn-disabled m-2 text-20"
                                onClick={() => setChange(false)}>Cập nhật đơn hàng</button>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div>
                            <Promotion onChanged={(promotion) => {
                                handleSetPromotion(promotion);
                            }} PrUsing={PrUsing} listPromotionCode={listPromotionCode}/>
                        </div>
                        <div className="mt-10">
                            <PayMoney listMoney={ListMoneyCart} />
                            <button className="btn btn-primary w-full py-6 mt-2 text-20"
                                onClick={() => router.push('/checkout')}>Tiến hành thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
} 