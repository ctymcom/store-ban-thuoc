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
    const getCheckPayment = (status:boolean) => {
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
        <div className="main-container leading-relaxed">
            <div>
                <CartPayHeader name="checkout"/>
            </div>
            <div className="lg:flex justify-between gap-4 md:gap-16">
                <div className="w-full lg:w-3/4 grid grid-cols-5 gap-4">
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
                    <div className="col-span-5 text-20">
                        <h4 className="uppercase text-24 mb-3">Ghi chú khác</h4>
                        <p>Trường hợp không tìm được thuốc như mong muốn. Quý khách vui lòng điền yêu cầu vào bên dưới. Chúng tôi sẽ</p>
                        <textarea className="w-full border-2 border-gray-300 rounded-md p-3 mt-6 outline-none" placeholder="Nhập ghi chú của bạn"></textarea>
                    </div>
                </div>
                <div className="w-full lg:w-1/4">
                    <div className="w-full md:flex lg:inline-block md:gap-5 mb-10">
                            <div className="w-full md:w-1/2 lg:w-full mb-10">
                                <div className="flex justify-between items-center border-b-4">
                                    <div className="flex justify-between items-center gap-1 pb-2">
                                        <i className="text-primary text-16 col-span-1"><IoLocationSharp /></i>
                                        <h4 className="uppercase text-24 col-span-8">Địa chỉ giao hàng</h4>
                                    </div>
                                    <a className="text-primary text-20 btn col-span-3" onClick={() => setShowDialog(true)}>Đổi</a>
                                </div>
                                <div className="my-2 text-20">
                                    <p className="text-24 font-bold">Minh Đức Uy</p>
                                    <p>0914357862</p>
                                    <p>43 Hoa Huệ, Phường 7, Quận Phú</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full">
                                <div className="border-b-4 pb-2">
                                    <PayMoney listMoney={listMoneyCheckout} />
                                </div>
                                <div className="flex justify-between pt-2 text-20">
                                    <p>Thành tiền</p>
                                    <p className="font-bold text-primary">{NumberPipe(totalMonney(listMoneyCheckout), false)} VND</p>
                                </div>
                            </div>
                    </div>
                    <div className="w-full">
                    <div className="flex items-center gap-1 text-20" >
                        <div>
                            <CustomCheckbox isCheck={isCheck} setIsCheck={setIsCheck} />
                        </div>
                        <p>Tôi đồng ý với</p>
                        <p className="text-primary cursor-pointer">Điều khoản sử dụng</p>
                        </div>
                        <Link href='/complete'>
                        <a  className="w-full btn-primary text-20 py-6 my-2">Đặt mua</a>
                        </Link>
                        <p className="p-2 text-center text-16">(Xin vui lòng kiểm tra lại đơn hàng trước Đặt mua)</p>
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