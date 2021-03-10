import React from "react";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
interface PropsType extends ReactProps {
  setShowDialog?: Function;
  isOpen?: boolean;
}

export default function UpdatePasswordDialog(props: PropsType) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [mess, setMess] = useState("");
  const toast = useToast();
  const { changeAritoUserPasswrod } = useAuth();

  const handleOnClick = (oldPass, newPass, confirmNewPass) => {
    if (confirmNewPass) {
      if (newPass === confirmNewPass) {
        changeAritoUserPasswrod(oldPass, newPass);
        // toast.success("Đổi mật khẩu thành công");
      } else {
        setMess("Nhập lại mật khẩu chưa đúng!");
      }
    } else {
      setMess("Bạn chưa nhập lại mật khẩu mới");
    }
  };

  return (
    <Dialog
      width="520px"
      isOpen={props.isOpen}
      onClose={() => props.setShowDialog(false)}
      title="Đổi mật khẩu"
      icon={<RiLockPasswordLine />}
      className=""
    >
      <div className="flex-col w-full px-5 py-6">
        <div className="flex flex-col md:flex-row items-center">
          <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Mật khẩu cũ</p>
          <input
            type="password"
            className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
            value={oldPass}
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center mt-3 md:mt-5">
          <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Mật khẩu mới</p>
          <input
            type="password"
            className="form-input w-full sm:w-3/4 xl:w-4/6 text-16 sm:text-20"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center mt-3 md:mt-5 flex-wrap">
          <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2">Nhập lại mật khẩu mới</p>
          <div className="w-full sm:w-3/4 xl:w-4/6">
            <input
              type="password"
              className="form-input w-full  text-16 sm:text-20"
              value={confirmNewPass}
              onChange={(e) => {
                setConfirmNewPass(e.target.value);
              }}
            />
            <p className="w-full text-15 md:text-13 text-red-600">{mess}</p>
          </div>
        </div>
        <div className="mb-4 mt-8 flex justify-center">
          <button
            className=" btn-primary w-full sm:w-3/4 xl:w-3/6 font-normal h-12 text-16 sm:text-20"
            onClick={() => handleOnClick(oldPass, newPass, confirmNewPass)}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Dialog>
  );
}
