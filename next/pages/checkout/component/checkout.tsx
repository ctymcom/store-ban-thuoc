import { FormCheck } from './form-check';
import { listFormCheckTrans, listFormCheckOUT, listFormCheckPayment, listMoneyCheckout } from './form-check-data';
import { CartTotalMoney } from '../../../layouts/components/pay-money';
import { CartPayHeader } from './../../../layouts/components/cart-pay-header';
import { forEach } from 'lodash';


export function CheckOut() {
    const totalMonney = (listMoney) => {
        let total = 0;
        listMoney.forEach(item => {
            total += item.money;
        });
        return total;
    }
    return <>
        <CartPayHeader title="pay" />
        <div className="w-10/12 m-auto flex justify-between">
            <div>
                <FormCheck title={listFormCheckTrans.tit} checkList={listFormCheckTrans.listTrans} />
                <FormCheck title={listFormCheckOUT.tit} checkList={listFormCheckOUT.listTrans} />
                <FormCheck title={listFormCheckPayment.tit} checkList={listFormCheckPayment.listTrans} />
            </div>
            <div>
                <div className="mb-12">
                    <div className="flex justify-between items-center border-b-2 mt-4 pb-2">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.885" height="18.964" viewBox="0 0 13.885 18.964">
                                <path id="Path_10605" data-name="Path 10605" d="M237.554-1313.867c4.427,0,7.536,3.138,7.5,7a6.8,6.8,0,0,1-.624,2.5,28.929,28.929,0,0,1-3.043,5.39c-.851,1.238-1.754,2.44-2.648,3.647-.42.568-.821.566-1.246.016a45.757,45.757,0,0,1-5.258-8.087,10.965,10.965,0,0,1-.956-2.668,6.275,6.275,0,0,1,1.715-5.544A6.492,6.492,0,0,1,237.554-1313.867Zm.561,8.832a2.522,2.522,0,0,0,2.519-2.528,2.541,2.541,0,0,0-2.533-2.522,2.54,2.54,0,0,0-2.518,2.538A2.519,2.519,0,0,0,238.115-1305.035Z" transform="translate(-231.166 1313.867)" fill="#42b54a" />
                            </svg>
                            <h4 className="uppercase pl-2">Địa chỉ giao hàng</h4>
                        </div>
                        <button className="text-primary-500">Sửa</button>
                    </div>
                    <p className="text-primary-500">Minh Đức Vi</p>
                    <p>1111111111</p>
                    <p>43 Hoa Huệ, Phường 7, Quận Phú</p>
                </div>
                <div className="border-b-2 pb-2">
                    <CartTotalMoney listMoney={listMoneyCheckout} />
                </div>
                <div className="flex justify-between pt-2">
                    <p>Thành tiền</p>
                    <p className="font-bold text-primary-500">{totalMonney(listMoneyCheckout)} VND</p>
                </div>
            </div>
        </div>
    </>
}