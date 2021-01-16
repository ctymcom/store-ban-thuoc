import { Checkbox } from "../../../../../components/shared/form/checkbox";
import { SelectBox } from "../../../../../components/shared/form/select-box";
import { IconPlus } from "../../../../../lib/svg";

export function AccountDecentralization(props) {
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <div className="session-1 pt-4">
                        <div className="select-decentralization">
                            <div className="input-decentralization">
                                <div className="py-1">
                                    <p className='uppercase font-bold text-xs'>Chọn phân quyền</p>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="input">
                                        <SelectBox
                                            options={['Giám đốc CEO', 'Giám đốc CTO']}
                                            style='py-3'
                                        />
                                    </div>
                                    <div className='flex'>
                                        <div className="flex  space-x-2 text-sm rounded py-3 px-4 bg-primary-500 mb-3 cursor-pointer text-white">
                                            <p> Thêm phân quyền </p>
                                            <i className='w-4'>
                                                <IconPlus />
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="session-2 py-4">
                        <div className="feature-decentralization">
                            <div className="feature-decentralization">
                                <div className="py-1">
                                    <p className='uppercase font-bold text-xs'>Tính năng phân quyền</p>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="input">
                                        <Checkbox
                                            label='Bảng điều khiển' />
                                    </div>
                                    <div className='flex'>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}