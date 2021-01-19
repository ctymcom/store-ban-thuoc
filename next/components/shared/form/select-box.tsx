import { useState } from 'react';

import { IconInfor } from '../../../lib/svg';
import { FormFieldProps } from './form-field.type';
import { Label } from './label';

export type SelectBoxOption = {
    value: string,
    display?: string,
    style?: string
}
type SelectBoxProps = FormFieldProps & {
    options?: SelectBoxOption[] | string[],
    noneOption?: SelectBoxOption,
}
export function SelectBox({ label, name, placeholder, required, value, style, options = [], noneOption, onChanged, ...props }: SelectBoxProps) {
    const onSelectChanged = (e) => {
        if (onChanged) onChanged(e.target.value);
    }
    if (options && typeof options[0] != "object") {
        options = (options as string[]).map(o => ({ value: o }));
    }
    return <div className="flex flex-col mb-3 space-y-1">
        {label && <div className="flex items-center">
            <Label text={label} htmlFor={name} />
            {props.tooltip && <div className="group pt-1 ml-2 w-5 tooltip" >
                <i className='text-gray-400'><IconInfor /></i>
                <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                    {props.tooltip}
                </div>
            </div>}
        </div>}
        <select onChange={onSelectChanged} defaultValue={value} required={required} name={name} className={style + ` w-full bg-white ring-gray-300 ring-1 p-4 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-secondary-500`}>
            {noneOption && <option value={noneOption.value}>-- {noneOption.display || placeholder} --</option>}
            {(options as SelectBoxOption[]).map((o, index) => <option key={o.value + index} value={o.value}>{o.display || o.value}</option>)}
        </select>
    </div>;
}
