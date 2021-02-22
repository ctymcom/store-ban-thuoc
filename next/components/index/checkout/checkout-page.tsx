import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiMap } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';

import { NumberPipe } from '../../../lib/pipes/number';
import { Dialog } from '../../shared/utilities/dialog/dialog';
import AddressPage from '../address/address-page';
import { CartPayHeader } from '../cart/component/cart-pay-header';
import { PayMoney } from '../cart/component/pay-money';
import CustomCheckbox from './component/custom-checkbox';
import { FormCheck } from './component/form-check';
import {
    listFormCheckPayment,
    listFormCheckTrans,
    listMoneyCheckout,
    transferInformation,
} from './component/form-check-data';
import TransferInformation from './component/transfer-information';

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

    const [showDialog, setShowDialog] = useState(false);

    return <>
        <div className="main-container">
            <div>
                <CartPayHeader name="checkout"/>
            </div>
            <div className="">
                <div className="col-span-3 grid grid-cols-7 gap-4 lg:gap-16">
                    <div className="col-span-7 lg:col-span-5 grid grid-cols-5 gap-4">
                        <div className="col-span-5">
                            <FormCheck title={listFormCheckTrans.tit} checkList={listFormCheckTrans.list} getCheckPayment={getCheckPayment} />
                            <FormCheck title={listFormCheckPayment.tit} checkList={listFormCheckPayment.list} getCheckPayment={getCheckPayment} />
                        </div>
                        <div className="col-span-5">
                            <p className="text-sm col-span-2">Giảm 3% cho đơn hàng chuyển khoản trước</p>
                                {
                                    isHide ? <TransferInformation info={transferInformation} /> : <></>
                                }
                        </div>
                    </div>
                    <div className="col-span-7 lg:col-span-2 grid grid-cols-2 gap-4 lg:grid-cols-none">
                            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                                <div className="flex justify-between items-center border-b-2">
                                    <div className="flex justify-between items-center gap-1">
                                        <i className="text-primary text-16 col-span-1"><IoLocationSharp /></i>
                                        <h4 className="uppercase col-span-8">Địa chỉ giao hàng</h4>
                                    </div>
                                    
                                    <a className="text-primary font-normal btn col-span-3" onClick={() => setShowDialog(true)}>Đổi</a>
                                    
                                </div>
                                <div className="my-2">
                                    <p className="text-18 font-bold">Minh Đức Uy</p>
                                    <p>0914357862</p>
                                    <p>43 Hoa Huệ, Phường 7, Quận Phú</p>
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                                <div className="border-b-2 pb-2">
                                    <PayMoney listMoney={listMoneyCheckout} />
                                </div>
                                <div className="flex justify-between pt-2">
                                    <p>Thành tiền</p>
                                    <p className="font-bold text-primary">{NumberPipe(totalMonney(listMoneyCheckout), false)} VND</p>
                                </div>
                            </div>
                    </div>
                    <div className="col-span-7 lg:col-span-5">
                            <h3 className="uppercase my-5 text-lg">Ghi chú khác</h3>
                            <p>Trường hợp không tìm được thuốc như mong muốn. Quý khách vui lòng điền yêu cầu vào bên dưới. Chúng tôi sẽ</p>
                            <input type="" className="w-full border-2 border-gray-300 rounded-md pl-3 pt-2 pb-14 text-lg mt-6" placeholder="Nhập ghi chú của bạn" />
                        </div>
                    <div className="col-span-7 lg:col-span-5 grid grid-col-4 gap-4">
                        <div className="flex items-center gap-1 col-span-4" >
                            <div>
                                <CustomCheckbox isCheck={isCheck} setIsCheck={setIsCheck} />
                            </div>
                            <p>Tôi đồng ý với</p>
                            <p className="text-primary cursor-pointer">Điều khoản sử dụng</p>
                        </div>
                        <Link href='/complete'>
                           <a  className="col-span-4 lg:col-span-1 btn-primary">Đặt mua</a>
                           </Link>
                        <p className="text-xs p-2 col-span-4 text-center lg:text-left">(Xin vui lòng kiểm tra lại đơn hàng trước Đặt mua)</p>
                    </div>
                </div>
            </div>
            <Dialog width="550px" isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                title="Địa chỉ giao hàng"
                icon={<BiMap/>}>
                <Dialog.Body>
                    <AddressPage/>
                </Dialog.Body>
                
            </Dialog>
        </div >
    </>
}