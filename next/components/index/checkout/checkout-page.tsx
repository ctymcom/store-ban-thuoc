import { FormCheck } from './component/form-check';
import { listFormCheckTrans, listFormCheckPayment, listMoneyCheckout, transferInformation } from './component/form-check-data';
import { PayMoney } from '../cart/component/pay-money';
import { CartPayHeader } from '../cart/component/cart-pay-header';
import { useRouter } from 'next/router';
import { IoLocationSharp } from 'react-icons/io5'
import TransferInformation from './component/transfer-information';
import { useState } from 'react';
import IconCheck from '../../../lib/svg/icon-check';
import { NumberPipe } from '../../../lib/pipes/number';

export function CheckOutPage() {
    const [isHide, setIsHide] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const getCheckPayment = (status) => {
        setIsHide(status)
    }
    const totalMonney = (listMoney) => {
        let total = 0;
        listMoney.forEach(item => {
            total += item.money;
        });
        return total;
    }
    const router = useRouter()
    return <>
        <div className="main-container">
            <div>
                <CartPayHeader title="pay" />
            </div>
            <div className="">
                <div className="col-span-3 grid grid-cols-7 gap-20">
                    <div className="col-span-5 grid grid-cols-5 gap-4">
                        <div className="col-span-5">
                            <FormCheck title={listFormCheckTrans.tit} checkList={listFormCheckTrans.list} getCheckPayment={getCheckPayment} />
                            <FormCheck title={listFormCheckPayment.tit} checkList={listFormCheckPayment.list} getCheckPayment={getCheckPayment} />
                        </div>
                        <div className="col-span-5">
                            <p className="text-sm col-span-2">Giảm 3% cho đơn hàng chuyển khoản trước</p>
                            <div>
                                {
                                    isHide ? <TransferInformation info={transferInformation} /> : <div></div>
                                }
                            </div>
                        </div>
                        <div className="col-span-5">
                            <h3 className="uppercase my-5 text-lg">Ghi chú khác</h3>
                            <p>Trường hợp không tìm được thuốc như mong muốn. Quý khách vui lòng điền yêu cầu vào bên dưới. Chúng tôi sẽ</p>
                            <input type="" className="w-full border-2 border-gray-300 rounded-md pl-3 pt-2 pb-14 text-lg my-6" placeholder="Nhập ghi chú của bạn" />
                        </div>
                        <div className="col-span-5">
                            <div className="relative w-4 h-4">
                            </div>
                            <p>Tôi đồng ý với</p>
                            <button className="text-primary">Điều khoản sử dụng</button>
                        </div>
                        <button onClick={() => router.push('/complete')}
                            className="col-span-2 btn mt-2 btn-primary">Xác nhận đặt hàng</button>
                        <p className="text-xs p-2 col-span-5">(Xin vui lòng kiểm tra lại đơn hàng trước khi mua)</p>
                    </div>
                    <div className="col-span-2">
                        <div className="mb-10">
                            <div className="grid grid-cols-12 gap-4 border-b-2 items-center">
                                <i className="text-primary text-16 col-span-1"><IoLocationSharp /></i>
                                <h4 className="uppercase col-span-8">Địa chỉ giao hàng</h4>
                                <button className="text-primary font-normal text-left btn col-span-3">Đổi</button>
                            </div>
                            <div className="my-2">
                                <p className="text-18 font-bold">Minh Đức Uy</p>
                                <p>0914357862</p>
                                <p>43 Hoa Huệ, Phường 7, Quận Phú</p>
                            </div>
                        </div>
                        <div className="border-b-2 pb-2">
                            <PayMoney listMoney={listMoneyCheckout} />
                        </div>
                        <div className="flex justify-between pt-2">
                            <p>Thành tiền</p>
                            <p className="font-bold text-primary">{NumberPipe(totalMonney(listMoneyCheckout), false)} VND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}