import { createContext, useContext, useEffect, useState } from "react";
import { BankAccount, CheckoutService } from "../../../../lib/repo/checkout.repo";
export const BankAccountsContext = createContext<{
  [x: string]: any;
  accountBanks?: BankAccount[];
}>({});

export function BankAccountsProvider(props) {
  const [accountBanks, setAccountBanks] = useState<BankAccount[]>();
  useEffect(() => {
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
    });
  }, []);
  return (
    <BankAccountsContext.Provider value={{ accountBanks }}>
      {props.children}
    </BankAccountsContext.Provider>
  );
}

export const useBankAccountsContext = () => useContext(BankAccountsContext);
