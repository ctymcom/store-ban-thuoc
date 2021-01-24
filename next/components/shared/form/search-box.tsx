import { useRef, useEffect, useState } from "react";
import { IconInfor } from "../../../lib/svg/icon-infor";
import { IconSearch } from "../../../lib/svg/icon-search";
import { FormFieldProps } from "./form-field.type";
import { Label } from "./label";

export type SelectBoxOption = {
  value: string;
  display?: string;
  style?: string;
};
type SelectBoxProps = FormFieldProps & {
  options?: SelectBoxOption[] | string[];
  noneOption?: SelectBoxOption;
  onSearch?: (keyword: string) => Promise<SelectBoxOption[] | string[]>;
};
export function SearchBox({
  label,
  name,
  placeholder,
  required,
  value,
  style,
  options = [],
  noneOption,
  onChanged,
  onSearch,
  ...props
}: SelectBoxProps) {
  const [ValueInput, setValueInput] = useState("");
  const [Show, setShow] = useState(false);
  const [SelectIndex, setSelectIndex] = useState(0);
  const [Options, setOptions] = useState(options);
  let selectIndex = SelectIndex;
  const wrapperRef = useRef(undefined);
  const handleClickOutside = (event) => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    }
  };
  const selectItem = (item) => {
    setValueInput(item);
    if (props.onChange != null) props.onChange(item);
    setShow(false);
  };
  const replaceBold = (item) => {
    return item.replace(ValueInput, `<b>${ValueInput}</b>`);
  };
  const handleKeyDown = (event) => {
    switch (event.code) {
      case "ArrowUp":
        selectIndex = selectIndex == 0 ? options.length - 1 : selectIndex - 1;
        event.preventDefault();
        setSelectIndex(selectIndex);
        break;
      case "ArrowDown":
        selectIndex = selectIndex == options.length - 1 ? 0 : selectIndex + 1;
        event.preventDefault();
        setSelectIndex(selectIndex);
        break;
      case "Enter":
        selectItem(options[selectIndex]);
        event.preventDefault();
        break;
    }
  };
  useEffect(() => {
    if (Show) {
      selectIndex = (options as string[]).indexOf(ValueInput);
      setSelectIndex(selectIndex);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [Show]);
  return (
    <>
      <div className="">
        <div className="relative" ref={wrapperRef}>
          {label && (
            <div className="flex items-center">
              <Label text={label} htmlFor={name} />
              {props.tooltip && (
                <div className="group pt-1 ml-2 w-5 tooltip">
                  <i className="text-gray-400">
                    <IconInfor />
                  </i>
                  <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                    {props.tooltip}
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={
              (Show ? " border-primary-500 " : "  border-gray-300 ") +
              style +
              " transition border min-w-max w-full rounded-lg text-sm text-gray-400 relative flex items-center justify-between"
            }
            onClick={() => setShow(true)}
          >
            <input
              type="text"
              className=" rounded-lg p-4 w-full focus:outline-none"
              value={ValueInput}
              placeholder="Nhập search"
              onChange={(e) => {
                setValueInput(e.target.value);
                if (onSearch) {
                  const regex = new RegExp(e.target.value, "i");
                  onSearch(e.target.value)
                    // .then((res: any[]) => res.map((r) => r.replace(regex, "<b class= text-secondary-400 >$&</b>")))
                    .then((res) => setOptions(res));
                }
              }}
            />
            <div
              className={"w-5 h-5 transition absolute right-5 " + (Show && " text-secondary-400")}
            >
              <IconSearch />
            </div>
          </div>
          {Show ? (
            <div className="absolute z-50 shadow bg-white w-full max-h-56 top-full mt-1 border border-gray-300 text-sm text-gray-400  border-t-0 overflow-auto rounded-md">
              <ul>
                {(Options as any[]).map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={"p-4 hover:bg-gray-200 " + (SelectIndex == index && "bg-gray-200")}
                      onClick={() => {
                        setValueInput(item);
                        if (onChanged != null) onChanged(item);
                        setShow(false);
                        selectItem(item);
                      }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: replaceBold(item) }}></span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
