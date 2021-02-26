import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"
import { LOGIN_PATHNAME, useAuth } from "../../../lib/providers/auth-provider";

export default function AdminLoginPage() {

  const { checkUser, login } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (checkUser()) {
        router.replace('/admin')
      }
    }, []);

  const ref = useCallback(input => {
    if (input) input.focus()
  }, [])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      alert('Yêu cầu nhập đầy đủ')  
    } else {
      login(username, password, 'editor').then(res => {
        alert('Đăng nhập thành công')
        let pathname = sessionStorage.getItem(LOGIN_PATHNAME)
        router.replace(pathname || '/admin')
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  return <>
    <div 
      className="w-screen h-screen bg-center bg-no-repeat bg-cover flex-center bg-primary-light">
      <form 
        className="bg-gray-50 shadow-lg rounded-sm min-h-sm max-w-lg w-2/3 flex flex-col items-center p-8 border border-gray-200"
        onSubmit={onFormSubmit}
      >
        <img className="w-32" src='/assets/img/logo.png/'/>
        <div className="text-gray-600 font-semibold text-center text-2xl mt-6 my-4">Đăng nhập</div>
        <label className="text-gray-700 font-semibold ml-1 mb-1 w-full">Tên tài khoản</label>
        <input 
          className="form-input w-full min-w-xs mb-6 border-gray-300 rounded-sm" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}  
          ref={ref}
        />
        <label className="text-gray-700 font-semibold ml-1 mb-1 w-full">Mật khẩu</label>
        <input 
          className="form-input w-full min-w-xs mb-8 border-gray-300 rounded-sm" type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex">
          <button type="submit" className="btn-primary h-12 px-8">Đăng nhập</button>
        </div>
      </form>
    </div>
  </>
}