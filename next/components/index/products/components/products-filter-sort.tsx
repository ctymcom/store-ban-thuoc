
import { HiChevronDown } from 'react-icons/hi';
import { SORT_TYPES } from './../products-page';
interface PropsType {
  sort: string
  onChange: Function
}
export function ProductsFilterSort(props: PropsType) {
  return <div className="relative flex items-center group">
    <select className="border border-gray-400 rounded pl-4 pr-8 py-2 appearance-none hover:border-primary focus:border-primary-dark focus:outline-none"
      value={props.sort}
      onChange={e => props.onChange(e.target.value)}>
        {
          SORT_TYPES.map(type => <option value={type.value}>{type.display}</option>)
        }      
    </select>
    <i className="text-gray-500 text-xl absolute right-1 p-2 pointer-events-none group-hover:text-primary"><HiChevronDown/></i>
  </div>
}