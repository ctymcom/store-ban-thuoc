import React from "react";
import { BankAccount } from "../../../../lib/repo/checkout.repo";
interface PropsType extends ReactProps {
  bankInfo: BankAccount;
}
const TransferInformation = ({ bankInfo, ...props }: PropsType) => {
  const coppyToClip = (value: string) => {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData("text/plain", value);
      e.preventDefault();
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  };
  return (
    <div
      className={`p-3 border rounded w-full xl:w-11/12 border-primary bg-green-50 text-16 my-4 ${props.className}`}
    >
      <div className="grid grid-cols-3 items-center leading-8">
        <p className="col-span-3 md:col-span-1 text-gray-400">Chủ tài khoản: </p>
        <div className="col-span-3 md:col-span-2">
          <p className="inline-block">{bankInfo.accountOwner}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center leading-8">
        <p className="col-span-3 md:col-span-1 text-gray-400">Số tài khoản: </p>
        <div className="col-span-3 md:col-span-2">
          <p className="inline-block">{bankInfo.bankAccount}</p>
          <button
            className="inline-block btn-default"
            onClick={(e) => {
              coppyToClip(bankInfo.bankAccount);
            }}
          >
            Sao chép
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center leading-8">
        <p className="col-span-3 md:col-span-1 text-gray-400">Ngân hàng: </p>
        <div className="col-span-3 md:col-span-2">
          <p className="inline-block">{bankInfo.bankName}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center leading-8">
        <p className="col-span-3 md:col-span-1 text-gray-400">Chi nhánh: </p>
        <div className="col-span-3 md:col-span-2">
          <p className="inline-block">{bankInfo.branch}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center leading-8">
        <p className="col-span-3 md:col-span-1 text-gray-400">Nội dung: </p>
        <div className="col-span-3 md:col-span-2">
          <p className="inline-block font-bold">Mã đơn hàng - Tên - Số điện thoại đặt hàng</p>
        </div>
      </div>
    </div>
  );
};

export default TransferInformation;
