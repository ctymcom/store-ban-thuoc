interface PropsType extends ReactProps {
  htmlFor?: string;
  text: string;
}

export function Label({ text, ...props }: PropsType) {
  return (
    <label {...props} className="block w-full text-gray-600 font-semibold pl-1 mb-1">
      {text}
    </label>
  );
}
