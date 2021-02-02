import { useState } from 'react';
import { ListCartItems } from './list-cart-items';
import { cartItemData, listMoneyCart, listPromotionCode } from './cart-item-data';
import { CartTotalMoney } from '../../../../layouts/components/pay-money';
import { CartPayHeader } from '../../../../layouts/components/cart-pay-header';
import { useRouter } from 'next/router';
import { toNumber, set } from 'lodash';
import { Promotion } from './promotion';

export function CartPayPromotion(props) {
    // const [Tit, setTit] = useState('cart');
    const [Change, setChange] = useState(false);
    const [listCart, setListCart] = useState(cartItemData);
    const [PrUsing, setPrUsing] = useState(null);
    const router = useRouter();
    const toTalMoney = (listCart) => {
        let total = 0;
        listCart.forEach(item => {
            total += item.sale * item.amount;
        });
        return total;
    }
    const [ListMoneyCart, setListMoneyCart] = useState([...listMoneyCart]);
    const handleDeleteCart = (id: number) => {
        let listNew = listCart;
        let index = listCart.findIndex((item) => { return item.id === id });
        if (index !== -1) {
            listNew.splice(index, 1);
        }
        setListCart([...listNew]);
        setListMoney(PrUsing);
        setChange(true);
    }
    const findIndex = (id) => {
        return listCart.findIndex((item) => { return item.id === id });
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
    const handleChangeItem = (id: number, type: string, value: number) => {
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
                    if (numIt >= 0 && numIt <= 100000) {
                        let index = findIndex(id);
                        let listNew = listCart;
                        listNew[index].amount = numIt;
                        setListCart([...listNew]);
                        setListMoney(PrUsing);
                    }
                }
                break;
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
            default:
                break;
        }
    }
    return <div className="w-4/5 mx-auto">
        <div>
            <CartPayHeader title={"cart"} />
        </div>
        <div id="have__Item">
            <div className="grid grid-cols-7 gap-20 text-lg">
                <div className="col-span-5" id="cart__Table">
                    <ListCartItems listCart={listCart} handleDeleteCart={handleDeleteCart} handleChangeItem={handleChangeItem} />
                </div>
                <div id="cart" className="col-span-2">
                    <div id="cart__Promotion">
                        <Promotion onChanged={(promotion) => {
                            handleSetPromotion(promotion);
                        }} PrUsing={PrUsing} />
                    </div>
                    <div id="cart__TotalMoney" className="mt-10">
                        <CartTotalMoney listMoney={ListMoneyCart} />
                        <button className="border border-gray-300 rounded w-full p-2 mt-2 bg-primary text-center text-white"
                            onClick={() => router.push('/checkout')}>Tiến hành thanh toán</button>
                    </div>
                </div>
            </div>
            <div className="text-primary flex items-center">
                <svg className="w-6 m-4" xmlns="http://www.w3.org/2000/svg" width="31" height="16.917" viewBox="0 0 31 16.917">
                    <path id="Path_10598" data-name="Path 10598" d="M-1054.088-676.847h7.256q8.406,0,16.812,0a6.335,6.335,0,0,0,.9-.032,1.335,1.335,0,0,0,1.166-1.328,1.344,1.344,0,0,0-1.015-1.392,3.763,3.763,0,0,0-.895-.082q-11.69-.006-23.38,0h-.871c.241-.251.381-.4.528-.55,1.35-1.348,2.707-2.69,4.051-4.045a1.381,1.381,0,0,0,.31-1.654,1.3,1.3,0,0,0-1.433-.761,1.835,1.835,0,0,0-.885.453q-3.471,3.431-6.9,6.9a1.385,1.385,0,0,0-.008,2.132q3.437,3.466,6.9,6.908a1.36,1.36,0,0,0,2.031.078,1.358,1.358,0,0,0-.044-2.073c-1.327-1.344-2.668-2.672-4-4.009C-1053.71-676.439-1053.841-676.586-1054.088-676.847Z" transform="translate(1058.951 686.717)" fill="#42b54a" />
                </svg>
                <button>Tiếp tục xem sản phẩm</button>
                <div className={Change ? "inline" : "hidden"}>
                    <button className="border border-gray-300 rounded p-2 m-2 bg-primary text-white text-center"
                        onClick={() => setChange(false)}>Cập nhật đơn hàng</button>
                </div>
            </div>
        </div>
        <div id="haveNotItem">
            <h3>You have't any item in cart</h3>
        </div>
    </div >
} 