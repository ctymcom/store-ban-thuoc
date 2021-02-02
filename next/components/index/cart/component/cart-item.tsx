import { FormatMoney } from '../../../shared/currency/money';
import { toNumber } from 'lodash';
import { Checkbox } from '../../../shared/form/checkbox';

export function CartItem(props) {
    const setChecked = (isCheck) => {
        return isCheck;
    }
    return (
        < tr className="border-b-2 col-span-4 h-auto" key={props.index} >
            <td className="" >
                <div className="grid grid-cols-12 gap-4 items-center h-auto">
                    <div className="w-10 h-10 py-3" >
                        <Checkbox value={props.item.isCheck} onChanged={(e) => {
                            props.handleChangeItem(props.item.id, "c", e);
                        }} />
                    </div>
                    <img className="col-span-3 w-18 max-h-16 object-contain mx-auto" src={props.item.img} alt="" />
                    <div className="col-span-8">
                        <p className="col-span-8 text-lg ">{props.item.name}</p>
                        <button className="hover:text-white hover:bg-red-500 px-2 rounded-lg text-red-500" onClick={() => { props.handleDeleteCart(props.item.id) }}>Xóa</button>
                    </div>
                </div>
            </td>
            <td className="text-right"><FormatMoney money={props.item.sale} tS=',' /> VND</td>
            <td className="px-4">
                <div className="flex items-center justify-between border border-primary rounded">
                    <button className="px-3 py-1.5" onClick={() => { props.handleChangeItem(props.item.id, "d", 0) }}>-</button>
                    <input className="w-full text-center" type="number"
                        value={props.item.amount < 10 ? '0' + props.item.amount : (props.item.amount).toString()}
                        onChange={(e) => { props.handleChangeItem(props.item.id, "i", toNumber(e.target.value)) }} />
                    <button className="px-3 py-1.5" onClick={() => { props.handleChangeItem(props.item.id, "u", 0) }}>+</button>
                </div>
            </td>
            <td className="w-48"><div className="font-bold w-44 text-right"><FormatMoney money={props.item.sale * toNumber(props.item.amount)} tS=',' /> VND</div></td>
        </tr >
    )
}
