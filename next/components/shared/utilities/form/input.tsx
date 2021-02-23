interface PropsType extends ReactProps {
  value: any
  placeholder?: string
  type?: 'text' | 'tel' | 'email' | 'number' | 'password'
  onChange: Function
}
export function Input({
    type = 'text',
    ...props
  }: PropsType) {
  return <div className="relative flex items-center group">
    <input className={`border border-gray-400 rounded pl-4 pr-8 py-2 hover:border-primary focus:border-primary-dark focus:outline-none ${props.className}`} 
      value={props.value}
      type={type}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
}