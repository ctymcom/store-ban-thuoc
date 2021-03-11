interface PropsType extends ReactProps {
  htmlFor?: string;
  text: string;
}

export function Label({ text, ...props }: PropsType) {
  return (
    <label {...props} className="text-gray-600 font-semibold pl-1 pb-1">
      {text}
    </label>
  );
}
