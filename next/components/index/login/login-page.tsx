import Link from "next/link"


export default function LoginPage() {

  let user, password = ''

  return <>
    <div 
      className="w-screen h-screen bg-center bg-no-repeat bg-cover flex-center" 
      style={{ backgroundImage: `url(https://i.imgur.com/fAa2OAZ.jpg)`}}>
      <div className="relative bg-white shadow-lg rounded-lg border-primary border-4 min-h-sm max-w-7xl flex flex-col items-center p-12">
        <img src='/assets/img/logo.png/' className="absolute w-40 -top-12"/>
        <div className="uppercase text-primary font-bold text-center text-lg mt-16">Đăng nhập</div>
        <input className="form-input mt-8 min-w-xs" placeholder="Email đăng nhập" autoFocus/>
        <input className="form-input mt-4 min-w-xs" placeholder="Mật khẩu" type="password"/>
        <Link href="/">
          <button className="btn-primary btn-lg mt-4">Đăng nhập</button>
        </Link>
      </div>
    </div>
  </>
}