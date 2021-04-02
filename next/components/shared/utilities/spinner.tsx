import { CgSpinner } from "react-icons/cg";

interface PropsType extends ReactProps {
  icon?: JSX.Element;
  color?: string;
}
export function Spinner({
  icon = <CgSpinner />,
  color = "primary",
  className = "",
  ...props
}: PropsType) {
  return (
    <div className={`w-full flex-center py-32 px-2 text-${color} ${className}`}>
      <i className="animate-spin text-4xl">{icon}</i>
    </div>
  );
}
