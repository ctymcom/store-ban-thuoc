
import { HiOutlineSearch } from 'react-icons/hi';
import { HiOutlineX } from 'react-icons/hi';

interface PropsType extends ReactProps {
  searchText: string
  onChange: Function
}
export function QuickShoppingSearch(props: PropsType) {
  return <div className="relative flex items-center">
    <input 
      className="w-full px-12 h-12 border rounded border-gray-500 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20"
      placeholder="Tìm kiếm nhanh thuốc" autoFocus
      value={props.searchText}
      onChange={(e) => props.onChange(e.target.value)}/>
    <i className="absolute left-4 text-gray-500"><HiOutlineSearch/></i>
    {
      props.searchText && <button className="btn-default is-danger p-0 h-12 w-10 absolute right-0" onClick={() => props.onChange('')}>
        <i><HiOutlineX/></i>
      </button>
    }
  </div>
}