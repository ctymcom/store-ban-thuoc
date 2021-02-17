import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';
export function FormCheck(props) {
    const { title, checkList } = props;
    const [Checked, setChecked] = useState(false);
    const [IDC, setIDC] = useState(0);
    const setIDChecked = (id, title) => {
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
            setIDC(0);
            setChecked(false);
            props.getCheckPayment(false);
        }
    }
    const setCheckBox = (id) => {
        if (id !== IDC)
            return false;
        return true;
    }
    const setStyleCheck = (id, type) => {
        switch (type) {
            case "bo": {
                let tempStyle = "p-2 border rounded col-span-2 hover:border-primary hover:bg-primary-light transition duration-500 ease-in-out"
                if (id === IDC)
                    tempStyle += " border-primary bg-green-50";
                return tempStyle;
            }
            case "he": {
                let tempStyle = ""
                if (id === IDC) {
                    tempStyle += " text-primary";
                }
                return tempStyle;
            }
        }
    }
    return <>
        <h3 className="uppercase border-b-2 mb-4">{title}</h3>
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 gap-4">
            {
                checkList.map((item, index) => {
                    return <div className={setStyleCheck(index, "bo")} key={index} onClick={() => { setIDChecked(index, item.title) }}>
                        <div className="flex items-center">
                            <Checkbox checked={setCheckBox(index)} />
                            <div>
                                <h4 className={setStyleCheck(index, "he")}>{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.content}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </>
}