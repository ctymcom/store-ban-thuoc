import { FormatMoney } from '../../components/shared/currency/money';
export function CartTotalMoney(props) {
    const { listMoney } = props;
    return <>
        <div className="flex border-b-2 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="15.976" height="18.965" viewBox="0 0 15.976 18.965">
                <g id="Group_38415" data-name="Group 38415" transform="translate(-128.51 -30.49)">
                    <path id="Path_10595" data-name="Path 10595" d="M143.881,45.459H129.112a.608.608,0,0,0-.6.606V52.7a.6.6,0,0,0,.6.6h14.769a.6.6,0,0,0,.605-.6V46.065A.608.608,0,0,0,143.881,45.459ZM136.5,49.673a1.157,1.157,0,0,1-1.293-1.2,1.222,1.222,0,0,1,1.007-1.169v-.255a.286.286,0,0,1,.571,0V47.3a1.221,1.221,0,0,1,1.006,1.169.285.285,0,0,1-.285.282.289.289,0,0,1-.29-.282.724.724,0,0,0-1.437,0c0,.41.243.623.72.623a1.159,1.159,0,0,1,1.292,1.2,1.227,1.227,0,0,1-1.006,1.168v.248a.286.286,0,1,1-.571,0v-.248a1.228,1.228,0,0,1-1.007-1.168.286.286,0,1,1,.572,0,.726.726,0,0,0,1.437,0C137.215,49.878,136.976,49.673,136.5,49.673Zm-7.416-3.608a.036.036,0,0,1,.03-.034h1.262a.043.043,0,0,1,0,.017,1.627,1.627,0,0,1-.051.2c-.009.017-.013.034-.017.043-.025.059-.051.129-.077.179a.063.063,0,0,0-.012.026c-.034.059-.072.119-.115.179-.009.017-.017.025-.026.042a1.632,1.632,0,0,1-.3.3l-.039.026a1.37,1.37,0,0,1-.179.11l-.017.017c-.064.025-.123.052-.188.077-.012.009-.025.009-.038.017a.908.908,0,0,1-.209.051h-.016Zm.03,6.662a.036.036,0,0,1-.03-.025V51.439h.016l.206.051a.1.1,0,0,0,.046.017,1.57,1.57,0,0,1,.179.085.037.037,0,0,1,.022.008,1.582,1.582,0,0,1,.179.111.155.155,0,0,1,.039.034,1.949,1.949,0,0,1,.3.29.106.106,0,0,0,.03.043c.038.061.077.12.111.179a.065.065,0,0,0,.012.026c.026.059.052.119.077.179a.2.2,0,0,0,.017.042,1.66,1.66,0,0,1,.051.2c0,.009,0,.009,0,.017Zm14.769,0h-1.228v-.008c.017-.077.034-.137.055-.205,0-.017.013-.034.017-.051a1.314,1.314,0,0,1,.077-.171c0-.008,0-.017.012-.025a1.97,1.97,0,0,1,.106-.179.135.135,0,0,0,.031-.034c.042-.051.085-.1.132-.154,0,0,0,0,0-.009.051-.042.1-.093.157-.136l.039-.026a1.213,1.213,0,0,1,.175-.119.032.032,0,0,0,.021-.009,1.4,1.4,0,0,1,.17-.077.14.14,0,0,1,.047-.016,1.5,1.5,0,0,1,.2-.059h0l0,1.253A.031.031,0,0,1,143.881,52.726Zm.03-5.408c0-.009,0-.009-.009-.009a1.729,1.729,0,0,1-.2-.051.09.09,0,0,0-.047-.017,1.286,1.286,0,0,1-.174-.086.017.017,0,0,1-.017-.008,1.2,1.2,0,0,1-.175-.111.166.166,0,0,1-.039-.034,1.543,1.543,0,0,1-.157-.137h0c-.047-.051-.09-.1-.132-.153a.177.177,0,0,0-.031-.043c-.038-.061-.077-.12-.106-.179-.008-.009-.008-.017-.012-.017a1.429,1.429,0,0,1-.077-.179c0-.016-.013-.025-.017-.043-.021-.068-.038-.136-.055-.2V46.03h1.228a.033.033,0,0,1,.03.034Z" transform="translate(0 -9.405)" fill="#42b54a" />
                    <path id="Path_10596" data-name="Path 10596" d="M136.6,34.4c.038-.017,3.771-2.108,6.27-.734l-.827.827a.292.292,0,0,0-.064.316.285.285,0,0,0,.268.179h3.92a.287.287,0,0,0,.285-.29V30.783a.3.3,0,0,0-.175-.273.293.293,0,0,0-.315.069l-.951.955c-1.024-.367-6.03-1.885-8.794,2.466a.282.282,0,0,0,.034.349A.275.275,0,0,0,136.6,34.4Z" transform="translate(-4.812)" fill="#42b54a" />
                    <path id="Path_10597" data-name="Path 10597" d="M146.026,70c-.042.026-3.769,2.115-6.268.734l.827-.827a.3.3,0,0,0,.064-.316.3.3,0,0,0-.268-.179h-3.92a.287.287,0,0,0-.285.29V73.63a.3.3,0,0,0,.175.264.251.251,0,0,0,.111.017.289.289,0,0,0,.2-.077l.955-.956c1.024.367,6.031,1.877,8.795-2.474a.289.289,0,0,0-.034-.349A.277.277,0,0,0,146.026,70Z" transform="translate(-4.816 -24.457)" fill="#42b54a" />
                </g>
            </svg>
            <p className="uppercase px-2">Thành Tiền</p>
        </div>
        {
            listMoney.map((item, index) => {
                return <div className="flex justify-between" key={index}>
                    <p>{item.title}</p>
                    <p className="font-bold flex"><FormatMoney money={item.money} tS='.' /> VND</p>
                </div>
            })
        }
    </>
}