import { useEffect, useRef, MutableRefObject } from "react";

interface PropsType extends ReactProps {
  value: any;
  rows?: number;
  readonly?: boolean;
  placeholder?: string;
  name?: string;
  wrapperClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  onChange?: (val: string) => any;
}
export function Textarea({
  className = "",
  style = {},
  wrapperClassName = "",
  prefixClassName = "",
  ...props
}: PropsType) {
  const ref: MutableRefObject<HTMLTextAreaElement> = useRef();

  useEffect(() => {
    ref.current.style.height = "0px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [props.value]);
  return (
    <div className={`relative flex items-start group  ${wrapperClassName}`}>
      {!!props.prefix && (
        <div
          className={`flex-shrink-0 flex items-center px-3 min-w-10 h-10 bg-gray-100 border border-gray-400 border-r-0 ${prefixClassName}`}
        >
          {props.prefix}
        </div>
      )}
      <textarea
        ref={ref}
        rows={props.rows || 3}
        className={`form-input box-content py-2 ${className || ""}`.trim()}
        style={{ width: `calc(100% - 24px)`, ...style }}
        name={props.name}
        readOnly={props.readonly}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
