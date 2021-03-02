interface PropsType extends ReactProps {
  value: any
  placeholder?: string
  name?: string
  type?: 'text' | 'tel' | 'email' | 'number' | 'password'
  onChange: (val: string) => any
}
export function Input({
    type = 'text',
    className = "form-input",
    ...props
  }: PropsType) {
  return <div className="relative flex items-center group">
    <input className={`flex-grow ${className || ''}`} 
      name={props.name}
      value={props.value}
      type={type}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
}