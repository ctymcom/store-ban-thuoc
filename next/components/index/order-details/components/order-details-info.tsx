import { BankAccounts } from "../../checkout/components/bank-accounts";

interface PropsType extends ReactProps {
  name: string;
  phone: string;
  address: string;
  deliveryMethod: string;
  deliveryMethodText: string;
  paymentMethod: string;
  paymentMethodText: string;
  paymentStatus?: string;
}
export function OrderDetailsInfo(props: PropsType) {
  const infos = [
    {
      title: "Địa chỉ giao hàng",
      text: props.name + " - " + props.phone,
      subtext: props.address,
    },
    {
      title: "Hình thức vận chuyển",
      text: props.deliveryMethod,
      subtext: props.deliveryMethodText,
    },
    {
      title: "Phương thức thanh toán",
      text: props.paymentMethod,
      subtext: props.paymentMethodText,
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap -m-3">
        {infos.map((info, index) => (
          <div
            className={`border-b-2 sm:border-2 border-gray-200 md:rounded p-4 sm:p-3 m-0 sm:m-1.5 md:m-2.5 min-w-full sm:min-w-xs md:min-w-2xs xl:min-w-xs sm:max-w-2xs md:max-w-2xs lg:max-w-2xs info`}
            key={index}
          >
            <div className="text-lg text-primary font-semibold mb-1 lg:mb-2">{info.title}</div>
            <div className="text-gray-700 font-semibold mb-0 lg:mb-1">{info.text}</div>
            <div className="text-gray-600">{info.subtext}</div>
          </div>
        ))}
      </div>
      <div className="w-full">{props.paymentMethod == "CK" && <BankAccounts />}</div>
    </div>
  );
}
