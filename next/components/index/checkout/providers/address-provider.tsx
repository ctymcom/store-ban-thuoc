import React from "react";
import { createContext, useState, useEffect, useContext, Children } from "react";
import { AddressService } from "../../../../lib/repo/address.repo";
import { UserAddressService, UserAddress } from "../../../../lib/repo/user-address.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { cloneDeep } from "lodash";
import { useCheckoutContext } from "./checkout-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
export const AddressContext = createContext<
  Partial<{
    listAddress: UserAddress[];
    addressSelected: UserAddress;
    userAddress: UserAddress;
    setListAdress: Function;
    setAddressSelected: Function;
    deleteCartProduct: Function;
    submitFormAddressUser: Function;
    setDefaultAddress: Function;
    setUserAddress: Function;
    provinces: Option[];
    setProvinces: Function;
    districts: Option[];
    wards: Option[];
  }>
>({});

export const AddressProvider = (props) => {
  const toast = useToast();
  const [listAddress, setListAdress] = useState<UserAddress[]>(null);
  const [userAddress, setUserAddress] = useState<UserAddress>(null);
  const { setAddressSelected, addressSelected } = useCheckoutContext();
  const { user } = useAuth();
  const [provinces, setProvinces] = useState<Option[]>(null);
  const [districts, setDistricts] = useState<Option[]>(null);
  const [wards, setWards] = useState<Option[]>(null);
  const loadList = () => {
    UserAddressService.getAll({
      query: {
        limit: 0,
        filter: { userId: user.id },
      },
      fragment: UserAddressService.fullFragment,
    }).then((res) => {
      setListAdress(cloneDeep(res.data));
      setUserAddress(null);
      if (addressSelected === null)
        setAddressSelected(res.data.find((item: UserAddress) => item.isDefault));
    });
  };
  useEffect(() => {
    let task = [
      AddressService.getProvinces().then((res) => {
        setProvinces([
          { value: "", label: "Chọn Tỉnh/Thành" },
          ...res.map((x) => ({ value: x.id, label: x.province })),
        ]);
      }),
      loadList(),
    ];
    Promise.all(task).then();
  }, []);
  useEffect(() => {
    AddressService.getDistricts(userAddress ? userAddress.provinceId : "").then((res) => {
      setDistricts([
        { value: "", label: "Chọn Quận/Huyện" },
        ...res.map((x) => ({ value: x.id, label: x.district })),
      ]);
    });
  }, [userAddress?.provinceId]);
  useEffect(() => {
    AddressService.getWards(userAddress ? userAddress.districtId : "").then((res) => {
      setWards([
        { value: "", label: "Chọn Phường/Xã" },
        ...res.map((x) => ({ value: x.id, label: x.ward })),
      ]);
    });
  }, [userAddress]);

  const updateOrCreateUserAddress = async (data: UserAddress) => {
    const {
      contactName,
      address,
      provinceId,
      districtId,
      wardId,
      phone,
      location,
      isDefault,
    } = data;
    return await UserAddressService.createOrUpdate({
      id: data.id,
      data: {
        contactName,
        address,
        provinceId,
        districtId,
        wardId,
        phone,
        location,
        isDefault,
      },
    });
  };
  async function setDefaultAddress(id: string) {
    try {
      let oldDefault = listAddress.find((item) => item.isDefault);
      let newDefault = listAddress.find((item) => item.id === id);
      let res = await UserAddressService.mutate({
        mutation: oldDefault
          ? [
              UserAddressService.updateQuery({ id: oldDefault?.id, data: { isDefault: false } }),
              UserAddressService.updateQuery({ id: newDefault?.id, data: { isDefault: true } }),
            ]
          : [UserAddressService.updateQuery({ id: newDefault?.id, data: { isDefault: true } })],
      });
      if (res) toast.warn(res.message);
      loadList();
    } catch (error) {
      console.log(error);
    }
  }
  const deleteCartProduct = async (id: string) => {
    let task = [];
    let addressDeleting = listAddress.find((item) => item.id === id);
    if (listAddress.length > 1) {
      if (addressDeleting.isDefault) {
        let idNewDefault: string;
        listAddress.forEach((item) => {
          if (!item.isDefault) {
            idNewDefault = item.id;
            return;
          }
        });
        task.push(setDefaultAddress(idNewDefault));
      }
    }
    if (addressDeleting.id === addressSelected?.id) {
      task.push(setAddressSelected(null));
    }
    await Promise.all(task);
    console.log(addressSelected);

    let res = await UserAddressService.delete({ id });
    if (res) toast.error(res.message);
    loadList();
  };
  const submitFormAddressUser = async () => {
    let res: any;
    if (listAddress.length > 0) {
      if (userAddress.isDefault) {
        let oldDefault = listAddress.find((item) => item.isDefault);
        if (oldDefault) {
          await UserAddressService.update({
            id: oldDefault?.id,
            data: { isDefault: false },
          });
        }
      }
    }
    res = await updateOrCreateUserAddress(userAddress);
    if (res) {
      toast.error(res.message);
    } else {
      toast.success("Thao tác thành công");
    }
    loadList();
  };
  return (
    <AddressContext.Provider
      value={{
        districts,
        provinces,
        setProvinces,
        wards,
        submitFormAddressUser,
        listAddress,
        userAddress,
        setListAdress,
        setUserAddress,
        deleteCartProduct,
        setDefaultAddress,
      }}
    >
      {props.children}
    </AddressContext.Provider>
  );
};
export const useAddressContext = () => useContext(AddressContext);
