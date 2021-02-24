import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md'
import { HiChevronDown } from 'react-icons/hi';

interface PropsType {
  id: string
  text: string
  checked: boolean
  open?: boolean
  onClick: () => void
  toggleOpen?: () => void
}
export function ProductsFilterCheckbox(props: PropsType) {

  return <>
    <div className="flex">
      <div className={"flex items-start flex-grow rounded text-gray-600 font-semibold px-3 py-2 cursor-pointer group hover:bg-primary-light " + 
        (props.checked === false ? "hover:text-primary" : "") + 
        (props.checked === true ? "text-gray-700 hover:text-primary" : "") +
        (props.checked === undefined ? "text" : "")
      }
      onClick={props.onClick}>
          {
            props.checked === true ? 
            <i className="pt-0.5 text-xl text-primary group-hover:text-primary-dark"><MdCheckBox /></i> : 
            props.checked === false ? 
            <i className="pt-0.5 text-xl text-gray-500 group-hover:text-primary"><MdCheckBoxOutlineBlank /></i> : 
            <i className="pt-0.5 text-xl text-accent group-hover:text-accent-dark"><MdIndeterminateCheckBox /></i>
          }
        <span className="pl-2">{props.text}</span>
      </div>
      {
        props.toggleOpen && 
          <button className="btn-default px-3 hover:bg-primary-light rounded-l-none border-l border-gray-50" onClick={props.toggleOpen}>
            <i className={`text-24 transform transition ${props.open?'rotate-180':''}`}><HiChevronDown/></i>
          </button>
      }
    </div>
  </>
}