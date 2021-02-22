import { Checkbox } from '../../../shared/form/checkbox';
import { HiChevronDown } from 'react-icons/hi';
export function FormProfile() {
    return <>
        <h3 className="uppercase border-gray-200 border-b-2 pb-2 text-center lg:text-left">Thông tin tài khoản</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 pt-2 md:pt-8 lg:pt-4">
            <div className="col-span-2 grid grid-cols-none md:grid-cols-4 gap-0 md:gap-2 pr-0 md:pr-16 md:border-r border-gray-200 items-center">
                <p className="col-span-1 whitespace-nowrap text-sm md:text-base my-2 md:my-0">Họ và tên</p>
                <input className="input-profile w-full md:w-11/12 text-sm md:text-base my-2 md:my-0" type="text" value="Nguyễn Văn A" />
                <p className="col-span-1 whitespace-nowrap text-sm md:text-base mr-2.5 md:mr-0 my-2 md:my-0">Số điện thoại</p>
                <input className="input-profile w-full md:w-11/12 text-sm md:text-base my-2 md:my-0" type="text" value="0909 666 333" />
                <p className="col-span-1 whitespace-nowrap text-sm md:text-base my-2 md:my-0">Email</p>
                <input className="input-profile w-full md:w-11/12 text-sm md:text-base my-2 md:my-0" type="text" value="nguyenvana@gmail.com" />
                <div className="col-span-4 grid grid-cols-3 w-full md:w-11/12 whitespace-nowrap text-sm md:text-base my-2 md:my-0">
                    <p className="col-span-1">Giới tính</p>
                    <div className="flex items-center">
                        <Checkbox />
                        <p>Nam</p>
                    </div>
                    <div className="flex items-center">
                        <Checkbox />
                        <p>Nữ</p>
                    </div>
                </div>
                <p className="col-span-1 whitespace-nowrap text-sm md:text-base mb-24 md:mb-0">Ngày sinh</p>
                <div className="col-span-3 flex flex-col md:flex-row justify-between w-3/5 md:w-11/12 text-sm md:text-base my-2 md:my-0">
                    <div className="input-profile cursor-pointer flex items-center justify-around mb-1.5">Ngày <i><HiChevronDown /></i></div>
                    <div className="input-profile cursor-pointer flex items-center justify-around mb-1.5">Tháng <i><HiChevronDown /></i></div>
                    <div className="input-profile cursor-pointer flex items-center justify-around mb-1.5">Năm <i><HiChevronDown /></i></div>
                </div>
                <p className="col-span-1 text-sm md:text-base my-2 md:my-0">Mật khẩu</p>
                <button className="col-span-3 btn-outline whitespace-nowrap text-sm md:text-base w-7/12 md:w-11/12 border-primary text-primary my-2 md:my-0">Đổi mật khẩu</button>
            </div>
            <div className="col-span-1 text-center">
                <div className="my-5 md:my-10 mx-16 flex justify-center items-center">
                    <img src="../../../../public/assets/images/avatar.png" className="w-8/12 md:w-10/12" alt="" />
                </div>
                <button className="btn-outline border-primary-light border-2 text-sm md:text-base px-6 md:px-16 font-normal text-primary">Đổi ảnh</button>
                <p className="text-12 text-gray-400">Dung lượng file tối đa 1MB</p>
                <p className="text-12 text-gray-400">Định dạng: .JPEG, .PNG</p>
            </div>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-4 mt-6 md:mt-20 pr-0 md:pr-16">
                <button className="btn-primary font-normal col-span-4 w-6/12 md:w-8/12 m-auto md:ml-28 text-sm md:text-base">Cập Nhật</button>
            </div>
        </div>
    </>
}