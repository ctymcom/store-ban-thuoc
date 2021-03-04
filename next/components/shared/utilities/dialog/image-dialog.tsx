import { Dialog } from "./dialog";

interface PropsType extends ReactProps {
  isOpen: boolean
  image: string
  onClose: Function
}

export function ImageDialog({
    ...props
  }: PropsType) {
  
  return <Dialog isOpen={props.isOpen} onClose={props.onClose} mobileMode={false}>
    <img style={{ maxWidth: '86vw' }} src={props.image || '/assets/img/default.png'}
      onError={(e)=>{(e.target as any).src="/assets/img/default.png"}}/>
  </Dialog>
}