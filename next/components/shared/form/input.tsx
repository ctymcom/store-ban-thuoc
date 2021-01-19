import { FormFieldProps } from "./form-field.type";

export function Input({ label, name, required, placeholder, inputType = "text", icon = '', style, value, ...props }: FormFieldProps) {
    const onChange = (e) => {
        if (props.onChanged) props.onChanged(e.target.value);
    }
    return <div className="flex flex-col mb-3 ">
        {label && <label className="font-bold mb-1" htmlFor={name} >{label}</label>}
        <input onChange={onChange}
            defaultValue={value}
            required={required}
            name={name}
            className={(icon != '' && "pl-10 ") + style + " border-solid  w-full h-full bg-white border-gray-300 border p-4 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-secondary-500 focus:border-primary-400"}
            type={inputType}
            placeholder={placeholder} />

    </div>;
}