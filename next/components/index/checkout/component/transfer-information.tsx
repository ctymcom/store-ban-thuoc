import React from 'react';

const TransferInformation = (props) => {
    return (
        <div className="p-3 mr-4 border rounded w-4/5 border-primary bg-green-50">
            {
                props.info.map((item, index) => {
                    return <div className="grid grid-cols-5" key={index}>
                        <p className="col-span-1 text-gray-400">{item.title}: </p>
                        <div className="col-span-3">
                            <p className="inline-block">{item.content}</p>
                            <button className={item.title === "Số tài khoản" ? "px-10 inline-block text-primary outline-none" : "hidden"}>Sao chép</button>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default TransferInformation;
