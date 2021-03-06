import { useEffect, useState, useRef, MutableRefObject } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Select } from "../../../shared/utilities/form/select";
import { format } from "date-fns";
import { AritoUser, AritoUserService } from "../../../../lib/repo/arito-user.repo";
import { parseInt } from "lodash";
import UpdatePasswordDialog from "./update-password-dialog";
import DateTime from "./datetime";
import { Spinner } from "../../../shared/utilities/spinner";
import { Button } from "../../../shared/utilities/form/button";
import { useToast } from "../../../../lib/providers/toast-provider";
import { cloneDeep } from "lodash";
import { Input } from "../../../shared/utilities/form/input";

interface PropsType extends ReactProps {
  [x: string]: any;
}

export function FormProfile(props: PropsType) {
  const toast = useToast();
  const {
    user,
    checkUser,
    updateAritoUser,
    setShowDialogUpdatePassword,
    showDialogUpdatePassword,
  } = useAuth();
  let [userA, setUserA] = useState<AritoUser>(null);
  useEffect(() => {
    setUserA(cloneDeep(user));
    console.log(user);
  }, [user]);
  let listOptionsTypeStore = [
    { value: 1, label: "Phòng khám" },
    { value: 2, label: "Nhà thuốc" },
    { value: 3, label: "Trình dược viên" },
  ];

  const handleChange = (id: string, value: any) => {
    if (listOptionsTypeStore[id] !== value) {
      switch (id) {
        case "dateOfBirth":
          {
            setUserA({ ...userA, birthday: format(value, "yyyy-MM-dd") });
          }
          break;
        default:
          break;
      }
    }
  };

  const checkBeforeMessage = () => {
    if (userA) {
      const { username, phone } = userA;
      if (!username) {
        toast.warn("Họ tên không được để trống");
        return false;
      }
      return true;
    }
  };

  const handleOnClick = async () => {
    if (checkBeforeMessage()) {
      let res = await updateAritoUser(userA);
      console.log(userA);

      if (res.type === "success") {
        toast.success(res.mess);
      }
      if (res.type === "warn") toast.warn(res.mess);
    }
  };
  const ref: MutableRefObject<HTMLInputElement> = useRef();
  const handleUploadAvatar = (e) => {
    let file = e.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("data", file);
      AritoUserService.uploadAvatar(formData)
        .then((res) => {
          toast.success("Upload thành công");
          AritoUserService.clearStore().then(() => {
            checkUser();
          });
        })
        .catch((err) => toast.warn("Upload thất bại"));
    }
    e.target.value = "";
    //updata
    //updateAritoUser(userA);
  };
  return (
    <>
      {userA ? (
        <>
          <div className="w-11/12 mx-auto lg:w-full text-16 sm:text-20 text-gray-700">
            <h3 className="uppercase border-gray-200 border-b-4 pb-2 mb-4 text-18 hidden sm:block text-left">
              Thông tin tài khoản
            </h3>
            <div className="flex flex-wrap-reverse w-full">
              <div className="w-full xl:w-4/6 items-center">
                <div className="pr-0 xl:pr-16 xl:border-r-2 border-gray-200">
                  <div className="sm:flex justify-between items-center">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Họ tên
                    </p>
                    <div className="w-full sm:w-3/4 xl:w-4/6">
                      <Input
                        name="nickname"
                        value={userA?.nickname}
                        className="form-input"
                        onChange={(val) => setUserA({ ...userA, nickname: val })}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center  pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Tên đăng nhập
                    </p>
                    <div className="w-full sm:w-3/4 xl:w-4/6">
                      <Input
                        name="username"
                        value={userA?.username}
                        className="form-input"
                        readonly={true}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Email
                    </p>
                    <div className="w-full sm:w-3/4 xl:w-4/6">
                      <Input
                        name="email"
                        value={userA?.email}
                        className="form-input"
                        readonly={true}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Điện thoại
                    </p>
                    <div className="w-full sm:w-3/4 xl:w-4/6">
                      <Input
                        name="phone"
                        value={userA?.phone}
                        className="form-input"
                        readonly={user?.phone ? true : false}
                        onChange={(val) => setUserA({ ...userA, phone: val })}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Ngày sinh
                    </p>
                    <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                      <DateTime
                        dateOfBirth={
                          userA?.birthday !== null ? new Date(userA.birthday) : new Date()
                        }
                        onChange={(e) => setUserA({ ...userA, birthday: format(e, "yyyy-MM-dd") })}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Loại cửa hàng
                    </p>
                    <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                      <Select
                        wrapperClassName={`w-full`}
                        className="h-10"
                        options={listOptionsTypeStore}
                        value={
                          userA.companyType ? userA.companyType : "Vui lòng chọn loại cửa hàng"
                        }
                        onChange={(e) => setUserA({ ...userA, companyType: parseInt(e) })}
                      />
                    </div>
                  </div>

                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                      Tên cửa hàng
                    </p>

                    <div className="w-full sm:w-3/4 xl:w-4/6">
                      <Input
                        name="companyName"
                        value={userA?.companyName}
                        className="form-input"
                        onChange={(val) => setUserA({ ...userA, companyName: val })}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <>
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
                        Mật khẩu
                      </p>

                      <Button
                        className="btn-outline border-primary text-primary w-full sm:w-3/4 xl:w-4/6 font-normal h-10 text-16"
                        asyncLoading
                        onClick={async () => await setShowDialogUpdatePassword(true)}
                        text="Đổi mật khẩu"
                      />
                    </>
                  </div>
                  <UpdatePasswordDialog
                    isOpen={showDialogUpdatePassword}
                    setShowDialog={setShowDialogUpdatePassword}
                  />
                </div>
                <div className="flex justify-between items-center xl:pr-16 pt-10 xl:pt-16">
                  <p className="hidden sm:inline-block w-1/4"></p>
                  <Button
                    className="btn-primary w-full sm:w-3/4 xl:w-4/6 font-normal h-10 text-16"
                    asyncLoading
                    onClick={async () => await handleOnClick()}
                    text="Cập Nhật"
                  />
                </div>
              </div>
              <div className="flex xl:inline-block w-full xl:w-2/6 justify-around items-center mb-5 lg:mb-8">
                <div className="flex-shrink-0 w-1/4  sm:w-1/5 md:w-1/6 lg:w-1/6 xl:w-1/3 mx-auto ">
                  <div className="image-wrapper circle">
                    <img
                      alt="avatar"
                      src={user.imageLink || "/assets/img/avatar.svg"}
                      onError={(e) => {
                        (e.target as any).src = "/assets/img/avatar.svg";
                      }}
                    />
                  </div>
                </div>
                <div className="w-9/12 ml-6 lg:ml-12 xl:mt-2 lg:mx-auto flex xs:flex-col md:items-start lg:items-start sm:justify-start lg:justify-center flex-wrap">
                  <Button
                    onClick={() => ref.current?.click()}
                    className="btn-outline border-primary border font-normal text-primary text-16 w-full xs:w-2/5 sm:w-1/4 lg:w-auto xl:mx-auto px-10 sm:px-4 md:px-10 lg:px-20 h-10 whitespace-nowrap my-3 xs:my-1 sm:my-2"
                    text="Đổi ảnh"
                  />
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={ref}
                    onChange={(e) => handleUploadAvatar(e)}
                  />
                  <p className="xl:mx-auto tracking-wider leading-5 whitespace-nowrap xs:text-12 sm:text-12 md:text-12 lg:text-14 text-gray-400 hidden xs:inline-block">
                    Dung lượng file tối đa 1MB.
                    <span className="block mx-auto">Định dạng: .JPEG, .PNG</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
