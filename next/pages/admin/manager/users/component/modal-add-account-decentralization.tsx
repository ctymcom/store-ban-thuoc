import react, { useState } from 'react';

import { Input } from '../../../../../components/shared/form/input';
import { SelectBox } from '../../../../../components/shared/form/select-box';
import { IconClose } from '../../../../../lib/svg';

export function ModalAddAccountDecentralization(props) {
    const [Change, setChange] = useState(false);
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
                        <Input
                            inputType='text'
                            placeholder='Nhập tên phân quyền'
                            label="Tên phân quyền"
                            onChanged={() => { setChange(true) }}
                        />
                        <SelectBox
                            label="Phân quyền thuộc"
                            options={['Giám đốc CEO', 'Giám đốc CTO']}
                            onChanged={() => { setChange(true) }}
                            tooltip="Nhập tên phân quyền"
                        />
                    </div>
                    <div className="pb-3 w-full">
                        <div className={"text-xs text-center uppercase cursor-pointer py-3 bg-gray-200 " + (Change && "bg-primary-500 text-white")}>
                            Xác nhận
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}