import React from "react";
import { useState } from "react";
import Dropdown from "../../profile-user/components/dropdown";
import CheckBoxSquare from "./check-box-square";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { useAddressContext } from "../providers/address-provider";
import { Select } from "../../../shared/utilities/form/select";
import { PropsTypeFormDialog } from "./address-list";
import { UserAddress } from "../../../../lib/repo/user-address.repo";
interface PropsType extends PropsTypeFormDialog {
  isOpen: boolean;
  title?: string;
}
const AddressFormDialog = (props: PropsType) => {
  const {
    userAddress,
    handleChange,
    setUserAddress,
    provinces,
    districts,
    wards,
    listAddress,
  } = useAddressContext();
  const [mess, setMess] = useState(null);
  const handleOnChangSelect = (value: string, id: string) => {
    if (userAddress[id] !== value) {
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
    }
  };
  const checkBeforeMutation = (data: UserAddress) => {
    if (data) {
      const { contactName, address, provinceId, districtId, wardId, phone } = data;
      if (!contactName) {
        setMess("Tên liên hệ không được để trống");
        return false;
      }
      if (!phone) {
        setMess("Số điện liên hệ không được để trống");
        return false;
      } else {
        if (phone.length !== 10) {
          setMess("Số điện liên hệ không đúng(10 số)");
          return false;
        }
      }
      if (!provinceId) {
        setMess("Bạn chưa chon tỉnh/thành phố");
        return false;
      }
      if (!districtId) {
        setMess("Bạn chưa chon quận/huyện");
        return false;
      }
      if (!wardId) {
        setMess("Bạn chưa chon xã/phường");
        return false;
      }
      if (!address) {
        setMess("Địa chỉ không được để trống");
        return false;
      }
    } else {
      setMess("Bạn chưa nhập dữ liệu");
      return false;
    }
    return true;
  };
  const handleOnClick = (data: UserAddress) => {
    let res = checkBeforeMutation(data);
    if (res) {
      handleChange(userAddress.id, "formAddress");
      props.setShowAddressFormDialog(false);
    }
  };
  const checkboxChange = () => {
    if (userAddress.id) {
      if (listAddress.length === 1)
        setMess("Bạn không thể thay thế địa chỉ mặc định khi chỉ có một địa chỉ");
      else {
        setUserAddress({ ...userAddress, isDefault: !userAddress.isDefault });
      }
    } else {
      setUserAddress({ ...userAddress, isDefault: !userAddress.isDefault });
    }
  };
  return (
    <Dialog
      width="420px"
      isOpen={props.isOpen}
      mobileMode={false}
      onClose={() => props.setShowAddressFormDialog(false)}
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
            className={`w-full h-12 text-16`}
            options={provinces}
            value={userAddress ? userAddress.provinceId : ""}
            onChange={(e) => {
              handleOnChangSelect(e, "provinceId");
            }}
          />
          <Select
            disabled={!userAddress || userAddress.provinceId === "" ? true : false}
            className={`w-full h-12 text-16`}
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
            className={`w-full h-12 text-16`}
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
          <button
            className="btn-primary w-full h-12 text-16"
            onClick={() => {
              handleOnClick(userAddress);
            }}
          >
            Xác nhận
          </button>
        </div>
        <Dialog
          width="420px"
          isOpen={mess ? true : false}
          mobileMode={false}
          onClose={() => setMess(null)}
          key={mess}
        >
          <Dialog.Body>
            <div>{mess}</div>
          </Dialog.Body>
        </Dialog>
      </Dialog.Body>
    </Dialog>
  );
};
export default AddressFormDialog;
