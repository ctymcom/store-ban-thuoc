import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';
interface PropsType extends ReactProps{
    checkList:Option[],
    title:string,
    getCheckPayment?:Function
}
type Option ={
    title:string,
    content:string,
}
export function FormCheck(props:PropsType) {
    const { title, checkList } = props;
    const [Checked, setChecked] = useState(false);
    const [IDC, setIDC] = useState(0);
    const setIDChecked = (id:number, title:string) => {
        if (id !== IDC) {
            setIDC(id);
            setChecked(true);
            if (title === "Chuyển khoản") {
                props.getCheckPayment(true);
            }
            if (title === "COD") {
                props.getCheckPayment(false);
            }
        } else {
            setIDC(-1);
            setChecked(false);
            props.getCheckPayment(false);
        }
    }
    const setCheckBox = (id:number) => {
        if (id !== IDC)
            return false;
        return true;
    }
    const setStyleCheck = (id:number, type:string) => {
        switch (type) {
            case "bo": {
                let tempStyle = "text-xl px-5 py-4 border rounded col-span-2 hover:bg-primary-light transition duration-500 ease-in-out"
                if (id === IDC)
                    tempStyle += " border-primary bg-primary-light";
                return tempStyle;
            }
            case "he": {
                let tempStyle = " text-24"
                if (id === IDC) {
                    tempStyle += " text-primary";
                }
                return tempStyle;
            }
        }
    }
    return <>
        <h3 className="uppercase text-24 pb-2 border-b-4">{title}</h3>
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 gap-6 my-5">
            {
                checkList.map((item:Option, index:number) => {
                    return <div className={setStyleCheck(index, "bo")} key={index} onClick={() => { setIDChecked(index, item.title) }}>
                        <div className="flex items-center">
                            <Checkbox checked={setCheckBox(index)} />
                            <div>
                                <h4 className={setStyleCheck(index, "he")}>{item.title}</h4>
                                <p className="text-gray-500 text-base">{item.content}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </>
}