import { useState } from 'react'
import { Button } from "../../../../../components/shared/form/button";
import { Input } from "../../../../../components/shared/form/input";
import { IconInfor } from '../../../../../lib/svg';

export function HeaderAntiFraud(props) {
    const [View, setView] = useState(0);
    const handleView = (e) => {
        setView(e)
        props.handleView(e)
    }
    return <>
        <div className="py-4">
            <div className="flex justify-between items-center ">
                <div className="w-5/6">
                    <div className="container-title">
                        <div className="title inline-block">
                            <p className='text-xs text-gray-400'>Chống gian lận</p>
                            <div className="flex items-center">
                                <p className='uppercase font-bold text-sm'>Danh sách tài khoản gian lận</p>
                                <div className="pt-3">
                                    <div className="group ml-2 w-5 tooltip" >
                                        <i className='text-gray-400'>
                                            <IconInfor />
                                        </i>
                                        <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                            Danh sách tài khoản gian lận
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="search">
                        <div className="input-search max-w-md py-1 h-full">
                            <div className="absolute h-10 w-10 block pt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 20.042 20">
                                    <path id="Path_10931" data-name="Path 10931" d="M1609.89,662.325c.893.87,1.772,1.727,2.65,2.585.621.607,1.238,1.218,1.859,1.824.55.536,1.169.6,1.6.16.455-.457.395-1.038-.171-1.593-1.5-1.469-3-2.936-4.515-4.425a8.454,8.454,0,0,0,1.438-7.51,8.374,8.374,0,0,0-14.468-3.188,8.485,8.485,0,0,0,.26,11.291A8.246,8.246,0,0,0,1609.89,662.325Zm-5.347-.156a6.491,6.491,0,1,1,6.5-6.425A6.473,6.473,0,0,1,1604.543,662.169Z" transform="translate(-1596.261 -647.183)" fill="#9b9b9b" />
                                </svg>
                            </div>
                            <Input
                                inputType='text'
                                placeholder='Tìm kiếm'
                                icon='icons'
                            />
                        </div>
                    </div>
                </div>
                <div className="btn-create-user flex justify-center max-h-12">
                    <div className="py-4 px-5 bg-primary-600 text-xs text-white rounded-md cursor-pointer">
                        Tạo nguyên tắc
                        </div>
                </div>
            </div>

        </div>

    </>
}