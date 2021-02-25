import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../../lib/providers/auth-provider";
import useDevice from './../../../../lib/hooks/useDevice';

interface PropsType extends ReactProps {
  setMode: Function
}
export function Register(props: PropsType) {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const { register } = useAuth()
  const { isDesktop } = useDevice()

  const ref = useCallback(input => {
    if (input && isDesktop) input.focus()
  }, [])

  const onFormSubmit = e => {
    e.preventDefault();
    if (!nickname || !email || !phone) {
      alert('Yêu cầu nhập đầy đủ')
    } else {
      register(nickname, email, phone).then(res => {        
        alert(res)
        props.setMode('login')
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  return (
    <form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Đăng ký</div>
      <input 
        className="form-input mt-8 min-w-2xs sm:min-w-xs" 
        placeholder="Tên hiển thị" ref={ref}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input 
        className="form-input mt-4 min-w-2xs sm:min-w-xs" 
        placeholder="Email" 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        className="form-input mt-4 min-w-2xs sm:min-w-xs" 
        placeholder="Số điện thoại" 
        type="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <button type="submit" className="btn-primary btn-lg w-full">Đăng ký</button>
        <div className="flex justify-center mt-2 w-full">
          <button type="button" className="btn-default hover:underline" onClick={() => props.setMode('login')}>Đăng nhập</button>
        </div>
      </div>
    </form>
  )
}