import { FormField } from "../../src/graphql/modules/form/types/formField.type";

export function Checkbox({ field }: { field: FormField } ) {
    const { label, key } = field;
    return <div className="mb-3">
    <span className="mr-3"><input type="checkbox"/></span>
    
    <label className="font-bold" htmlFor={key}>{label}</label>
</div>
}
