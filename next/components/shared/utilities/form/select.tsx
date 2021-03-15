import { HiChevronDown } from "react-icons/hi";
interface PropsType extends ReactProps {
  value: any;
  options: Option[];
  onChange: Function;
  disabled?: boolean;
  wrapperClassName?: string;
}
export function Select({ className = "", wrapperClassName = "", ...props }: PropsType) {
  return (
    <div className={`relative flex items-center group ${wrapperClassName}`}>
      <select
        disabled={props.disabled ? props.disabled : false}
        className={`form-input appearance-none pr-8 ${className}`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <i className="text-gray-500 text-xl absolute right-0 p-2 pointer-events-none group-hover:text-primary">
        <HiChevronDown />
      </i>
    </div>
  );
}
