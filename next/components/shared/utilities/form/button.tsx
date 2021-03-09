import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface PropsType extends ReactProps {
  small?: boolean;
  large?: boolean;
  default?: boolean;
  primary?: boolean;
  accent?: boolean;
  info?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  type?: "button" | "reset" | "submit";
  icon?: JSX.Element;
  iconPosition?: "start" | "end";
  text?: JSX.Element | string;
  isLoading?: boolean;
  asyncLoading?: boolean;
  onClick?: ((...args: any[]) => Promise<any>) | ((...args: any[]) => any);
}
export function Button({
  className = "",
  type = "button",
  iconPosition = "start",
  ...props
}: PropsType) {
  let buttonClass = "";
  if (props.default) buttonClass = "btn-default";
  else if (props.primary) buttonClass = "btn-primary";
  else if (props.accent) buttonClass = "btn-accent";
  else if (props.info) buttonClass = "btn-info";
  else if (props.success) buttonClass = "btn-success";
  else if (props.danger) buttonClass = "btn-danger";
  else if (props.warning) buttonClass = "btn-warning";

  let buttonSize = "";
  if (props.small) buttonSize = "btn-sm";
  else if (props.large) buttonSize = "btn-lg";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(props.isLoading);
  }, [props.isLoading]);

  const onClick = () => {
    if (!props.onClick) return;

    if (props.asyncLoading) {
      if (loading) return;

      setLoading(true);
      (props.onClick() as Promise<any>).finally(() => {
        setLoading(false);
      });
    } else {
      props.onClick();
    }
  };

  return (
    <button
      className={`${buttonClass} ${buttonSize} ${
        iconPosition == "end" ? "flex-row-reverse" : ""
      } ${className}`.trim()}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {props.icon && (
        <>
          {loading ? (
            <i className="text-xl animate-spin">
              <CgSpinner />
            </i>
          ) : (
            <i className="text-xl">{props.icon}</i>
          )}
        </>
      )}
      {props.text && (
        <span
          className={`relative transform transition ${
            !props.icon && loading ? "translate-x-2.5" : ""
          }`}
        >
          {!props.icon && loading && (
            <i className="text-xl transition animate-spin absolute -left-6">
              <CgSpinner />
            </i>
          )}
          {props.text}
        </span>
      )}
      {props.children}
    </button>
  );
}
