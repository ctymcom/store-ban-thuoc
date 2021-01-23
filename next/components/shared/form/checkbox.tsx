import { IconInfor } from "../../../lib/svg";
import { FormFieldProps } from "./form-field.type";
type CheckBoxProps = FormFieldProps & {
    onChanged?: (value: boolean) => void,
    validate?: (value: boolean) => string
    checked?: boolean,
    tooltip?: string
}
export function Checkbox({ label, name, required, onChanged, checked, style, value = "true", tooltip = '' }: CheckBoxProps) {
    const onChange = (e) => {
        if (onChanged) onChanged(e.target.checked);
    }
    return <div className={"flex items-center space-x-3"}>
        <input className="w-5 h-5 transition form-checkbox text-primary-500 rounded-md border-gray-400 border-2" defaultValue={value}
            onChange={onChange} id={name} name={name} required={required} type="checkbox" defaultChecked={checked} checked={checked} />
        <label className={style + " "} htmlFor={name}>
            <i className='bg-primary-600'></i>
            {label}
        </label>
        {
            tooltip !== '' ?
                <div className="group pt-1 ml-2 w-5 tooltip" >
                    <i className='text-gray-400'>
                        <IconInfor />
                    </i>
                    <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                        {
                            label
                        }
                    </div>
                </div> : ''
        }

    </div>
}
