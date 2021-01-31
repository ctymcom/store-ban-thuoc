
import { useState } from "react";
import { Input } from "../../../shared/form/input";

export function InputResetPassword(props) {
    const [input, setinput] = useState("");
    const handleContinue = () => {
        props.Input(input)
    }
    return <>
        <div className="py-4 space-y-3 flex flex-col">
            <Input
                inputType='text'
                placeholder='Nhập Email hoặc Số điện thoại'
                value={input}
                onChanged={(e) => { setinput(e) }}
                style='pr-16'
            />
        </div>
        <div className="py-1 w-full">
            <div className={"text-sm text-white text-center uppercase cursor-pointer py-4 bg-primary-500"} onClick={handleContinue}>
                Tiếp theo
                        </div>
            <div className="flex justify-center space-x-1">
                <p className="text-sm py-4 ">Bạn đã có tài khoản? </p>
                <p className="text-sm py-4 cursor-pointer text-secondary-500"> Đăng nhập</p>
            </div>
        </div>

    </>
}