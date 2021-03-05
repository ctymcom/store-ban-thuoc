import Link from 'next/link';
interface PropsType extends ReactProps {
  icon?: JSX.Element
  text: string
  href?:string
  textBtn?:string
}
export function NotFound(props: PropsType) {
  return <div className={`w-full flex-center flex-col text-center text-gray-500 py-12 text-lg font-semibold ${props.className || ''}`}>
    { props.icon && <i className="text-3xl mb-2">{props.icon}</i>}
    <span>{props.text || 'Không tìm thấy'}</span>
    <Link href={props.href}><button className={`${props.textBtn?"btn-primary p-4 my-6":"hidden"}`}>{props.textBtn}</button></Link>
  </div>
}