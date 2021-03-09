import { Checkbox } from "../../../shared/form/checkbox";
import { useState } from "react";
import { MethodCheckout } from "../../../../lib/repo/checkout.repo";
interface PropsType extends ReactProps {
  checkList: MethodCheckout[];
  title: string;
  getCheckPayment?: Function;
}
export function FormCheck(props: PropsType) {
  const { title, checkList } = props;
  const [Checked, setChecked] = useState(false);
  const [iDChecking, setIDChecking] = useState<string>("");
  const setIDCheck = (id: string, code: string) => {
    if (id !== iDChecking) {
      setIDChecking(id);
      setChecked(true);
      if (code === "CK") {
        props.getCheckPayment(true);
      }
      if (code === "COD") {
        props.getCheckPayment(false);
      }
    } else {
      setIDChecking("");
      setChecked(false);
      props.getCheckPayment(false);
    }
  };
  const setCheckBox = (id: string) => {
    if (id !== iDChecking) return false;
    return true;
  };
  const setStyleCheck = (id: string, type: string) => {
    switch (type) {
      case "bo": {
        let tempStyle =
          "text-16 md:text-20 cursor-pointer px-3 py-2 md:px-5 md:py-4 mt-4 border rounded w-full xl:w-1/2 hover:bg-primary-light transition duration-500 ease-in-out whitespace-nowrap";
        if (id === iDChecking) tempStyle += " border-primary bg-primary-light";
        return tempStyle;
      }
      case "he": {
        let tempStyle = " text-20 md:text-20";
        if (id === iDChecking) {
          tempStyle += " text-primary";
        }
        return tempStyle;
      }
    }
  };
  return (
    <>
      <h3 className="uppercase text-20 md:text-20 border-b-4">{title}</h3>
      <div className="w-full xl:w-4/5 block sm:flex gap-5">
        {checkList ? (
          checkList.map((item: MethodCheckout) => {
            return (
              <div
                className={setStyleCheck(item.id, "bo")}
                key={item.id}
                onClick={() => {
                  setIDCheck(item.id, item.code);
                }}
              >
                <div className="flex items-center">
                  <Checkbox checked={setCheckBox(item.id)} />
                  <div>
                    <h4 className={setStyleCheck(item.id, "he")}>{item.code}</h4>
                    <p className="text-gray-500 text-14 md:text-18">{item.name}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Chưa có {title}</p>
        )}
      </div>
    </>
  );
}
