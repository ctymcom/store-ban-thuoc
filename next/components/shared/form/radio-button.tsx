import { FormFieldProps } from "./form-field.type"

type RaidoButtonProps = FormFieldProps & {
    label: string,
    type?: "button" | "submit" | "reset",
    id?: string,
    onClick?: (e) => void
}
export function RadioButton({ label, onClick, id, name }: RaidoButtonProps) {
    return <>
        <div className="radio">
            <input type='radio' id={id} name={name} className='bg-primary-500 w-6 mr-2' />
            <label htmlFor={id} className='text-sm'>
                <i className="w-3 h-3 bg-primary-500 "></i>
                {label}
            </label>
        </div>
    </>
}
