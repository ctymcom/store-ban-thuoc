interface PropsType extends ReactProps {
  value: any
  name?: string
  readonly?: boolean
  onChange?: (val: boolean) => any
}
export function Switch({
    ...props
  }: PropsType) {
  return <span className="switch" onClick={e => props.onChange(!props.value)}>
    <input
      type="checkbox"
      value={props.value}
      checked={props.value}
      name={props.name}
      readOnly={props.readonly}
    />
    <span className="slider round"></span>
  </span>
}