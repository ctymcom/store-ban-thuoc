import { toNumber } from 'lodash';
import { Checkbox } from '../../../shared/form/checkbox';
import { RiSubtractLine } from 'react-icons/ri'
import { HiPlus } from 'react-icons/hi'
import { NumberPipe } from '../../../../lib/pipes/number';
export function CartItem(props) {
    const styleItem=(checked)=>{
        let sty="grid grid-cols-12 text-center border-b-2 h-24 items-center ";
        if(!checked){
            sty+="opacity-50";
        }
        return sty;
    }
    return (
        <div className={styleItem(props.item.isCheck)}>
            <div className="col-span-5 text-left grid grid-cols-12">
                <div className="col-span-1 my-auto">
                    <Checkbox checked={props.item.isCheck}
                        id={props.item.id}
                        onChanged={(e) => {
                            props.handleChangeItem(props.item.id, "c", e);
                        }} />
                </div>
                <div className="col-span-11 grid grid-cols-4 gap-3">
                    <img className="col-span-1 w-16 max-h-16 object-contain my-auto" src={props.item.img} alt="" />
                    <p className="col-span-3 text-left">{props.item.name}</p>
                </div>
            </div>
            <div className="col-span-2">
                {NumberPipe(props.item.sale, true)}
            </div>
            <div className="col-span-2" >
                <div className="flex items-center justify-between border border-gray-300 rounded w-5/6 mx-auto">
                    <i className="btnchange btnchange-down"
                        onClick={() => { props.handleChangeItem(props.item.id, "d", 0) }}><RiSubtractLine /></i>
                    <input className="w-full text-center" type="number"
                        value={props.item.amount < 10 ? '0' + props.item.amount : (props.item.amount).toString()}
                        onChange={(e) => { props.handleChangeItem(props.item.id, "i", toNumber(e.target.value)) }} />
                    <i className="btnchange btnchange-up"
                        onClick={() => { props.handleChangeItem(props.item.id, "u", 0) }}><HiPlus /></i>
                </div>
            </div>
            <div className="col-span-2">
                <div className="font-bold text-center">{NumberPipe(props.item.sale * props.item.amount, true)}</div>
            </div>
            <div className="col-span-1 grid-cols-5">
            <button className="col-span-1 hover:text-white hover:bg-red-500 px-2 rounded-lg text-red-500 btn" onClick={() => { props.handleDeleteCart(props.item.id) }}>Xóa</button>
        </div>
        </div>
    )
}
