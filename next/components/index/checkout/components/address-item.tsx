import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import CheckBoxCricle from "../../cart/components/check-box-circle";
import { useEffect, useState } from "react";
import { useAddressContext } from "../providers/address-provider";
import { UserAddress } from "../../../../lib/repo/user-address.repo";
import { PropsTypeFormDialog } from "./address-list";
import { useCheckoutContext } from "../providers/checkout-provider";
import { Button } from "../../../shared/utilities/form/button";
interface Proptype extends PropsTypeFormDialog {
  address: UserAddress;
}

export function AddressItem(props: Proptype) {
  const [address, setAddress] = useState(props.address);
  const { setDefaultAddress, setUserAddress, deleteCartProduct } = useAddressContext();
  const { setAddressSelected, addressSelected } = useCheckoutContext();
  useEffect(() => {
    setAddress(props.address);
  }, [props.address]);
  return (
    <div
      key={props.address.id}
      className={`border-b-2 py-4 text-gray-600 text-16 leading-7 ${
        address.id === addressSelected?.id ? "bg-primary-light" : ""
      }`}
    >
      <div
        className="flex items-center gap-1 cursor-pointer w-11/12 mx-auto"
        onClick={() => {
          setAddressSelected(address);
        }}
      >
        <CheckBoxCricle checked={address.id === addressSelected?.id ? true : false} />
        <div className="">
          <p className="font-semibold whitespace-nowrap">
            {address.contactName} - {address.phone}
          </p>
          <p>{address.fullAddress}</p>
        </div>
      </div>
      <div className="flex items-center whitespace-nowrap text-gray-500 pt-2 w-11/12 mx-auto">
        {address.isDefault ? (
          <p className="text-primary text-center px-4">[Mặc định]</p>
        ) : (
          <Button
            className="btn-outline rounded-lg text-16 "
            asyncLoading
            onClick={async () => await setDefaultAddress(address.id)}
            text="Đặt mặc định"
          />
        )}
        <button
          className="ml-auto btn-default text-16  px-0"
          onClick={() => {
            setUserAddress(address);
            props.setShowAddressFormDialog(true);
          }}
        >
          <i className="p-1">
            <HiOutlinePencilAlt />
          </i>
          Chỉnh sửa
        </button>
        <Button
          className="ml-3 btn-default hover:text-danger text-16  px-0"
          asyncLoading
          icon={<HiOutlineTrash />}
          onClick={async () => await deleteCartProduct(address.id)}
          text="Xóa"
        />
      </div>
    </div>
  );
}
