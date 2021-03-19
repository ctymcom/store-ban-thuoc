import { HiOutlineInformationCircle } from "react-icons/hi";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { NumberPipe } from "../../../../lib/pipes/number";
import { useCart } from "../../../../lib/providers/cart-provider";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
interface PropsType extends ReactProps {
  listMoney?: MoneyItem[];
  order?: any;
}
type MoneyItem = {
  title: string;
  money: number;
};
export function PayMoney(props: PropsType) {
  const { usePoint } = useCart();
  const { listMoney } = props;
  const [showUsePoint, setShowUsePoint] = useState({ isUsing: false, mess: "" });
  const router = useRouter();
  useEffect(() => {
    if (router.pathname == "/checkout" && usePoint) {
      showUsePoint.isUsing = true;
      showUsePoint.mess = "Bạn đang sử dụng điểm thưởng cho đơn hàng này";
      setShowUsePoint({ ...showUsePoint });
    }
  }, []);
  return (
    <div className="mt-4">
      <div className="flex border-b-2 items-center pb-2">
        <i className="text-primary text-20">
          <FaRegMoneyBillAlt />
        </i>
        <p className="uppercase px-2 text-16">Thành Tiền</p>
      </div>
      <div className="mt-3">
        {listMoney?.length > 0 ? (
          listMoney.map((item, index) => {
            return (
              <div className="flex justify-between text-16 " key={index}>
                <p>{item.title}</p>
                <p className="font-black lg:font-bold">
                  {NumberPipe(item.money, false)} <span> VND</span>
                </p>
              </div>
            );
          })
        ) : (
          <p>Vui lòng chọn địa chỉ giao hàng để xen "Giảm giá"</p>
        )}
        {showUsePoint.isUsing ? (
          <p className="text-16 flex text-primary gap-2">
            <i className="text-18">
              <HiOutlineInformationCircle />
            </i>
            {showUsePoint.mess}
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
