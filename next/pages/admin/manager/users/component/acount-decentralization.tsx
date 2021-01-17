import { useState } from 'react'
import { Checkbox } from "../../../../../components/shared/form/checkbox";
import { SelectBox } from "../../../../../components/shared/form/select-box";
import { IconPlus, IconInfor } from "../../../../../lib/svg";
import { AccountDecentralizationData } from './account-decentralization-data'

export function AccountDecentralization(props) {
    const [AccData, setAccData] = useState(AccountDecentralizationData);
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <div className="session-1 pt-4">
                        <div className="select-decentralization">
                            <div className="input-decentralization">
                                <div className="py-2">
                                    <p className='uppercase font-bold text-sm'>Chọn phân quyền</p>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="input">
                                        <SelectBox
                                            options={['Giám đốc CEO', 'Giám đốc CTO']}
                                            style='py-3'
                                        />
                                    </div>
                                    <div className='flex'>
                                        <div className="flex  space-x-2 text-sm rounded py-3 px-4 bg-primary-500 mb-3 cursor-pointer text-white">
                                            <p> Thêm phân quyền </p>
                                            <i className='w-4'>
                                                <IconPlus />
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="session-2 py-3">
                        <div className="feature-decentralization">
                            <div className="feature-decentralization">
                                <div className="py-3">
                                    <p className='uppercase font-bold text-sm '>Tính năng phân quyền</p>
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="input">
                                        {
                                            AccData.map((item, index) => {
                                                return <>
                                                    <div className="w-full border-b-4 border-secondary-400">
                                                        <div className="inline-block pr-20 bg-secondary-400 rounded-tr-full">
                                                            <div className="flex justify-between px-2">
                                                                <Checkbox checked={item.status} key={index} label={item.title} name={item.title}
                                                                    style='py-2 uppercase inline'
                                                                    onChanged={() => {
                                                                        item.status = !item.status;
                                                                        if (item.status) {
                                                                            item.data.forEach((item) => {
                                                                                item.status = true;
                                                                                item.data.forEach((item) => {
                                                                                    item.status = true;
                                                                                })
                                                                            })
                                                                        } else {
                                                                            item.data.forEach((item) => {
                                                                                item.status = false;
                                                                                item.data.forEach((item) => {
                                                                                    item.status = false;
                                                                                })
                                                                            })
                                                                        }
                                                                        setAccData([...AccData]);
                                                                    }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="py-3">
                                                        {
                                                            item.data.map((item, index, array) => {
                                                                const lastChild = !(array.length === index + 1);
                                                                return <>
                                                                    <div className={"grid grid-cols-2 gap-5 py-3 px-2 border-b" + (lastChild && " boder-none ")}>
                                                                        <div className="flex items-center justify-start">
                                                                            <Checkbox checked={item.status} key={index} label={item.title} name={item.title}
                                                                                style='font-bold'
                                                                                onChanged={() => {
                                                                                    item.status = !item.status;
                                                                                    if (item.status) {
                                                                                        item.data.forEach((item) => {
                                                                                            item.status = true;
                                                                                        })
                                                                                    } else {
                                                                                        item.data.forEach((item) => {
                                                                                            item.status = false;
                                                                                        })
                                                                                    }
                                                                                    setAccData([...AccData]);
                                                                                }} />
                                                                            <div className="pt-1 w-5 h-5">
                                                                                <i className='text-gray-400'>
                                                                                    <IconInfor />
                                                                                </i>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex flex-col space-y-2'>
                                                                            {item.data.map((item, index) => {
                                                                                return <>
                                                                                    <Checkbox checked={item.status} key={index} label={item.title} name={item.data}
                                                                                        onChanged={() => {
                                                                                            item.status = !item.status;
                                                                                            setAccData([...AccData])
                                                                                        }} />
                                                                                </>
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            })
                                                        }
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}