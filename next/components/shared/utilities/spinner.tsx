import { CgSpinner } from 'react-icons/cg'

interface PropsType extends ReactProps {
  icon?: JSX.Element
}
export function Spinner({
  icon = <CgSpinner/>,
  className = '',
  ...props}: PropsType) {
  return <div className={`w-full flex-center py-32 px-2 text-primary ${className}`}>
    <i className="animate-spin text-4xl">{icon}</i>
  </div>
}