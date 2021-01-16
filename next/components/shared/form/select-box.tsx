import { useState } from 'react';

import { FormFieldProps } from './form-field.type';

export type SelectBoxOption = {
    value: string,
    display?: string,
    style?: string
}
type SelectBoxProps = FormFieldProps & {
    options?: SelectBoxOption[] | string[],
    noneOption?: SelectBoxOption,
}
export function SelectBox({ label, name, placeholder, required, value, style, options = [], noneOption, onChanged }: SelectBoxProps) {
    const onSelectChanged = (e) => {
        if (onChanged) onChanged(e.target.value);
    }
    if (options && typeof options[0] != "object") {
        options = (options as string[]).map(o => ({ value: o }));
    }
    return <div className="flex flex-col mb-3">
        {label && <label className="font-bold" htmlFor={name} >{label}</label>}
        <select onChange={onSelectChanged} defaultValue={value} required={required} name={name} className={"  border-solid  w-full h-full bg-white border-gray-300 border p-4 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-secondary-500 focus:border-secondary-400 " + style}>
            {noneOption && <option value={noneOption.value}>-- {noneOption.display || placeholder} --</option>}
            {(options as SelectBoxOption[]).map((o, index) => <option key={o.value + index} value={o.value}>{o.display || o.value}</option>)}
        </select>
    </div>;
}
