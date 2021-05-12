import { useState } from "react";
import { BankAccount } from "../../../../lib/repo/checkout.repo";
import { Button } from "../../../shared/utilities/form/button";
import { Spinner } from "../../../shared/utilities/spinner";
import { BankAccountsProvider, useBankAccountsContext } from "../providers/bank-accounts-provider";
import TransferInformation from "./transfer-information";

export function BankAccounts() {
  return (
    <BankAccountsProvider>
      <ListBankAccount />
    </BankAccountsProvider>
  );
}
function ListBankAccount() {
  const { accountBanks } = useBankAccountsContext();
  const [showAll, setShowAll] = useState(false);
  if (!accountBanks) return <Spinner />;
  return (
    <div>
      {accountBanks?.map((bankInfo: BankAccount, index) => {
        return (
          <TransferInformation
            bankInfo={bankInfo}
            key={bankInfo.id}
            className={index === 0 || showAll ? "" : "hidden"}
          />
        );
      })}
      {accountBanks.length > 1 && (
        <Button
          text={`${showAll ? "Ẩn bớt" : "...xem tất cả"}`}
          onClick={() => setShowAll(!showAll)}
          className="p-0 text-primary opacity-70 hover:opacity-100 m-0"
        />
      )}
    </div>
  );
}
