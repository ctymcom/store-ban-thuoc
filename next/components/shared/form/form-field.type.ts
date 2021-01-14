export type FormFieldProps = {
  name?: string;
  value?: string;
  label?: string;
  icon?: string;
  style?: string;
  placeholder?: string;
  onChanged?: (value: string) => void;
  validate?: (value: string) => string;
  required?: boolean;
  inputType?: string;
};
