import { Checkbox } from '../../../components/shared/form/checkbox';
import { useState } from 'react';
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
    const setIDChecked = (checked, id) => {
        if (checked) {
            setChecked(checked);
            setIDC(id);
        } else {
            setChecked(checked);
            setIDC(null);
        }
    }
    const setCheckBox = (id, status) => {
        if (IDC === null) {
            return status;
        }
        if (id !== IDC)
            return !status;
        return status;
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
                    return <div className={setStyleCheck(index, "bo")} key={index}>
                        <div className="flex items-center">
                            <Checkbox onChanged={(value) => setIDChecked(value, index)}
                                checked={setCheckBox(index, Checked)} />
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