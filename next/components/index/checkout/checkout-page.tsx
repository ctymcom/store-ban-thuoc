import Link from 'next/link';
import { useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';

import { NumberPipe } from '../../../lib/pipes/number';
import { LayoutCart } from '../cart/components/layout-cart';
import { PayMoney } from '../cart/components/pay-money';
import { FormCheck } from './components/form-check';
import {
    listFormCheckPayment,
    listFormCheckTrans,
    listMoneyCheckout,
    transferInformation,
} from './components/form-check-data';
import TransferInformation from './components/transfer-information';
import CheckBoxSquare from './components/check-box-square';
import AddressDialog from './components/address-dialog';
import { useAddressContext } from './providers/address-provider';
import { Spinner } from '../../shared/utilities/spinner';

export function CheckOutPage() {
    const [isHide, setIsHide] = useState(false);
    const [isCheck, setIsCheck] = useState(true);
    const {addressSelected, showDialogAddress, setShowDialogAddress} = useAddressContext();
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
    const setStyleBtn=()=>{
        let style="w-full text-16 md:text-20 py-6 my-2"
        return isCheck? style+" btn-primary": style+" btn-disabled";
    }

    return  <div className="lg:flex justify-between gap-4 md:gap-8 xl:gap-16">
                <div className="w-full lg:w-2/3 xl:w-3/4 gap-4">
                    <div className="w-full">
                        <div>
                            <FormCheck title={listFormCheckTrans.tit} checkList={listFormCheckTrans.list} getCheckPayment={getCheckPayment} />
                        </div>
                        <div className="mt-6">
                            <FormCheck title={listFormCheckPayment.tit} checkList={listFormCheckPayment.list} getCheckPayment={getCheckPayment} />
                        </div>
                        <div className="w-full">
                            <p className="text-sm text-left py-2">Giảm 3% cho đơn hàng chuyển khoản trước</p>
                            {
                                isHide ? <TransferInformation info={transferInformation} /> : <></>
                            }
                        </div>
                    </div>
                    <div className="w-full text-16 md:text-20 my-5">
                        <h4 className="uppercase text-20 md:text-24">Ghi chú khác</h4>
                        <p>Trường hợp không tìm được thuốc như mong muốn. Quý khách vui lòng điền yêu cầu vào bên dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.</p>
                        <textarea className="w-full border-2 border-gray-300 rounded-md p-3 outline-none" placeholder="Nhập ghi chú của bạn"></textarea>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 xl:w-1/4">
                    <div className="w-full md:flex lg:inline-block md:gap-5 mb-10">
                            <div className="w-full md:w-1/2 lg:w-full mb-10">
                                <div className="flex justify-between items-center border-b-4">
                                    <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                                        <i className="text-primary text-16 md:text-20"><IoLocationSharp /></i>
                                        <h4 className="uppercase text-20 md:text-24">Địa chỉ giao hàng</h4>
                                    </div>
                                    <a className="text-primary text-16 md:text-20 cursor-pointer" onClick={() => setShowDialogAddress(true)}>Đổi</a>
                                </div>
                                <div className="my-2 text-16 md:text-20">
                                    {
                                        addressSelected?<>
                                            <p className="text-20 md:text-24 font-bold">{addressSelected.contactName}</p>
                                            <p>{addressSelected.fullAddress}</p>
                                            <p>{addressSelected.phone}</p>
                                        </>:<Spinner/>
                                    }
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full">
                                <div className="border-b-4 pb-2">
                                    <PayMoney listMoney={listMoneyCheckout} />
                                </div>
                                <div className="flex justify-between pt-2 text-16 md:text-20">
                                    <p>Thành tiền</p>
                                    <p className="font-bold text-primary">{NumberPipe(totalMonney(listMoneyCheckout), false)} VND</p>
                                </div>
                            </div>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center gap-1 text-16 md:text-20 whitespace-nowrap" >
                            <div className="flex items-center gap-1 cursor-pointer" onClick={()=>{setIsCheck(!isCheck)}}>
                                <CheckBoxSquare checked={isCheck} />
                                <p>Tôi đồng ý với</p>
                            </div>
                            <p className="text-primary cursor-pointer">Điều khoản sử dụng</p>
                        </div>
                            <Link href="/complete" ><button className={setStyleBtn()} disabled={!isCheck}>Đặt mua</button></Link>
                        <p className="whitespace-nowrap text-center text-12 md:text-16">(Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt mua)</p>
                    </div>
                </div>
                <AddressDialog isOpen={showDialogAddress} setShowDialog={setShowDialogAddress}/>
        </div> 
}