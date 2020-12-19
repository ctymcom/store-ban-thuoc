export type FormFieldProps = {
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChanged?: (value: string) => void;
  validate?: (value: string) => string;
  required?: boolean;
  inputType?: string;
};
