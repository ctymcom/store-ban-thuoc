import { Input } from "../../../../../components/shared/form/input";
import { RadioButton } from "../../../../../components/shared/form/radio-button";
import { IconInfor } from "../../../../../lib/svg";

export function CreateRule() {
    return <>
        <div className="wrapper">
            <div className="container">
                <div className="border-b-2 pb-4">
                    <h3 className="text-lg">Tạo nguyên tắc</h3>
                    <p className="text-xs text-gray-400">Dữ liệu tổng quan</p>
                </div>
                <div className="py-4 border-b-2">
                    <div className="container">
                        <div className="title">
                            <p className=" text-gray-400">Thông tin bắt buộc</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="input-name py-2">
                                <div className="py-1 flex">
                                    <p className='uppercase font-bold text-sm'>Tên quy tắc</p>
                                    <div className="group pt-1 ml-2 w-5 tooltip" >
                                        <i className='text-gray-400'>
                                            <IconInfor />
                                        </i>
                                        <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                            Tên quy tắc
                                    </div>
                                    </div>
                                </div>
                                <div className="input">
                                    <Input
                                        inputType='text'
                                        placeholder='Vui lòng Đặt tên cho quy tắc'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="input-name py-2">
                                <div className="py-1 flex">
                                    <p className='uppercase font-bold text-sm'>Giao dịch</p>
                                    <div className="group pt-1 ml-2 w-5 tooltip" >
                                        <i className='text-gray-400'>
                                            <IconInfor />
                                        </i>
                                        <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                            Giao dịch
                                    </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 pb-4">
                                    <div className="input-id">
                                        <RadioButton label={'Tất cả giao dịch'} name={'12334'} id={'111222'} />
                                    </div>
                                    <div className="input-username">
                                        <RadioButton label={'Tất cả giao dịch thương mại'} name={'12334'} id={'2122'} />
                                    </div>
                                    <div className="input-username">
                                        <RadioButton label={'Tất cả giao dịch loyalty'} name={'12334'} id={'212'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="py-8 border-b-2">
                    <div className="container">
                        <div className="title">
                            <p className=" text-gray-400">Điều kiện của nguyên tắc</p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="input-name py-2">
                                <div className="py-1 flex">
                                    <p className='uppercase font-bold text-sm'>Tần suất giao dịch bất thường</p>
                                    <div className="group pt-1 ml-2 w-5 tooltip" >
                                        <i className='text-gray-400'>
                                            <IconInfor />
                                        </i>
                                        <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                            Tần suất giao dịch bất thường
                                    </div>
                                    </div>
                                </div>
                                <div className="input">
                                    <div className="border rounded-md flex justify-between">
                                        <input type='text' className='w-full py-4 px-4 text-sm focus:outline-none  rounded-md' placeholder='Nhập số lần giao dịch' />
                                        <select className='text-sm text-gray-400 w-24  rounded-md'>
                                            <option>Ngày</option>
                                            <option>Tháng</option>
                                            <option>Năm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-name py-2">
                                <div className="py-1 flex">
                                    <p className='uppercase font-bold text-sm'>Số giao dịch nghi vấn</p>
                                    <div className="group pt-1 ml-2 w-5 tooltip" >
                                        <i className='text-gray-400'>
                                            <IconInfor />
                                        </i>
                                        <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                            Số giao dịch nghi vấn
                                    </div>
                                    </div>
                                </div>
                                <div className="input">
                                    <div className="border rounded-md flex justify-between focus:border-primary-500">
                                        <input type='text' className='w-full py-4 px-4 text-sm focus:outline-none  rounded-md' placeholder='Nhập Số lần giao dịch nghi vấn' />
                                        <select className='text-sm text-gray-400 w-24  rounded-md'>
                                            <option>Toàn bộ</option>
                                            <option>Tháng</option>
                                            <option>Năm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}