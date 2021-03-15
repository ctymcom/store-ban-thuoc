import { Checkbox } from "../../../shared/form/checkbox";
import { useState, useEffect } from "react";
import { MethodCheckout } from "../../../../lib/repo/checkout.repo";
interface PropsType extends ReactProps {
  checkList: MethodCheckout[];
  title: string;
  setMethod: Function;
}
export function FormCheck(props: PropsType) {
  const { title, checkList } = props;
  const [iDChecking, setIDChecking] = useState<string>("");
  useEffect(() => {
    if (checkList) {
      setIDChecking(checkList[0].id);
      props.setMethod(checkList[0]);
    }
  }, [checkList]);
  const setIDCheck = (method: MethodCheckout) => {
    if (method.id !== iDChecking) {
      setIDChecking(method.id);
      props.setMethod(method);
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
          "cursor-pointer px-3 py-2 md:px-5 md:py-4 mt-4 border rounded w-full xl:w-1/2 hover:bg-primary-light transition duration-500 ease-in-out whitespace-nowrap overflow-hidden ";
        if (id === iDChecking) tempStyle += " border-primary bg-primary-light";
        return tempStyle;
      }
      case "he": {
        let tempStyle = " text-16";
        if (id === iDChecking) {
          tempStyle += " text-primary";
        }
        return tempStyle;
      }
    }
  };
  return (
    <>
      <h3 className="uppercase text-16 border-b-2 ">{title}</h3>
      <div className="w-full xl:w-11/12 block sm:flex gap-5">
        {checkList ? (
          checkList.map((item: MethodCheckout) => {
            return (
              <div
                className={setStyleCheck(item.id, "bo")}
                key={item.id}
                onClick={() => {
                  setIDCheck(item);
                }}
              >
                <div className="flex items-center">
                  <Checkbox checked={setCheckBox(item.id)} />
                  <div>
                    <h4 className={setStyleCheck(item.id, "he")}>{item.code}</h4>
                    <p className="text-gray-500 text-14 md:text-16">{item.name}</p>
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
