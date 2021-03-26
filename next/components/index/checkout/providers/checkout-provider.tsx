import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { UserAddressService, UserAddress } from "../../../../lib/repo/user-address.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { CheckoutService, MethodCheckout, BankAccount } from "../../../../lib/repo/checkout.repo";
import { SettingService } from "../../../../lib/repo/setting.repo";
export const CheckoutContext = createContext<
  Partial<{
    addressSelected: UserAddress;
    setAddressSelected: Function;
    showDialogAddress: boolean;
    setShowDialogAddress: Function;
    loadingCheckout: boolean;
    paymenMethods: MethodCheckout[];
    deliveryMethods: MethodCheckout[];
    policy: string;
    accountBanks: BankAccount[];
    setAccountBanks: Function;
  }>
>({});

export const CheckoutProvider = (props) => {
  const [policy, setPolicy] = useState(null);
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState<UserAddress>(null);
  const [paymenMethods, setPaymenMethods] = useState<MethodCheckout[]>(null);
  const [deliveryMethods, setDeliveryMethods] = useState<MethodCheckout[]>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [accountBanks, setAccountBanks] = useState<BankAccount[]>([]);
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
      CheckoutService.getAllBankAccount().then((res) => {
        setAccountBanks([
          ...res.map((x) => ({
            id: x.id,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
            unitID: x.unitID,
            account: x.account,
            bankAccount: x.bankAccount,
            accountOwner: x.accountOwner,
            bankName: x.bankName,
            bankName2: x.bankName2,
            province: x.province,
            phone: x.phone,
            fax: x.fax,
            email: x.email,
            homePage: x.homePage,
            partner: x.partner,
            taxCode: x.taxCode,
            note: x.note,
            branch: x.branch,
          })),
        ]);
      }),
      SettingService.getAll({
        query: {
          limit: 0,
          filter: {
            key: { __in: ["POLICY"] },
          },
        },
      }).then((res) => {
        setPolicy(res.data.find((x) => x.key == "POLICY").value);
      }),
    ];
    Promise.all(tasks)
      .then((res) => {
        setLoadingCheckout(false);
        console.log(accountBanks);
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
        policy,
        accountBanks,
        setAccountBanks,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};
export const useCheckoutContext = () => useContext(CheckoutContext);
