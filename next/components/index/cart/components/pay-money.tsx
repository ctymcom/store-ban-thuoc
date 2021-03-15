import { BiMoney } from "react-icons/bi";
import { NumberPipe } from "../../../../lib/pipes/number";
interface PropsType extends ReactProps {
  listMoney: ItemCart[];
  order?: any;
}
type ItemCart = {
  title: string;
  money: number;
};
export function PayMoney(props: PropsType) {
  const { listMoney } = props;
  return listMoney ? (
    <>
      <div className="flex border-b-2 items-center pb-2">
        <i className="text-primary text-20">
          <BiMoney />
        </i>
        <p className="uppercase px-2 text-16">Thành Tiền</p>
      </div>
      <div className="my-3">
        {listMoney.length > 0 &&
          listMoney.map((item, index) => {
            return (
              <div
                className="flex justify-between text-16 mb-1.5 md:mb-2.5 md:font-extralight"
                key={index}
              >
                <p>{item.title}</p>
                <p className="font-black lg:font-bold">
                  {NumberPipe(item.money, false)} <span> VND</span>
                </p>
              </div>
            );
          })}
      </div>
    </>
  ) : null;
}
