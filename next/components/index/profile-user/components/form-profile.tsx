import Gender from "./gender";
import DateTime from "./datetime";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";

interface PropsType extends ReactProps {
  [x: string]: any;
  name?: string;
  id?:string;
  defaultValue?:string,
  listOptions: any[],
}

export function FormProfile({ 
  name = "typeStore",
  id = "TypeStore",
  defaultValue = "",
  listOptions = [ { type: 1, value: "Phòng khám" } , { type: 2, value: "Nhà thuốc" }, { type: 3, value: "Trình dược viên" } ],
  ...props 
}:PropsType) {
    const { user } = useAuth();
    const [userA,setUserA] = useState(null);
    useEffect(() => {
      setUserA(user)

    }, [user]);
    console.log(userA);
    

    const [valueTypeStore,setValueTypeStore] = useState(defaultValue);
    const [valueNameStore,setValueNameStore] = useState(null);
    const handleChange=(id:string,value:any)=>{
        switch (id) {
            // case "dateOfBirth":{
            //     setUserP({...user,birthday:value});
            //     break;
            // }
                
            case "username":{
                setUserA({...userA, username:value});
                break;
            }
            case "email":{
              setUserA({...userA, email:value});
              break;
            }
            case "phone":{
              setUserA({...userA, phone:value});
              break;
            }

            case "typeStore":{
              setValueTypeStore(value);
              break;
            }

            case "nameStore":{
              setValueNameStore(value);
              break;
            }
                
            // case "phone":{
            //     setUserP({...user,phone:value});
            //     break; 
            // }

                
            default:
                break;
        }
    }
    // console.log(user);
    
    
    
    
    return <>
    {
        userA ? <>
            <div className="w-11/12 lg:w-full text-16 sm:text-20 text-gray-700">
              <h3 className="uppercase border-gray-200 border-b-4 pb-2 mb-4 text-24 hidden sm:block text-left">
                Thông tin tài khoản
              </h3>
              <div className="flex flex-wrap-reverse w-full">
                <div className="w-full xl:w-4/6 items-center">
                  <div className="pr-0 xl:pr-16 xl:border-r-2 border-gray-200">
                    <div className="sm:flex justify-between items-center">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Họ tên</p>
                      <input
                        className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                        value={userA.username}
                        onChange={(e) => {
                          handleChange("username", e.target.value);
                        }}
                      />
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Email</p>
                      <input
                        className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                        value={userA.email}
                        onChange={(e) => {
                          handleChange("email", e.target.value);
                        }}
                      />
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Điện thoại</p>
                      <input
                        className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                        value={userA.phone}
                        onChange={(e) => {
                          handleChange("phone", e.target.value);
                        }}
                      />
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Ngày sinh</p>
                      <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                        <DateTime dateOfBirth={new Date()} handleChange={handleChange }/>
                      </div>
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Loại cửa hàng</p>
                      <select className="btn-outline w-full sm:w-3/4 xl:w-4/6 h-12 text-16 sm:text-20 px-0 sm:pl-2" 
                          name={name} 
                          value={valueTypeStore} 
                          id={id} 
                          onChange={(e)=>handleChange("typeStore",e.target.value)}>
                          {
                              listOptions.map((item,index)=>{
                                  return <option className={item===defaultValue?"bg-primary-light":""} key={index} value={item.type}>{item.value}</option>
                              })
                          }
                      </select>
                      
                    </div>
                    {/* <div className="justify-between items-center pt-4 sm:h-12">
                      <p className="w-full sm:w-1/4">Giới tính</p>
                      <div className="w-full sm:w-3/4 h-12 flex gap-4">
                        <Gender gender={user.userRef} />
                      </div>
                    </div> */}
                    
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Tên cửa hàng</p>
                      <input
                        className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                        value={valueNameStore}
                        onChange={(e) => {
                          handleChange("nameStore", e.target.value)
                        }}
                      />
                      
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Mật khẩu</p>
                      <button className="w-full sm:w-3/4 xl:w-4/6 btn-outline h-12 border-primary text-primary text-16 sm:text-20">
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center xl:pr-16 pt-10 xl:pt-16">
                    <p className="hidden sm:inline-block w-1/4"></p>
                    <button className="btn-primary w-full sm:w-3/4 xl:w-4/6 font-normal h-12 text-16 sm:text-20">
                      Cập Nhật
                    </button>
                  </div>
                </div>
                <div className="flex xl:inline-block w-full xl:w-2/6 justify-around items-center">
                  <div className="w-1/3 mx-auto">
                    <img
                      src={user.imageLink || "/assets/img/avatar.svg"}
                      onError={(e) => {
                        (e.target as any).src = "/assets/img/avatar.svg"
                      }}
                      className="w-9/12 sm:w-6/12 md:w-6/12 lg:w-7/12 xl:w-11/12 rounded-full"
                      alt="avatar"
                    />
                  </div>
                  <div className="w-2/3 mx-auto flex items-center flex-wrap">
                    <button className="mx-auto px-10 sm:px-14 md:px-16 py-5 md:py-4 lg:py-6 whitespace-nowrap   my-3 btn-outline text-lg border-primary border font-normal text-primary hover:bg-primary hover:text-white">
                      Đổi ảnh
                    </button>
                    <p className="mx-auto text-12 whitespace-nowrap sm:text-16 text-gray-400 hidden sm:inline-block">
                      Dung lượng file tối đa 1MB.{" "}
                      <span className="block sm:inline xl:w-11/12 xl:block mx-auto">
                        Định dạng: .JPEG, .PNG
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
         : (
          ""
        )
        //             <Link href="/login">
        //                 <a className="btn-default h-12" onClick={saveCurrentPath}>
        //                     Đăng nhập
        //                 </a>
        //             </Link>
        // }
      }
    </>;
}
