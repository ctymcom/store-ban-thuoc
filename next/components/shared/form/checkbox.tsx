import { FormFieldProps } from "./form-field.type";
import { IconInfor } from "../../../lib/svg/icon-infor";
type CheckBoxProps = FormFieldProps & {
  onChanged?: (value: boolean) => void;
  validate?: (value: boolean) => string;
  count?: string;
  checked?: boolean;
  tooltip?: string;
};
export function Checkbox({
  label,
  name,
  required,
  onChanged,
  checked,
  style,
  count,
  value = "true",
  tooltip = "",
}: CheckBoxProps) {
  const onChange = (e) => {
    if (onChanged) onChanged(e.target.checked);
  };
  return (
    <div className={"flex items-center space-x-3 py-1"}>
      <input
        className="w-3 h-3 transition form-checkbox text-primary-500 border-gray-400 border rounded cursor-pointer"
        defaultValue={value}
        onChange={onChange}
        id={name}
        name={name}
        required={required}
        type="checkbox"
        defaultChecked={checked}
        checked={checked}
      />
      <label className={style + " w-full " + (checked && " text-primary-500")} htmlFor={name}>
        <i className="bg-primary-600"></i>
        <div className="flex justify-between w-full">
          <p className={style + " capitalize " + (checked && " text-primary-500 ")}>{label}</p>
          {count && <p className="text-gray-400">({count})</p>}
        </div>

      </label>
      {
        tooltip !== "" ? (
          <div className="group pt-1 ml-2 w-5 tooltip">
            <i className="text-gray-400">
              <IconInfor />
            </i>
            <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
              {label}
            </div>
          </div>
        ) : (
            ""
          )
      }
    </div >
  );
}
