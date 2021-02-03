import { FormCheck } from './form-check';
import { listFormCheckTrans, listFormCheckOUT, listFormCheckPayment, listMoneyCheckout } from './form-check-data';
import { CartTotalMoney } from '../../../../layouts/components/pay-money';
import { CartPayHeader } from '../../../../layouts/components/cart-pay-header';
import { FormatMoney } from '../../../shared/currency/money';
import { useRouter } from 'next/router';
import IconLocation from '../../../../lib/svg/icon-location';

export function CheckOut() {
    const totalMonney = (listMoney) => {
        let total = 0;
        listMoney.forEach(item => {
            total += item.money;
        });
        return total;
    }
    const router = useRouter()
    return <>
        <CartPayHeader title="pay" />
        <div className="w-10/12 m-auto flex justify-between">
            <div className="w-3/4">
                <FormCheck title={listFormCheckTrans.tit} checkList={listFormCheckTrans.listTrans} />
                <FormCheck title={listFormCheckOUT.tit} checkList={listFormCheckOUT.listTrans} />
                <FormCheck title={listFormCheckPayment.tit} checkList={listFormCheckPayment.listTrans} />
            </div>
            <div className="w-1/4 ml-10">
                <div className="mb-12">
                    <div className="flex justify-between items-center border-b-2 mt-4 pb-2">
                        <div className="flex items-center">
                            <IconLocation />
                            <h4 className="uppercase pl-2">Địa chỉ giao hàng</h4>
                        </div>
                        <button className="text-primary">Sửa</button>
                    </div>
                    <p className="text-primary">Minh Đức Vi</p>
                    <p>1111111111</p>
                    <p>43 Hoa Huệ, Phường 7, Quận Phú</p>
                </div>
                <div className="border-b-2 pb-2">
                    <CartTotalMoney listMoney={listMoneyCheckout} />
                </div>
                <div className="flex justify-between pt-2">
                    <p>Thành tiền</p>
                    <p className="font-bold text-primary"><FormatMoney money={totalMonney(listMoneyCheckout)} tS='.' /> VND</p>
                </div>
            </div>
        </div>
        <div className="w-10/12 m-auto flex justify-between">
            <div></div>
            <button onClick={() => router.push('/complete')}
                className="w-1/4 ml-10 border border-gray-300 rounded p-2 mt-2 bg-primary text-white">Xác nhận đặt hàng</button>
        </div>
        <div className="w-10/12 m-auto flex justify-between">
            <div></div>
            <div>
                <p className="text-xs p-2">(Xin vui lòng kiểm tra lại đơn hàng trước khi mua)</p>
            </div>
        </div>
    </>
}