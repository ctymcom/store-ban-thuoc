import { FormField } from "../../../../src/graphql/modules/form/types/formField.type";
import { FormFieldProps } from "./form-field.type";
type CheckBoxProps = FormFieldProps & {
    onChanged?: (value: boolean) => void,
    validate?: (value: boolean) => string
    checked?: boolean
}
export function Checkbox({ label, name, required, onChanged, checked, value = "true"}: CheckBoxProps) {
    const onChange = (e) => {
        if (onChanged) onChanged(e.target.value);
    }
    return <div className="mb-3">
    <span className="mr-3"><input defaultValue={value} onChange={onChange} name={name} required={required} type="checkbox" checked={checked}/></span>
    <label className="font-bold" htmlFor={name}>{label}</label>
</div>
}
