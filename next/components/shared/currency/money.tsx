import CurrencyFormat from 'react-currency-format';

export function FormatMoney(props) {
    const { money, tS } = props;
    const DeSe = (ts) => {
        if (ts) {
            return null;
        }
        return ',';
    }
    return <CurrencyFormat value={money} displayType={'text'} thousandSeparator={tS} decimalSeparator={DeSe(tS)} renderText={value => <p className="inline">{value}</p>} />
}