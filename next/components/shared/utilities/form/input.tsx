interface PropsType extends ReactProps {
  value: any
  placeholder?: string
  name?: string
  type?: 'text' | 'tel' | 'email' | 'number' | 'password'
  inputClassName?: string
  prefix?: string
  prefixClassName?: string
  onChange?: (val: string) => any
}
export function Input({
    type = 'text',
    inputClassName = "form-input",
    prefixClassName = "",
    ...props
  }: PropsType) {
  return <div className={`relative flex items-center group ${props.className || ''}`}>
    {
      !!props.prefix && 
      <div className={`flex-shrink-0 flex items-center px-3 min-w-10 h-10 bg-gray-100 border border-gray-400 border-r-0 ${prefixClassName}`}>
        {props.prefix}
      </div>
    }
    <input className={`flex-grow ${inputClassName || ''}`} 
      name={props.name}
      value={props.value}
      type={type}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
}