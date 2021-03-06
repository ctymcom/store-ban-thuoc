import React from "react";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Button } from "../../../shared/utilities/form/button";
import { useToast } from "../../../../lib/providers/toast-provider";
import { Input } from "../../../shared/utilities/form/input";
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
    if (!newPass || !confirmNewPass || !oldPass) {
      toast.warn("Yêu cầu nhập đầy đủ các trường");
      return;
    }
    if (confirmNewPass) {
      if (newPass === confirmNewPass) {
        noti = await changeAritoUserPassword(oldPass, newPass);
        if (noti.type === "success") {
          toast.success("Đổi mật khẩu thành công");
          props.setShowDialog(false);
        }
        if (noti.type === "warn") {
          toast.warn(noti.mess);
        }
      } else {
        toast.warn("Nhập lại mật khẩu chưa đúng!");
      }
    } else {
      toast.warn("Bạn chưa nhập lại mật khẩu mới");
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
      <div className="flex-col w-full px-5 sm:px-8 md:px-5 py-6 sm:py-9 md:py-6">
        <div className="flex flex-col sm:flex-row items-center">
          <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 lg:text-16 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
            Mật khẩu cũ
          </p>
          <div className="w-full sm:w-3/4 xl:w-4/6">
            <Input
              type="password"
              name="oldPass"
              value={oldPass}
              className="form-input"
              onChange={(val) => setOldPass(val)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center mt-3 sm:mt-5">
          <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 lg:text-16 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
            Mật khẩu mới
          </p>

          <div className="w-full sm:w-3/4 xl:w-4/6">
            <Input
              type="password"
              name="newPass"
              value={newPass}
              className="form-input"
              onChange={(val) => setNewPass(val)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center mt-3 sm:mt-5 flex-wrap">
          <p className="w-full sm:w-1/4 xl:w-2/6 xl:pr-2 sm:text-18 lg:text-16 mb-1.5 md:mb-0 text-gray-500 md:text-gray-700">
            Nhập lại mật khẩu mới
          </p>
          <div className="w-full sm:w-3/4 xl:w-4/6">
            <Input
              type="password"
              name="confirmNewPass"
              value={confirmNewPass}
              className="form-input"
              onChange={(val) => setConfirmNewPass(val)}
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
