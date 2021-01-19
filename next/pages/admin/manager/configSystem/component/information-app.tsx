import { Input } from "../../../../../components/shared/form/input";
import { SelectBox } from "../../../../../components/shared/form/select-box";
import { IconInfor, IconUpload } from "../../../../../lib/svg";

export function InformationApp() {
    return <>
        <div className="w-full pt-8">
            <div className="pb-8 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-sm text-gray-400'>Thông tin cơ bản</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Input
                            inputType='text'
                            placeholder='Công ty cổ phần giải pháp phần mềm MCOM'
                            label='Tên chương trình'
                        />
                        <Input
                            inputType='text'
                            placeholder='Công ty MCOM'
                            label='Tên rút gọn'
                        />
                        <Input
                            inputType='text'
                            placeholder='MCOM Company'
                            label='Tên tiếng anh'
                        />
                        <Input
                            inputType='text'
                            placeholder='MCOM Company'
                            label='Tên hiển thị'
                        />
                        <SelectBox
                            options={['Vnđ', 'Usd', 'Eur']}
                            style=' uppercase '
                            label='Tiền tệ'
                        />
                    </div>
                </div>
            </div>
            <div className="py-8 border-b border-gray-300">
                <div className="container">
                    <div className="py-2">
                        <p className='text-sm text-gray-400'>Hình ảnh</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="input-username">
                            <div className="py-1 flex space-x-1">
                                <p className='uppercase font-bold text-sm'>Logo thương hiệu</p>
                                <div className="w-4  flex justify-center">
                                    <i className='w-4 text-gray-400'>
                                        <IconInfor />
                                    </i>
                                </div>
                            </div>
                            <div className=''>
                                <div className="bg-primary-100 max-w-xs border-2 rounded-lg">
                                    <div className="flex flex-col justify-items-center pb-3">
                                        <div className="max-w-xs max-h-28 pt-4 flex justify-center">
                                            <i className="text-secondary-500">
                                                <IconUpload />
                                            </i>
                                        </div>
                                        <p className='text-center pb-4'>Upload ảnh từ máy tính</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-1 flex space-x-1">
                                <p className='uppercase font-bold text-sm'>Logo chương trình</p>
                                <div className="w-4  flex justify-center">
                                    <i className='w-4 text-gray-400'>
                                        <IconInfor />
                                    </i>
                                </div>
                            </div>
                            <div className=''>
                                <div className="bg-primary-100 max-w-xs border-2 rounded-lg">
                                    <div className="flex flex-col justify-items-center pb-3">
                                        <div className="max-w-xs max-h-28 pt-4 flex justify-center">
                                            <i className="text-secondary-500">
                                                <IconUpload />
                                            </i>
                                        </div>
                                        <p className='text-center pb-4'>Upload ảnh từ máy tính</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-5 pt-5">
                        <div className="input-username">
                            <div className="py-1 flex space-x-1">
                                <p className='uppercase font-bold text-sm'>Hình nền</p>
                                <div className="w-4  flex justify-center">
                                    <i className='w-4 text-gray-400'>
                                        <IconInfor />
                                    </i>
                                </div>
                            </div>
                            <div className=''>
                                <div className="bg-primary-100 max-w-lg border-2 rounded-lg flex justify-center">
                                    <div className="flex flex-col justify-items-center pb-3">
                                        <div className="max-w-xs max-h-28 pt-4 flex justify-center">
                                            <i className="text-secondary-500">
                                                <IconUpload />
                                            </i>
                                        </div>
                                        <p className='text-center pb-4'>Upload ảnh từ máy tính</p>
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