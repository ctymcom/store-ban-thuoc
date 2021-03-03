import { useState } from 'react';
import { listItem, listMoneyCart, listPromotionCode } from './components/cart-item-data';
import { PayMoney } from './components/pay-money';
import { useRouter } from 'next/router';
import { toNumber, set } from 'lodash';
import { Promotion } from './components/promotion';
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { ListCartItems } from "./components/list-cart-items";
import Link from 'next/link';
import { LayoutCart } from './components/layout-cart';

export default function CartPage(props) {
    // const [Tit, setTit] = useState('cart');
    const [Change, setChange] = useState(false);
    const [listCart, setListCart] = useState(listItem);
    const [PrUsing, setPrUsing] = useState(null);
    const [CheckAll, setCheckAll] = useState(true);
    const router = useRouter();
    const [ListMoneyCart, setListMoneyCart] = useState([...listMoneyCart]);
    const toTalMoney = (listCart) => {
        let total = 0;
        listCart.forEach(item => {
            if (item.isCheck) {
                total += item.sale * item.amount;
            }
        });
        return total;
    }
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
        if (index !== -1&&listCart.length>1) {
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
    <LayoutCart name="cart">
        
        <div className="mx-auto w-11/12 sm:w-full">
                <div className="lg:flex gap-20">
                    <div className="w-full lg:w-3/4 border-b-2 sm:border-0 mt-5">
                        <ListCartItems listCart={listCart} handleDeleteCart={handleDeleteCart} handleChangeItem={handleChangeItem} CheckAll={CheckAll} />
                        <div className="text-primary flex items-center whitespace-nowrap">
                            <div className="cursor-pointer flex items-center text-16 sm:text-20" onClick={() => router.push('/home')}>
                                <i className="text-18 px-1"><HiArrowNarrowLeft /></i>
                                <p>Tiếp tục mua sắm</p>
                            </div>
                            <button className="bt btn-disabled px-1 m-2 sm:text-20"
                                onClick={() => setChange(false)}>Cập nhật giỏ hàng</button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4 flex flex-wrap">
                        <div className="w-full sm:w-1/2 lg:w-full sm:pr-2 lg:pr-0">
                            <Promotion onChanged={(promotion) => {
                                handleSetPromotion(promotion);
                            }} PrUsing={PrUsing} listPromotionCode={listPromotionCode}/>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-full sm:pl-2 lg:pl-0 sm:mt-5 lg:mt-3.5">
                            <PayMoney listMoney={ListMoneyCart} />
                            <Link href="/checkout">
                                <button className="btn btn-primary w-full py-6 mt-2 sm:text-20">Tiến hành thanh toán</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    </LayoutCart>
    </>
} 