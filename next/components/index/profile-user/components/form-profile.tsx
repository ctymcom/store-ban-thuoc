import { useEffect, useState, useRef, MutableRefObject } from "react";
import axios from "axios";
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
  const [userA, setUserA] = useState<AritoUser>(null);
  useEffect(() => {
    setUserA(user);
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
      if (!phone) {
        toast.warn("Điện thoại không được để trống");
        return false;
      }
      if (phone.length > 10) {
        toast.warn("Điện thoại không được quá 10 số");
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
  const [uploading, setUploading] = useState(false);
  const handleUploadAvatar = (e) => {
    let file = e.target.files[0];
    setUploading(true);
    if (file) {
      let formData = new FormData();
      formData.append("data", file);
      AritoUserService.uploadAvatar(formData)
        .then((res) => {
          toast.success("Upload thành công");
          setUploading(false);
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
            <h3 className="uppercase border-gray-200 border-b-4 pb-2 mb-4 text-24 hidden sm:block text-left">
              Thông tin tài khoản
            </h3>
            <div className="flex flex-wrap-reverse w-full">
              <div className="w-full xl:w-4/6 items-center">
                <div className="pr-0 xl:pr-16 xl:border-r-2 border-gray-200">
                  <div className="sm:flex justify-between items-center">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Tên hiển thị</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                      value={userA?.nickname}
                      onChange={(e) => {
                        setUserA({ ...userA, nickname: e.target.value });
                      }}
                    />
                  </div>
                  <div className="sm:flex justify-between items-center  pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Tên đăng nhập</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20 bg-gray-200 border-0"
                      value={userA?.username}
                      readOnly
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Email</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20 bg-gray-200 border-0"
                      value={userA?.email}
                      readOnly
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Điện thoại</p>
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
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Ngày sinh</p>
                    <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                      <DateTime
                        dateOfBirth={
                          userA?.birthday !== null ? new Date(userA.birthday) : new Date()
                        }
                        onChange={(e) => {
                          setUserA({ ...userA, birthday: format(e, "yyyy-MM-dd") });
                        }}
                      />
                    </div>
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Loại cửa hàng</p>
                    <div className="w-full sm:w-3/4 flex space-x-2 xl:w-4/6">
                      <Select
                        className={`w-full  h-12`}
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
                    <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Tên cửa hàng</p>
                    <input
                      className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
                      value={userA?.companyName}
                      onChange={(e) => {
                        setUserA({ ...userA, companyName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="sm:flex justify-between items-center pt-4">
                    <>
                      <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Mật khẩu</p>
                      <button
                        className="w-full sm:w-3/4 xl:w-4/6 btn-outline h-12 border-primary text-primary text-16 sm:text-20"
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
                  <Button
                    className="btn-primary w-full sm:w-3/4 xl:w-4/6 font-normal h-12 text-16 sm:text-20"
                    asyncLoading
                    onClick={async () => await handleOnClick()}
                    text="Cập Nhật"
                  />
                </div>
              </div>
              <div className="flex xl:inline-block w-full xl:w-2/6 justify-around items-center">
                <div className="flex-shrink-0 w-1/3 mx-auto">
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
                <div className="w-9/12 mx-auto flex items-center justify-center flex-wrap">
                  <Button
                    onClick={() => ref.current?.click()}
                    className="mx-auto px-10 sm:px-14 md:px-16 py-5 md:py-4 lg:py-6 whitespace-nowrap my-3 btn-outline text-lg border-primary border font-normal text-primary hover:bg-primary hover:text-white"
                    text="Đổi ảnh"
                  />
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={ref}
                    onChange={(e) => handleUploadAvatar(e)}
                  />
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
        <Spinner />
      )}
    </>
  );
}
