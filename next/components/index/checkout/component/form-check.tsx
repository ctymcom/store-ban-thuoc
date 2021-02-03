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
    const setStyleCheck = (id, type) => {
        switch (type) {
            case "bo": {
                let tempStyle = "p-4 mr-4 border rounded w-2/5"
                if (id === IDC)
                    tempStyle += " border-primary bg-green-50";
                return tempStyle;
            }
            case "he": {
                let tempStyle = "text-lg"
                if (id === IDC)
                    tempStyle += " text-primary";
                return tempStyle;
            }
        }
    }
    return <div className="my-6">
        <h3 className="py-1.5 my-3 uppercase border-b-2 text-xl">{title}</h3>
        <div className="flex">
            {
                checkList.map((item, index) => {
                    return <div className={setStyleCheck(index, "bo")} key={index} onClick={() => { setIDChecked(index) }}>
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
    </div>
}