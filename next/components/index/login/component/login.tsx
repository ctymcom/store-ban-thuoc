import { useState } from 'react'
import { IconClose } from './../../../../lib/svg/icon-close';
import { Input } from './../../../shared/form/input';
import { IconKey } from './../../../../lib/svg/icon-key';
import { IconArrowDown } from './../../../../lib/svg/icon-arrow-down';
import { IconEye } from './../../../../lib/svg/icon-eye';


export function Login() {
    const [Show, setShow] = useState(false);
    return <>
        <div className="w-full h-screen bg-gray-200">
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-white w-4/12 shadow-xl p-4">
                    <div className="flex items-center justify-between py-2">
                        <h3 className='text-2xl text-gray-900'>Đăng Nhập</h3>
                        <i className='text-secondary-400 w-4 cursor-pointer' >
                            <IconClose />
                        </i>
                    </div>
                    <div className="py-4 space-y-3 flex flex-col">
                        <div className="relative">
                            <Input
                                inputType='text'
                                placeholder='Email/Số điện thoại/Tên đăng nhập'
                                onChanged={() => { }}
                                style='pr-16'
                            />
                            <div className="w-3 absolute top-1/4 right-12 text-gray-700">
                                <IconKey />
                            </div>
                            <div className="w-5 absolute top-1/3 right-4 text-gray-700">
                                <IconArrowDown />
                            </div>
                        </div>
                        <div className="relative">
                            <Input
                                inputType={!Show ? 'password' : 'text'}
                                placeholder='Mật khẩu'
                                onChanged={() => { }}
                                style='pr-16'
                            />
                            <div className="w-6 absolute top-1/3 right-6 text-gray-700 cursor-pointer"
                                onMouseDown={() => { setShow(true) }}
                                onMouseUp={() => { setShow(false) }}
                            >
                                <IconEye />
                            </div>
                        </div>
                    </div>
                    <div className="py-3 w-full">
                        <div className={"text-sm text-white text-center uppercase cursor-pointer py-4 bg-primary-500"}>
                            Đăng nhập
                        </div>
                        <div className="">
                            <p className="text-center text-sm py-4 cursor-pointer text-secondary-500">Quên mật khẩu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}