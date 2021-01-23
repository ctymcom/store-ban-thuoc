import { FormFieldProps } from "./form-field.type"

type RaidoButtonProps = FormFieldProps & {
    label: string,
    type?: "button" | "submit" | "reset",
    id?: string,
    onClick?: (e) => void
}
export function RadioButton({ label, onClick, id, name }: RaidoButtonProps) {
    return <>
        <div className="radio flex items-center">
            <input type='radio' id={id} name={name} className='w-4 h-4 text-primary-500 mr-2 form-radio border-gray-400 border-2 focus:outline-none' onClick={onClick} />
            <label htmlFor={id} className='text-sm'>
                <i className="bg-primary-500 "></i>
                {label}
            </label>
        </div>
    </>
}
