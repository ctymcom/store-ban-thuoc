import { HiChevronDown } from 'react-icons/hi';
interface PropsType extends ReactProps {
  value: any
  options: Option[]
  onChange: Function
}
export function Select(props: PropsType) {
  return <div className={`relative flex items-center group${props.className}`}>
    <select className={`border border-gray-400 rounded pl-4 pr-8 py-2 appearance-none hover:border-primary focus:border-primary-dark focus:outline-none ${props.className}`} 
      value={props.value}
      onChange={e => props.onChange(e.target.value)}>
        {
          props.options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)
        }      
    </select>
    <i className="text-gray-500 text-xl absolute right-0 p-2 pointer-events-none group-hover:text-primary"><HiChevronDown/></i>
  </div>
}