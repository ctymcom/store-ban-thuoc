import Gender from "./gender";
import DateTime from "./datetime";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Select } from "../../../shared/utilities/form/select";

interface PropsType extends ReactProps {
  [x: string]: any;
  name?: string;
  id?: string;
  defaultValue?: string;
  listOptions: any[];
}

export function FormProfile({
  name = "typeStore",
  id = "TypeStore",
  defaultValue = "",
  listOptionsTypeStore = [
    { value: 0, label: "Vui lòng chọn loại cửa hàng" },
    { value: 1, label: "Phòng khám" },
    { value: 2, label: "Nhà thuốc" },
    { value: 3, label: "Trình dược viên" },
  ],
  ...props
}: PropsType) {
  const { user } = useAuth();
  const [userA, setUserA] = useState(null);
  useEffect(() => {
    setUserA(user);
  }, [user]);
  // console.log(userA);
  // console.log(listOptionsTypeStore);

  const [valueTypeStore, setValueTypeStore] = useState(null);
  console.log(valueTypeStore);

  const [valueNameStore, setValueNameStore] = useState(null);
  const handleChange = (id: string, value: any) => {
    if (listOptionsTypeStore[id] !== value) {
      switch (id) {
        case "username": {
          setUserA({ ...userA, username: value });
          break;
        }

        case "phone": {
          setUserA({ ...userA, phone: value });
          break;
        }

        case "type-store": {
          setValueTypeStore(value);
          break;
        }

        case "nameStore": {
          setValueNameStore(value);
          break;
        }

        default:
          break;
      }
    }
  };

  return (
    <>
      {
        userA ? (
          <>
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
                        readOnly
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
                        <DateTime dateOfBirth={new Date()} handleChange={handleChange} />
                      </div>
                    </div>
                    <div className="sm:flex justify-between items-center pt-4">
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Loại cửa hàng</p>
                      <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                        <Select
                          className={`w-full  h-12`}
                          options={listOptionsTypeStore}
                          value={
                            valueTypeStore == null ? "Vui lòng chọn loại cửa hàng" : valueTypeStore
                          }
                          onChange={(e) => {
                            handleChange("type-store", e);
                          }}
                        />
                      </div>
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
                          handleChange("nameStore", e.target.value);
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
                        (e.target as any).src = "/assets/img/avatar.svg";
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
        ) : (
          ""
        )
        //             <Link href="/login">
        //                 <a className="btn-default h-12" onClick={saveCurrentPath}>
        //                     Đăng nhập
        //                 </a>
        //             </Link>
        // }
      }
    </>
  );
}
