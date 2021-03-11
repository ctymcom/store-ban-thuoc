import { FormEvent, MutableRefObject, useEffect, useRef } from "react";

interface PropsType extends ReactProps {
  id?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => any;
  onChange?: (form: HTMLFormElement, event: Event) => any;
}
export function Form({ className = "bg-white p-3", style, ...props }: PropsType) {
  const ref: MutableRefObject<HTMLFormElement> = useRef();

  useEffect(() => {
    ref.current.addEventListener("change", props.onChange as any);
    return () => {
      ref.current?.removeEventListener("change", props.onChange as any);
    };
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(e);
  };

  return (
    <form ref={ref} className={className} style={style} id={props.id} onSubmit={(e) => onSubmit(e)}>
      {props.children}
    </form>
  );
}
