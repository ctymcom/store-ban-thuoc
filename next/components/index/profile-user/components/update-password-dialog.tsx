import React from "react";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Button } from "../../../shared/utilities/form/button";
import { useToast } from "../../../../lib/providers/toast-provider";
interface PropsType extends ReactProps {
  setShowDialog?: Function;
  isOpen?: boolean;
}

export default function UpdatePasswordDialog(props: PropsType) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const { changeAritoUserPassword } = useAuth();
  const toast = useToast();

  const handleOnClick = async () => {
    let noti = { type: "", mess: "" };
    if (confirmNewPass) {
      if (newPass === confirmNewPass) {
        noti = await changeAritoUserPassword(oldPass, newPass);
        if (noti.type === "success") {
          toast.success(noti.mess);
          props.setShowDialog(false);
        }
        if (noti.type === "warn") {
          toast.warn(noti.mess);
        }
      } else {
        toast.warn("Nhập lại mật khẩu chưa đúng!");
      }
    }
  };

  return (
    <Dialog
      width="520px"
      isOpen={props.isOpen}
      onClose={() => props.setShowDialog(false)}
      title="Đổi mật khẩu"
      icon={<RiLockPasswordLine />}
    >
      <div className="flex-col w-full px-5 py-6">
        <div className="flex items-center">
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
        <div className="flex items-center mt-5">
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
        <div className="flex items-center mt-5 flex-wrap">
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
          </div>
        </div>
        <div className="mb-4 mt-8 flex justify-center">
          <Button
            className=" btn-primary w-full sm:w-3/4 xl:w-3/6 font-normal h-12 text-16 sm:text-20"
            asyncLoading
            onClick={async () => await handleOnClick()}
            text="Xác nhận"
          />
        </div>
      </div>
    </Dialog>
  );
}
