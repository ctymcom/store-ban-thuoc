import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md'

interface PropsType {
  id: string
  text: string
  checked: boolean
  onClick: Function
}
export function ProductsFilterCheckbox(props: PropsType) {

  return <>
    <div className={"flex items-start rounded text-gray-600 font-semibold px-3 py-2 cursor-pointer group hover:bg-primary-light " + 
    (props.checked === false ? "hover:text-primary" : "") + 
    (props.checked === true ? "text-gray-700 hover:text-primary" : "") +
    (props.checked === undefined ? "text" : "")
  }
    onClick={() => props.onClick()}>
        {
          props.checked === true ? 
          <i className="pt-1 text-xl text-primary group-hover:text-primary-dark"><MdCheckBox /></i> : 
          props.checked === false ? 
          <i className="pt-1 text-xl text-gray-500 group-hover:text-primary"><MdCheckBoxOutlineBlank /></i> : 
          <i className="pt-1 text-xl text-accent group-hover:text-accent-dark"><MdIndeterminateCheckBox /></i>
        }
      
      <span className="pl-2">{props.text}</span>
    </div>
  </>
}