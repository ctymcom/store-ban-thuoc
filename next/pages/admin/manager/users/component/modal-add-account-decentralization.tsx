import react, { useState } from 'react';
import { Input } from '../../../../../components/shared/form/input';
import { SelectBox } from '../../../../../components/shared/form/select-box';
import { IconClose, IconInfor } from '../../../../../lib/svg';
export function ModalAddAccountDecentralization(props) {
    return <>
        <div className={"fixed top-0 left-0 z-50 w-full h-full bg-gray-200 bg-opacity-80 "}>
            <div className="w-2/4">
                <div className="absolute top-1/4 left-1/3 bg-white p-7 w-4/12">
                    <div className="flex items-center justify-between py-2">
                        <h3 className='text-2xl text-gray-900'>Thêm phân quyền</h3>
                        <i className='text-secondary-400 w-4 cursor-pointer' onClick={() => { props.openModal(false) }}>
                            <IconClose />
                        </i>
                    </div>
                    <div className="py-3">
                        <div className="input-username">
                            <div className="py-1">
                                <p className='uppercase font-bold text-xs'>Tên phân quyền</p>
                            </div>
                            <div className="input">
                                <Input
                                    inputType='text'
                                    placeholder='Nhập tên phân quyền'
                                    style={' py-3 '}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pb-2">
                        <div className="input-username">
                            <div className="py-1 flex">
                                <p className='uppercase font-bold text-xs'>Phân quyền thuộc</p>
                                <div className="ml-2 w-5">
                                    <i className='text-gray-400'>
                                        <IconInfor />
                                    </i>
                                </div>
                            </div>
                            <div className="input">
                                <SelectBox
                                    options={['Giám đốc CEO', 'Giám đốc CTO']}
                                    style=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pb-3 w-full">
                        <div className="text-xs text-center uppercase cursor-pointer py-3 bg-gray-200">
                            Xác nhận
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}