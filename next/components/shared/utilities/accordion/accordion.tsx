import { MutableRefObject, useRef } from 'react';

interface PropsType extends ReactProps {
  open: boolean
}
export function Accordion(props: PropsType) {
  const ref: MutableRefObject<HTMLDivElement> = useRef()

  return <div 
    className={`relative max-h-0 transition-all overflow-hidden delay-200 ${props.className || ''}`}
    ref={ref}
    style={{ maxHeight: props.open ? ref.current.scrollHeight + 'px' : '' }}
  >
    {props.children}
  </div>
}