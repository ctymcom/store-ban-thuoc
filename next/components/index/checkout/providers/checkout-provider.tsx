import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { UserAddressService, UserAddress } from "../../../../lib/repo/user-address.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { CheckoutService, MethodCheckout, Order } from "../../../../lib/repo/checkout.repo";
import { CartProduct } from "../../../../lib/providers/cart-provider";
import { GraphService } from "../../../../lib/repo/graph.repo";
export const CheckoutContext = createContext<
  Partial<{
    addressSelected: UserAddress;
    setAddressSelected: Function;
    showDialogAddress: boolean;
    setShowDialogAddress: Function;
    loadingCheckout: boolean;
    paymenMethods: MethodCheckout[];
    deliveryMethods: MethodCheckout[];
  }>
>({});

export const CheckoutProvider = (props) => {
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState<UserAddress>(null);
  const [paymenMethods, setPaymenMethods] = useState<MethodCheckout[]>(null);
  const [deliveryMethods, setDeliveryMethods] = useState<MethodCheckout[]>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    setLoadingCheckout(true);
    let tasks = [
      UserAddressService.getAll({
        query: {
          limit: 1,
          filter: { userId: user.id, isDefault: true },
        },
        fragment: UserAddressService.fullFragment,
      }).then((res) => {
        setAddressSelected(res.data.find((item: UserAddress) => item.isDefault));
      }),
      CheckoutService.getMethods("getAllPaymentMethod").then((res) => {
        setPaymenMethods([
          ...res.map((x) => ({
            id: x.id,
            code: x.code,
            name: x.name,
            name2: x.name2,
            discountRate: x.discountRate,
          })),
        ]);
      }),
      CheckoutService.getMethods("getAllDeliveryMethod").then((res) => {
        setDeliveryMethods([
          ...res.map((x) => ({
            id: x.id,
            code: x.code,
            name: x.name,
            name2: x.name2,
            discountRate: x.discountRate,
          })),
        ]);
      }),
    ];
    Promise.all(tasks)
      .then((res) => {
        setLoadingCheckout(false);
      })
      .catch((err) => {});
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        loadingCheckout,
        addressSelected,
        setAddressSelected,
        showDialogAddress,
        setShowDialogAddress,
        paymenMethods,
        deliveryMethods,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};
export const useCheckoutContext = () => useContext(CheckoutContext);
