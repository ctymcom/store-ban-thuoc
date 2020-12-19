import { useState } from "react";
import { FormFieldType, FormField } from "../../../src/graphql/modules/form/types/formField.type";
import { Card } from "../shared/card/card";
import { SectionHeader } from "../shared/card/section-header";
import { Checkbox } from "../shared/form/checkbox";
import { Input } from "../shared/form/input";
import { SelectBox } from "../shared/form/select-box";
import { AddressInput } from '../shared/form/address-input';

export type FormFieldBlockProps = {
    field: FormField
}
export function FormFieldBlock({ field }: FormFieldBlockProps) {
    const [fieldState, setFieldState] = useState(field);
    return <Card>
    <SectionHeader text="Trường 1" />
    <form>
        <div className="grid grid-cols-4 gap-4">
            <SelectBox 
                name="type"
                label="Loại dữ liệu"
                value={fieldState.type}
                options={Object.values(FormFieldType)}
                onChanged={(value) => { setFieldState({ ...fieldState, type: value} as any); console.log('value', value) } }
            />
            <Input 
                name="label"
                label="Nhãn"
                value={fieldState.label}
                required={true}
            />
            <Input 
                name="placeholder"
                label="Gợi ý"
                value={fieldState.placeholder}
            />
            { fieldState.type != FormFieldType.address && fieldState.type != FormFieldType.select && <Input 
                name="default"
                label="Giá trị mặc định"
                value={fieldState.default}
            />}
            { fieldState.type == FormFieldType.address && <AddressInput  
                label="Tỉnh / thành mặc định" 
                name="default"
                addressValue={{province: field.default }} />}
        </div>
        { fieldState.type == FormFieldType.address && <div className="grid grid-cols-4 gap-4">
            <Input 
                name="districtLabel"
                label="Nhãn Quận / Huyện"
                value={fieldState.districtLabel}
            />
            <Input 
                name="districtLabel"
                label="Nhãn Phường / Xã"
                value={fieldState.wardLabel}
            />
        </div>}
        <Checkbox 
            name="required"
            label="Bắt buộc nhập"
        />
    </form>
    </Card>
}