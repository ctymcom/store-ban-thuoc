import { useEffect, useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Select } from "../../../shared/utilities/form/select";
import { format } from "date-fns";
import { AritoUser } from "../../../../lib/repo/arito-user.repo";
import { parseInt } from "lodash";
import UpdatePasswordDialog from "./update-password-dialog";
import DateTime from "./datetime";
import { useToast } from "../../../../lib/providers/toast-provider";

interface PropsType extends ReactProps {
  [x: string]: any;
}

export function FormProfile(props: PropsType) {
  const {
    user,
    updateAritoUser,
    setShowDialogUpdatePassword,
    showDialogUpdatePassword,
  } = useAuth();
  const [userA, setUserA] = useState(null);
  useEffect(() => {
    setUserA(user);
  }, [user]);

  const toast = useToast();

  let listOptionsTypeStore = [
    { value: 1, label: "Phòng khám" },
    { value: 2, label: "Nhà thuốc" },
    { value: 3, label: "Trình dược viên" },
  ];

  const handleChange = (id: string, value: any) => {
    switch (id) {
      case "dateOfBirth":
        {
          // console.log(value);
          setUserA({ ...userA, birthday: format(value, "yyyy-MM-dd") });
        }
        break;
      default:
        break;
    }
  };

  // const checkBeforeMessage = (userA) => {
  //   if (userA) {
  //     const { username, phone } = userA;
  //     if (!username) {
  //       setMessage("Họ tên không được để trống");
  //       return false;
  //     }
  //     if (!phone) {
  //       setMessage("Điện thoại không được để trống");
  //       return false;
  //     } else {
  //       if (phone.length > 10) {
  //         setMessage("Điện thoại không được quá 10 số");
  //         return false;
  //       }
  //     }
  //   }
  // };

  const handleOnClick = (data: AritoUser) => {
    updateAritoUser(data);
    toast.success("Cập nhật tài khoản thành công");
  };

  const handlerChangeAvatar = () => {
    let eleInputFile = document.getElementById("uploadFile");
    eleInputFile.click();
  };

  const readURL = (e) => {
    let url = e.value;
    let ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
    let eleAvatar = document.querySelector("#avatar");
    if (e.files && e.files[0] && (ext == "png" || ext == "jpeg" || ext == "jpg")) {
      let reader = new FileReader();

      reader.onload = function (e) {
        eleAvatar.setAttribute("src", e.target.result.toString());
      };
      reader.readAsDataURL(e.files[0]);
    } else {
      eleAvatar.setAttribute("src", "/assets/img/avatar.svg");
    }
    // console.log(url);
    // setUserA({ ...userA, imageLink: url });
  };

  return (
    <>
      {userA ? (
        <>
          <div className="w-full px-5 md:px=0  text-16 sm:text-20 text-gray-700">
            <h3 className="uppercase border-gray-200 border-b-4 pb-2 mb-4 text-24 hidden sm:block text-left">
              Thông tin tài khoản
            </h3>
            <div className="flex flex-wrap-reverse w-full">
              <div className="w-full xl:w-4/6 items-center">
                <div className="pr-0 xl:pr-16 xl:border-r-2 border-gray-200">
                  <div className="sm:flex justify-between items-center">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Họ tên</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                      value={userA?.nickname}
                      onChange={(e) => {
                        setUserA({ ...userA, nickname: e.target.value });
                      }}
                    />
                  </div>
                  <div className="sm:flex justify-between items-center  pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Tên đăng nhập</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20 bg-gray-200 border-0"
                      value={userA?.username}
                      readOnly
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Email</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20 bg-gray-200 border-0"
                      value={userA?.email}
                      readOnly
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Điện thoại</p>
                    <input
                      type="number"
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                      value={userA?.phone}
                      onChange={(e) => {
                        setUserA({ ...userA, phone: e.target.value });
                      }}
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Ngày sinh</p>
                    <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                      <DateTime
                        dateOfBirth={
                          userA?.birthday !== null ? new Date(userA.birthday) : new Date()
                        }
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Loại cửa hàng</p>
                    <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                      <Select
                        className={`w-full  h-10 lg:h-12`}
                        options={listOptionsTypeStore}
                        value={
                          userA.companyType ? userA.companyType : "Vui lòng chọn loại cửa hàng"
                        }
                        onChange={(e) => {
                          setUserA({ ...userA, companyType: parseInt(e) });
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Tên cửa hàng</p>
                    <input
                      id="avatar"
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                      value={userA?.companyName}
                      onChange={(e) => {
                        setUserA({ ...userA, companyName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <>
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 mb-1.5 lg:mb-0">Mật khẩu</p>
                      <button
                        className="w-full sm:w-3/4 xl:w-4/6 btn-outline h-10 lg:h-12 border-primary text-primary text-16 sm:text-20"
                        onClick={() => setShowDialogUpdatePassword(true)}
                      >
                        Đổi mật khẩu
                      </button>
                    </>
                  </div>
                  <UpdatePasswordDialog
                    isOpen={showDialogUpdatePassword}
                    setShowDialog={setShowDialogUpdatePassword}
                  />
                </div>
                <div className="flex justify-between items-center xl:pr-16 pt-10 xl:pt-16">
                  <p className="hidden sm:inline-block w-1/4"></p>
                  <button
                    className="btn-primary w-full sm:w-3/4 xl:w-4/6 font-normal h-10 lg:h-12 text-16 sm:text-20"
                    onClick={() => {
                      handleOnClick(userA);
                    }}
                  >
                    Cập Nhật
                  </button>
                </div>
              </div>
              <div className="flex xl:inline-block w-full xl:w-2/6 items-center mb-4 lg:mb-0">
                <div className="w-1/3 mx-auto">
                  <img
                    src={user.imageLink || "/assets/img/avatar.svg"}
                    onError={(e) => {
                      (e.target as any).src = "/assets/img/avatar.svg";
                    }}
                    className="w-9/12 xs:w-8/12 sm:w-6/12 md:w-6/12 lg:w-7/12 xl:w-11/12 rounded-full"
                    alt="avatar"
                  />
                </div>
                <div className="w-9/12 mx-auto flex lg:flex-col items-center justify-center flex-wrap">
                  <button
                    className="changeAvatar mx-auto px-12 sm:px-14 md:px-16 md:py-4 lg:py-6 whitespace-nowrap my-0 lg:my-3 btn-outline text-lg border-primary border font-normal text-primary hover:bg-primary hover:text-white"
                    onClick={() => handlerChangeAvatar()}
                  >
                    Đổi ảnh
                  </button>
                  <input
                    type="file"
                    id="uploadFile"
                    className=" hidden w-full"
                    onChange={(e) => readURL(e.target)}
                  />
                  <p className="mx-auto text-12 whitespace-nowrap sm:text-16 text-gray-400 hidden lg:block">
                    Dung lượng file tối đa 1MB.{" "}
                    <span className="hidden sm:inline xl:w-11/12 xl:block mx-auto">
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
      )}
    </>
  );
}
