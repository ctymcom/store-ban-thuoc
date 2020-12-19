import { useContext, useState } from 'react';

import { FormField, FormFieldType } from '../../../src/graphql/modules/form/types/formField.type';
import { CreateFormContext } from '../../providers/create-form-provider';
import { Card } from '../shared/card/card';
import { AddressInput } from '../shared/form/address-input';
import { Checkbox } from '../shared/form/checkbox';
import { Input } from '../shared/form/input';
import { SelectBox } from '../shared/form/select-box';
import { SelectMulti } from '../shared/form/select-multi';

export type FormFieldBlockProps = {
    field: FormField,
    index: number
}
export function FormFieldBlock({ field, index }: FormFieldBlockProps) {
    const [fieldState, setFieldState] = useState(field);
    const onSelectOptionsChanged = (values: string[]) => {
        setFieldState({ ...fieldState, options: values } as FormField);
        field.options = values;
    }
    const { removeField } = useContext(CreateFormContext);
    const changeFieldType = (value) => {
        setFieldState({ ...fieldState, type: value} as any);
        field.type = value;
    }
    const changeFieldLabel = (value) => {
        field.label = value;
        field.key = value;
    }
    const changeDistrictLabel = (value) => {
        field.districtLabel = value;
        field.districtKey = value;
    }
    const changeWardLabel = (value) => {
        field.wardLabel = value;
        field.wardKey = value;
    }
    return <Card>
    <form>
        <div className="grid grid-cols-3 gap-4">
            <SelectBox 
                name="type"
                label="Loại dữ liệu"
                value={fieldState.type}
                options={Object.values(FormFieldType)}
                onChanged={changeFieldType}
            />
            <Input 
                name="label"
                label="Nhãn"
                value={fieldState.label}
                required={true}
                onChanged={changeFieldLabel}
            />
            <Input 
                name="placeholder"
                label="Gợi ý"
                value={fieldState.placeholder}
                onChanged={value => field.label = value}
            />
            
        </div>
        <div className="grid grid-cols-3 gap-4">
            {(() => {
                switch(fieldState.type) {
                    case FormFieldType.address:
                        return <>
                            <AddressInput  
                            label="Tỉnh / thành mặc định" 
                            name="default"
                            addressValue={{province: field.default }} 
                            onChangedAddress={value => field.default = value.province}
                            />
                            <Input 
                                name="districtLabel"
                                label="Nhãn Quận / Huyện"
                                value={fieldState.districtLabel}
                                onChanged={changeDistrictLabel}
                            />
                            <Input 
                                name="wardLabel"
                                label="Nhãn Phường / Xã"
                                value={fieldState.wardLabel}
                                onChanged={changeWardLabel}
                            />
                        </>
                    case FormFieldType.select:
                        return <>
                        <SelectBox 
                            name="default"
                            label="Giá trị mặc định"
                            value={fieldState.default}
                            options={fieldState.options}
                            onChanged={value => field.default = value}
                        />
                        <div className="col-span-2">
                            <SelectMulti label="Tuỳ chọn" onValuesChanged={onSelectOptionsChanged} values={fieldState.options}/>
                        </div>
                        </>
                    default: 
                        return <Input 
                            inputType={fieldState.type}
                            name="default"
                            label="Giá trị mặc định"
                            value={fieldState.default}
                            onChanged={value => field.default = value}
                        />
                }
            })()}
        </div>
        <div className="grid grid-cols-3 gap-4">
            <Checkbox 
                name="required"
                label="Bắt buộc nhập"
                onChanged={value => field.required = value == "true" ? true : false }
            />
            { fieldState.type == FormFieldType.address && <>
                <Checkbox 
                name="districtRequired"
                label="Bắt buộc nhập "
                onChanged={value => field.required = value == "true" ? true : false }
            />
                <Checkbox 
                name="wardRequired"
                label="Bắt buộc nhập"
                onChanged={value => field.required = value == "true" ? true : false }
            />
            </>}
        </div>
        <div>
            <a href="#" className="text-red-600" onClick={() => removeField(index)}>Xoá </a>
        </div>
        
        
    </form>
    </Card>
}