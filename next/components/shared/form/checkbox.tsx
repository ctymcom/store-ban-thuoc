import { FormFieldProps } from "./form-field.type";
type CheckBoxProps = FormFieldProps & {
    onChanged?: (value: boolean) => void,
    validate?: (value: boolean) => string
    checked?: boolean
}
export function Checkbox({ label, name, required, onChanged, checked, style, value = "true" }: CheckBoxProps) {
    const onChange = (e) => {
        if (onChanged) onChanged(e.target.value);
    }
    return <div className={"flex items-center space-x-3"}>
        <input className="w-5 h-5 transition form-checkbox text-primary-500 rounded-md border-gray-400 border-2" defaultValue={value}
            onChange={onChange} id={name} name={name} required={required} type="checkbox" defaultChecked={checked} checked={checked} />
        <label className={style + " "} htmlFor={name}>
            <i className='bg-primary-600'></i>
            {label}
        </label>
    </div>
}
