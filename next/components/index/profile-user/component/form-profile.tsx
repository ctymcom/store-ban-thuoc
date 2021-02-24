import Gender from './gender';
import DateTime from './datetime';
import { useState } from 'react';
interface PropsType extends ReactProps {
    user: {
        name:string,
        phoneNumber:string,
        email:string,
        gender:string,
        dateOfBirth:Date
    },
}
export function FormProfile({user}: PropsType) {
    const [userP,setUserP] = useState(user);
    const handleChange=(id:string,value:any)=>{
        switch (id) {
            case "dateOfBirth":{
                setUserP({...userP,dateOfBirth:value});
            }
                break;
            case "name":{
                setUserP({...userP,name:value});
            }
            case "phoneNumber":{
                setUserP({...userP,phoneNumber:value});
            }
                break;  
            case "email":{
                setUserP({...userP,email:value});
            }
                break;
            case "gender":{
                setUserP({...userP,gender:value});
            }
                break;
        
            default:
                break;
        }
    }
    return <div className="w-full lg:w-5/6 mx-auto xl:ml-40 text-16 sm:text-20 text-gray-800 mt-10">
        <h3 className="uppercase border-gray-200 border-b-4 pb-2 mb-4 text-24 text-center sm:text-left">Thông tin tài khoản</h3>
        <div className="flex flex-wrap-reverse justify-between w-full">
            <div className="w-full xl:w-3/5 items-center">
                <div className="pr-0 xl:pr-16 xl:border-r border-gray-400">
                    <div className="sm:flex justify-between items-center">
                        <p className="w-full sm:w-1/4">Họ và tên</p>
                        <input className="form-input w-full sm:w-3/4 text-16 sm:text-20" value={userP.name} onChange={(e)=>{handleChange("name",e.target.value)}}/>
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                        <p className="w-full sm:w-1/4">Số điện thoại</p>
                        <input className="form-input w-full sm:w-3/4 text-16 sm:text-20" value={userP.phoneNumber} onChange={(e)=>{handleChange("phoneNumber",e.target.value)}}/>  
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                        <p className="w-full sm:w-1/4">Email</p>
                        <input className="form-input w-full sm:w-3/4 text-16 sm:text-20" value={userP.email} onChange={(e)=>{handleChange("email",e.target.value)}}/>
                    </div>
                    <div className="sm:flex justify-between items-center pt-4 sm:h-12">
                        <p className="w-full sm:w-1/4">Giới tính</p>
                        <div className="w-full sm:w-3/4 h-12 flex gap-4">
                            <Gender gender={userP.gender} handleChange={handleChange}/>
                        </div>
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                        <p className="w-full sm:w-1/4">Ngày sinh</p>
                        <div className="w-full sm:w-3/4 flex space-x-2">
                            <DateTime dateOfBirth={userP.dateOfBirth} handleChange={handleChange}/>
                        </div>
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4">Mật khẩu</p>
                    <button className="w-full sm:w-3/4 btn-outline h-12 border-primary text-primary text-16 sm:text-20">Đổi mật khẩu</button>
                </div>
                </div>
                <div className="flex justify-between items-center xl:pr-16 pt-10 xl:pt-16">
                        <p className="hidden sm:inline-block w-1/4"></p>
                        <button className="btn-primary w-full sm:w-3/4 font-normal h-12 text-16 sm:text-20">Cập Nhật</button>
                </div>
            </div>
            <div className="text-center w-full xl:w-2/5 flex items-center xl:block">
                <div className="xl:p-4 flex items-center justify-around w-1/4 xl:w-full">
                    <img src="/assets/img/avatar.svg" className="user__avatar max-w-4xs rounded-full" alt="avatar"/>
                </div>
                <div className="w-full sm:w-3/4 xl:w-full">
                    <button className="btn-outline text-16 sm:text-20 border-primary border font-normal text-primary w-2/3 mx-auto h-12 my-2">Đổi ảnh</button>
                    <p className="text-12 whitespace-nowrap sm:text-16 text-gray-400">Dung lượng file tối đa 1MB. <span className="block sm:inline xl:block">Định dạng: .JPEG, .PNG</span></p>
                </div>
            </div>
        </div>
    </div>
}