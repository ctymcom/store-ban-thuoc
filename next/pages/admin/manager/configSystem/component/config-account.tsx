import { Input } from "../../../../../components/shared/form/input";
import { RadioButton } from "../../../../../components/shared/form/radio-button";
import { SelectBox } from "../../../../../components/shared/form/select-box";
import { IconInfor, IconUpload } from "../../../../../lib/svg";

export function ConfigAccount() {
    return <>
        <div className="w-full pt-4">
            <div className="pb-12 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-base text-gray-400'>Mã tài khoản hội viên</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="input-id">
                            <RadioButton label={'Mã hội viên do hệ thống tự tạo'} name={'12334'} id={'111222'} />
                        </div>
                        <div className="input-username">
                            <RadioButton label={'Mã hội viên do hệ thống tự tạo'} name={'12334'} id={'212'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-base text-gray-400'>Tài khoản trẻ em</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="input-id">
                            <div className="py-1 flex">
                                <p className='uppercase font-bold text-sm'>Nhập số tuổi trẻ em</p>
                                <div className="group pt-1 ml-2 w-5 tooltip" >
                                    <i className='text-gray-400'>
                                        <IconInfor />
                                    </i>
                                    <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                        Nhập số tuổi trẻ em
                                    </div>
                                </div>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='text'
                                    placeholder='Nhập số tuổi'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-base text-gray-400'>Tài khoản không hoạt động</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="input-id">
                            <div className="py-1 flex">
                                <p className='uppercase font-bold text-sm'>Thời gian không hoạt động</p>
                                <div className="group pt-1 ml-2 w-5 tooltip" >
                                    <i className='text-gray-400'>
                                        <IconInfor />
                                    </i>
                                    <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                        Thời gian không hoạt động
                                    </div>
                                </div>
                            </div>
                            <div className="input ">
                                <div className="border rounded-md flex justify-between">
                                    <input type='text' className='w-full py-4 px-4 text-sm focus:outline-none  rounded-md' placeholder='Nhập thời gian' />
                                    <select className='text-sm text-gray-400 w-24  rounded-md'>
                                        <option>Ngày</option>
                                        <option>Tháng</option>
                                        <option>Năm</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 py-5">
                        <div className="input-id">
                            <div className="py-1 flex">
                                <p className='uppercase font-bold text-sm'>Loại giao dịch</p>
                                <div className="group pt-1 ml-2 w-5 tooltip" >
                                    <i className='text-gray-400'>
                                        <IconInfor />
                                    </i>
                                    <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                        Loại giao dịch
                                    </div>
                                </div>
                            </div>
                            <div className="input ">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="input-id">
                                        <RadioButton label={'Giao dịch thương mại'} name={'12334'} id={'1111222'} />
                                    </div>
                                    <div className="input-username">
                                        <RadioButton label={'Giao dịch loyalty'} name={'12334'} id={'2112'} />
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