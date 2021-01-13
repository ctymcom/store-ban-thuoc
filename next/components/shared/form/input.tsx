import { FormFieldProps } from "./form-field.type";

export function Input({ label, name, required, placeholder, inputType = "text", value, ...props }: FormFieldProps) {
    const onChange = (e) => {
        if (props.onChanged) props.onChanged(e.target.value);
    }
    return <div className="flex flex-col mb-3 ">
        {label && <label className="font-bold mb-1" htmlFor={name} >{label}</label>}
        <input onChange={onChange}
            defaultValue={value}
            required={required}
            name={name}
            className="border-solid pl-10 w-full h-full bg-white border-gray-300 border p-2 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-400"
            type={inputType}
            placeholder={placeholder} />

    </div>;
}