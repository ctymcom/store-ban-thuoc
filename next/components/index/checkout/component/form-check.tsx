import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';
import e from 'express';
export function FormCheck(props) {
    const { title, checkList } = props;
    const UOT = "Chọn Nhà vận chuyển"
    const styleH = (title) => {
        if (title !== UOT) {
            return "border-b-2 text-2xl uppercase mt-4";
        }
        else {
            return "text-primary-500 text-xl mt-2";
        }
    }
    const [Checked, setChecked] = useState(false);
    const [IDC, setIDC] = useState(null);
    const setIDChecked = (id) => {
        if (id !== IDC) {
            setIDC(id);
            setChecked(true);
        } else {
            setIDC(null);
            setChecked(false);
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
                let tempStyle = "m-2 p-2 border-2 rounded"
                if (id === IDC)
                    tempStyle += " border-primary-500";
                return tempStyle;
            }
            case "he": {
                let tempStyle = "text-xl"
                if (id === IDC)
                    tempStyle += " text-primary-500";
                return tempStyle;
            }
        }
    }
    return <>
        <h3 className={styleH(title)}>{title}</h3>
        <div className="flex">
            {
                checkList.map((item, index) => {
                    return <div className={setStyleCheck(index, "bo")} key={index} onClick={() => { setIDChecked(index) }}>
                        <div className="flex items-center">
                            <Checkbox checked={setCheckBox(index)} />
                            <div>
                                <h4 className={setStyleCheck(index, "he")}>{item.title}</h4>
                                <p>{item.content}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </>
}