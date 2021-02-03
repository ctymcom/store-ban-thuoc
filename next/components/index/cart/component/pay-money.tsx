
import { FormatMoney } from '../../../shared/currency/money';
import { IconTotalMoney } from '../../../../lib/svg/icon-total-money';
export function PayMoney(props) {
    const { listMoney } = props;
    return <>
        <div className="flex border-b-4 py-2 items-center">
            <IconTotalMoney />
            <p className="uppercase px-2">Thành Tiền</p>
        </div>
        <div className="my-2">
            {
                listMoney.map((item, index) => {
                    return <div className="flex justify-between" key={index}>
                        <p>{item.title}</p>
                        <p className="font-bold"><FormatMoney money={item.money} tS='.' /> <span> VND</span></p>
                    </div>
                })
            }
        </div>
    </>
}