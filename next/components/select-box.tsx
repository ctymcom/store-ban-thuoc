import { FormField } from '../../src/graphql/modules/form/types/formField.type';
import { useState } from 'react';

export function SelectBox({ field } : { field: FormField }) {
    const { label, placeholder, key, options, required } = field;
    const [value, setValue] = useState(field.default);
    return <div className="flex flex-col mb-3">
        { label && <label className="font-bold mb-1" htmlFor={key} >{label}</label> } 
        <select onChange={(e) => setValue(e.target.value)} id={key} value={value} required={required} name={key} className="p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">-- {placeholder || 'Chưa chọn'} --</option>
            { options.map(o => <option key={o} value={o}>{o}</option> )}
        </select>
    </div>;
}