interface PropsType extends ReactProps {
  icon?: JSX.Element;
  text: string;
}
export function NotFound(props: PropsType) {
  return (
    <div
      className={`w-full flex-center flex-col text-center text-gray-500 py-3 text-16 font-semibold ${
        props.className || ""
      }`}
    >
      {props.icon && <i className="text-3xl mb-1.5">{props.icon}</i>}
      <span>{props.text || "Không tìm thấy"}</span>
    </div>
  );
}
