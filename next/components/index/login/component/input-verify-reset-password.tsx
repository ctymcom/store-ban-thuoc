

import { useState } from "react";
import { InputVerify } from "../../../shared/form/input-verify";

export function InputVerifyCode(props) {
    const { input } = props
    const [active, setactive] = useState(false)
    const handleChange = (e) => {
        if (e.length == 6) {
            setactive(true)
        } else {
            setactive(false)
        }
    }
    return <>
        <div className="py-5 flex flex-col">
            <p className="text-sm text-gray-400 text-center">Mã xác minh đã được gửi đến</p>
            <p className="text-sm text-primary-500 text-center">{input}</p>
        </div>
        <div className="">
            <InputVerify onChanged={handleChange} />
        </div>
        <div className="py-1 w-full">
            <div className={(active ? ' cursor-pointer text-white bg-primary-500 ' : '  bg-gray-200 text-gray-500 ') + " text-sm  text-center uppercase py-4 "} >
                Tiếp theo
            </div>
            <div className="flex justify-center space-x-1 py-4">
                <p className="text-sm py-4 ">Vui lòng chờ 46 giây để gửi lại </p>
            </div>
        </div>

    </>
}