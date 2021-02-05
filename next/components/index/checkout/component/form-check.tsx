import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';
export function FormCheck(props) {
    const { title, checkList } = props;
    const [Checked, setChecked] = useState(false);
    const [IDC, setIDC] = useState(0);
    const setIDChecked = (id) => {
        if (id !== IDC) {
            setIDC(id);
            setChecked(true);
        } else {
            setIDC(0);
            setChecked(false);
        }
    }
    const setCheckBox = (id) => {
        if (id !== IDC)
            return false;
        return true;
    }
    const setStyleCheck = (id, type, title) => {
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
                    if (title = "Chuyển khoản") { props.setIsHide(true); } else { props.setIsHide(false) }
                }
                return tempStyle;
            }
        }
    }
    return <div className="col-span-5">
        <h3 className="uppercase border-b-2 mb-4">{title}</h3>
        <div className="grid grid-cols-5 gap-4">
            {
                checkList.map((item, index) => {
                    return <div className={setStyleCheck(index, "bo", item.title)} key={index} onClick={() => { setIDChecked(index) }}>
                        <div className="flex items-center">
                            <Checkbox checked={setCheckBox(index)} />
                            <div>
                                <h4 className={setStyleCheck(index, "he", item.title)}>{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.content}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}