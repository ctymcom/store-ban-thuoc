import Link from "next/link"
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../lib/providers/auth-provider";


export default function LoginPage() {

  const ref = useCallback(input => {
    if (input) input.focus()
  }, [])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth()
  const router = useRouter()

  const onFormSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      alert('Yêu cầu nhập đầy đủ')  
    } else {
      login(username, password, 'user').then(res => {        
        let pathname = sessionStorage.getItem(LOGIN_PATHNAME)
        router.replace(pathname || '/')
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  return <>
    <div 
      className="w-screen h-screen bg-center bg-no-repeat bg-cover flex-center" 
      style={{ backgroundImage: `url(https://i.imgur.com/fAa2OAZ.jpg)`}}>
      <form 
        className="relative bg-white shadow-lg rounded-lg border-primary border-4 min-h-sm max-w-7xl flex flex-col items-center p-12" 
        onSubmit={onFormSubmit}
      >
        <img src='/assets/img/logo.png/' className="absolute w-40 -top-12"/>
        <div className="uppercase text-primary font-bold text-center text-lg mt-16">Đăng nhập</div>
        <input 
          className="form-input mt-8 min-w-xs" 
          placeholder="Username" autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="form-input mt-4 min-w-xs" 
          placeholder="Mật khẩu" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-primary btn-lg mt-4">Đăng nhập</button>
      </form>
    </div>
  </>
}