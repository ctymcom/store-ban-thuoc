import { Dialog } from "./dialog";

interface PropsType extends ReactProps {
  isOpen: boolean;
  image: string;
  onClose: Function;
  onClick?: () => void;
}

export function ImageDialog({ className = "", style = {}, ...props }: PropsType) {
  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose} mobileMode={false}>
      <img
        className={`${props.onClick ? "cursor-pointer" : ""} ${className}`}
        style={{ maxWidth: "86vw", ...style }}
        src={props.image || "/assets/img/default.png"}
        onError={(e) => {
          (e.target as any).src = "/assets/img/default.png";
        }}
        onClick={props.onClick}
      />
    </Dialog>
  );
}
