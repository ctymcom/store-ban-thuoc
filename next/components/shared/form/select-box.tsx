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
    style?: SelectBoxOption
}
export function SelectBox({ label, name, placeholder, required, value, style, options = [], noneOption, onChanged }: SelectBoxProps) {
    const onSelectChanged = (e) => {
        if (onChanged) onChanged(e.target.value);
    }
    if (options && typeof options[0] != "object") {
        options = (options as string[]).map(o => ({ value: o }));
    }
    return <div className="flex flex-col mb-3">
        {label && <label className="font-bold mb-1" htmlFor={name} >{label}</label>}
        <select onChange={onSelectChanged} defaultValue={value} required={required} name={name} className={"p-3bg-white rounded-md " + style}>
            {noneOption && <option value={noneOption.value}>-- {noneOption.display || placeholder} --</option>}
            {(options as SelectBoxOption[]).map((o, index) => <option key={o.value + index} value={o.value}>{o.display || o.value}</option>)}
        </select>
    </div>;
}
