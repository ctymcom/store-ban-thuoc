import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { UserAddressService, UserAddress } from "../../../../lib/repo/user-address.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
export const CheckoutContext = createContext<
  Partial<{
    addressSelected: UserAddress;
    setAddressSelected: Function;
    showDialogAddress: boolean;
    setShowDialogAddress: Function;
    loadAddressDefautl: boolean;
    setLoadAddressDefautl: Function;
  }>
>({});

export const CheckoutProvider = (props) => {
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [loadAddressDefautl, setLoadAddressDefautl] = useState(false);
  const [addressSelected, setAddressSelected] = useState<UserAddress>(null);

  const { user } = useAuth();
  useEffect(() => {
    setLoadAddressDefautl(true);
    UserAddressService.getAll({
      query: {
        limit: 1,
        filter: { userId: user.id, isDefault: true },
      },
      fragment: UserAddressService.fullFragment,
    })
      .then((res) => {
        setAddressSelected(res.data.find((item: UserAddress) => item.isDefault));
        setLoadAddressDefautl(false);
      })
      .catch((err) => {
        setLoadAddressDefautl(false);
      });
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        loadAddressDefautl,
        setLoadAddressDefautl,
        addressSelected,
        setAddressSelected,
        showDialogAddress,
        setShowDialogAddress,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};
export const useCheckoutContext = () => useContext(CheckoutContext);
