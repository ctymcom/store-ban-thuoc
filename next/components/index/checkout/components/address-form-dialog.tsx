import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "../../profile-user/components/dropdown";
import CheckBoxSquare from "./check-box-square";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { useAddressContext } from "../providers/address-provider";
import { Select } from "../../../shared/utilities/form/select";
import { PropsTypeFormDialog } from "./address-list";
import { UserAddress } from "../../../../lib/repo/user-address.repo";
import { useToast } from "../../../../lib/providers/toast-provider";
import { Button } from "../../../shared/utilities/form/button";
interface PropsType extends PropsTypeFormDialog {
  isOpen: boolean;
  title?: string;
  setTitle: Function;
}
const AddressFormDialog = (props: PropsType) => {
  const {
    userAddress,
    submitFormAddressUser,
    setUserAddress,
    provinces,
    districts,
    wards,
  } = useAddressContext();
  const toast = useToast();
  const [mess, setMess] = useState(null);
  useEffect(() => {
    if (userAddress === null) {
      setUserAddress({ ...userAddress, isDefault: true });
    }
  }, []);
  const handleOnChangSelect = (value: string, id: string) => {
    switch (id) {
      case "provinceId":
        {
          setUserAddress({ ...userAddress, [id]: value, districtId: "", wardId: "" });
        }
        break;
      case "districtId":
        {
          setUserAddress({ ...userAddress, [id]: value, wardId: "" });
        }
        break;
      default:
        break;
    }
  };
  const checkBeforeMutation = (data: UserAddress) => {
    if (data) {
      const { contactName, address, provinceId, districtId, wardId, phone } = data;
      if (!contactName) {
        toast.warn("Tên liên hệ không được để trống");
        return false;
      }
      if (!phone) {
        toast.warn("Số điện liên hệ không được để trống");
        return false;
      }
      if (!provinceId) {
        toast.warn("Bạn chưa chọn tỉnh/thành phố");
        return false;
      }
      if (!districtId) {
        toast.warn("Bạn chưa chọn quận/huyện");
        return false;
      }
      if (!wardId) {
        toast.warn("Bạn chưa chọn phường/xã");
        return false;
      }
      if (!address) {
        toast.warn("Địa chỉ không được để trống");
        return false;
      }
    } else {
      toast.warn("Bạn chưa nhập dữ liệu");
      return false;
    }
    return true;
  };
  const handleOnClick = async (data: UserAddress) => {
    let res = checkBeforeMutation(data);
    if (res) {
      await submitFormAddressUser(userAddress.id);
      toast.success("Thao tác thành công");
    }
    return res;
  };
  const checkboxChange = () => {
    setUserAddress({ ...userAddress, isDefault: !userAddress?.isDefault });
  };
  return (
    <Dialog
      width="420px"
      isOpen={props.isOpen}
      mobileMode={false}
      onClose={() => {
        props.setTitle("");
        setUserAddress(null);
        props.setShowAddressFormDialog(false);
      }}
      title={props.title ? props.title : "Chỉnh sửa địa chỉ"}
    >
      <Dialog.Body>
        <div className="flex flex-wrap gap-4 py-4 text-16">
          <input
            className="form-input w-full h-12 text-16"
            defaultValue={userAddress?.contactName}
            placeholder="Họ và tên"
            onChange={(e) => {
              setUserAddress({ ...userAddress, contactName: e.target.value });
            }}
          />
          <input
            className="form-input w-full h-12 text-16"
            defaultValue={userAddress?.phone}
            placeholder="Số điện thoại"
            onChange={(e) => {
              setUserAddress({ ...userAddress, phone: e.target.value });
            }}
          />
          <Select
            wrapperClassName="w-full"
            className="h-12"
            options={provinces}
            value={userAddress ? userAddress.provinceId : ""}
            onChange={(e) => {
              handleOnChangSelect(e, "provinceId");
            }}
          />
          <Select
            disabled={!userAddress || userAddress.provinceId === "" ? true : false}
            wrapperClassName="w-full"
            className="h-12"
            options={districts}
            value={userAddress ? userAddress.districtId : ""}
            onChange={(e) => {
              handleOnChangSelect(e, "districtId");
            }}
          />
          <Select
            disabled={
              userAddress && userAddress.districtId !== "" && userAddress.provinceId !== ""
                ? false
                : true
            }
            wrapperClassName="w-full"
            className="h-12"
            options={wards}
            value={userAddress ? userAddress.wardId : ""}
            onChange={(e) => {
              setUserAddress({ ...userAddress, wardId: e });
            }}
          />
          <input
            className="form-input w-full h-12 text-16"
            defaultValue={userAddress?.address}
            placeholder="Nhập địa chỉ, tên đường, tòa nhà..."
            onChange={(e) => {
              setUserAddress({ ...userAddress, address: e.target.value });
            }}
          />
          <div
            className="w-full h-12 flex items-center gap-2 cursor-pointer"
            onClick={() => {
              checkboxChange();
            }}
          >
            <CheckBoxSquare checked={userAddress ? userAddress.isDefault : true} /> Chọn làm địa chỉ
            mặc định
          </div>
          <Button
            primary
            large
            className="w-full mt-4"
            text="Xác nhận"
            asyncLoading
            onClick={async () => {
              let res = await handleOnClick(userAddress);
              if (res) props.setShowAddressFormDialog(false);
            }}
          />
        </div>
      </Dialog.Body>
    </Dialog>
  );
};
export default AddressFormDialog;
