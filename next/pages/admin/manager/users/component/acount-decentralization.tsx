import { useState } from 'react';

import { Checkbox } from '../../../../../components/shared/form/checkbox';
import { SelectBox } from '../../../../../components/shared/form/select-box';
import { IconInfo, IconPlus } from '../../../../../lib/svg';
import { AccountDecentralizationData } from './account-decentralization-data';
import { ModalAddAccountDecentralization } from './modal-add-account-decentralization';

export function AccountDecentralization(props) {
    const [AccData, setAccData] = useState(AccountDecentralizationData);
    const [openModal, setopenModal] = useState(false);
    console.log(openModal)
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
                                        <div className="flex  space-x-2 text-sm rounded py-3 px-4 bg-primary-500 mb-3 cursor-pointer text-white hover:bg-primary-400"
                                            onClick={() => { setopenModal(true) }}
                                        >
                                            <p> Thêm phân quyền </p>
                                            <i className='w-4'>
                                                <IconPlus />
                                            </i>
                                        </div>
                                        {openModal && <ModalAddAccountDecentralization openModal={(e) => { setopenModal(e) }} />}
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
                                            AccData.map((item1, index) => {
                                                return <>
                                                    <div className="inline-block pr-20 bg-secondary-400 rounded-tr-full px-2">
                                                        <Checkbox checked={item1.status} key={index} label={item1.title} name={item1.title}
                                                            style='py-2 uppercase inline'
                                                            onChanged={() => {
                                                                item1.status = !item1.status;
                                                                item1.isChange = !item1.isChange;
                                                                if (item1.status) {
                                                                    item1.data.forEach((item1) => {
                                                                        item1.status = true;
                                                                        item1.data.forEach((item1) => {
                                                                            item1.status = true;
                                                                        })
                                                                    })
                                                                } else {
                                                                    item1.data.forEach((item1) => {
                                                                        item1.status = false;
                                                                        item1.data.forEach((item1) => {
                                                                            item1.status = false;
                                                                        })
                                                                    })
                                                                }
                                                                setAccData([...AccData]);
                                                            }} />
                                                    </div>
                                                    <div className="bg-secondary-400 h-1 w-full"></div>
                                                    <div className="py-3">
                                                        {
                                                            item1.data.map((item, index, array) => {
                                                                const lastChild = !(array.length === index + 1);
                                                                return <>
                                                                    <div className={"grid grid-cols-2 gap-5 py-4 px-2 border-b" + (lastChild && " boder-none ")}>
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="flex items-start ">
                                                                                <Checkbox checked={item.status} key={index} label={item.title} name={item.title}
                                                                                    style='font-bold'
                                                                                    onChanged={() => {
                                                                                        item.status = !item.status;
                                                                                        item1.isChange = !item1.isChange;
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
                                                                                <div className="group pt-1 ml-2 w-5 tooltip" >
                                                                                    <i className='text-gray-400'>
                                                                                        <IconInfo />
                                                                                    </i>
                                                                                    <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                                                                                        {
                                                                                            item.title
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-5' onClick={() => {
                                                                                item.dropdownOpen = !item.dropdownOpen;
                                                                                setAccData([...AccData])
                                                                            }}>
                                                                                {
                                                                                    item.data.length > 1 ?
                                                                                        (
                                                                                            item.data.length > 1 ?
                                                                                                <i className={!item.dropdownOpen ? "duration-100 w-4 h-4 transform rotate-180" : "duration-100 w-4 h-4 transform rotate-0"}>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className='fill-current arrow'>
                                                                                                        <path d="M8 6.81l3.97 3.97a.75.75 0 0 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 0 0 1.06 1.06L8 6.81z">
                                                                                                        </path>
                                                                                                    </svg>
                                                                                                </i>
                                                                                                : ""
                                                                                        )
                                                                                        : ""

                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {item.dropdownOpen ?
                                                                            <div className='flex justify-start items-start'>
                                                                                <div className={"flex flex-col space-y-4 " + (!item.dropdownOpen && " hidden")}>
                                                                                    {item.data.map((item, index) => {
                                                                                        return <>
                                                                                            <Checkbox checked={item.status} key={index} label={item.title} name={item.data}
                                                                                                style={'text-sm'}
                                                                                                onChanged={() => {
                                                                                                    item1.isChange = !item1.isChange;
                                                                                                    item.status = !item.status;
                                                                                                    setAccData([...AccData])
                                                                                                }} />
                                                                                        </>
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <div className="">
                                                                                <div className="text-center text-sm text-secondary-500 cursor-pointer" onClick={() => {
                                                                                    item.dropdownOpen = !item.dropdownOpen;
                                                                                    setAccData([...AccData])
                                                                                }}>
                                                                                    <p>Xem chi tiết</p>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </>
                                                            })
                                                        }
                                                        <div className={(!item1.isChange && " hidden ") + " flex justify-end "}>
                                                            <div className="flex  space-x-2 text-sm rounded py-3 px-4 bg-primary-500 mb-3 cursor-pointer text-white">
                                                                Lưu thay đổi
                                                            </div>
                                                        </div>
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