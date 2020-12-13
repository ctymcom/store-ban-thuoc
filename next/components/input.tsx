import { FormField, FormFieldType } from "../../src/graphql/modules/form/types/formField.type";

export function Input({ field} : { field: FormField }) {
    const { label, type = FormFieldType.text, placeholder, key, required } = field;
    return <div className="flex flex-col mb-3">
        { label && <label className="font-bold mb-1" htmlFor={key} >{label}</label> } 
        <input required={required} name={key} id={key} className="border-solid w-full bg-white border-gray-300 border p-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
        type={type} 
        placeholder={placeholder} />
    </div>;
}