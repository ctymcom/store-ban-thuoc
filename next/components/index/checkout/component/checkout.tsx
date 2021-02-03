import { FormCheck } from './form-check';
import { listFormCheckTrans, listFormCheckPayment, listMoneyCheckout, transferInformation } from './form-check-data';
import { PayMoney } from '../../cart/component/pay-money';
import { CartPayHeader } from '../../cart/component/cart-pay-header';
import { FormatMoney } from '../../../shared/currency/money';
import { useRouter } from 'next/router';
import IconLocation from '../../../../lib/svg/icon-location';
import TransferInformation from './transfer-information';
import React, { useState } from 'react';
import { Checkbox } from '../../../shared/form/checkbox';

export function CheckOut() {
    const [isHide, setIsHide] = useState(false);
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
                <FormCheck title={listFormCheckTrans.tit} checkList={listFormCheckTrans.list} />
                <FormCheck title={listFormCheckPayment.tit} checkList={listFormCheckPayment.list} />
                <p className="text-sm">Giảm 3% cho đơn hàng chuyển khoản trước</p>
                <button className={isHide ? "hidden" : "text-primary"} onClick={() => setIsHide(true)}>Xem thông tin chuyển khoản</button>
                <TransferInformation info={transferInformation} isHide={isHide} setIsHide={setIsHide} />
                <h3 className="uppercase mt-10 text-lg">Ghi chú khác</h3>
                <p>Trường hợp không tìm được thuốc như mong muốn. Quý khách vui lòng điền yêu cầu vào bên dưới. Chúng tôi sẽ</p>
                <input type="" className="w-full border-2 border-gray-300 rounded-md pl-3 pt-2 pb-14 text-lg my-6" placeholder="Nhập ghi chú của bạn" />

                <div className="flex items-center w-1/3 justify-evenly">
                    <Checkbox />
                    <p>Tôi đồng ý với</p>
                    <button className="text-primary">Điều khoản sử dụng</button>
                </div>
                <button onClick={() => router.push('/complete')}
                    className="w-2/5 ml-10 border border-gray-300 rounded p-2 mt-2 bg-primary text-white">Xác nhận đặt hàng</button>
                <p className="text-xs p-2">(Xin vui lòng kiểm tra lại đơn hàng trước khi mua)</p>
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
                    <PayMoney listMoney={listMoneyCheckout} />
                </div>
                <div className="flex justify-between pt-2">
                    <p>Thành tiền</p>
                    <p className="font-bold text-primary"><FormatMoney money={totalMonney(listMoneyCheckout)} tS='.' /> VND</p>
                </div>
            </div>
        </div>

    </>
}