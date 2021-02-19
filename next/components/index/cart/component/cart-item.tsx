import { toNumber } from 'lodash';
import { Checkbox } from '../../../shared/form/checkbox';
import { HiMinusCircle,HiPlusCircle } from 'react-icons/hi'
import { NumberPipe } from '../../../../lib/pipes/number';
import { useState } from 'react';
import CheckboxItem from './checkbox-item';
export function CartItem(props) {
    const styleItem=(checked)=>{
        let sty="grid grid-cols-12 text-center border-b-2 h-24 items-center transition-all duration-300";
        if(!checked){
            sty+=" opacity-50";
        }
        return sty;
    }
    return (
            <div className={styleItem(props.item.isCheck)}>
                <div className="col-span-5 text-left grid grid-cols-12">
                    <div className="col-span-1 h-full cursor-pointer flex items-center" onClick={()=> props.handleChangeItem(props.item.id, "c", !props.item.isCheck)}>
                        <CheckboxItem checked={props.item.isCheck}/>
                    </div>
                    <div className="col-span-11 grid grid-cols-4 gap-3">
                        <img className="col-span-1 w-16 max-h-16 object-contain my-auto" src={props.item.img} alt="" />
                        <p className="col-span-3 text-left flex items-center">{props.item.name}</p>
                    </div>
                </div>
                <div className="col-span-2">
                    {NumberPipe(props.item.sale, true)}
                </div>
                <div className="col-span-2" >
                    <div className="flex items-center justify-between w-5/6 mx-auto">
                        <i className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                            onClick={() => { props.handleChangeItem(props.item.id, "d", 0) }}><HiMinusCircle/></i>
                        <input className="w-full text-center" type="number"
                            value={props.item.amount < 10 ? '0' + props.item.amount : (props.item.amount).toString()}
                            onChange={(e) => { props.handleChangeItem(props.item.id, "i", toNumber(e.target.value)) }} />
                        <i className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                            onClick={() => { props.handleChangeItem(props.item.id, "u", 0) }}><HiPlusCircle/></i>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="font-bold text-center">{NumberPipe(props.item.sale * props.item.amount, true)}</div>
                </div>
                <div className="col-span-1 grid-cols-5">
            <button className="col-span-1 btn-outline border-none text-danger hover:text-danger-dark" onClick={() => { props.handleDeleteCart(props.item.id) }}>Xóa</button>
        </div>
            </div>
    )
}
