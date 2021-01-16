import { FormFieldProps } from "./form-field.type";
type CheckBoxProps = FormFieldProps & {
    onChanged?: (value: boolean) => void,
    validate?: (value: boolean) => string
    checked?: boolean
}
export function Checkbox({ label, name, required, onChanged, checked, value = "true" }: CheckBoxProps) {
    const onChange = (e) => {
        if (onChanged) onChanged(e.target.value);
    }
    return <div className=" flex items-center">
        <span className="mr-3 flex items-center"><input className="w-4 h-4 bg-primary-500" defaultValue={value}
            onChange={onChange} name={name} required={required} type="checkbox" defaultChecked={checked} />
        </span>
        <label className="font-bold text-sm" htmlFor={name}>{label}</label>
    </div>
}
