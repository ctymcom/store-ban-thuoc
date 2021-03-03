import Gender from './gender';
import DateTime from './datetime';
import { useState } from 'react';
import { useAuth } from "../../../../lib/providers/auth-provider";
import Link from 'next/link';
import { useProfileUserContext } from '../providers/profile-user-provider';

export function FormProfile() {
    const { user, saveCurrentPath } = useAuth()
    // const { user } = useProfileUserContext();
    // const [userP,setUserP] = useState(user);
    // const handleChange=(id:string,value:any)=>{
    //     switch (id) {
    //         case "dateOfBirth":{
    //             setUserP({...userP,birthday:value});
    //         }
    //             break;
    //         case "name":{
    //             setUserP({...userP,username:value});
    //         }
    //         case "phoneNumber":{
    //             setUserP({...userP,phone:value});
    //         }
    //             break;  
    //         case "email":{
    //             setUserP({...userP,email:value});
    //         }
    //             break;
    //         // case "gender":{
    //         //     setUserP({...userP,gender:value});
    //         // }
    //         //     break;

    //         default:
    //             break;
    //     }
    // }
    console.log(user);
    
    return <>
    {
        user ? <>
            <div className="w-11/12 lg:w-full text-16 sm:text-20 text-gray-700">
                <h3 className="uppercase border-gray-200 border-b-4 pb-2 mb-4 text-24 hidden sm:block text-left">Thông tin tài khoản</h3>
                <div className="flex flex-wrap-reverse w-full">
                    <div className="w-full xl:w-4/6 items-center">
                        <div className="pr-0 xl:pr-16 xl:border-r-2 border-gray-200">
                            <div className="sm:flex justify-between items-center">
                                <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Họ và tên</p>
                                <input className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20" value={user.username} onChange={(e) => { handleChange("name", e.target.value) }} />
                            </div>
                            <div className="sm:flex justify-between items-center pt-4">
                                <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Số điện thoại</p>
                                <input className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20" value={user.phone} onChange={(e) => { handleChange("phoneNumber", e.target.value) }} />
                            </div>
                            <div className="sm:flex justify-between items-center pt-4">
                                <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Email</p>
                                <input className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20" value={user.email} onChange={(e) => { handleChange("email", e.target.value) }} />
                            </div>
                            <div className="hidden justify-between items-center pt-4 sm:h-12">
                                <p className="w-full sm:w-1/4">Giới tính</p>
                                <div className="w-full sm:w-3/4 h-12 flex gap-4">
                                    <Gender gender={user.userRef}  />
                                </div>    
                            </div>
                            <div className="sm:flex justify-between items-center pt-4">
                                <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Ngày sinh</p>
                                <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                                    <DateTime dateOfBirth={user.birthday == null ? new Date() : user.birthday}  />
                                </div>
                            </div>
                            <div className="sm:flex justify-between items-center pt-4">
                                <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Mật khẩu</p>
                                <button className="w-full sm:w-3/4 xl:w-4/6 btn-outline h-12 border-primary text-primary text-16 sm:text-20">Đổi mật khẩu</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center xl:pr-16 pt-10 xl:pt-16">
                            <p className="hidden sm:inline-block w-1/4"></p>
                            <button className="btn-primary w-full sm:w-3/4 xl:w-4/6 font-normal h-12 text-16 sm:text-20">Cập Nhật</button>
                        </div>
                    </div>
                    <div className="flex xl:inline-block w-full xl:w-2/6 justify-around items-center">
                        <div className="w-1/3 mx-auto">
                            <img src={ user.imageLink || "/assets/img/avatar.svg"} onError={(e) => {(e.target as any).src="/assets/img/avatar.svg"}} className="w-11/12 rounded-full" alt="avatar" />
                        </div>
                        <div className="w-2/3 mx-auto flex items-center flex-wrap">
                            <button className="mx-auto px-10 sm:px-14 md:px-16 py-5 md:py-4 lg:py-6 whitespace-nowrap   my-3 btn-outline text-lg border-primary border font-normal text-primary hover:bg-primary hover:text-white">Đổi ảnh</button>
                            <p className="mx-auto text-12 whitespace-nowrap sm:text-16 text-gray-400 hidden sm:inline-block">Dung lượng file tối đa 1MB. <span className="block sm:inline xl:w-11/12 xl:block mx-auto">Định dạng: .JPEG, .PNG</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </> :   '' 
    //             <Link href="/login">
    //                 <a className="btn-default h-12" onClick={saveCurrentPath}>
    //                     Đăng nhập
    //                 </a>
    //             </Link>
    // }
        }    
    </>;
}