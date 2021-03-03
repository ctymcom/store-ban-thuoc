import { FormEvent, MutableRefObject, useEffect, useRef } from "react"

interface PropsType extends ReactProps {
  id?: string
  onSubmit?: Function
  onChange?: (form: HTMLFormElement, event: Event) => any
}
export function Form({
    className = "bg-white p-3",
    ...props
  }: PropsType) {

  const ref: MutableRefObject<HTMLFormElement> = useRef()

  useEffect(() => {    
    ref.current.addEventListener('change', props.onChange as any);
    return () => {
      ref.current?.removeEventListener('change', props.onChange as any);
    }
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit()
  }

  return <form ref={ref} className={className} id={props.id} onSubmit={e => onSubmit(e)}>
    {props.children}
  </form>
}