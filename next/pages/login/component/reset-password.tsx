
import { useState } from "react"
import { Input } from "../../../components/shared/form/input"
import { IconBack } from "../../../lib/svg"
import { InputResetPassword } from "./input-reset-password"
import { InputVerifyCode } from "./input-verify-reset-password"


export function ResetPassword(props) {
    const [show, setshow] = useState(1)
    const [input, setinput] = useState("");
    const handleContinue = (e) => {
        setinput(e)
        setshow(2)
    }
    return <>
        <div className="w-full h-screen bg-gray-200">
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-white w-4/12 shadow-xl p-4">
                    <div className="py-2 relative ">
                        <h3 className='text-2xl text-gray-900 text-center w-full'>Đặt Lại Mật Khẩu</h3>
                        <i className='text-secondary-400 w-6 cursor-pointer absolute top-1/3' onClick={() => { setshow(1) }}>
                            <IconBack />
                        </i>
                    </div>
                    {
                        show == 1 ? <InputResetPassword Input={handleContinue} /> : <InputVerifyCode input={input} />
                    }

                </div>
            </div>
        </div>
    </>
}