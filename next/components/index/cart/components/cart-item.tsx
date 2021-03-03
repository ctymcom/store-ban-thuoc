
import { HiMinusCircle,HiPlusCircle } from 'react-icons/hi'
import { NumberPipe } from '../../../../lib/pipes/number';
import CheckboxItem from './check-box-circle';
export function CartItem(props) {
    return (
            <div className="grid grid-cols-12 text-center text-16 sm:text-20 border-b-2 items-center overflow-hidden">
                <div className="col-span-8 sm:col-span-5 text-left flex items-center gap-2">
                    <div className="w-1/12 h-full cursor-pointer flex items-center" onClick={()=> props.handleChangeItem(props.item.id, "c", !props.item.isCheck)}>
                        <CheckboxItem checked={props.item.isCheck}/>
                    </div>
                    <div className={`w-11/12 flex gap-2 items-center sm:h-24  ${props.item.isCheck?"":"opacity-50"}`}>
                        <img className="w-1/4 sm:w-1/3 max-h-16 object-contain my-auto" src={props.item.img} alt="" />
                        <p className="w-3/4 sm:w-2/3 text-left flex-wrap items-center justify-between"><span>{props.item.name}</span><span className="block sm:hidden text-primary">{NumberPipe(props.item.sale, true)}</span></p>
                    </div>
                </div>
                <div className={`col-span-2 hidden sm:block ${props.item.isCheck?"":"opacity-50"}`}>
                    {NumberPipe(props.item.sale, true)}
                </div>
                <div className={`col-span-4 sm:col-span-2 ${props.item.isCheck?"":"opacity-50"}`} >
                    <div className="flex items-center justify-between w-full sm:w-5/6 mx-auto">
                        <i className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                            onClick={() => { props.handleChangeItem(props.item.id, "d", 0) }}><HiMinusCircle/></i>
                        <input className="w-full text-center" type="number"
                            value={props.item.amount < 10 ? '0' + props.item.amount : (props.item.amount).toString()}
                            onChange={(e) => { props.handleChangeItem(props.item.id, "i", parseInt(e.target.value)) }} />
                        <i className="btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark"
                            onClick={() => { props.handleChangeItem(props.item.id, "u", 0) }}><HiPlusCircle/></i>
                    </div>
                </div>
                <div className={`col-span-2 hidden sm:block ${props.item.isCheck?"":"opacity-50"}`}>
                    <div className="font-bold text-center">{NumberPipe(props.item.sale * props.item.amount, true)}</div>
                </div>
                <div className={`col-span-1 grid-cols-5 hidden sm:block ${props.item.isCheck?"":"opacity-50"}`}>    
                    <button className="col-span-1 btn-outline border-none text-20 text-danger hover:text-danger-dark" onClick={() => { props.handleDeleteCart(props.item.id) }}>Xóa</button>
                </div>
            </div>
    )
}
