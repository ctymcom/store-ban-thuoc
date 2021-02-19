import { Children, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useDevice from "../../../../hooks/useDevice";
import useScrollBlock from "../../../../hooks/useScrollBlock";
import { HiOutlineX } from 'react-icons/hi';

export interface DialogPropsType extends ReactProps {
  wrapperClass?: string
  overlayClass?: string
  dialogClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  title?: string
  icon?: JSX.Element
  width?: string
  maxWidth?: string
  mobileMode?: boolean
  isOpen: boolean
  onOverlayClick?: Function
  onClose?: Function
}

const ROOT_ID = 'dialog-root'
export function Dialog({
  wrapperClass = 'fixed w-screen h-screen top-0 left-0 z-100 flex flex-col overflow-y-scroll py-20',
  overlayClass = 'fixed w-full h-full top-0 left-0 pointer-events-none',
  dialogClass = 'relative bg-white shadow-md rounded m-auto',
  headerClass = 'relative flex justify-between p-4 py-2 box-content bg-white z-10 border-top rounded-t',
  bodyClass = 'relative p-4 py-2 bg-white rounded',
  footerClass = 'relative flex p-4 pb-3 pt-2 bg-white z-10 rounded-b',
  mobileMode = true,
  width = 'auto',
  maxWidth = '86vw',
  title = '',
  icon = null,
  onOverlayClick = () => props.onClose(),
  ...props}: DialogPropsType) {
  
  const { isMobile, isSSR } = useDevice()
  if (isSSR) return null

  const [isOpen, setIsOpen] = useState(props.isOpen);
  
  useEffect(() => {
    if (props.isOpen) {      
      setIsOpen(props.isOpen)
    } else {
      setTimeout(() => {
        setIsOpen(props.isOpen)
      }, 200)
    }
  }, [props.isOpen]);

  useScrollBlock(ROOT_ID, [isOpen])
  
  let header = Children.map(props.children, child => child.type?.displayName === 'Header' ? child : null);
  let body = Children.map(props.children, child => child.type?.displayName === 'Body' ? child : null);
  let footer = Children.map(props.children, child => child.type?.displayName === 'Footer' ? child : null);
  let children = Children.map(props.children, child => !child.type?.displayName ? child : null);

  console.log(header)
  if (title && !header.length) {
    header = [<>
      <div className="flex items-center">
        { icon ? <i className="text-24 text-primary">{icon}</i> : null } 
        <span className="text-gray-700 text-lg font-semibold ml-2">{title}</span>
      </div>
      <button className="btn-default transform translate-x-4" onClick={() => props.onClose()}><i className="text-24"><HiOutlineX/></i></button>
      <hr className="m-0 absolute left-0 right-0 bottom-0 mx-4 border-2 border-b-0 rounded border-gray-300"/>
    </>]
  } 
  
  let el = (
    <div className={`dialog-wrapper ${wrapperClass} ${(mobileMode && isMobile)?'mobile':''}`} onClick={() => onOverlayClick()}>
      <div className={`dialog-overlay ${overlayClass} ${props.isOpen?'animate-emerge':'animate-fade'}`} 
        style={{ backgroundColor: props.isOpen?'rgba(0,0,0,.32)':'rgba(0,0,0,0)' }}></div>
      <div className={`dialog ${dialogClass} ${props.isOpen?((mobileMode && isMobile)?'animate-slide-up':'animate-scale-up'):((mobileMode && isMobile)?'animate-slide-down':'animate-scale-down')}`} 
        style={{ width, maxWidth }} onClick={e => e.stopPropagation()}>
        {header.length ? <div className={`dialog-header ${headerClass}`}>{header}</div>:null}
        {body.length ? <div className={`dialog-body ${bodyClass}`}>{body}</div>:null}
        {children}
        {footer.length ? <div className={`dialog-footer ${footerClass}`}>{footer}</div>:null}
      </div>
    </div>)
    
  return isOpen ? createPortal(el, document.getElementById(ROOT_ID)) : null
}

const Header = ({ children }) => children;
Header.displayName = 'Header';
Dialog.Header = Header;

const Body = ({ children }) => children;
Body.displayName = 'Body';
Dialog.Body = Body;

const Footer = ({ children }) => children;
Footer.displayName = 'Footer';
Dialog.Footer = Footer;