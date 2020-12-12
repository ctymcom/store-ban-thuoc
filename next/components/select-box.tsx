import { FormField } from '../../src/graphql/modules/form/types/formField.type';

export function SelectBox({ field } : { field: FormField }) {
    const { label, placeholder, key, options } = field;
    return <div className="flex flex-col mb-3">
        { label && <label className="font-bold mb-1" htmlFor={key} >{label}</label> } 
        <select name={key} className="p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option>-- {placeholder || 'Chưa chọn'} --</option>
            { options.map(o => <option key={o} value={o} selected={o == field.default }>{o}</option> )}
        </select>
    </div>;
}