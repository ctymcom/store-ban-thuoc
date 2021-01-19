import { useState } from 'react'
import { Input } from "../../../../../components/shared/form/input";
import { SelectBox } from "../../../../../components/shared/form/select-box";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IconPickerDate } from '../../../../../lib/svg';

export function InformationCompany() {
    const [fetch, setfetch] = useState(new Date(2018, 6, 22));
    return <>
        <div className="w-full pt-8">
            <div className="pb-8 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-sm text-gray-400'>Thông tin bắt buộc</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="input-id">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Tên doanh nghiệp</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='text'
                                    placeholder='Công ty cổ phần giải pháp phần mềm MCOM'
                                />
                            </div>
                        </div>
                        <div className="input-username">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Tên hiển thị</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='text'
                                    placeholder='Công ty MCOM'
                                />
                            </div>
                        </div>
                        <div className="input-firstname">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Email</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='email'
                                    placeholder='admin@gmail.com'
                                />
                            </div>
                        </div>
                        <div className="input-lastname">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Số điện thoại</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='number'
                                    placeholder='032 77 33 883'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full pt-8">
            <div className="pb-8 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-sm text-gray-400'>Thông tin cơ bản</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="input-id">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Website</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='text'
                                    value='mcom.app'
                                />
                            </div>
                        </div>
                        <div className="input-username">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Ngày thành lập</p>
                            </div>
                            <div className="input">
                                <div className="flex justify-between border-solid  w-full h-full bg-white border-gray-300 border p-4 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-secondary-500 focus:border-secondary-400">
                                    <DatePicker selected={fetch} onChange={(e) => { setfetch(e) }} />
                                    <div className="w-4">
                                        <IconPickerDate />
                                    </div>
                                </div>
                                {/* <Input
                                    inputType='text'
                                    value='mcom.app'
                                /> */}
                            </div>
                        </div>
                        <div className="input-lastname">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Tỉnh/Thành</p>
                            </div>
                            <div className="input">
                                <SelectBox
                                    options={['TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ', 'TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ', 'TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ', 'TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ', 'TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ','TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ',]}
                                    style=' '
                                />
                            </div>
                        </div>
                        <div className="input-lastname">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Quận/Huyện</p>
                            </div>
                            <div className="input">
                                <SelectBox
                                    options={['Quận Tân Bình', 'Quận Bình Tân', 'Huyện Củ Chi']}
                                    style=' '
                                />
                            </div>
                        </div>
                        <div className="input-lastname">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Phường/Xã</p>
                            </div>
                            <div className="input">
                                <SelectBox
                                    options={['Phường 1', 'Phường 7', 'Phường 10']}
                                    style=' '
                                />
                            </div>
                        </div>
                        <div className="input-username">
                            <div className="py-1">
                                <p className='uppercase font-bold text-sm'>Địa chỉ</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='text'
                                    value='727 Nguyễn Thị Thập'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}