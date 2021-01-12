import { FormFieldProps } from "./form-field.type";

export function Input({ label, name, required, placeholder, inputType = "text",value, ...props } : FormFieldProps) {
    const onChange = (e) => {
        if (props.onChanged) props.onChanged(e.target.value);
    }
    return <div className="flex flex-col mb-3">
        { label && <label className="font-bold mb-1" htmlFor={name} >{label}</label> } 
        <input onChange={onChange} defaultValue={value} required={required} name={name} className="border-solid w-full bg-white border-gray-300 border p-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
        type={inputType} 
        placeholder={placeholder} />
    </div>;
}