import { createPortal, render } from "react-dom";

interface PropsType extends ReactProps {
  dialogClass?: string
}
export function Dialog(props: PropsType) {
  let el = (<div className="fixed" style={{inset: 0, zIndex: 1000}}>
    <div className="absolute w-full h-full bg-black opacity-40"></div>
    <div className={"rounded bg-white shadow-lg " + props.dialogClass}>
      {props.children}
    </div>
  </div>)
  render(el, document.getElementById('dialog-root'))
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `17px`;
}