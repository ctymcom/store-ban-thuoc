import { FormatMoney } from '../../../shared/currency/money';
import { toNumber } from 'lodash';
import { Checkbox } from '../../../shared/form/checkbox';
import { RiSubtractLine } from 'react-icons/ri'
import { HiPlus } from 'react-icons/hi'
export function CartItem(props) {
    return (
        <tr className="border-b-2 col-span-4 h-auto">
            <td className="" >
                <div className="grid grid-cols-12 gap-4 items-center h-auto">
                    <div className="w-10 h-10 py-3" >
                        <Checkbox checked={props.item.isCheck} id={props.item.id} onChanged={(e) => {
                            props.handleChangeItem(props.item.id, "c", e);
                        }} />
                    </div>
                    <img className="col-span-3 w-18 max-h-16 object-contain mx-auto" src={props.item.img} alt="" />
                    <div className="col-span-8">
                        <p className="col-span-8 text-lg ">{props.item.name}</p>
                        <button className="hover:text-white hover:bg-red-500 px-2 rounded-lg text-red-500 btn" onClick={() => { props.handleDeleteCart(props.item.id) }}>Xóa</button>
                    </div>
                </div>
            </td>
            <td className="text-right"><FormatMoney money={props.item.sale} tS=',' /> VND</td>
            <td className="px-4">
                <div className="flex items-center justify-between border border-gray-300 rounded">
                    <i className="px-3 py-1.5 btn text-gray-400"
                        onClick={() => { props.handleChangeItem(props.item.id, "d", 0) }}><RiSubtractLine /></i>
                    <input className="w-full text-center" type="number"
                        value={props.item.amount < 10 ? '0' + props.item.amount : (props.item.amount).toString()}
                        onChange={(e) => { props.handleChangeItem(props.item.id, "i", toNumber(e.target.value)) }} />
                    <i className="px-3 py-1.5 btn text-gray-400"
                        onClick={() => { props.handleChangeItem(props.item.id, "u", 0) }}><HiPlus /></i>
                </div>
            </td>
            <td className="w-48"><div className="font-bold w-44 text-right"><FormatMoney money={props.item.sale * toNumber(props.item.amount)} tS=',' /> VND</div></td>
        </tr >
    )
}
