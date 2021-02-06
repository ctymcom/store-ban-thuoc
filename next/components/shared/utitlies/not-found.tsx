interface PropsType extends ReactProps {
  icon?: JSX.Element
  className?: string
  text: string
}
export function NotFound(props: PropsType) {
  return <div className={`w-full flex-center flex-col text-center text-gray-500 py-12 text-lg font-semibold ${props.className}`}>
    { props.icon && <i className="text-3xl mb-2">{props.icon}</i>}
    <span>{props.text || 'Không tìm thấy'}</span>
  </div>
}