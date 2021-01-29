import { FormatMoney } from '../../../components/shared/currency/money';
import { toNumber } from 'lodash';

export function CartItem(props) {
    // return (
    //     <div>
    //         <h3>CartItem</h3>
    //         <button onClick={() => { console.log(props) }}>CLick me</button>
    //     </div>

    // )
    return (
        <tr className="border-b-2 col-span-4 h-20" key={props.index}>
            <td className="pr-5" >
                <div className="grid grid-cols-12 gap-4 items-center h-20">
                    <div className="w-10 h-10" onClick={() => { props.handleDeleteCart(props.item.id) }}>
                        <svg className="w-4 h-4 col-span-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <g id="Group_38402" data-name="Group 38402" transform="translate(0 0)">
                                <path id="Path_10589" data-name="Path 10589" d="M-1063.434-725.236a9.989,9.989,0,0,1,10.012,9.967,9.989,9.989,0,0,1-9.985,10.033,10,10,0,0,1-10.015-9.969A9.989,9.989,0,0,1-1063.434-725.236Zm-.016,18.182a8.2,8.2,0,0,0,8.213-8.036,8.183,8.183,0,0,0-8.115-8.329,8.2,8.2,0,0,0-8.253,8.077A8.181,8.181,0,0,0-1063.45-707.053Z" transform="translate(1073.422 725.236)" fill="#9b9b9b" />
                                <path id="Path_10590" data-name="Path 10590" d="M-989.538-639.9c-.652-.649-1.294-1.278-1.923-1.92a1.5,1.5,0,0,1-.343-.5.869.869,0,0,1,.36-1.014.894.894,0,0,1,1.134.125c.582.565,1.151,1.143,1.723,1.718.1.1.185.212.316.364.415-.422.79-.805,1.167-1.186.272-.275.544-.549.82-.819a.92.92,0,0,1,1.367-.077.915.915,0,0,1-.081,1.34c-.56.569-1.128,1.13-1.692,1.7-.089.089-.173.183-.287.3.651.647,1.293,1.276,1.922,1.917a1.512,1.512,0,0,1,.344.5.868.868,0,0,1-.357,1.015.892.892,0,0,1-1.134-.123c-.582-.565-1.152-1.142-1.722-1.719a4.278,4.278,0,0,1-.292-.375l-1.657,1.661c-.155.155-.3.317-.467.462a.9.9,0,0,1-1.256-.005.884.884,0,0,1,0-1.281c.581-.6,1.181-1.187,1.771-1.779C-989.732-639.684-989.649-639.778-989.538-639.9Z" transform="translate(998.257 649.882)" fill="#9b9b9b" />
                            </g>
                        </svg>
                    </div>
                    <img className="col-span-3 w-18 max-h-16 object-contain mx-auto" src={props.item.img} alt="" />
                    <p className="col-span-8 text-lg">{props.item.name}</p>
                </div>
            </td>
            <td className="pr-5"><FormatMoney money={props.item.sale} tS=',' /> VND</td>
            <td className="pr-5">
                <div className="flex items-center justify-between border border-primary-400 rounded w-11/12">
                    <button className="px-3 py-1.5" onClick={() => { props.handleChangeItem(props.item.id, "d", 0) }}>-</button>
                    <input className="w-full text-center" type="number"
                        value={props.item.amount < 10 ? '0' + props.item.amount : (props.item.amount).toString()}
                        onChange={(e) => { props.handleChangeItem(props.item.id, "i", toNumber(e.target.value)) }} />
                    <button className="px-3 py-1.5" onClick={() => { props.handleChangeItem(props.item.id, "u", 0) }}>+</button>
                </div>
            </td>
            <td className="w-48"><div className="font-bold w-44"><FormatMoney money={props.item.sale * toNumber(props.item.amount)} tS=',' /> VND</div></td>
        </tr>
    )
}
