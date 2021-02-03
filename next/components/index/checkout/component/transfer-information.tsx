import React from 'react';

const TransferInformation = (props) => {
    return (
        <div className={props.isHide ? "relative p-4 mr-4 border rounded w-4/5 border-primary bg-green-50" : "scale-x-0"}>
            {
                !props.isHide ? "" : props.info.map((item, index) => {
                    return <div className="grid grid-cols-5" key={index}>
                        <p className="col-span-1 text-gray-400">{item.title}: </p>
                        <div className="col-span-3">
                            <p className="inline-block">{item.content}</p>
                            <button className={item.title === "Số tài khoản" ? "px-10 inline-block text-primary" : "hidden"}>Sao chép</button>
                        </div>
                    </div>
                })
            }
            <button className="hover:text-red-500 col-span-1 text-right absolute top-1 right-1" onClick={() => props.setIsHide(false)}>Thu gọn</button>
        </div>
    );
}

export default TransferInformation;
