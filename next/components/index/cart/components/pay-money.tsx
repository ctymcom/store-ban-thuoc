import { BiMoney } from 'react-icons/bi'
import { NumberPipe } from '../../../../lib/pipes/number';
interface PropsType extends ReactProps{
    listMoney:ItemCart[],
}
type ItemCart = {
    title:string,
    money:number,
}
export function PayMoney(props:PropsType) {
    const { listMoney } = props;
    return <>
        <div className="flex border-0 sm:border-b-2 items-center pb-2">
            <i className="text-primary hidden md:block text-20"><BiMoney /></i>
            <p className="uppercase px-2 text-16 md:text-20">Thành Tiền</p>
        </div>
        <div className="my-2 leading-8">
            {
                listMoney.map((item, index) => {
                    return <div className="flex justify-between text-16 md:text-20" key={index}>
                        <p>{item.title}</p>
                        <p className="font-bold">{NumberPipe(item.money, false)} <span> VND</span></p>
                    </div>
                })
            }
        </div>
    </>
}